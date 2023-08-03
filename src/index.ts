import { Transformer } from '@parcel/plugin'
import ThrowableDiagnostic from '@parcel/diagnostic'
import type { MutableAsset } from '@parcel/types'
import { minimatch } from 'minimatch'
import type { MinimatchOptions } from 'minimatch'
import path from 'path'
import omit from 'omit'
import fs from 'fs'
import assert from 'assert'
import { execSync } from 'child_process'
import * as tmp from 'tmp'

type PandocOptions = Partial<Record<string, any>>

interface PandocConfig {
  root: string
  options: Partial<Record<string, PandocOptions>>
}

// Apply a function to each string value in an object.
// Recurse over arrays and objects.
function mapValues<T>(fun: (val: string) => string, obj: any): typeof obj {
  if (typeof obj === 'string') {
    return fun(obj)
  } else if (Array.isArray(obj)) {
    return obj.map((val) => mapValues(fun, val))
  } else if (typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [key, mapValues(fun, val)]),
    )
  } else {
    return obj
  }
}

// Test if a glob pattern matches a file path.
// https://github.com/parcel-bundler/parcel/blob/7ff54c7c1212b05ed0393e0a92e96c6002d1dc51/packages/core/utils/src/glob.js#L15-L24
function isGlobMatch(
  filepath: string,
  pattern: string,
  opts: Omit<MinimatchOptions, 'matchBase'> = {},
) {
  return minimatch(filepath, pattern, { ...(opts ?? {}), matchBase: true })
}

// Get the set of Pandoc CLI arguments for a given asset file path.
function getOptions(filepath: string, config: PandocConfig) {
  const relativeFilepath = path.relative(config.root, filepath)
  const [_pattern, options] = Object.entries(config.options).find(
    ([pattern, _options]) => isGlobMatch(relativeFilepath, pattern),
  ) ?? [undefined, {}]
  return Array.isArray(options) ? options : [options]
}

// Get the Pandoc reader for a given set of Pandoc CLI arguments and asset type.
function getReader(options: PandocOptions, type: string) {
  if (options.from !== undefined) {
    return options.from
  } else if (options.read !== undefined) {
    return options.read
  } else {
    switch (type) {
      case 'md':
        return 'markdown'
      default:
        return type
    }
  }
}

// Get the Pandoc writer for a given set of Pandoc CLI arguments.
function getWriter(options: PandocOptions) {
  if (options.to !== undefined) {
    return options.to
  } else if (options.write != undefined) {
    return options.write
  } else {
    return 'html'
  }
}

// Get the asset type for a given Pandoc writer.
function getAssetType(writer: string) {
  if (writer.match(/commonmark|gfm|markdown/)) {
    return 'md'
  } else {
    return writer
  }
}

// Render Pandoc CLI options.
function renderOptions(options: PandocOptions) {
  return Object.entries(options).flatMap(([optionName, optionValue]) => {
    if (typeof optionValue === 'boolean') {
      return [`--${optionName}`]
    } else if (typeof optionValue === 'string') {
      return [`--${optionName}=${optionValue}`]
    } else if (Array.isArray(optionValue)) {
      return optionValue.map((optionValue) => {
        return `--${optionName}=${optionValue}`
      })
    } else if (typeof optionValue === 'object') {
      return Object.entries(optionValue).map(
        ([variableName, variableValue]) => {
          assert(typeof variableValue === 'string')
          return `${optionName} ${variableName}=${variableValue}`
        },
      )
    }
  })
}

export default new Transformer({
  async loadConfig({ config, logger }): Promise<PandocConfig> {
    // Load configuration from .pandocrc.
    const configResult = await config.getConfig(['.pandocrc'])
    if (configResult) {
      const { contents, filePath } = configResult
      logger.verbose({ message: `Found ${filePath}` })

      // Replace '${.}' with path to .pandocrc.
      const root = path.dirname(filePath)
      return {
        root,
        options: mapValues((val) => val.replace('${.}', root).trim(), contents),
      }
    } else {
      throw new ThrowableDiagnostic({
        diagnostic: {
          message: 'Could not find .pandocrc',
          origin: 'parcel-transformer-pandoc',
        },
      })
    }
  },
  async transform({ asset, config, logger }) {
    // Determine the Pandoc CLI options.
    const sequentialOptions = getOptions(asset.filePath, config)

    // Run Pandoc with each set of options.
    for (const options of sequentialOptions) {
      // Determine the Pandoc reader & writer.
      const reader = getReader(options, asset.type)
      const writer = getWriter(options)

      // Run Pandoc.
      const input = await asset.getCode()
      const logFile = tmp.fileSync({ prefix: 'pandoc', postfix: '.json' })

      // Run Pandoc.
      const renderedOptions = renderOptions({
        ...omit(['from', 'to', 'read', 'write'], options),
        from: reader,
        to: writer,
        log: logFile.name,
      })
      const command = ['pandoc', ...renderedOptions].join(' ')
      logger.verbose({ message: `Running '${command}'` })
      const output = execSync(command, {
        input,
        cwd: config.root,
        encoding: 'utf-8',
      })
      logger.verbose({ message: `Done` })
      asset.setCode(output)

      // Add dependencies.
      // {
      // "type": "LoadedResource",
      // "verbosity": "INFO",
      // "for": "templates/experimental-jams/page.html",
      // "from": "templates/experimental-jams/page.html"
      // }
      const logEntries = JSON.parse(
        fs.readFileSync(logFile.name, { encoding: 'utf8' }),
      )
      if (Array.isArray(logEntries)) {
        for (const logEntry of logEntries) {
          if (
            typeof logEntry === 'object' &&
            logEntry.type === 'LoadedResource'
          ) {
            asset.invalidateOnFileChange(logEntry.from)
          }
        }
      }

      // Update the asset type based on the writer
      asset.type = getAssetType(writer)
    }
    return [asset]
  },
})
