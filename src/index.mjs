import { Transformer } from '@parcel/plugin';
import { minimatch } from 'minimatch';
import path from 'path';
import omit from 'omit';
import fs from 'fs';
import assert from 'assert';
import { execSync } from 'child_process';

// Apply a function to each string value in an object.
// Recurse over arrays and objects.
function mapValues(fun, obj) {
  if (typeof obj === 'string') {
    return fun(obj)
  } else if (Array.isArray(obj)) {
    return obj.map((val) => mapValues(fun, val))
  } else if (typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, mapValues(fun, val)]))
  } else {
    return obj
  }
}

// Test if a glob pattern matches a file path.
// https://github.com/parcel-bundler/parcel/blob/7ff54c7c1212b05ed0393e0a92e96c6002d1dc51/packages/core/utils/src/glob.js#L15-L24 
function isGlobMatch(filePath, glob, opts) {
  return minimatch(filePath, glob, { ...(opts ?? {}), matchBase: true })
}

// Get the set of Pandoc CLI arguments for a given asset file path.
function getOptions({ filePath, config }) {
  const relativeFilePath = path.relative(config.root, filePath);
  const [_glob, options] = Object.entries(config.options).find(
    ([glob, _options]) => isGlobMatch(relativeFilePath, glob)) ?? [undefined, {}];
  return Array.isArray(options) ? options : [options];
}

// Get the Pandoc reader for a given set of Pandoc CLI arguments and asset type.
function getReader({ options, type }) {
  if (options.from !== undefined) {
    return options.from
  } else if (options.read !== undefined) {
    return options.read
  } else {
    switch (type) {
      case 'md':
        return 'markdown';
      default:
        return type;
    }
  }
}

// Get the Pandoc writer for a given set of Pandoc CLI arguments.
function getWriter({ options }) {
  if (options.to !== undefined) {
    return options.to;
  } else if (options.write != undefined) {
    return options.write;
  } else {
    return 'html';
  }
}

// Get the asset type for a given Pandoc writer.
function getAssetType({ writer }) {
  if (typeof writer === 'string') {
    if (writer.match(/commonmark|gfm|markdown/)) {
      return 'md'
    } else {
      return writer
    }
  }
}

// Get dependencies.
function addAssetDependencies({ asset, options, logger }) {
  return mapValues((filePath) => {
    if (fs.existsSync(filePath)) {
      assert(typeof filePath === 'string');
      asset.invalidateOnFileChange(filePath);
    }
    return filePath
  }, options)
}

// Render Pandoc CLI options.
function renderOptions(options) {
  return Object.entries(options).flatMap(
    ([optionName, optionValue]) => {
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
          })
      }
    })
}

export default new Transformer({
  async loadConfig({ config, logger }) {
    // Load configuration from .pandocrc.
    const { contents, filePath } = await config.getConfig([
      '.pandocrc'
    ]);
    logger.verbose({ message: `Found ${filePath}` });

    // Replace '${.}' with path to .pandocrc.
    const root = path.dirname(filePath);
    return {
      root,
      options: mapValues(
        (val) => val.replace('${.}', root).trim(), contents),
    }
  },
  async transform({ asset, config, logger }) {
    // Determine the Pandoc CLI options.
    const sequentialOptions = getOptions({ filePath: asset.filePath, config });

    // Run Pandoc with each set of options.
    for (const options of sequentialOptions) {

      // Determine the Pandoc reader & writer.
      const reader = getReader({ options, type: asset.type });
      const writer = getWriter({ options, type: asset.type });

      // Determine dependencies.
      addAssetDependencies({ asset, options, logger })

      // Run Pandoc.
      const input = await asset.getCode();
      const renderedOptions = renderOptions({ ...omit(['from', 'to', 'read', 'write'], options), from: reader, to: writer });
      const command = ['pandoc', ...renderedOptions].join(' ');
      logger.verbose({ message: `Running '${command}'` });
      const output = await execSync(command, { input, cwd: config.root, encoding: 'utf-8' });
      logger.verbose({ message: `Done` });
      asset.setCode(output);

      // Update the asset type based on the writer
      asset.type = getAssetType({ writer });
    }
    return [asset]
  }
});