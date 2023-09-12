"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@parcel/plugin/lib/PluginAPI.js
var require_PluginAPI = __commonJS({
  "node_modules/@parcel/plugin/lib/PluginAPI.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Validator = exports.Transformer = exports.Runtime = exports.Resolver = exports.Reporter = exports.Packager = exports.Optimizer = exports.Namer = exports.Compressor = exports.Bundler = void 0;
    var CONFIG = Symbol.for("parcel-plugin-config");
    var Transformer2 = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Transformer = Transformer2;
    var Resolver = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Resolver = Resolver;
    var Bundler = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Bundler = Bundler;
    var Namer = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Namer = Namer;
    var Runtime = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Runtime = Runtime;
    var Validator = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Validator = Validator;
    var Packager = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Packager = Packager;
    var Optimizer = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Optimizer = Optimizer;
    var Compressor = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Compressor = Compressor;
    var Reporter = class {
      constructor(opts) {
        this[CONFIG] = opts;
      }
    };
    exports.Reporter = Reporter;
  }
});

// node_modules/nullthrows/nullthrows.js
var require_nullthrows = __commonJS({
  "node_modules/nullthrows/nullthrows.js"(exports, module2) {
    "use strict";
    function nullthrows(x, message) {
      if (x != null) {
        return x;
      }
      var error = new Error(message !== void 0 ? message : "Got unexpected " + x);
      error.framesToPop = 1;
      throw error;
    }
    module2.exports = nullthrows;
    module2.exports.default = nullthrows;
    Object.defineProperty(module2.exports, "__esModule", { value: true });
  }
});

// node_modules/@lezer/common/dist/index.cjs
var require_dist = __commonJS({
  "node_modules/@lezer/common/dist/index.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultBufferLength = 1024;
    var nextPropID = 0;
    var Range = class {
      constructor(from, to) {
        this.from = from;
        this.to = to;
      }
    };
    var NodeProp = class {
      /// Create a new node prop type.
      constructor(config = {}) {
        this.id = nextPropID++;
        this.perNode = !!config.perNode;
        this.deserialize = config.deserialize || (() => {
          throw new Error("This node type doesn't define a deserialize function");
        });
      }
      /// This is meant to be used with
      /// [`NodeSet.extend`](#common.NodeSet.extend) or
      /// [`LRParser.configure`](#lr.ParserConfig.props) to compute
      /// prop values for each node type in the set. Takes a [match
      /// object](#common.NodeType^match) or function that returns undefined
      /// if the node type doesn't get this prop, and the prop's value if
      /// it does.
      add(match2) {
        if (this.perNode)
          throw new RangeError("Can't add per-node props to node types");
        if (typeof match2 != "function")
          match2 = NodeType.match(match2);
        return (type) => {
          let result = match2(type);
          return result === void 0 ? null : [this, result];
        };
      }
    };
    NodeProp.closedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
    NodeProp.openedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
    NodeProp.group = new NodeProp({ deserialize: (str) => str.split(" ") });
    NodeProp.contextHash = new NodeProp({ perNode: true });
    NodeProp.lookAhead = new NodeProp({ perNode: true });
    NodeProp.mounted = new NodeProp({ perNode: true });
    var MountedTree = class {
      constructor(tree, overlay, parser) {
        this.tree = tree;
        this.overlay = overlay;
        this.parser = parser;
      }
    };
    var noProps = /* @__PURE__ */ Object.create(null);
    var NodeType = class _NodeType {
      /// @internal
      constructor(name, props, id, flags = 0) {
        this.name = name;
        this.props = props;
        this.id = id;
        this.flags = flags;
      }
      static define(spec) {
        let props = spec.props && spec.props.length ? /* @__PURE__ */ Object.create(null) : noProps;
        let flags = (spec.top ? 1 : 0) | (spec.skipped ? 2 : 0) | (spec.error ? 4 : 0) | (spec.name == null ? 8 : 0);
        let type = new _NodeType(spec.name || "", props, spec.id, flags);
        if (spec.props)
          for (let src of spec.props) {
            if (!Array.isArray(src))
              src = src(type);
            if (src) {
              if (src[0].perNode)
                throw new RangeError("Can't store a per-node prop on a node type");
              props[src[0].id] = src[1];
            }
          }
        return type;
      }
      /// Retrieves a node prop for this type. Will return `undefined` if
      /// the prop isn't present on this node.
      prop(prop) {
        return this.props[prop.id];
      }
      /// True when this is the top node of a grammar.
      get isTop() {
        return (this.flags & 1) > 0;
      }
      /// True when this node is produced by a skip rule.
      get isSkipped() {
        return (this.flags & 2) > 0;
      }
      /// Indicates whether this is an error node.
      get isError() {
        return (this.flags & 4) > 0;
      }
      /// When true, this node type doesn't correspond to a user-declared
      /// named node, for example because it is used to cache repetition.
      get isAnonymous() {
        return (this.flags & 8) > 0;
      }
      /// Returns true when this node's name or one of its
      /// [groups](#common.NodeProp^group) matches the given string.
      is(name) {
        if (typeof name == "string") {
          if (this.name == name)
            return true;
          let group = this.prop(NodeProp.group);
          return group ? group.indexOf(name) > -1 : false;
        }
        return this.id == name;
      }
      /// Create a function from node types to arbitrary values by
      /// specifying an object whose property names are node or
      /// [group](#common.NodeProp^group) names. Often useful with
      /// [`NodeProp.add`](#common.NodeProp.add). You can put multiple
      /// names, separated by spaces, in a single property name to map
      /// multiple node names to a single value.
      static match(map) {
        let direct = /* @__PURE__ */ Object.create(null);
        for (let prop in map)
          for (let name of prop.split(" "))
            direct[name] = map[prop];
        return (node) => {
          for (let groups = node.prop(NodeProp.group), i = -1; i < (groups ? groups.length : 0); i++) {
            let found = direct[i < 0 ? node.name : groups[i]];
            if (found)
              return found;
          }
        };
      }
    };
    NodeType.none = new NodeType(
      "",
      /* @__PURE__ */ Object.create(null),
      0,
      8
      /* Anonymous */
    );
    var NodeSet = class _NodeSet {
      /// Create a set with the given types. The `id` property of each
      /// type should correspond to its position within the array.
      constructor(types2) {
        this.types = types2;
        for (let i = 0; i < types2.length; i++)
          if (types2[i].id != i)
            throw new RangeError("Node type ids should correspond to array positions when creating a node set");
      }
      /// Create a copy of this set with some node properties added. The
      /// arguments to this method should be created with
      /// [`NodeProp.add`](#common.NodeProp.add).
      extend(...props) {
        let newTypes = [];
        for (let type of this.types) {
          let newProps = null;
          for (let source of props) {
            let add = source(type);
            if (add) {
              if (!newProps)
                newProps = Object.assign({}, type.props);
              newProps[add[0].id] = add[1];
            }
          }
          newTypes.push(newProps ? new NodeType(type.name, newProps, type.id, type.flags) : type);
        }
        return new _NodeSet(newTypes);
      }
    };
    var CachedNode = /* @__PURE__ */ new WeakMap();
    var CachedInnerNode = /* @__PURE__ */ new WeakMap();
    var Tree = class _Tree {
      /// Construct a new tree. See also [`Tree.build`](#common.Tree^build).
      constructor(type, children, positions, length, props) {
        this.type = type;
        this.children = children;
        this.positions = positions;
        this.length = length;
        this.props = null;
        if (props && props.length) {
          this.props = /* @__PURE__ */ Object.create(null);
          for (let [prop, value] of props)
            this.props[typeof prop == "number" ? prop : prop.id] = value;
        }
      }
      /// @internal
      toString() {
        let mounted = this.prop(NodeProp.mounted);
        if (mounted && !mounted.overlay)
          return mounted.tree.toString();
        let children = "";
        for (let ch of this.children) {
          let str = ch.toString();
          if (str) {
            if (children)
              children += ",";
            children += str;
          }
        }
        return !this.type.name ? children : (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (children.length ? "(" + children + ")" : "");
      }
      /// Get a [tree cursor](#common.TreeCursor) rooted at this tree. When
      /// `pos` is given, the cursor is [moved](#common.TreeCursor.moveTo)
      /// to the given position and side.
      cursor(pos, side = 0) {
        let scope = pos != null && CachedNode.get(this) || this.topNode;
        let cursor = new TreeCursor(scope);
        if (pos != null) {
          cursor.moveTo(pos, side);
          CachedNode.set(this, cursor._tree);
        }
        return cursor;
      }
      /// Get a [tree cursor](#common.TreeCursor) that, unlike regular
      /// cursors, doesn't skip through
      /// [anonymous](#common.NodeType.isAnonymous) nodes and doesn't
      /// automatically enter mounted nodes.
      fullCursor() {
        return new TreeCursor(
          this.topNode,
          1
          /* Full */
        );
      }
      /// Get a [syntax node](#common.SyntaxNode) object for the top of the
      /// tree.
      get topNode() {
        return new TreeNode(this, 0, 0, null);
      }
      /// Get the [syntax node](#common.SyntaxNode) at the given position.
      /// If `side` is -1, this will move into nodes that end at the
      /// position. If 1, it'll move into nodes that start at the
      /// position. With 0, it'll only enter nodes that cover the position
      /// from both sides.
      resolve(pos, side = 0) {
        let node = resolveNode(CachedNode.get(this) || this.topNode, pos, side, false);
        CachedNode.set(this, node);
        return node;
      }
      /// Like [`resolve`](#common.Tree.resolve), but will enter
      /// [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
      /// pointing into the innermost overlaid tree at the given position
      /// (with parent links going through all parent structure, including
      /// the host trees).
      resolveInner(pos, side = 0) {
        let node = resolveNode(CachedInnerNode.get(this) || this.topNode, pos, side, true);
        CachedInnerNode.set(this, node);
        return node;
      }
      /// Iterate over the tree and its children, calling `enter` for any
      /// node that touches the `from`/`to` region (if given) before
      /// running over such a node's children, and `leave` (if given) when
      /// leaving the node. When `enter` returns `false`, that node will
      /// not have its children iterated over (or `leave` called).
      iterate(spec) {
        let { enter, leave, from = 0, to = this.length } = spec;
        for (let c = this.cursor(), get = () => c.node; ; ) {
          let mustLeave = false;
          if (c.from <= to && c.to >= from && (c.type.isAnonymous || enter(c.type, c.from, c.to, get) !== false)) {
            if (c.firstChild())
              continue;
            if (!c.type.isAnonymous)
              mustLeave = true;
          }
          for (; ; ) {
            if (mustLeave && leave)
              leave(c.type, c.from, c.to, get);
            mustLeave = c.type.isAnonymous;
            if (c.nextSibling())
              break;
            if (!c.parent())
              return;
            mustLeave = true;
          }
        }
      }
      /// Get the value of the given [node prop](#common.NodeProp) for this
      /// node. Works with both per-node and per-type props.
      prop(prop) {
        return !prop.perNode ? this.type.prop(prop) : this.props ? this.props[prop.id] : void 0;
      }
      /// Returns the node's [per-node props](#common.NodeProp.perNode) in a
      /// format that can be passed to the [`Tree`](#common.Tree)
      /// constructor.
      get propValues() {
        let result = [];
        if (this.props)
          for (let id in this.props)
            result.push([+id, this.props[id]]);
        return result;
      }
      /// Balance the direct children of this tree, producing a copy of
      /// which may have children grouped into subtrees with type
      /// [`NodeType.none`](#common.NodeType^none).
      balance(config = {}) {
        return this.children.length <= 8 ? this : balanceRange(NodeType.none, this.children, this.positions, 0, this.children.length, 0, this.length, (children, positions, length) => new _Tree(this.type, children, positions, length, this.propValues), config.makeTree || ((children, positions, length) => new _Tree(NodeType.none, children, positions, length)));
      }
      /// Build a tree from a postfix-ordered buffer of node information,
      /// or a cursor over such a buffer.
      static build(data) {
        return buildTree(data);
      }
    };
    Tree.empty = new Tree(NodeType.none, [], [], 0);
    var FlatBufferCursor = class _FlatBufferCursor {
      constructor(buffer, index) {
        this.buffer = buffer;
        this.index = index;
      }
      get id() {
        return this.buffer[this.index - 4];
      }
      get start() {
        return this.buffer[this.index - 3];
      }
      get end() {
        return this.buffer[this.index - 2];
      }
      get size() {
        return this.buffer[this.index - 1];
      }
      get pos() {
        return this.index;
      }
      next() {
        this.index -= 4;
      }
      fork() {
        return new _FlatBufferCursor(this.buffer, this.index);
      }
    };
    var TreeBuffer = class _TreeBuffer {
      /// Create a tree buffer.
      constructor(buffer, length, set) {
        this.buffer = buffer;
        this.length = length;
        this.set = set;
      }
      /// @internal
      get type() {
        return NodeType.none;
      }
      /// @internal
      toString() {
        let result = [];
        for (let index = 0; index < this.buffer.length; ) {
          result.push(this.childString(index));
          index = this.buffer[index + 3];
        }
        return result.join(",");
      }
      /// @internal
      childString(index) {
        let id = this.buffer[index], endIndex = this.buffer[index + 3];
        let type = this.set.types[id], result = type.name;
        if (/\W/.test(result) && !type.isError)
          result = JSON.stringify(result);
        index += 4;
        if (endIndex == index)
          return result;
        let children = [];
        while (index < endIndex) {
          children.push(this.childString(index));
          index = this.buffer[index + 3];
        }
        return result + "(" + children.join(",") + ")";
      }
      /// @internal
      findChild(startIndex, endIndex, dir, pos, side) {
        let { buffer } = this, pick = -1;
        for (let i = startIndex; i != endIndex; i = buffer[i + 3]) {
          if (checkSide(side, pos, buffer[i + 1], buffer[i + 2])) {
            pick = i;
            if (dir > 0)
              break;
          }
        }
        return pick;
      }
      /// @internal
      slice(startI, endI, from, to) {
        let b = this.buffer;
        let copy = new Uint16Array(endI - startI);
        for (let i = startI, j = 0; i < endI; ) {
          copy[j++] = b[i++];
          copy[j++] = b[i++] - from;
          copy[j++] = b[i++] - from;
          copy[j++] = b[i++] - startI;
        }
        return new _TreeBuffer(copy, to - from, this.set);
      }
    };
    function checkSide(side, pos, from, to) {
      switch (side) {
        case -2:
          return from < pos;
        case -1:
          return to >= pos && from < pos;
        case 0:
          return from < pos && to > pos;
        case 1:
          return from <= pos && to > pos;
        case 2:
          return to > pos;
        case 4:
          return true;
      }
    }
    function enterUnfinishedNodesBefore(node, pos) {
      let scan = node.childBefore(pos);
      while (scan) {
        let last = scan.lastChild;
        if (!last || last.to != scan.to)
          break;
        if (last.type.isError && last.from == last.to) {
          node = scan;
          scan = last.prevSibling;
        } else {
          scan = last;
        }
      }
      return node;
    }
    function resolveNode(node, pos, side, overlays) {
      var _a;
      while (node.from == node.to || (side < 1 ? node.from >= pos : node.from > pos) || (side > -1 ? node.to <= pos : node.to < pos)) {
        let parent = !overlays && node instanceof TreeNode && node.index < 0 ? null : node.parent;
        if (!parent)
          return node;
        node = parent;
      }
      if (overlays)
        for (let scan = node, parent = scan.parent; parent; scan = parent, parent = scan.parent) {
          if (scan instanceof TreeNode && scan.index < 0 && ((_a = parent.enter(pos, side, true)) === null || _a === void 0 ? void 0 : _a.from) != scan.from)
            node = parent;
        }
      for (; ; ) {
        let inner = node.enter(pos, side, overlays);
        if (!inner)
          return node;
        node = inner;
      }
    }
    var TreeNode = class _TreeNode {
      constructor(node, _from, index, _parent) {
        this.node = node;
        this._from = _from;
        this.index = index;
        this._parent = _parent;
      }
      get type() {
        return this.node.type;
      }
      get name() {
        return this.node.type.name;
      }
      get from() {
        return this._from;
      }
      get to() {
        return this._from + this.node.length;
      }
      nextChild(i, dir, pos, side, mode = 0) {
        for (let parent = this; ; ) {
          for (let { children, positions } = parent.node, e = dir > 0 ? children.length : -1; i != e; i += dir) {
            let next = children[i], start = positions[i] + parent._from;
            if (!checkSide(side, pos, start, start + next.length))
              continue;
            if (next instanceof TreeBuffer) {
              if (mode & 2)
                continue;
              let index = next.findChild(0, next.buffer.length, dir, pos - start, side);
              if (index > -1)
                return new BufferNode(new BufferContext(parent, next, i, start), null, index);
            } else if (mode & 1 || (!next.type.isAnonymous || hasChild(next))) {
              let mounted;
              if (!(mode & 1) && next.props && (mounted = next.prop(NodeProp.mounted)) && !mounted.overlay)
                return new _TreeNode(mounted.tree, start, i, parent);
              let inner = new _TreeNode(next, start, i, parent);
              return mode & 1 || !inner.type.isAnonymous ? inner : inner.nextChild(dir < 0 ? next.children.length - 1 : 0, dir, pos, side);
            }
          }
          if (mode & 1 || !parent.type.isAnonymous)
            return null;
          if (parent.index >= 0)
            i = parent.index + dir;
          else
            i = dir < 0 ? -1 : parent._parent.node.children.length;
          parent = parent._parent;
          if (!parent)
            return null;
        }
      }
      get firstChild() {
        return this.nextChild(
          0,
          1,
          0,
          4
          /* DontCare */
        );
      }
      get lastChild() {
        return this.nextChild(
          this.node.children.length - 1,
          -1,
          0,
          4
          /* DontCare */
        );
      }
      childAfter(pos) {
        return this.nextChild(
          0,
          1,
          pos,
          2
          /* After */
        );
      }
      childBefore(pos) {
        return this.nextChild(
          this.node.children.length - 1,
          -1,
          pos,
          -2
          /* Before */
        );
      }
      enter(pos, side, overlays = true, buffers = true) {
        let mounted;
        if (overlays && (mounted = this.node.prop(NodeProp.mounted)) && mounted.overlay) {
          let rPos = pos - this.from;
          for (let { from, to } of mounted.overlay) {
            if ((side > 0 ? from <= rPos : from < rPos) && (side < 0 ? to >= rPos : to > rPos))
              return new _TreeNode(mounted.tree, mounted.overlay[0].from + this.from, -1, this);
          }
        }
        return this.nextChild(
          0,
          1,
          pos,
          side,
          buffers ? 0 : 2
          /* NoEnterBuffer */
        );
      }
      nextSignificantParent() {
        let val = this;
        while (val.type.isAnonymous && val._parent)
          val = val._parent;
        return val;
      }
      get parent() {
        return this._parent ? this._parent.nextSignificantParent() : null;
      }
      get nextSibling() {
        return this._parent && this.index >= 0 ? this._parent.nextChild(
          this.index + 1,
          1,
          0,
          4
          /* DontCare */
        ) : null;
      }
      get prevSibling() {
        return this._parent && this.index >= 0 ? this._parent.nextChild(
          this.index - 1,
          -1,
          0,
          4
          /* DontCare */
        ) : null;
      }
      get cursor() {
        return new TreeCursor(this);
      }
      get tree() {
        return this.node;
      }
      toTree() {
        return this.node;
      }
      resolve(pos, side = 0) {
        return resolveNode(this, pos, side, false);
      }
      resolveInner(pos, side = 0) {
        return resolveNode(this, pos, side, true);
      }
      enterUnfinishedNodesBefore(pos) {
        return enterUnfinishedNodesBefore(this, pos);
      }
      getChild(type, before = null, after = null) {
        let r = getChildren(this, type, before, after);
        return r.length ? r[0] : null;
      }
      getChildren(type, before = null, after = null) {
        return getChildren(this, type, before, after);
      }
      /// @internal
      toString() {
        return this.node.toString();
      }
    };
    function getChildren(node, type, before, after) {
      let cur = node.cursor, result = [];
      if (!cur.firstChild())
        return result;
      if (before != null) {
        while (!cur.type.is(before))
          if (!cur.nextSibling())
            return result;
      }
      for (; ; ) {
        if (after != null && cur.type.is(after))
          return result;
        if (cur.type.is(type))
          result.push(cur.node);
        if (!cur.nextSibling())
          return after == null ? result : [];
      }
    }
    var BufferContext = class {
      constructor(parent, buffer, index, start) {
        this.parent = parent;
        this.buffer = buffer;
        this.index = index;
        this.start = start;
      }
    };
    var BufferNode = class _BufferNode {
      constructor(context, _parent, index) {
        this.context = context;
        this._parent = _parent;
        this.index = index;
        this.type = context.buffer.set.types[context.buffer.buffer[index]];
      }
      get name() {
        return this.type.name;
      }
      get from() {
        return this.context.start + this.context.buffer.buffer[this.index + 1];
      }
      get to() {
        return this.context.start + this.context.buffer.buffer[this.index + 2];
      }
      child(dir, pos, side) {
        let { buffer } = this.context;
        let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.context.start, side);
        return index < 0 ? null : new _BufferNode(this.context, this, index);
      }
      get firstChild() {
        return this.child(
          1,
          0,
          4
          /* DontCare */
        );
      }
      get lastChild() {
        return this.child(
          -1,
          0,
          4
          /* DontCare */
        );
      }
      childAfter(pos) {
        return this.child(
          1,
          pos,
          2
          /* After */
        );
      }
      childBefore(pos) {
        return this.child(
          -1,
          pos,
          -2
          /* Before */
        );
      }
      enter(pos, side, overlays, buffers = true) {
        if (!buffers)
          return null;
        let { buffer } = this.context;
        let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], side > 0 ? 1 : -1, pos - this.context.start, side);
        return index < 0 ? null : new _BufferNode(this.context, this, index);
      }
      get parent() {
        return this._parent || this.context.parent.nextSignificantParent();
      }
      externalSibling(dir) {
        return this._parent ? null : this.context.parent.nextChild(
          this.context.index + dir,
          dir,
          0,
          4
          /* DontCare */
        );
      }
      get nextSibling() {
        let { buffer } = this.context;
        let after = buffer.buffer[this.index + 3];
        if (after < (this._parent ? buffer.buffer[this._parent.index + 3] : buffer.buffer.length))
          return new _BufferNode(this.context, this._parent, after);
        return this.externalSibling(1);
      }
      get prevSibling() {
        let { buffer } = this.context;
        let parentStart = this._parent ? this._parent.index + 4 : 0;
        if (this.index == parentStart)
          return this.externalSibling(-1);
        return new _BufferNode(this.context, this._parent, buffer.findChild(
          parentStart,
          this.index,
          -1,
          0,
          4
          /* DontCare */
        ));
      }
      get cursor() {
        return new TreeCursor(this);
      }
      get tree() {
        return null;
      }
      toTree() {
        let children = [], positions = [];
        let { buffer } = this.context;
        let startI = this.index + 4, endI = buffer.buffer[this.index + 3];
        if (endI > startI) {
          let from = buffer.buffer[this.index + 1], to = buffer.buffer[this.index + 2];
          children.push(buffer.slice(startI, endI, from, to));
          positions.push(0);
        }
        return new Tree(this.type, children, positions, this.to - this.from);
      }
      resolve(pos, side = 0) {
        return resolveNode(this, pos, side, false);
      }
      resolveInner(pos, side = 0) {
        return resolveNode(this, pos, side, true);
      }
      enterUnfinishedNodesBefore(pos) {
        return enterUnfinishedNodesBefore(this, pos);
      }
      /// @internal
      toString() {
        return this.context.buffer.childString(this.index);
      }
      getChild(type, before = null, after = null) {
        let r = getChildren(this, type, before, after);
        return r.length ? r[0] : null;
      }
      getChildren(type, before = null, after = null) {
        return getChildren(this, type, before, after);
      }
    };
    var TreeCursor = class {
      /// @internal
      constructor(node, mode = 0) {
        this.mode = mode;
        this.buffer = null;
        this.stack = [];
        this.index = 0;
        this.bufferNode = null;
        if (node instanceof TreeNode) {
          this.yieldNode(node);
        } else {
          this._tree = node.context.parent;
          this.buffer = node.context;
          for (let n = node._parent; n; n = n._parent)
            this.stack.unshift(n.index);
          this.bufferNode = node;
          this.yieldBuf(node.index);
        }
      }
      /// Shorthand for `.type.name`.
      get name() {
        return this.type.name;
      }
      yieldNode(node) {
        if (!node)
          return false;
        this._tree = node;
        this.type = node.type;
        this.from = node.from;
        this.to = node.to;
        return true;
      }
      yieldBuf(index, type) {
        this.index = index;
        let { start, buffer } = this.buffer;
        this.type = type || buffer.set.types[buffer.buffer[index]];
        this.from = start + buffer.buffer[index + 1];
        this.to = start + buffer.buffer[index + 2];
        return true;
      }
      yield(node) {
        if (!node)
          return false;
        if (node instanceof TreeNode) {
          this.buffer = null;
          return this.yieldNode(node);
        }
        this.buffer = node.context;
        return this.yieldBuf(node.index, node.type);
      }
      /// @internal
      toString() {
        return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
      }
      /// @internal
      enterChild(dir, pos, side) {
        if (!this.buffer)
          return this.yield(this._tree.nextChild(dir < 0 ? this._tree.node.children.length - 1 : 0, dir, pos, side, this.mode));
        let { buffer } = this.buffer;
        let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.buffer.start, side);
        if (index < 0)
          return false;
        this.stack.push(this.index);
        return this.yieldBuf(index);
      }
      /// Move the cursor to this node's first child. When this returns
      /// false, the node has no child, and the cursor has not been moved.
      firstChild() {
        return this.enterChild(
          1,
          0,
          4
          /* DontCare */
        );
      }
      /// Move the cursor to this node's last child.
      lastChild() {
        return this.enterChild(
          -1,
          0,
          4
          /* DontCare */
        );
      }
      /// Move the cursor to the first child that ends after `pos`.
      childAfter(pos) {
        return this.enterChild(
          1,
          pos,
          2
          /* After */
        );
      }
      /// Move to the last child that starts before `pos`.
      childBefore(pos) {
        return this.enterChild(
          -1,
          pos,
          -2
          /* Before */
        );
      }
      /// Move the cursor to the child around `pos`. If side is -1 the
      /// child may end at that position, when 1 it may start there. This
      /// will also enter [overlaid](#common.MountedTree.overlay)
      /// [mounted](#common.NodeProp^mounted) trees unless `overlays` is
      /// set to false.
      enter(pos, side, overlays = true, buffers = true) {
        if (!this.buffer)
          return this.yield(this._tree.enter(pos, side, overlays && !(this.mode & 1), buffers));
        return buffers ? this.enterChild(1, pos, side) : false;
      }
      /// Move to the node's parent node, if this isn't the top node.
      parent() {
        if (!this.buffer)
          return this.yieldNode(this.mode & 1 ? this._tree._parent : this._tree.parent);
        if (this.stack.length)
          return this.yieldBuf(this.stack.pop());
        let parent = this.mode & 1 ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
        this.buffer = null;
        return this.yieldNode(parent);
      }
      /// @internal
      sibling(dir) {
        if (!this.buffer)
          return !this._tree._parent ? false : this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + dir, dir, 0, 4, this.mode));
        let { buffer } = this.buffer, d = this.stack.length - 1;
        if (dir < 0) {
          let parentStart = d < 0 ? 0 : this.stack[d] + 4;
          if (this.index != parentStart)
            return this.yieldBuf(buffer.findChild(
              parentStart,
              this.index,
              -1,
              0,
              4
              /* DontCare */
            ));
        } else {
          let after = buffer.buffer[this.index + 3];
          if (after < (d < 0 ? buffer.buffer.length : buffer.buffer[this.stack[d] + 3]))
            return this.yieldBuf(after);
        }
        return d < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + dir, dir, 0, 4, this.mode)) : false;
      }
      /// Move to this node's next sibling, if any.
      nextSibling() {
        return this.sibling(1);
      }
      /// Move to this node's previous sibling, if any.
      prevSibling() {
        return this.sibling(-1);
      }
      atLastNode(dir) {
        let index, parent, { buffer } = this;
        if (buffer) {
          if (dir > 0) {
            if (this.index < buffer.buffer.buffer.length)
              return false;
          } else {
            for (let i = 0; i < this.index; i++)
              if (buffer.buffer.buffer[i + 3] < this.index)
                return false;
          }
          ({ index, parent } = buffer);
        } else {
          ({ index, _parent: parent } = this._tree);
        }
        for (; parent; { index, _parent: parent } = parent) {
          if (index > -1)
            for (let i = index + dir, e = dir < 0 ? -1 : parent.node.children.length; i != e; i += dir) {
              let child = parent.node.children[i];
              if (this.mode & 1 || child instanceof TreeBuffer || !child.type.isAnonymous || hasChild(child))
                return false;
            }
        }
        return true;
      }
      move(dir, enter) {
        if (enter && this.enterChild(
          dir,
          0,
          4
          /* DontCare */
        ))
          return true;
        for (; ; ) {
          if (this.sibling(dir))
            return true;
          if (this.atLastNode(dir) || !this.parent())
            return false;
        }
      }
      /// Move to the next node in a
      /// [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR))
      /// traversal, going from a node to its first child or, if the
      /// current node is empty or `enter` is false, its next sibling or
      /// the next sibling of the first parent node that has one.
      next(enter = true) {
        return this.move(1, enter);
      }
      /// Move to the next node in a last-to-first pre-order traveral. A
      /// node is followed by its last child or, if it has none, its
      /// previous sibling or the previous sibling of the first parent
      /// node that has one.
      prev(enter = true) {
        return this.move(-1, enter);
      }
      /// Move the cursor to the innermost node that covers `pos`. If
      /// `side` is -1, it will enter nodes that end at `pos`. If it is 1,
      /// it will enter nodes that start at `pos`.
      moveTo(pos, side = 0) {
        while (this.from == this.to || (side < 1 ? this.from >= pos : this.from > pos) || (side > -1 ? this.to <= pos : this.to < pos))
          if (!this.parent())
            break;
        while (this.enterChild(1, pos, side)) {
        }
        return this;
      }
      /// Get a [syntax node](#common.SyntaxNode) at the cursor's current
      /// position.
      get node() {
        if (!this.buffer)
          return this._tree;
        let cache = this.bufferNode, result = null, depth = 0;
        if (cache && cache.context == this.buffer) {
          scan:
            for (let index = this.index, d = this.stack.length; d >= 0; ) {
              for (let c = cache; c; c = c._parent)
                if (c.index == index) {
                  if (index == this.index)
                    return c;
                  result = c;
                  depth = d + 1;
                  break scan;
                }
              index = this.stack[--d];
            }
        }
        for (let i = depth; i < this.stack.length; i++)
          result = new BufferNode(this.buffer, result, this.stack[i]);
        return this.bufferNode = new BufferNode(this.buffer, result, this.index);
      }
      /// Get the [tree](#common.Tree) that represents the current node, if
      /// any. Will return null when the node is in a [tree
      /// buffer](#common.TreeBuffer).
      get tree() {
        return this.buffer ? null : this._tree.node;
      }
    };
    function hasChild(tree) {
      return tree.children.some((ch) => ch instanceof TreeBuffer || !ch.type.isAnonymous || hasChild(ch));
    }
    function buildTree(data) {
      var _a;
      let { buffer, nodeSet, maxBufferLength = DefaultBufferLength, reused = [], minRepeatType = nodeSet.types.length } = data;
      let cursor = Array.isArray(buffer) ? new FlatBufferCursor(buffer, buffer.length) : buffer;
      let types2 = nodeSet.types;
      let contextHash = 0, lookAhead = 0;
      function takeNode(parentStart, minPos, children2, positions2, inRepeat) {
        let { id, start, end, size } = cursor;
        let lookAheadAtStart = lookAhead;
        while (size < 0) {
          cursor.next();
          if (size == -1) {
            let node2 = reused[id];
            children2.push(node2);
            positions2.push(start - parentStart);
            return;
          } else if (size == -3) {
            contextHash = id;
            return;
          } else if (size == -4) {
            lookAhead = id;
            return;
          } else {
            throw new RangeError(`Unrecognized record size: ${size}`);
          }
        }
        let type = types2[id], node, buffer2;
        let startPos = start - parentStart;
        if (end - start <= maxBufferLength && (buffer2 = findBufferSize(cursor.pos - minPos, inRepeat))) {
          let data2 = new Uint16Array(buffer2.size - buffer2.skip);
          let endPos = cursor.pos - buffer2.size, index = data2.length;
          while (cursor.pos > endPos)
            index = copyToBuffer(buffer2.start, data2, index);
          node = new TreeBuffer(data2, end - buffer2.start, nodeSet);
          startPos = buffer2.start - parentStart;
        } else {
          let endPos = cursor.pos - size;
          cursor.next();
          let localChildren = [], localPositions = [];
          let localInRepeat = id >= minRepeatType ? id : -1;
          let lastGroup = 0, lastEnd = end;
          while (cursor.pos > endPos) {
            if (localInRepeat >= 0 && cursor.id == localInRepeat && cursor.size >= 0) {
              if (cursor.end <= lastEnd - maxBufferLength) {
                makeRepeatLeaf(localChildren, localPositions, start, lastGroup, cursor.end, lastEnd, localInRepeat, lookAheadAtStart);
                lastGroup = localChildren.length;
                lastEnd = cursor.end;
              }
              cursor.next();
            } else {
              takeNode(start, endPos, localChildren, localPositions, localInRepeat);
            }
          }
          if (localInRepeat >= 0 && lastGroup > 0 && lastGroup < localChildren.length)
            makeRepeatLeaf(localChildren, localPositions, start, lastGroup, start, lastEnd, localInRepeat, lookAheadAtStart);
          localChildren.reverse();
          localPositions.reverse();
          if (localInRepeat > -1 && lastGroup > 0) {
            let make = makeBalanced(type);
            node = balanceRange(type, localChildren, localPositions, 0, localChildren.length, 0, end - start, make, make);
          } else {
            node = makeTree(type, localChildren, localPositions, end - start, lookAheadAtStart - end);
          }
        }
        children2.push(node);
        positions2.push(startPos);
      }
      function makeBalanced(type) {
        return (children2, positions2, length2) => {
          let lookAhead2 = 0, lastI = children2.length - 1, last, lookAheadProp;
          if (lastI >= 0 && (last = children2[lastI]) instanceof Tree) {
            if (!lastI && last.type == type && last.length == length2)
              return last;
            if (lookAheadProp = last.prop(NodeProp.lookAhead))
              lookAhead2 = positions2[lastI] + last.length + lookAheadProp;
          }
          return makeTree(type, children2, positions2, length2, lookAhead2);
        };
      }
      function makeRepeatLeaf(children2, positions2, base, i, from, to, type, lookAhead2) {
        let localChildren = [], localPositions = [];
        while (children2.length > i) {
          localChildren.push(children2.pop());
          localPositions.push(positions2.pop() + base - from);
        }
        children2.push(makeTree(nodeSet.types[type], localChildren, localPositions, to - from, lookAhead2 - to));
        positions2.push(from - base);
      }
      function makeTree(type, children2, positions2, length2, lookAhead2 = 0, props) {
        if (contextHash) {
          let pair = [NodeProp.contextHash, contextHash];
          props = props ? [pair].concat(props) : [pair];
        }
        if (lookAhead2 > 25) {
          let pair = [NodeProp.lookAhead, lookAhead2];
          props = props ? [pair].concat(props) : [pair];
        }
        return new Tree(type, children2, positions2, length2, props);
      }
      function findBufferSize(maxSize, inRepeat) {
        let fork = cursor.fork();
        let size = 0, start = 0, skip = 0, minStart = fork.end - maxBufferLength;
        let result = { size: 0, start: 0, skip: 0 };
        scan:
          for (let minPos = fork.pos - maxSize; fork.pos > minPos; ) {
            let nodeSize2 = fork.size;
            if (fork.id == inRepeat && nodeSize2 >= 0) {
              result.size = size;
              result.start = start;
              result.skip = skip;
              skip += 4;
              size += 4;
              fork.next();
              continue;
            }
            let startPos = fork.pos - nodeSize2;
            if (nodeSize2 < 0 || startPos < minPos || fork.start < minStart)
              break;
            let localSkipped = fork.id >= minRepeatType ? 4 : 0;
            let nodeStart = fork.start;
            fork.next();
            while (fork.pos > startPos) {
              if (fork.size < 0) {
                if (fork.size == -3)
                  localSkipped += 4;
                else
                  break scan;
              } else if (fork.id >= minRepeatType) {
                localSkipped += 4;
              }
              fork.next();
            }
            start = nodeStart;
            size += nodeSize2;
            skip += localSkipped;
          }
        if (inRepeat < 0 || size == maxSize) {
          result.size = size;
          result.start = start;
          result.skip = skip;
        }
        return result.size > 4 ? result : void 0;
      }
      function copyToBuffer(bufferStart, buffer2, index) {
        let { id, start, end, size } = cursor;
        cursor.next();
        if (size >= 0 && id < minRepeatType) {
          let startIndex = index;
          if (size > 4) {
            let endPos = cursor.pos - (size - 4);
            while (cursor.pos > endPos)
              index = copyToBuffer(bufferStart, buffer2, index);
          }
          buffer2[--index] = startIndex;
          buffer2[--index] = end - bufferStart;
          buffer2[--index] = start - bufferStart;
          buffer2[--index] = id;
        } else if (size == -3) {
          contextHash = id;
        } else if (size == -4) {
          lookAhead = id;
        }
        return index;
      }
      let children = [], positions = [];
      while (cursor.pos > 0)
        takeNode(data.start || 0, data.bufferStart || 0, children, positions, -1);
      let length = (_a = data.length) !== null && _a !== void 0 ? _a : children.length ? positions[0] + children[0].length : 0;
      return new Tree(types2[data.topID], children.reverse(), positions.reverse(), length);
    }
    var nodeSizeCache = /* @__PURE__ */ new WeakMap();
    function nodeSize(balanceType, node) {
      if (!balanceType.isAnonymous || node instanceof TreeBuffer || node.type != balanceType)
        return 1;
      let size = nodeSizeCache.get(node);
      if (size == null) {
        size = 1;
        for (let child of node.children) {
          if (child.type != balanceType || !(child instanceof Tree)) {
            size = 1;
            break;
          }
          size += nodeSize(balanceType, child);
        }
        nodeSizeCache.set(node, size);
      }
      return size;
    }
    function balanceRange(balanceType, children, positions, from, to, start, length, mkTop, mkTree) {
      let total = 0;
      for (let i = from; i < to; i++)
        total += nodeSize(balanceType, children[i]);
      let maxChild = Math.ceil(
        total * 1.5 / 8
        /* BranchFactor */
      );
      let localChildren = [], localPositions = [];
      function divide(children2, positions2, from2, to2, offset) {
        for (let i = from2; i < to2; ) {
          let groupFrom = i, groupStart = positions2[i], groupSize = nodeSize(balanceType, children2[i]);
          i++;
          for (; i < to2; i++) {
            let nextSize = nodeSize(balanceType, children2[i]);
            if (groupSize + nextSize >= maxChild)
              break;
            groupSize += nextSize;
          }
          if (i == groupFrom + 1) {
            if (groupSize > maxChild) {
              let only = children2[groupFrom];
              divide(only.children, only.positions, 0, only.children.length, positions2[groupFrom] + offset);
              continue;
            }
            localChildren.push(children2[groupFrom]);
          } else {
            let length2 = positions2[i - 1] + children2[i - 1].length - groupStart;
            localChildren.push(balanceRange(balanceType, children2, positions2, groupFrom, i, groupStart, length2, null, mkTree));
          }
          localPositions.push(groupStart + offset - start);
        }
      }
      divide(children, positions, from, to, 0);
      return (mkTop || mkTree)(localChildren, localPositions, length);
    }
    var TreeFragment = class _TreeFragment {
      /// Construct a tree fragment.
      constructor(from, to, tree, offset, openStart = false, openEnd = false) {
        this.from = from;
        this.to = to;
        this.tree = tree;
        this.offset = offset;
        this.open = (openStart ? 1 : 0) | (openEnd ? 2 : 0);
      }
      /// Whether the start of the fragment represents the start of a
      /// parse, or the end of a change. (In the second case, it may not
      /// be safe to reuse some nodes at the start, depending on the
      /// parsing algorithm.)
      get openStart() {
        return (this.open & 1) > 0;
      }
      /// Whether the end of the fragment represents the end of a
      /// full-document parse, or the start of a change.
      get openEnd() {
        return (this.open & 2) > 0;
      }
      /// Create a set of fragments from a freshly parsed tree, or update
      /// an existing set of fragments by replacing the ones that overlap
      /// with a tree with content from the new tree. When `partial` is
      /// true, the parse is treated as incomplete, and the resulting
      /// fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
      /// true.
      static addTree(tree, fragments = [], partial = false) {
        let result = [new _TreeFragment(0, tree.length, tree, 0, false, partial)];
        for (let f of fragments)
          if (f.to > tree.length)
            result.push(f);
        return result;
      }
      /// Apply a set of edits to an array of fragments, removing or
      /// splitting fragments as necessary to remove edited ranges, and
      /// adjusting offsets for fragments that moved.
      static applyChanges(fragments, changes, minGap = 128) {
        if (!changes.length)
          return fragments;
        let result = [];
        let fI = 1, nextF = fragments.length ? fragments[0] : null;
        for (let cI = 0, pos = 0, off = 0; ; cI++) {
          let nextC = cI < changes.length ? changes[cI] : null;
          let nextPos = nextC ? nextC.fromA : 1e9;
          if (nextPos - pos >= minGap)
            while (nextF && nextF.from < nextPos) {
              let cut = nextF;
              if (pos >= cut.from || nextPos <= cut.to || off) {
                let fFrom = Math.max(cut.from, pos) - off, fTo = Math.min(cut.to, nextPos) - off;
                cut = fFrom >= fTo ? null : new _TreeFragment(fFrom, fTo, cut.tree, cut.offset + off, cI > 0, !!nextC);
              }
              if (cut)
                result.push(cut);
              if (nextF.to > nextPos)
                break;
              nextF = fI < fragments.length ? fragments[fI++] : null;
            }
          if (!nextC)
            break;
          pos = nextC.toA;
          off = nextC.toA - nextC.toB;
        }
        return result;
      }
    };
    var Parser = class {
      /// Start a parse, returning a [partial parse](#common.PartialParse)
      /// object. [`fragments`](#common.TreeFragment) can be passed in to
      /// make the parse incremental.
      ///
      /// By default, the entire input is parsed. You can pass `ranges`,
      /// which should be a sorted array of non-empty, non-overlapping
      /// ranges, to parse only those ranges. The tree returned in that
      /// case will start at `ranges[0].from`.
      startParse(input, fragments, ranges) {
        if (typeof input == "string")
          input = new StringInput(input);
        ranges = !ranges ? [new Range(0, input.length)] : ranges.length ? ranges.map((r) => new Range(r.from, r.to)) : [new Range(0, 0)];
        return this.createParse(input, fragments || [], ranges);
      }
      /// Run a full parse, returning the resulting tree.
      parse(input, fragments, ranges) {
        let parse = this.startParse(input, fragments, ranges);
        for (; ; ) {
          let done = parse.advance();
          if (done)
            return done;
        }
      }
    };
    var StringInput = class {
      constructor(string) {
        this.string = string;
      }
      get length() {
        return this.string.length;
      }
      chunk(from) {
        return this.string.slice(from);
      }
      get lineChunks() {
        return false;
      }
      read(from, to) {
        return this.string.slice(from, to);
      }
    };
    function parseMixed(nest) {
      return (parse, input, fragments, ranges) => new MixedParse(parse, nest, input, fragments, ranges);
    }
    var InnerParse = class {
      constructor(parser, parse, overlay, target, ranges) {
        this.parser = parser;
        this.parse = parse;
        this.overlay = overlay;
        this.target = target;
        this.ranges = ranges;
      }
    };
    var ActiveOverlay = class {
      constructor(parser, predicate, mounts, index, start, target, prev) {
        this.parser = parser;
        this.predicate = predicate;
        this.mounts = mounts;
        this.index = index;
        this.start = start;
        this.target = target;
        this.prev = prev;
        this.depth = 0;
        this.ranges = [];
      }
    };
    var stoppedInner = new NodeProp({ perNode: true });
    var MixedParse = class {
      constructor(base, nest, input, fragments, ranges) {
        this.nest = nest;
        this.input = input;
        this.fragments = fragments;
        this.ranges = ranges;
        this.inner = [];
        this.innerDone = 0;
        this.baseTree = null;
        this.stoppedAt = null;
        this.baseParse = base;
      }
      advance() {
        if (this.baseParse) {
          let done2 = this.baseParse.advance();
          if (!done2)
            return null;
          this.baseParse = null;
          this.baseTree = done2;
          this.startInner();
          if (this.stoppedAt != null)
            for (let inner2 of this.inner)
              inner2.parse.stopAt(this.stoppedAt);
        }
        if (this.innerDone == this.inner.length) {
          let result = this.baseTree;
          if (this.stoppedAt != null)
            result = new Tree(result.type, result.children, result.positions, result.length, result.propValues.concat([[stoppedInner, this.stoppedAt]]));
          return result;
        }
        let inner = this.inner[this.innerDone], done = inner.parse.advance();
        if (done) {
          this.innerDone++;
          let props = Object.assign(/* @__PURE__ */ Object.create(null), inner.target.props);
          props[NodeProp.mounted.id] = new MountedTree(done, inner.overlay, inner.parser);
          inner.target.props = props;
        }
        return null;
      }
      get parsedPos() {
        if (this.baseParse)
          return 0;
        let pos = this.input.length;
        for (let i = this.innerDone; i < this.inner.length; i++) {
          if (this.inner[i].ranges[0].from < pos)
            pos = Math.min(pos, this.inner[i].parse.parsedPos);
        }
        return pos;
      }
      stopAt(pos) {
        this.stoppedAt = pos;
        if (this.baseParse)
          this.baseParse.stopAt(pos);
        else
          for (let i = this.innerDone; i < this.inner.length; i++)
            this.inner[i].parse.stopAt(pos);
      }
      startInner() {
        let fragmentCursor = new FragmentCursor(this.fragments);
        let overlay = null;
        let covered = null;
        let cursor = new TreeCursor(
          new TreeNode(this.baseTree, this.ranges[0].from, 0, null),
          1
          /* Full */
        );
        scan:
          for (let nest, isCovered; this.stoppedAt == null || cursor.from < this.stoppedAt; ) {
            let enter = true, range;
            if (fragmentCursor.hasNode(cursor)) {
              if (overlay) {
                let match2 = overlay.mounts.find((m) => m.frag.from <= cursor.from && m.frag.to >= cursor.to && m.mount.overlay);
                if (match2)
                  for (let r of match2.mount.overlay) {
                    let from = r.from + match2.pos, to = r.to + match2.pos;
                    if (from >= cursor.from && to <= cursor.to && !overlay.ranges.some((r2) => r2.from < to && r2.to > from))
                      overlay.ranges.push({ from, to });
                  }
              }
              enter = false;
            } else if (covered && (isCovered = checkCover(covered.ranges, cursor.from, cursor.to))) {
              enter = isCovered != 2;
            } else if (!cursor.type.isAnonymous && cursor.from < cursor.to && (nest = this.nest(cursor, this.input))) {
              if (!cursor.tree)
                materialize(cursor);
              let oldMounts = fragmentCursor.findMounts(cursor.from, nest.parser);
              if (typeof nest.overlay == "function") {
                overlay = new ActiveOverlay(nest.parser, nest.overlay, oldMounts, this.inner.length, cursor.from, cursor.tree, overlay);
              } else {
                let ranges = punchRanges(this.ranges, nest.overlay || [new Range(cursor.from, cursor.to)]);
                if (ranges.length)
                  this.inner.push(new InnerParse(nest.parser, nest.parser.startParse(this.input, enterFragments(oldMounts, ranges), ranges), nest.overlay ? nest.overlay.map((r) => new Range(r.from - cursor.from, r.to - cursor.from)) : null, cursor.tree, ranges));
                if (!nest.overlay)
                  enter = false;
                else if (ranges.length)
                  covered = { ranges, depth: 0, prev: covered };
              }
            } else if (overlay && (range = overlay.predicate(cursor))) {
              if (range === true)
                range = new Range(cursor.from, cursor.to);
              if (range.from < range.to)
                overlay.ranges.push(range);
            }
            if (enter && cursor.firstChild()) {
              if (overlay)
                overlay.depth++;
              if (covered)
                covered.depth++;
            } else {
              for (; ; ) {
                if (cursor.nextSibling())
                  break;
                if (!cursor.parent())
                  break scan;
                if (overlay && !--overlay.depth) {
                  let ranges = punchRanges(this.ranges, overlay.ranges);
                  if (ranges.length)
                    this.inner.splice(overlay.index, 0, new InnerParse(overlay.parser, overlay.parser.startParse(this.input, enterFragments(overlay.mounts, ranges), ranges), overlay.ranges.map((r) => new Range(r.from - overlay.start, r.to - overlay.start)), overlay.target, ranges));
                  overlay = overlay.prev;
                }
                if (covered && !--covered.depth)
                  covered = covered.prev;
              }
            }
          }
      }
    };
    function checkCover(covered, from, to) {
      for (let range of covered) {
        if (range.from >= to)
          break;
        if (range.to > from)
          return range.from <= from && range.to >= to ? 2 : 1;
      }
      return 0;
    }
    function sliceBuf(buf, startI, endI, nodes, positions, off) {
      if (startI < endI) {
        let from = buf.buffer[startI + 1], to = buf.buffer[endI - 2];
        nodes.push(buf.slice(startI, endI, from, to));
        positions.push(from - off);
      }
    }
    function materialize(cursor) {
      let { node } = cursor, depth = 0;
      do {
        cursor.parent();
        depth++;
      } while (!cursor.tree);
      let i = 0, base = cursor.tree, off = 0;
      for (; ; i++) {
        off = base.positions[i] + cursor.from;
        if (off <= node.from && off + base.children[i].length >= node.to)
          break;
      }
      let buf = base.children[i], b = buf.buffer;
      function split(startI, endI, type, innerOffset, length) {
        let i2 = startI;
        while (b[i2 + 2] + off <= node.from)
          i2 = b[i2 + 3];
        let children = [], positions = [];
        sliceBuf(buf, startI, i2, children, positions, innerOffset);
        let from = b[i2 + 1], to = b[i2 + 2];
        let isTarget = from + off == node.from && to + off == node.to && b[i2] == node.type.id;
        children.push(isTarget ? node.toTree() : split(i2 + 4, b[i2 + 3], buf.set.types[b[i2]], from, to - from));
        positions.push(from - innerOffset);
        sliceBuf(buf, b[i2 + 3], endI, children, positions, innerOffset);
        return new Tree(type, children, positions, length);
      }
      base.children[i] = split(0, b.length, NodeType.none, 0, buf.length);
      for (let d = 0; d <= depth; d++)
        cursor.childAfter(node.from);
    }
    var StructureCursor = class {
      constructor(root, offset) {
        this.offset = offset;
        this.done = false;
        this.cursor = root.fullCursor();
      }
      // Move to the first node (in pre-order) that starts at or after `pos`.
      moveTo(pos) {
        let { cursor } = this, p = pos - this.offset;
        while (!this.done && cursor.from < p) {
          if (cursor.to >= pos && cursor.enter(p, 1, false, false))
            ;
          else if (!cursor.next(false))
            this.done = true;
        }
      }
      hasNode(cursor) {
        this.moveTo(cursor.from);
        if (!this.done && this.cursor.from + this.offset == cursor.from && this.cursor.tree) {
          for (let tree = this.cursor.tree; ; ) {
            if (tree == cursor.tree)
              return true;
            if (tree.children.length && tree.positions[0] == 0 && tree.children[0] instanceof Tree)
              tree = tree.children[0];
            else
              break;
          }
        }
        return false;
      }
    };
    var FragmentCursor = class {
      constructor(fragments) {
        var _a;
        this.fragments = fragments;
        this.curTo = 0;
        this.fragI = 0;
        if (fragments.length) {
          let first = this.curFrag = fragments[0];
          this.curTo = (_a = first.tree.prop(stoppedInner)) !== null && _a !== void 0 ? _a : first.to;
          this.inner = new StructureCursor(first.tree, -first.offset);
        } else {
          this.curFrag = this.inner = null;
        }
      }
      hasNode(node) {
        while (this.curFrag && node.from >= this.curTo)
          this.nextFrag();
        return this.curFrag && this.curFrag.from <= node.from && this.curTo >= node.to && this.inner.hasNode(node);
      }
      nextFrag() {
        var _a;
        this.fragI++;
        if (this.fragI == this.fragments.length) {
          this.curFrag = this.inner = null;
        } else {
          let frag = this.curFrag = this.fragments[this.fragI];
          this.curTo = (_a = frag.tree.prop(stoppedInner)) !== null && _a !== void 0 ? _a : frag.to;
          this.inner = new StructureCursor(frag.tree, -frag.offset);
        }
      }
      findMounts(pos, parser) {
        var _a;
        let result = [];
        if (this.inner) {
          this.inner.cursor.moveTo(pos, 1);
          for (let pos2 = this.inner.cursor.node; pos2; pos2 = pos2.parent) {
            let mount = (_a = pos2.tree) === null || _a === void 0 ? void 0 : _a.prop(NodeProp.mounted);
            if (mount && mount.parser == parser) {
              for (let i = this.fragI; i < this.fragments.length; i++) {
                let frag = this.fragments[i];
                if (frag.from >= pos2.to)
                  break;
                if (frag.tree == this.curFrag.tree)
                  result.push({
                    frag,
                    pos: pos2.from - frag.offset,
                    mount
                  });
              }
            }
          }
        }
        return result;
      }
    };
    function punchRanges(outer, ranges) {
      let copy = null, current = ranges;
      for (let i = 1, j = 0; i < outer.length; i++) {
        let gapFrom = outer[i - 1].to, gapTo = outer[i].from;
        for (; j < current.length; j++) {
          let r = current[j];
          if (r.from >= gapTo)
            break;
          if (r.to <= gapFrom)
            continue;
          if (!copy)
            current = copy = ranges.slice();
          if (r.from < gapFrom) {
            copy[j] = new Range(r.from, gapFrom);
            if (r.to > gapTo)
              copy.splice(j + 1, 0, new Range(gapTo, r.to));
          } else if (r.to > gapTo) {
            copy[j--] = new Range(gapTo, r.to);
          } else {
            copy.splice(j--, 1);
          }
        }
      }
      return current;
    }
    function findCoverChanges(a, b, from, to) {
      let iA = 0, iB = 0, inA = false, inB = false, pos = -1e9;
      let result = [];
      for (; ; ) {
        let nextA = iA == a.length ? 1e9 : inA ? a[iA].to : a[iA].from;
        let nextB = iB == b.length ? 1e9 : inB ? b[iB].to : b[iB].from;
        if (inA != inB) {
          let start = Math.max(pos, from), end = Math.min(nextA, nextB, to);
          if (start < end)
            result.push(new Range(start, end));
        }
        pos = Math.min(nextA, nextB);
        if (pos == 1e9)
          break;
        if (nextA == pos) {
          if (!inA)
            inA = true;
          else {
            inA = false;
            iA++;
          }
        }
        if (nextB == pos) {
          if (!inB)
            inB = true;
          else {
            inB = false;
            iB++;
          }
        }
      }
      return result;
    }
    function enterFragments(mounts, ranges) {
      let result = [];
      for (let { pos, mount, frag } of mounts) {
        let startPos = pos + (mount.overlay ? mount.overlay[0].from : 0), endPos = startPos + mount.tree.length;
        let from = Math.max(frag.from, startPos), to = Math.min(frag.to, endPos);
        if (mount.overlay) {
          let overlay = mount.overlay.map((r) => new Range(r.from + pos, r.to + pos));
          let changes = findCoverChanges(ranges, overlay, from, to);
          for (let i = 0, pos2 = from; ; i++) {
            let last = i == changes.length, end = last ? to : changes[i].from;
            if (end > pos2)
              result.push(new TreeFragment(pos2, end, mount.tree, -startPos, frag.from >= pos2, frag.to <= end));
            if (last)
              break;
            pos2 = changes[i].to;
          }
        } else {
          result.push(new TreeFragment(from, to, mount.tree, -startPos, frag.from >= startPos, frag.to <= endPos));
        }
      }
      return result;
    }
    exports.DefaultBufferLength = DefaultBufferLength;
    exports.MountedTree = MountedTree;
    exports.NodeProp = NodeProp;
    exports.NodeSet = NodeSet;
    exports.NodeType = NodeType;
    exports.Parser = Parser;
    exports.Tree = Tree;
    exports.TreeBuffer = TreeBuffer;
    exports.TreeCursor = TreeCursor;
    exports.TreeFragment = TreeFragment;
    exports.parseMixed = parseMixed;
  }
});

// node_modules/json5/lib/unicode.js
var require_unicode = __commonJS({
  "node_modules/json5/lib/unicode.js"(exports, module2) {
    module2.exports.Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
    module2.exports.ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
    module2.exports.ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
  }
});

// node_modules/json5/lib/util.js
var require_util = __commonJS({
  "node_modules/json5/lib/util.js"(exports, module2) {
    var unicode = require_unicode();
    module2.exports = {
      isSpaceSeparator(c) {
        return typeof c === "string" && unicode.Space_Separator.test(c);
      },
      isIdStartChar(c) {
        return typeof c === "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "$" || c === "_" || unicode.ID_Start.test(c));
      },
      isIdContinueChar(c) {
        return typeof c === "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "$" || c === "_" || c === "\u200C" || c === "\u200D" || unicode.ID_Continue.test(c));
      },
      isDigit(c) {
        return typeof c === "string" && /[0-9]/.test(c);
      },
      isHexDigit(c) {
        return typeof c === "string" && /[0-9A-Fa-f]/.test(c);
      }
    };
  }
});

// node_modules/json5/lib/parse.js
var require_parse = __commonJS({
  "node_modules/json5/lib/parse.js"(exports, module2) {
    var util = require_util();
    var source;
    var parseState;
    var stack;
    var pos;
    var line;
    var column;
    var token;
    var key;
    var root;
    module2.exports = function parse(text, reviver) {
      source = String(text);
      parseState = "start";
      stack = [];
      pos = 0;
      line = 1;
      column = 0;
      token = void 0;
      key = void 0;
      root = void 0;
      do {
        token = lex();
        parseStates[parseState]();
      } while (token.type !== "eof");
      if (typeof reviver === "function") {
        return internalize({ "": root }, "", reviver);
      }
      return root;
    };
    function internalize(holder, name, reviver) {
      const value = holder[name];
      if (value != null && typeof value === "object") {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const key2 = String(i);
            const replacement = internalize(value, key2, reviver);
            if (replacement === void 0) {
              delete value[key2];
            } else {
              Object.defineProperty(value, key2, {
                value: replacement,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        } else {
          for (const key2 in value) {
            const replacement = internalize(value, key2, reviver);
            if (replacement === void 0) {
              delete value[key2];
            } else {
              Object.defineProperty(value, key2, {
                value: replacement,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        }
      }
      return reviver.call(holder, name, value);
    }
    var lexState;
    var buffer;
    var doubleQuote;
    var sign;
    var c;
    function lex() {
      lexState = "default";
      buffer = "";
      doubleQuote = false;
      sign = 1;
      for (; ; ) {
        c = peek();
        const token2 = lexStates[lexState]();
        if (token2) {
          return token2;
        }
      }
    }
    function peek() {
      if (source[pos]) {
        return String.fromCodePoint(source.codePointAt(pos));
      }
    }
    function read() {
      const c2 = peek();
      if (c2 === "\n") {
        line++;
        column = 0;
      } else if (c2) {
        column += c2.length;
      } else {
        column++;
      }
      if (c2) {
        pos += c2.length;
      }
      return c2;
    }
    var lexStates = {
      default() {
        switch (c) {
          case "	":
          case "\v":
          case "\f":
          case " ":
          case "\xA0":
          case "\uFEFF":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            read();
            return;
          case "/":
            read();
            lexState = "comment";
            return;
          case void 0:
            read();
            return newToken("eof");
        }
        if (util.isSpaceSeparator(c)) {
          read();
          return;
        }
        return lexStates[parseState]();
      },
      comment() {
        switch (c) {
          case "*":
            read();
            lexState = "multiLineComment";
            return;
          case "/":
            read();
            lexState = "singleLineComment";
            return;
        }
        throw invalidChar(read());
      },
      multiLineComment() {
        switch (c) {
          case "*":
            read();
            lexState = "multiLineCommentAsterisk";
            return;
          case void 0:
            throw invalidChar(read());
        }
        read();
      },
      multiLineCommentAsterisk() {
        switch (c) {
          case "*":
            read();
            return;
          case "/":
            read();
            lexState = "default";
            return;
          case void 0:
            throw invalidChar(read());
        }
        read();
        lexState = "multiLineComment";
      },
      singleLineComment() {
        switch (c) {
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            read();
            lexState = "default";
            return;
          case void 0:
            read();
            return newToken("eof");
        }
        read();
      },
      value() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
          case "n":
            read();
            literal("ull");
            return newToken("null", null);
          case "t":
            read();
            literal("rue");
            return newToken("boolean", true);
          case "f":
            read();
            literal("alse");
            return newToken("boolean", false);
          case "-":
          case "+":
            if (read() === "-") {
              sign = -1;
            }
            lexState = "sign";
            return;
          case ".":
            buffer = read();
            lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read();
            lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read();
            lexState = "decimalInteger";
            return;
          case "I":
            read();
            literal("nfinity");
            return newToken("numeric", Infinity);
          case "N":
            read();
            literal("aN");
            return newToken("numeric", NaN);
          case '"':
          case "'":
            doubleQuote = read() === '"';
            buffer = "";
            lexState = "string";
            return;
        }
        throw invalidChar(read());
      },
      identifierNameStartEscape() {
        if (c !== "u") {
          throw invalidChar(read());
        }
        read();
        const u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
            break;
          default:
            if (!util.isIdStartChar(u)) {
              throw invalidIdentifier();
            }
            break;
        }
        buffer += u;
        lexState = "identifierName";
      },
      identifierName() {
        switch (c) {
          case "$":
          case "_":
          case "\u200C":
          case "\u200D":
            buffer += read();
            return;
          case "\\":
            read();
            lexState = "identifierNameEscape";
            return;
        }
        if (util.isIdContinueChar(c)) {
          buffer += read();
          return;
        }
        return newToken("identifier", buffer);
      },
      identifierNameEscape() {
        if (c !== "u") {
          throw invalidChar(read());
        }
        read();
        const u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
          case "\u200C":
          case "\u200D":
            break;
          default:
            if (!util.isIdContinueChar(u)) {
              throw invalidIdentifier();
            }
            break;
        }
        buffer += u;
        lexState = "identifierName";
      },
      sign() {
        switch (c) {
          case ".":
            buffer = read();
            lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read();
            lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read();
            lexState = "decimalInteger";
            return;
          case "I":
            read();
            literal("nfinity");
            return newToken("numeric", sign * Infinity);
          case "N":
            read();
            literal("aN");
            return newToken("numeric", NaN);
        }
        throw invalidChar(read());
      },
      zero() {
        switch (c) {
          case ".":
            buffer += read();
            lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
          case "x":
          case "X":
            buffer += read();
            lexState = "hexadecimal";
            return;
        }
        return newToken("numeric", sign * 0);
      },
      decimalInteger() {
        switch (c) {
          case ".":
            buffer += read();
            lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalPointLeading() {
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalFraction";
          return;
        }
        throw invalidChar(read());
      },
      decimalPoint() {
        switch (c) {
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalFraction";
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalFraction() {
        switch (c) {
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalExponent() {
        switch (c) {
          case "+":
          case "-":
            buffer += read();
            lexState = "decimalExponentSign";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentSign() {
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentInteger() {
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      hexadecimal() {
        if (util.isHexDigit(c)) {
          buffer += read();
          lexState = "hexadecimalInteger";
          return;
        }
        throw invalidChar(read());
      },
      hexadecimalInteger() {
        if (util.isHexDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      string() {
        switch (c) {
          case "\\":
            read();
            buffer += escape2();
            return;
          case '"':
            if (doubleQuote) {
              read();
              return newToken("string", buffer);
            }
            buffer += read();
            return;
          case "'":
            if (!doubleQuote) {
              read();
              return newToken("string", buffer);
            }
            buffer += read();
            return;
          case "\n":
          case "\r":
            throw invalidChar(read());
          case "\u2028":
          case "\u2029":
            separatorChar(c);
            break;
          case void 0:
            throw invalidChar(read());
        }
        buffer += read();
      },
      start() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
        }
        lexState = "value";
      },
      beforePropertyName() {
        switch (c) {
          case "$":
          case "_":
            buffer = read();
            lexState = "identifierName";
            return;
          case "\\":
            read();
            lexState = "identifierNameStartEscape";
            return;
          case "}":
            return newToken("punctuator", read());
          case '"':
          case "'":
            doubleQuote = read() === '"';
            lexState = "string";
            return;
        }
        if (util.isIdStartChar(c)) {
          buffer += read();
          lexState = "identifierName";
          return;
        }
        throw invalidChar(read());
      },
      afterPropertyName() {
        if (c === ":") {
          return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      beforePropertyValue() {
        lexState = "value";
      },
      afterPropertyValue() {
        switch (c) {
          case ",":
          case "}":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      beforeArrayValue() {
        if (c === "]") {
          return newToken("punctuator", read());
        }
        lexState = "value";
      },
      afterArrayValue() {
        switch (c) {
          case ",":
          case "]":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      end() {
        throw invalidChar(read());
      }
    };
    function newToken(type, value) {
      return {
        type,
        value,
        line,
        column
      };
    }
    function literal(s) {
      for (const c2 of s) {
        const p = peek();
        if (p !== c2) {
          throw invalidChar(read());
        }
        read();
      }
    }
    function escape2() {
      const c2 = peek();
      switch (c2) {
        case "b":
          read();
          return "\b";
        case "f":
          read();
          return "\f";
        case "n":
          read();
          return "\n";
        case "r":
          read();
          return "\r";
        case "t":
          read();
          return "	";
        case "v":
          read();
          return "\v";
        case "0":
          read();
          if (util.isDigit(peek())) {
            throw invalidChar(read());
          }
          return "\0";
        case "x":
          read();
          return hexEscape();
        case "u":
          read();
          return unicodeEscape();
        case "\n":
        case "\u2028":
        case "\u2029":
          read();
          return "";
        case "\r":
          read();
          if (peek() === "\n") {
            read();
          }
          return "";
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          throw invalidChar(read());
        case void 0:
          throw invalidChar(read());
      }
      return read();
    }
    function hexEscape() {
      let buffer2 = "";
      let c2 = peek();
      if (!util.isHexDigit(c2)) {
        throw invalidChar(read());
      }
      buffer2 += read();
      c2 = peek();
      if (!util.isHexDigit(c2)) {
        throw invalidChar(read());
      }
      buffer2 += read();
      return String.fromCodePoint(parseInt(buffer2, 16));
    }
    function unicodeEscape() {
      let buffer2 = "";
      let count = 4;
      while (count-- > 0) {
        const c2 = peek();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
      }
      return String.fromCodePoint(parseInt(buffer2, 16));
    }
    var parseStates = {
      start() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        push();
      },
      beforePropertyName() {
        switch (token.type) {
          case "identifier":
          case "string":
            key = token.value;
            parseState = "afterPropertyName";
            return;
          case "punctuator":
            pop();
            return;
          case "eof":
            throw invalidEOF();
        }
      },
      afterPropertyName() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        parseState = "beforePropertyValue";
      },
      beforePropertyValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        push();
      },
      beforeArrayValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        if (token.type === "punctuator" && token.value === "]") {
          pop();
          return;
        }
        push();
      },
      afterPropertyValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        switch (token.value) {
          case ",":
            parseState = "beforePropertyName";
            return;
          case "}":
            pop();
        }
      },
      afterArrayValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        switch (token.value) {
          case ",":
            parseState = "beforeArrayValue";
            return;
          case "]":
            pop();
        }
      },
      end() {
      }
    };
    function push() {
      let value;
      switch (token.type) {
        case "punctuator":
          switch (token.value) {
            case "{":
              value = {};
              break;
            case "[":
              value = [];
              break;
          }
          break;
        case "null":
        case "boolean":
        case "numeric":
        case "string":
          value = token.value;
          break;
      }
      if (root === void 0) {
        root = value;
      } else {
        const parent = stack[stack.length - 1];
        if (Array.isArray(parent)) {
          parent.push(value);
        } else {
          Object.defineProperty(parent, key, {
            value,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      if (value !== null && typeof value === "object") {
        stack.push(value);
        if (Array.isArray(value)) {
          parseState = "beforeArrayValue";
        } else {
          parseState = "beforePropertyName";
        }
      } else {
        const current = stack[stack.length - 1];
        if (current == null) {
          parseState = "end";
        } else if (Array.isArray(current)) {
          parseState = "afterArrayValue";
        } else {
          parseState = "afterPropertyValue";
        }
      }
    }
    function pop() {
      stack.pop();
      const current = stack[stack.length - 1];
      if (current == null) {
        parseState = "end";
      } else if (Array.isArray(current)) {
        parseState = "afterArrayValue";
      } else {
        parseState = "afterPropertyValue";
      }
    }
    function invalidChar(c2) {
      if (c2 === void 0) {
        return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
      }
      return syntaxError(`JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
    }
    function invalidEOF() {
      return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
    }
    function invalidIdentifier() {
      column -= 5;
      return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
    }
    function separatorChar(c2) {
      console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
    }
    function formatChar(c2) {
      const replacements = {
        "'": "\\'",
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "	": "\\t",
        "\v": "\\v",
        "\0": "\\0",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      };
      if (replacements[c2]) {
        return replacements[c2];
      }
      if (c2 < " ") {
        const hexString = c2.charCodeAt(0).toString(16);
        return "\\x" + ("00" + hexString).substring(hexString.length);
      }
      return c2;
    }
    function syntaxError(message) {
      const err = new SyntaxError(message);
      err.lineNumber = line;
      err.columnNumber = column;
      return err;
    }
  }
});

// node_modules/json5/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/json5/lib/stringify.js"(exports, module2) {
    var util = require_util();
    module2.exports = function stringify(value, replacer, space) {
      const stack = [];
      let indent = "";
      let propertyList;
      let replacerFunc;
      let gap = "";
      let quote;
      if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
        space = replacer.space;
        quote = replacer.quote;
        replacer = replacer.replacer;
      }
      if (typeof replacer === "function") {
        replacerFunc = replacer;
      } else if (Array.isArray(replacer)) {
        propertyList = [];
        for (const v of replacer) {
          let item;
          if (typeof v === "string") {
            item = v;
          } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
            item = String(v);
          }
          if (item !== void 0 && propertyList.indexOf(item) < 0) {
            propertyList.push(item);
          }
        }
      }
      if (space instanceof Number) {
        space = Number(space);
      } else if (space instanceof String) {
        space = String(space);
      }
      if (typeof space === "number") {
        if (space > 0) {
          space = Math.min(10, Math.floor(space));
          gap = "          ".substr(0, space);
        }
      } else if (typeof space === "string") {
        gap = space.substr(0, 10);
      }
      return serializeProperty("", { "": value });
      function serializeProperty(key, holder) {
        let value2 = holder[key];
        if (value2 != null) {
          if (typeof value2.toJSON5 === "function") {
            value2 = value2.toJSON5(key);
          } else if (typeof value2.toJSON === "function") {
            value2 = value2.toJSON(key);
          }
        }
        if (replacerFunc) {
          value2 = replacerFunc.call(holder, key, value2);
        }
        if (value2 instanceof Number) {
          value2 = Number(value2);
        } else if (value2 instanceof String) {
          value2 = String(value2);
        } else if (value2 instanceof Boolean) {
          value2 = value2.valueOf();
        }
        switch (value2) {
          case null:
            return "null";
          case true:
            return "true";
          case false:
            return "false";
        }
        if (typeof value2 === "string") {
          return quoteString(value2, false);
        }
        if (typeof value2 === "number") {
          return String(value2);
        }
        if (typeof value2 === "object") {
          return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
        }
        return void 0;
      }
      function quoteString(value2) {
        const quotes = {
          "'": 0.1,
          '"': 0.2
        };
        const replacements = {
          "'": "\\'",
          '"': '\\"',
          "\\": "\\\\",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "	": "\\t",
          "\v": "\\v",
          "\0": "\\0",
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        let product = "";
        for (let i = 0; i < value2.length; i++) {
          const c = value2[i];
          switch (c) {
            case "'":
            case '"':
              quotes[c]++;
              product += c;
              continue;
            case "\0":
              if (util.isDigit(value2[i + 1])) {
                product += "\\x00";
                continue;
              }
          }
          if (replacements[c]) {
            product += replacements[c];
            continue;
          }
          if (c < " ") {
            let hexString = c.charCodeAt(0).toString(16);
            product += "\\x" + ("00" + hexString).substring(hexString.length);
            continue;
          }
          product += c;
        }
        const quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
        product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
        return quoteChar + product + quoteChar;
      }
      function serializeObject(value2) {
        if (stack.indexOf(value2) >= 0) {
          throw TypeError("Converting circular structure to JSON5");
        }
        stack.push(value2);
        let stepback = indent;
        indent = indent + gap;
        let keys = propertyList || Object.keys(value2);
        let partial = [];
        for (const key of keys) {
          const propertyString = serializeProperty(key, value2);
          if (propertyString !== void 0) {
            let member = serializeKey(key) + ":";
            if (gap !== "") {
              member += " ";
            }
            member += propertyString;
            partial.push(member);
          }
        }
        let final;
        if (partial.length === 0) {
          final = "{}";
        } else {
          let properties;
          if (gap === "") {
            properties = partial.join(",");
            final = "{" + properties + "}";
          } else {
            let separator = ",\n" + indent;
            properties = partial.join(separator);
            final = "{\n" + indent + properties + ",\n" + stepback + "}";
          }
        }
        stack.pop();
        indent = stepback;
        return final;
      }
      function serializeKey(key) {
        if (key.length === 0) {
          return quoteString(key, true);
        }
        const firstChar = String.fromCodePoint(key.codePointAt(0));
        if (!util.isIdStartChar(firstChar)) {
          return quoteString(key, true);
        }
        for (let i = firstChar.length; i < key.length; i++) {
          if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
            return quoteString(key, true);
          }
        }
        return key;
      }
      function serializeArray(value2) {
        if (stack.indexOf(value2) >= 0) {
          throw TypeError("Converting circular structure to JSON5");
        }
        stack.push(value2);
        let stepback = indent;
        indent = indent + gap;
        let partial = [];
        for (let i = 0; i < value2.length; i++) {
          const propertyString = serializeProperty(String(i), value2);
          partial.push(propertyString !== void 0 ? propertyString : "null");
        }
        let final;
        if (partial.length === 0) {
          final = "[]";
        } else {
          if (gap === "") {
            let properties = partial.join(",");
            final = "[" + properties + "]";
          } else {
            let separator = ",\n" + indent;
            let properties = partial.join(separator);
            final = "[\n" + indent + properties + ",\n" + stepback + "]";
          }
        }
        stack.pop();
        indent = stepback;
        return final;
      }
    };
  }
});

// node_modules/json5/lib/index.js
var require_lib = __commonJS({
  "node_modules/json5/lib/index.js"(exports, module2) {
    var parse = require_parse();
    var stringify = require_stringify();
    var JSON5 = {
      parse,
      stringify
    };
    module2.exports = JSON5;
  }
});

// node_modules/@lezer/lr/dist/index.cjs
var require_dist2 = __commonJS({
  "node_modules/@lezer/lr/dist/index.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common = require_dist();
    var Stack = class _Stack {
      /// @internal
      constructor(p, stack, state, reducePos, pos, score, buffer, bufferBase, curContext, lookAhead = 0, parent) {
        this.p = p;
        this.stack = stack;
        this.state = state;
        this.reducePos = reducePos;
        this.pos = pos;
        this.score = score;
        this.buffer = buffer;
        this.bufferBase = bufferBase;
        this.curContext = curContext;
        this.lookAhead = lookAhead;
        this.parent = parent;
      }
      /// @internal
      toString() {
        return `[${this.stack.filter((_, i) => i % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
      }
      // Start an empty stack
      /// @internal
      static start(p, state, pos = 0) {
        let cx = p.parser.context;
        return new _Stack(p, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, 0, null);
      }
      /// The stack's current [context](#lr.ContextTracker) value, if
      /// any. Its type will depend on the context tracker's type
      /// parameter, or it will be `null` if there is no context
      /// tracker.
      get context() {
        return this.curContext ? this.curContext.context : null;
      }
      // Push a state onto the stack, tracking its start position as well
      // as the buffer base at that point.
      /// @internal
      pushState(state, start) {
        this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
        this.state = state;
      }
      // Apply a reduce action
      /// @internal
      reduce(action) {
        let depth = action >> 19, type = action & 65535;
        let { parser } = this.p;
        let dPrec = parser.dynamicPrecedence(type);
        if (dPrec)
          this.score += dPrec;
        if (depth == 0) {
          this.pushState(parser.getGoto(this.state, type, true), this.reducePos);
          if (type < parser.minRepeatTerm)
            this.storeNode(type, this.reducePos, this.reducePos, 4, true);
          this.reduceContext(type, this.reducePos);
          return;
        }
        let base = this.stack.length - (depth - 1) * 3 - (action & 262144 ? 6 : 0);
        let start = this.stack[base - 2];
        let bufferBase = this.stack[base - 1], count = this.bufferBase + this.buffer.length - bufferBase;
        if (type < parser.minRepeatTerm || action & 131072) {
          let pos = parser.stateFlag(
            this.state,
            1
            /* Skipped */
          ) ? this.pos : this.reducePos;
          this.storeNode(type, start, pos, count + 4, true);
        }
        if (action & 262144) {
          this.state = this.stack[base];
        } else {
          let baseStateID = this.stack[base - 3];
          this.state = parser.getGoto(baseStateID, type, true);
        }
        while (this.stack.length > base)
          this.stack.pop();
        this.reduceContext(type, start);
      }
      // Shift a value into the buffer
      /// @internal
      storeNode(term, start, end, size = 4, isReduce = false) {
        if (term == 0) {
          let cur = this, top = this.buffer.length;
          if (top == 0 && cur.parent) {
            top = cur.bufferBase - cur.parent.bufferBase;
            cur = cur.parent;
          }
          if (top > 0 && cur.buffer[top - 4] == 0 && cur.buffer[top - 1] > -1) {
            if (start == end)
              return;
            if (cur.buffer[top - 2] >= start) {
              cur.buffer[top - 2] = end;
              return;
            }
          }
        }
        if (!isReduce || this.pos == end) {
          this.buffer.push(term, start, end, size);
        } else {
          let index = this.buffer.length;
          if (index > 0 && this.buffer[index - 4] != 0)
            while (index > 0 && this.buffer[index - 2] > end) {
              this.buffer[index] = this.buffer[index - 4];
              this.buffer[index + 1] = this.buffer[index - 3];
              this.buffer[index + 2] = this.buffer[index - 2];
              this.buffer[index + 3] = this.buffer[index - 1];
              index -= 4;
              if (size > 4)
                size -= 4;
            }
          this.buffer[index] = term;
          this.buffer[index + 1] = start;
          this.buffer[index + 2] = end;
          this.buffer[index + 3] = size;
        }
      }
      // Apply a shift action
      /// @internal
      shift(action, next, nextEnd) {
        let start = this.pos;
        if (action & 131072) {
          this.pushState(action & 65535, this.pos);
        } else if ((action & 262144) == 0) {
          let nextState = action, { parser } = this.p;
          if (nextEnd > this.pos || next <= parser.maxNode) {
            this.pos = nextEnd;
            if (!parser.stateFlag(
              nextState,
              1
              /* Skipped */
            ))
              this.reducePos = nextEnd;
          }
          this.pushState(nextState, start);
          this.shiftContext(next, start);
          if (next <= parser.maxNode)
            this.buffer.push(next, start, nextEnd, 4);
        } else {
          this.pos = nextEnd;
          this.shiftContext(next, start);
          if (next <= this.p.parser.maxNode)
            this.buffer.push(next, start, nextEnd, 4);
        }
      }
      // Apply an action
      /// @internal
      apply(action, next, nextEnd) {
        if (action & 65536)
          this.reduce(action);
        else
          this.shift(action, next, nextEnd);
      }
      // Add a prebuilt (reused) node into the buffer.
      /// @internal
      useNode(value, next) {
        let index = this.p.reused.length - 1;
        if (index < 0 || this.p.reused[index] != value) {
          this.p.reused.push(value);
          index++;
        }
        let start = this.pos;
        this.reducePos = this.pos = start + value.length;
        this.pushState(next, start);
        this.buffer.push(
          index,
          start,
          this.reducePos,
          -1
          /* size == -1 means this is a reused value */
        );
        if (this.curContext)
          this.updateContext(this.curContext.tracker.reuse(this.curContext.context, value, this, this.p.stream.reset(this.pos - value.length)));
      }
      // Split the stack. Due to the buffer sharing and the fact
      // that `this.stack` tends to stay quite shallow, this isn't very
      // expensive.
      /// @internal
      split() {
        let parent = this;
        let off = parent.buffer.length;
        while (off > 0 && parent.buffer[off - 2] > parent.reducePos)
          off -= 4;
        let buffer = parent.buffer.slice(off), base = parent.bufferBase + off;
        while (parent && base == parent.bufferBase)
          parent = parent.parent;
        return new _Stack(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, buffer, base, this.curContext, this.lookAhead, parent);
      }
      // Try to recover from an error by 'deleting' (ignoring) one token.
      /// @internal
      recoverByDelete(next, nextEnd) {
        let isNode = next <= this.p.parser.maxNode;
        if (isNode)
          this.storeNode(next, this.pos, nextEnd, 4);
        this.storeNode(0, this.pos, nextEnd, isNode ? 8 : 4);
        this.pos = this.reducePos = nextEnd;
        this.score -= 190;
      }
      /// Check if the given term would be able to be shifted (optionally
      /// after some reductions) on this stack. This can be useful for
      /// external tokenizers that want to make sure they only provide a
      /// given token when it applies.
      canShift(term) {
        for (let sim = new SimulatedStack(this); ; ) {
          let action = this.p.parser.stateSlot(
            sim.state,
            4
            /* DefaultReduce */
          ) || this.p.parser.hasAction(sim.state, term);
          if ((action & 65536) == 0)
            return true;
          if (action == 0)
            return false;
          sim.reduce(action);
        }
      }
      // Apply up to Recover.MaxNext recovery actions that conceptually
      // inserts some missing token or rule.
      /// @internal
      recoverByInsert(next) {
        if (this.stack.length >= 300)
          return [];
        let nextStates = this.p.parser.nextStates(this.state);
        if (nextStates.length > 4 << 1 || this.stack.length >= 120) {
          let best = [];
          for (let i = 0, s; i < nextStates.length; i += 2) {
            if ((s = nextStates[i + 1]) != this.state && this.p.parser.hasAction(s, next))
              best.push(nextStates[i], s);
          }
          if (this.stack.length < 120)
            for (let i = 0; best.length < 4 << 1 && i < nextStates.length; i += 2) {
              let s = nextStates[i + 1];
              if (!best.some((v, i2) => i2 & 1 && v == s))
                best.push(nextStates[i], s);
            }
          nextStates = best;
        }
        let result = [];
        for (let i = 0; i < nextStates.length && result.length < 4; i += 2) {
          let s = nextStates[i + 1];
          if (s == this.state)
            continue;
          let stack = this.split();
          stack.storeNode(0, stack.pos, stack.pos, 4, true);
          stack.pushState(s, this.pos);
          stack.shiftContext(nextStates[i], this.pos);
          stack.score -= 200;
          result.push(stack);
        }
        return result;
      }
      // Force a reduce, if possible. Return false if that can't
      // be done.
      /// @internal
      forceReduce() {
        let reduce = this.p.parser.stateSlot(
          this.state,
          5
          /* ForcedReduce */
        );
        if ((reduce & 65536) == 0)
          return false;
        let { parser } = this.p;
        if (!parser.validAction(this.state, reduce)) {
          let depth = reduce >> 19, term = reduce & 65535;
          let target = this.stack.length - depth * 3;
          if (target < 0 || parser.getGoto(this.stack[target], term, false) < 0)
            return false;
          this.storeNode(0, this.reducePos, this.reducePos, 4, true);
          this.score -= 100;
        }
        this.reduce(reduce);
        return true;
      }
      /// @internal
      forceAll() {
        while (!this.p.parser.stateFlag(
          this.state,
          2
          /* Accepting */
        )) {
          if (!this.forceReduce()) {
            this.storeNode(0, this.pos, this.pos, 4, true);
            break;
          }
        }
        return this;
      }
      /// Check whether this state has no further actions (assumed to be a direct descendant of the
      /// top state, since any other states must be able to continue
      /// somehow). @internal
      get deadEnd() {
        if (this.stack.length != 3)
          return false;
        let { parser } = this.p;
        return parser.data[parser.stateSlot(
          this.state,
          1
          /* Actions */
        )] == 65535 && !parser.stateSlot(
          this.state,
          4
          /* DefaultReduce */
        );
      }
      /// Restart the stack (put it back in its start state). Only safe
      /// when this.stack.length == 3 (state is directly below the top
      /// state). @internal
      restart() {
        this.state = this.stack[0];
        this.stack.length = 0;
      }
      /// @internal
      sameState(other) {
        if (this.state != other.state || this.stack.length != other.stack.length)
          return false;
        for (let i = 0; i < this.stack.length; i += 3)
          if (this.stack[i] != other.stack[i])
            return false;
        return true;
      }
      /// Get the parser used by this stack.
      get parser() {
        return this.p.parser;
      }
      /// Test whether a given dialect (by numeric ID, as exported from
      /// the terms file) is enabled.
      dialectEnabled(dialectID) {
        return this.p.parser.dialect.flags[dialectID];
      }
      shiftContext(term, start) {
        if (this.curContext)
          this.updateContext(this.curContext.tracker.shift(this.curContext.context, term, this, this.p.stream.reset(start)));
      }
      reduceContext(term, start) {
        if (this.curContext)
          this.updateContext(this.curContext.tracker.reduce(this.curContext.context, term, this, this.p.stream.reset(start)));
      }
      /// @internal
      emitContext() {
        let last = this.buffer.length - 1;
        if (last < 0 || this.buffer[last] != -3)
          this.buffer.push(this.curContext.hash, this.reducePos, this.reducePos, -3);
      }
      /// @internal
      emitLookAhead() {
        let last = this.buffer.length - 1;
        if (last < 0 || this.buffer[last] != -4)
          this.buffer.push(this.lookAhead, this.reducePos, this.reducePos, -4);
      }
      updateContext(context) {
        if (context != this.curContext.context) {
          let newCx = new StackContext(this.curContext.tracker, context);
          if (newCx.hash != this.curContext.hash)
            this.emitContext();
          this.curContext = newCx;
        }
      }
      /// @internal
      setLookAhead(lookAhead) {
        if (lookAhead > this.lookAhead) {
          this.emitLookAhead();
          this.lookAhead = lookAhead;
        }
      }
      /// @internal
      close() {
        if (this.curContext && this.curContext.tracker.strict)
          this.emitContext();
        if (this.lookAhead > 0)
          this.emitLookAhead();
      }
    };
    var StackContext = class {
      constructor(tracker, context) {
        this.tracker = tracker;
        this.context = context;
        this.hash = tracker.strict ? tracker.hash(context) : 0;
      }
    };
    var Recover;
    (function(Recover2) {
      Recover2[Recover2["Insert"] = 200] = "Insert";
      Recover2[Recover2["Delete"] = 190] = "Delete";
      Recover2[Recover2["Reduce"] = 100] = "Reduce";
      Recover2[Recover2["MaxNext"] = 4] = "MaxNext";
      Recover2[Recover2["MaxInsertStackDepth"] = 300] = "MaxInsertStackDepth";
      Recover2[Recover2["DampenInsertStackDepth"] = 120] = "DampenInsertStackDepth";
    })(Recover || (Recover = {}));
    var SimulatedStack = class {
      constructor(start) {
        this.start = start;
        this.state = start.state;
        this.stack = start.stack;
        this.base = this.stack.length;
      }
      reduce(action) {
        let term = action & 65535, depth = action >> 19;
        if (depth == 0) {
          if (this.stack == this.start.stack)
            this.stack = this.stack.slice();
          this.stack.push(this.state, 0, 0);
          this.base += 3;
        } else {
          this.base -= (depth - 1) * 3;
        }
        let goto = this.start.p.parser.getGoto(this.stack[this.base - 3], term, true);
        this.state = goto;
      }
    };
    var StackBufferCursor = class _StackBufferCursor {
      constructor(stack, pos, index) {
        this.stack = stack;
        this.pos = pos;
        this.index = index;
        this.buffer = stack.buffer;
        if (this.index == 0)
          this.maybeNext();
      }
      static create(stack, pos = stack.bufferBase + stack.buffer.length) {
        return new _StackBufferCursor(stack, pos, pos - stack.bufferBase);
      }
      maybeNext() {
        let next = this.stack.parent;
        if (next != null) {
          this.index = this.stack.bufferBase - next.bufferBase;
          this.stack = next;
          this.buffer = next.buffer;
        }
      }
      get id() {
        return this.buffer[this.index - 4];
      }
      get start() {
        return this.buffer[this.index - 3];
      }
      get end() {
        return this.buffer[this.index - 2];
      }
      get size() {
        return this.buffer[this.index - 1];
      }
      next() {
        this.index -= 4;
        this.pos -= 4;
        if (this.index == 0)
          this.maybeNext();
      }
      fork() {
        return new _StackBufferCursor(this.stack, this.pos, this.index);
      }
    };
    var CachedToken = class {
      constructor() {
        this.start = -1;
        this.value = -1;
        this.end = -1;
        this.extended = -1;
        this.lookAhead = 0;
        this.mask = 0;
        this.context = 0;
      }
    };
    var nullToken = new CachedToken();
    var InputStream = class {
      /// @internal
      constructor(input, ranges) {
        this.input = input;
        this.ranges = ranges;
        this.chunk = "";
        this.chunkOff = 0;
        this.chunk2 = "";
        this.chunk2Pos = 0;
        this.next = -1;
        this.token = nullToken;
        this.rangeIndex = 0;
        this.pos = this.chunkPos = ranges[0].from;
        this.range = ranges[0];
        this.end = ranges[ranges.length - 1].to;
        this.readNext();
      }
      resolveOffset(offset, assoc) {
        let range = this.range, index = this.rangeIndex;
        let pos = this.pos + offset;
        while (pos < range.from) {
          if (!index)
            return null;
          let next = this.ranges[--index];
          pos -= range.from - next.to;
          range = next;
        }
        while (assoc < 0 ? pos > range.to : pos >= range.to) {
          if (index == this.ranges.length - 1)
            return null;
          let next = this.ranges[++index];
          pos += next.from - range.to;
          range = next;
        }
        return pos;
      }
      /// Look at a code unit near the stream position. `.peek(0)` equals
      /// `.next`, `.peek(-1)` gives you the previous character, and so
      /// on.
      ///
      /// Note that looking around during tokenizing creates dependencies
      /// on potentially far-away content, which may reduce the
      /// effectiveness incremental parsing—when looking forward—or even
      /// cause invalid reparses when looking backward more than 25 code
      /// units, since the library does not track lookbehind.
      peek(offset) {
        let idx = this.chunkOff + offset, pos, result;
        if (idx >= 0 && idx < this.chunk.length) {
          pos = this.pos + offset;
          result = this.chunk.charCodeAt(idx);
        } else {
          let resolved = this.resolveOffset(offset, 1);
          if (resolved == null)
            return -1;
          pos = resolved;
          if (pos >= this.chunk2Pos && pos < this.chunk2Pos + this.chunk2.length) {
            result = this.chunk2.charCodeAt(pos - this.chunk2Pos);
          } else {
            let i = this.rangeIndex, range = this.range;
            while (range.to <= pos)
              range = this.ranges[++i];
            this.chunk2 = this.input.chunk(this.chunk2Pos = pos);
            if (pos + this.chunk2.length > range.to)
              this.chunk2 = this.chunk2.slice(0, range.to - pos);
            result = this.chunk2.charCodeAt(0);
          }
        }
        if (pos >= this.token.lookAhead)
          this.token.lookAhead = pos + 1;
        return result;
      }
      /// Accept a token. By default, the end of the token is set to the
      /// current stream position, but you can pass an offset (relative to
      /// the stream position) to change that.
      acceptToken(token, endOffset = 0) {
        let end = endOffset ? this.resolveOffset(endOffset, -1) : this.pos;
        if (end == null || end < this.token.start)
          throw new RangeError("Token end out of bounds");
        this.token.value = token;
        this.token.end = end;
      }
      getChunk() {
        if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
          let { chunk, chunkPos } = this;
          this.chunk = this.chunk2;
          this.chunkPos = this.chunk2Pos;
          this.chunk2 = chunk;
          this.chunk2Pos = chunkPos;
          this.chunkOff = this.pos - this.chunkPos;
        } else {
          this.chunk2 = this.chunk;
          this.chunk2Pos = this.chunkPos;
          let nextChunk = this.input.chunk(this.pos);
          let end = this.pos + nextChunk.length;
          this.chunk = end > this.range.to ? nextChunk.slice(0, this.range.to - this.pos) : nextChunk;
          this.chunkPos = this.pos;
          this.chunkOff = 0;
        }
      }
      readNext() {
        if (this.chunkOff >= this.chunk.length) {
          this.getChunk();
          if (this.chunkOff == this.chunk.length)
            return this.next = -1;
        }
        return this.next = this.chunk.charCodeAt(this.chunkOff);
      }
      /// Move the stream forward N (defaults to 1) code units. Returns
      /// the new value of [`next`](#lr.InputStream.next).
      advance(n = 1) {
        this.chunkOff += n;
        while (this.pos + n >= this.range.to) {
          if (this.rangeIndex == this.ranges.length - 1)
            return this.setDone();
          n -= this.range.to - this.pos;
          this.range = this.ranges[++this.rangeIndex];
          this.pos = this.range.from;
        }
        this.pos += n;
        if (this.pos >= this.token.lookAhead)
          this.token.lookAhead = this.pos + 1;
        return this.readNext();
      }
      setDone() {
        this.pos = this.chunkPos = this.end;
        this.range = this.ranges[this.rangeIndex = this.ranges.length - 1];
        this.chunk = "";
        return this.next = -1;
      }
      /// @internal
      reset(pos, token) {
        if (token) {
          this.token = token;
          token.start = pos;
          token.lookAhead = pos + 1;
          token.value = token.extended = -1;
        } else {
          this.token = nullToken;
        }
        if (this.pos != pos) {
          this.pos = pos;
          if (pos == this.end) {
            this.setDone();
            return this;
          }
          while (pos < this.range.from)
            this.range = this.ranges[--this.rangeIndex];
          while (pos >= this.range.to)
            this.range = this.ranges[++this.rangeIndex];
          if (pos >= this.chunkPos && pos < this.chunkPos + this.chunk.length) {
            this.chunkOff = pos - this.chunkPos;
          } else {
            this.chunk = "";
            this.chunkOff = 0;
          }
          this.readNext();
        }
        return this;
      }
      /// @internal
      read(from, to) {
        if (from >= this.chunkPos && to <= this.chunkPos + this.chunk.length)
          return this.chunk.slice(from - this.chunkPos, to - this.chunkPos);
        if (from >= this.chunk2Pos && to <= this.chunk2Pos + this.chunk2.length)
          return this.chunk2.slice(from - this.chunk2Pos, to - this.chunk2Pos);
        if (from >= this.range.from && to <= this.range.to)
          return this.input.read(from, to);
        let result = "";
        for (let r of this.ranges) {
          if (r.from >= to)
            break;
          if (r.to > from)
            result += this.input.read(Math.max(r.from, from), Math.min(r.to, to));
        }
        return result;
      }
    };
    var TokenGroup = class {
      constructor(data, id2) {
        this.data = data;
        this.id = id2;
      }
      token(input, stack) {
        readToken(this.data, input, stack, this.id);
      }
    };
    TokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
    var ExternalTokenizer = class {
      /// Create a tokenizer. The first argument is the function that,
      /// given an input stream, scans for the types of tokens it
      /// recognizes at the stream's position, and calls
      /// [`acceptToken`](#lr.InputStream.acceptToken) when it finds
      /// one.
      constructor(token, options = {}) {
        this.token = token;
        this.contextual = !!options.contextual;
        this.fallback = !!options.fallback;
        this.extend = !!options.extend;
      }
    };
    function readToken(data, input, stack, group) {
      let state = 0, groupMask = 1 << group, { parser } = stack.p, { dialect } = parser;
      scan:
        for (; ; ) {
          if ((groupMask & data[state]) == 0)
            break;
          let accEnd = data[state + 1];
          for (let i = state + 3; i < accEnd; i += 2)
            if ((data[i + 1] & groupMask) > 0) {
              let term = data[i];
              if (dialect.allows(term) && (input.token.value == -1 || input.token.value == term || parser.overrides(term, input.token.value))) {
                input.acceptToken(term);
                break;
              }
            }
          for (let next = input.next, low = 0, high = data[state + 2]; low < high; ) {
            let mid = low + high >> 1;
            let index = accEnd + mid + (mid << 1);
            let from = data[index], to = data[index + 1];
            if (next < from)
              high = mid;
            else if (next >= to)
              low = mid + 1;
            else {
              state = data[index + 2];
              input.advance();
              continue scan;
            }
          }
          break;
        }
    }
    function decodeArray(input, Type = Uint16Array) {
      if (typeof input != "string")
        return input;
      let array = null;
      for (let pos = 0, out = 0; pos < input.length; ) {
        let value = 0;
        for (; ; ) {
          let next = input.charCodeAt(pos++), stop = false;
          if (next == 126) {
            value = 65535;
            break;
          }
          if (next >= 92)
            next--;
          if (next >= 34)
            next--;
          let digit = next - 32;
          if (digit >= 46) {
            digit -= 46;
            stop = true;
          }
          value += digit;
          if (stop)
            break;
          value *= 46;
        }
        if (array)
          array[out++] = value;
        else
          array = new Type(value);
      }
      return array;
    }
    var verbose = typeof process != "undefined" && /\bparse\b/.test(process.env.LOG);
    var stackIDs = null;
    var Safety;
    (function(Safety2) {
      Safety2[Safety2["Margin"] = 25] = "Margin";
    })(Safety || (Safety = {}));
    function cutAt(tree, pos, side) {
      let cursor = tree.fullCursor();
      cursor.moveTo(pos);
      for (; ; ) {
        if (!(side < 0 ? cursor.childBefore(pos) : cursor.childAfter(pos)))
          for (; ; ) {
            if ((side < 0 ? cursor.to < pos : cursor.from > pos) && !cursor.type.isError)
              return side < 0 ? Math.max(0, Math.min(
                cursor.to - 1,
                pos - 25
                /* Margin */
              )) : Math.min(tree.length, Math.max(
                cursor.from + 1,
                pos + 25
                /* Margin */
              ));
            if (side < 0 ? cursor.prevSibling() : cursor.nextSibling())
              break;
            if (!cursor.parent())
              return side < 0 ? 0 : tree.length;
          }
      }
    }
    var FragmentCursor = class {
      constructor(fragments, nodeSet) {
        this.fragments = fragments;
        this.nodeSet = nodeSet;
        this.i = 0;
        this.fragment = null;
        this.safeFrom = -1;
        this.safeTo = -1;
        this.trees = [];
        this.start = [];
        this.index = [];
        this.nextFragment();
      }
      nextFragment() {
        let fr = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
        if (fr) {
          this.safeFrom = fr.openStart ? cutAt(fr.tree, fr.from + fr.offset, 1) - fr.offset : fr.from;
          this.safeTo = fr.openEnd ? cutAt(fr.tree, fr.to + fr.offset, -1) - fr.offset : fr.to;
          while (this.trees.length) {
            this.trees.pop();
            this.start.pop();
            this.index.pop();
          }
          this.trees.push(fr.tree);
          this.start.push(-fr.offset);
          this.index.push(0);
          this.nextStart = this.safeFrom;
        } else {
          this.nextStart = 1e9;
        }
      }
      // `pos` must be >= any previously given `pos` for this cursor
      nodeAt(pos) {
        if (pos < this.nextStart)
          return null;
        while (this.fragment && this.safeTo <= pos)
          this.nextFragment();
        if (!this.fragment)
          return null;
        for (; ; ) {
          let last = this.trees.length - 1;
          if (last < 0) {
            this.nextFragment();
            return null;
          }
          let top = this.trees[last], index = this.index[last];
          if (index == top.children.length) {
            this.trees.pop();
            this.start.pop();
            this.index.pop();
            continue;
          }
          let next = top.children[index];
          let start = this.start[last] + top.positions[index];
          if (start > pos) {
            this.nextStart = start;
            return null;
          }
          if (next instanceof common.Tree) {
            if (start == pos) {
              if (start < this.safeFrom)
                return null;
              let end = start + next.length;
              if (end <= this.safeTo) {
                let lookAhead = next.prop(common.NodeProp.lookAhead);
                if (!lookAhead || end + lookAhead < this.fragment.to)
                  return next;
              }
            }
            this.index[last]++;
            if (start + next.length >= Math.max(this.safeFrom, pos)) {
              this.trees.push(next);
              this.start.push(start);
              this.index.push(0);
            }
          } else {
            this.index[last]++;
            this.nextStart = start + next.length;
          }
        }
      }
    };
    var TokenCache = class {
      constructor(parser, stream) {
        this.stream = stream;
        this.tokens = [];
        this.mainToken = null;
        this.actions = [];
        this.tokens = parser.tokenizers.map((_) => new CachedToken());
      }
      getActions(stack) {
        let actionIndex = 0;
        let main = null;
        let { parser } = stack.p, { tokenizers } = parser;
        let mask = parser.stateSlot(
          stack.state,
          3
          /* TokenizerMask */
        );
        let context = stack.curContext ? stack.curContext.hash : 0;
        let lookAhead = 0;
        for (let i = 0; i < tokenizers.length; i++) {
          if ((1 << i & mask) == 0)
            continue;
          let tokenizer = tokenizers[i], token = this.tokens[i];
          if (main && !tokenizer.fallback)
            continue;
          if (tokenizer.contextual || token.start != stack.pos || token.mask != mask || token.context != context) {
            this.updateCachedToken(token, tokenizer, stack);
            token.mask = mask;
            token.context = context;
          }
          if (token.lookAhead > token.end + 25)
            lookAhead = Math.max(token.lookAhead, lookAhead);
          if (token.value != 0) {
            let startIndex = actionIndex;
            if (token.extended > -1)
              actionIndex = this.addActions(stack, token.extended, token.end, actionIndex);
            actionIndex = this.addActions(stack, token.value, token.end, actionIndex);
            if (!tokenizer.extend) {
              main = token;
              if (actionIndex > startIndex)
                break;
            }
          }
        }
        while (this.actions.length > actionIndex)
          this.actions.pop();
        if (lookAhead)
          stack.setLookAhead(lookAhead);
        if (!main && stack.pos == this.stream.end) {
          main = new CachedToken();
          main.value = stack.p.parser.eofTerm;
          main.start = main.end = stack.pos;
          actionIndex = this.addActions(stack, main.value, main.end, actionIndex);
        }
        this.mainToken = main;
        return this.actions;
      }
      getMainToken(stack) {
        if (this.mainToken)
          return this.mainToken;
        let main = new CachedToken(), { pos, p } = stack;
        main.start = pos;
        main.end = Math.min(pos + 1, p.stream.end);
        main.value = pos == p.stream.end ? p.parser.eofTerm : 0;
        return main;
      }
      updateCachedToken(token, tokenizer, stack) {
        tokenizer.token(this.stream.reset(stack.pos, token), stack);
        if (token.value > -1) {
          let { parser } = stack.p;
          for (let i = 0; i < parser.specialized.length; i++)
            if (parser.specialized[i] == token.value) {
              let result = parser.specializers[i](this.stream.read(token.start, token.end), stack);
              if (result >= 0 && stack.p.parser.dialect.allows(result >> 1)) {
                if ((result & 1) == 0)
                  token.value = result >> 1;
                else
                  token.extended = result >> 1;
                break;
              }
            }
        } else {
          token.value = 0;
          token.end = Math.min(stack.p.stream.end, stack.pos + 1);
        }
      }
      putAction(action, token, end, index) {
        for (let i = 0; i < index; i += 3)
          if (this.actions[i] == action)
            return index;
        this.actions[index++] = action;
        this.actions[index++] = token;
        this.actions[index++] = end;
        return index;
      }
      addActions(stack, token, end, index) {
        let { state } = stack, { parser } = stack.p, { data } = parser;
        for (let set = 0; set < 2; set++) {
          for (let i = parser.stateSlot(
            state,
            set ? 2 : 1
            /* Actions */
          ); ; i += 3) {
            if (data[i] == 65535) {
              if (data[i + 1] == 1) {
                i = pair(data, i + 2);
              } else {
                if (index == 0 && data[i + 1] == 2)
                  index = this.putAction(pair(data, i + 2), token, end, index);
                break;
              }
            }
            if (data[i] == token)
              index = this.putAction(pair(data, i + 1), token, end, index);
          }
        }
        return index;
      }
    };
    var Rec;
    (function(Rec2) {
      Rec2[Rec2["Distance"] = 5] = "Distance";
      Rec2[Rec2["MaxRemainingPerStep"] = 3] = "MaxRemainingPerStep";
      Rec2[Rec2["MinBufferLengthPrune"] = 500] = "MinBufferLengthPrune";
      Rec2[Rec2["ForceReduceLimit"] = 10] = "ForceReduceLimit";
      Rec2[Rec2["CutDepth"] = 15e3] = "CutDepth";
      Rec2[Rec2["CutTo"] = 9e3] = "CutTo";
    })(Rec || (Rec = {}));
    var Parse = class {
      constructor(parser, input, fragments, ranges) {
        this.parser = parser;
        this.input = input;
        this.ranges = ranges;
        this.recovering = 0;
        this.nextStackID = 9812;
        this.minStackPos = 0;
        this.reused = [];
        this.stoppedAt = null;
        this.stream = new InputStream(input, ranges);
        this.tokens = new TokenCache(parser, this.stream);
        this.topTerm = parser.top[1];
        let { from } = ranges[0];
        this.stacks = [Stack.start(this, parser.top[0], from)];
        this.fragments = fragments.length && this.stream.end - from > parser.bufferLength * 4 ? new FragmentCursor(fragments, parser.nodeSet) : null;
      }
      get parsedPos() {
        return this.minStackPos;
      }
      // Move the parser forward. This will process all parse stacks at
      // `this.pos` and try to advance them to a further position. If no
      // stack for such a position is found, it'll start error-recovery.
      //
      // When the parse is finished, this will return a syntax tree. When
      // not, it returns `null`.
      advance() {
        let stacks = this.stacks, pos = this.minStackPos;
        let newStacks = this.stacks = [];
        let stopped, stoppedTokens;
        for (let i = 0; i < stacks.length; i++) {
          let stack = stacks[i];
          for (; ; ) {
            this.tokens.mainToken = null;
            if (stack.pos > pos) {
              newStacks.push(stack);
            } else if (this.advanceStack(stack, newStacks, stacks)) {
              continue;
            } else {
              if (!stopped) {
                stopped = [];
                stoppedTokens = [];
              }
              stopped.push(stack);
              let tok = this.tokens.getMainToken(stack);
              stoppedTokens.push(tok.value, tok.end);
            }
            break;
          }
        }
        if (!newStacks.length) {
          let finished = stopped && findFinished(stopped);
          if (finished)
            return this.stackToTree(finished);
          if (this.parser.strict) {
            if (verbose && stopped)
              console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none"));
            throw new SyntaxError("No parse at " + pos);
          }
          if (!this.recovering)
            this.recovering = 5;
        }
        if (this.recovering && stopped) {
          let finished = this.stoppedAt != null && stopped[0].pos > this.stoppedAt ? stopped[0] : this.runRecovery(stopped, stoppedTokens, newStacks);
          if (finished)
            return this.stackToTree(finished.forceAll());
        }
        if (this.recovering) {
          let maxRemaining = this.recovering == 1 ? 1 : this.recovering * 3;
          if (newStacks.length > maxRemaining) {
            newStacks.sort((a, b) => b.score - a.score);
            while (newStacks.length > maxRemaining)
              newStacks.pop();
          }
          if (newStacks.some((s) => s.reducePos > pos))
            this.recovering--;
        } else if (newStacks.length > 1) {
          outer:
            for (let i = 0; i < newStacks.length - 1; i++) {
              let stack = newStacks[i];
              for (let j = i + 1; j < newStacks.length; j++) {
                let other = newStacks[j];
                if (stack.sameState(other) || stack.buffer.length > 500 && other.buffer.length > 500) {
                  if ((stack.score - other.score || stack.buffer.length - other.buffer.length) > 0) {
                    newStacks.splice(j--, 1);
                  } else {
                    newStacks.splice(i--, 1);
                    continue outer;
                  }
                }
              }
            }
        }
        this.minStackPos = newStacks[0].pos;
        for (let i = 1; i < newStacks.length; i++)
          if (newStacks[i].pos < this.minStackPos)
            this.minStackPos = newStacks[i].pos;
        return null;
      }
      stopAt(pos) {
        if (this.stoppedAt != null && this.stoppedAt < pos)
          throw new RangeError("Can't move stoppedAt forward");
        this.stoppedAt = pos;
      }
      // Returns an updated version of the given stack, or null if the
      // stack can't advance normally. When `split` and `stacks` are
      // given, stacks split off by ambiguous operations will be pushed to
      // `split`, or added to `stacks` if they move `pos` forward.
      advanceStack(stack, stacks, split) {
        let start = stack.pos, { parser } = this;
        let base = verbose ? this.stackID(stack) + " -> " : "";
        if (this.stoppedAt != null && start > this.stoppedAt)
          return stack.forceReduce() ? stack : null;
        if (this.fragments) {
          let strictCx = stack.curContext && stack.curContext.tracker.strict, cxHash = strictCx ? stack.curContext.hash : 0;
          for (let cached = this.fragments.nodeAt(start); cached; ) {
            let match2 = this.parser.nodeSet.types[cached.type.id] == cached.type ? parser.getGoto(stack.state, cached.type.id) : -1;
            if (match2 > -1 && cached.length && (!strictCx || (cached.prop(common.NodeProp.contextHash) || 0) == cxHash)) {
              stack.useNode(cached, match2);
              if (verbose)
                console.log(base + this.stackID(stack) + ` (via reuse of ${parser.getName(cached.type.id)})`);
              return true;
            }
            if (!(cached instanceof common.Tree) || cached.children.length == 0 || cached.positions[0] > 0)
              break;
            let inner = cached.children[0];
            if (inner instanceof common.Tree && cached.positions[0] == 0)
              cached = inner;
            else
              break;
          }
        }
        let defaultReduce = parser.stateSlot(
          stack.state,
          4
          /* DefaultReduce */
        );
        if (defaultReduce > 0) {
          stack.reduce(defaultReduce);
          if (verbose)
            console.log(base + this.stackID(stack) + ` (via always-reduce ${parser.getName(
              defaultReduce & 65535
              /* ValueMask */
            )})`);
          return true;
        }
        if (stack.stack.length >= 15e3) {
          while (stack.stack.length > 9e3 && stack.forceReduce()) {
          }
        }
        let actions = this.tokens.getActions(stack);
        for (let i = 0; i < actions.length; ) {
          let action = actions[i++], term = actions[i++], end = actions[i++];
          let last = i == actions.length || !split;
          let localStack = last ? stack : stack.split();
          localStack.apply(action, term, end);
          if (verbose)
            console.log(base + this.stackID(localStack) + ` (via ${(action & 65536) == 0 ? "shift" : `reduce of ${parser.getName(
              action & 65535
              /* ValueMask */
            )}`} for ${parser.getName(term)} @ ${start}${localStack == stack ? "" : ", split"})`);
          if (last)
            return true;
          else if (localStack.pos > start)
            stacks.push(localStack);
          else
            split.push(localStack);
        }
        return false;
      }
      // Advance a given stack forward as far as it will go. Returns the
      // (possibly updated) stack if it got stuck, or null if it moved
      // forward and was given to `pushStackDedup`.
      advanceFully(stack, newStacks) {
        let pos = stack.pos;
        for (; ; ) {
          if (!this.advanceStack(stack, null, null))
            return false;
          if (stack.pos > pos) {
            pushStackDedup(stack, newStacks);
            return true;
          }
        }
      }
      runRecovery(stacks, tokens, newStacks) {
        let finished = null, restarted = false;
        for (let i = 0; i < stacks.length; i++) {
          let stack = stacks[i], token = tokens[i << 1], tokenEnd = tokens[(i << 1) + 1];
          let base = verbose ? this.stackID(stack) + " -> " : "";
          if (stack.deadEnd) {
            if (restarted)
              continue;
            restarted = true;
            stack.restart();
            if (verbose)
              console.log(base + this.stackID(stack) + " (restarted)");
            let done = this.advanceFully(stack, newStacks);
            if (done)
              continue;
          }
          let force = stack.split(), forceBase = base;
          for (let j = 0; force.forceReduce() && j < 10; j++) {
            if (verbose)
              console.log(forceBase + this.stackID(force) + " (via force-reduce)");
            let done = this.advanceFully(force, newStacks);
            if (done)
              break;
            if (verbose)
              forceBase = this.stackID(force) + " -> ";
          }
          for (let insert of stack.recoverByInsert(token)) {
            if (verbose)
              console.log(base + this.stackID(insert) + " (via recover-insert)");
            this.advanceFully(insert, newStacks);
          }
          if (this.stream.end > stack.pos) {
            if (tokenEnd == stack.pos) {
              tokenEnd++;
              token = 0;
            }
            stack.recoverByDelete(token, tokenEnd);
            if (verbose)
              console.log(base + this.stackID(stack) + ` (via recover-delete ${this.parser.getName(token)})`);
            pushStackDedup(stack, newStacks);
          } else if (!finished || finished.score < stack.score) {
            finished = stack;
          }
        }
        return finished;
      }
      // Convert the stack's buffer to a syntax tree.
      stackToTree(stack) {
        stack.close();
        return common.Tree.build({
          buffer: StackBufferCursor.create(stack),
          nodeSet: this.parser.nodeSet,
          topID: this.topTerm,
          maxBufferLength: this.parser.bufferLength,
          reused: this.reused,
          start: this.ranges[0].from,
          length: stack.pos - this.ranges[0].from,
          minRepeatType: this.parser.minRepeatTerm
        });
      }
      stackID(stack) {
        let id2 = (stackIDs || (stackIDs = /* @__PURE__ */ new WeakMap())).get(stack);
        if (!id2)
          stackIDs.set(stack, id2 = String.fromCodePoint(this.nextStackID++));
        return id2 + stack;
      }
    };
    function pushStackDedup(stack, newStacks) {
      for (let i = 0; i < newStacks.length; i++) {
        let other = newStacks[i];
        if (other.pos == stack.pos && other.sameState(stack)) {
          if (newStacks[i].score < stack.score)
            newStacks[i] = stack;
          return;
        }
      }
      newStacks.push(stack);
    }
    var Dialect = class {
      constructor(source, flags, disabled) {
        this.source = source;
        this.flags = flags;
        this.disabled = disabled;
      }
      allows(term) {
        return !this.disabled || this.disabled[term] == 0;
      }
    };
    var id = (x) => x;
    var ContextTracker = class {
      /// Define a context tracker.
      constructor(spec) {
        this.start = spec.start;
        this.shift = spec.shift || id;
        this.reduce = spec.reduce || id;
        this.reuse = spec.reuse || id;
        this.hash = spec.hash || (() => 0);
        this.strict = spec.strict !== false;
      }
    };
    var LRParser = class _LRParser extends common.Parser {
      /// @internal
      constructor(spec) {
        super();
        this.wrappers = [];
        if (spec.version != 13)
          throw new RangeError(`Parser version (${spec.version}) doesn't match runtime version (${13})`);
        let nodeNames = spec.nodeNames.split(" ");
        this.minRepeatTerm = nodeNames.length;
        for (let i = 0; i < spec.repeatNodeCount; i++)
          nodeNames.push("");
        let topTerms = Object.keys(spec.topRules).map((r) => spec.topRules[r][1]);
        let nodeProps = [];
        for (let i = 0; i < nodeNames.length; i++)
          nodeProps.push([]);
        function setProp(nodeID, prop, value) {
          nodeProps[nodeID].push([prop, prop.deserialize(String(value))]);
        }
        if (spec.nodeProps)
          for (let propSpec of spec.nodeProps) {
            let prop = propSpec[0];
            for (let i = 1; i < propSpec.length; ) {
              let next = propSpec[i++];
              if (next >= 0) {
                setProp(next, prop, propSpec[i++]);
              } else {
                let value = propSpec[i + -next];
                for (let j = -next; j > 0; j--)
                  setProp(propSpec[i++], prop, value);
                i++;
              }
            }
          }
        this.nodeSet = new common.NodeSet(nodeNames.map((name, i) => common.NodeType.define({
          name: i >= this.minRepeatTerm ? void 0 : name,
          id: i,
          props: nodeProps[i],
          top: topTerms.indexOf(i) > -1,
          error: i == 0,
          skipped: spec.skippedNodes && spec.skippedNodes.indexOf(i) > -1
        })));
        this.strict = false;
        this.bufferLength = common.DefaultBufferLength;
        let tokenArray = decodeArray(spec.tokenData);
        this.context = spec.context;
        this.specialized = new Uint16Array(spec.specialized ? spec.specialized.length : 0);
        this.specializers = [];
        if (spec.specialized)
          for (let i = 0; i < spec.specialized.length; i++) {
            this.specialized[i] = spec.specialized[i].term;
            this.specializers[i] = spec.specialized[i].get;
          }
        this.states = decodeArray(spec.states, Uint32Array);
        this.data = decodeArray(spec.stateData);
        this.goto = decodeArray(spec.goto);
        this.maxTerm = spec.maxTerm;
        this.tokenizers = spec.tokenizers.map((value) => typeof value == "number" ? new TokenGroup(tokenArray, value) : value);
        this.topRules = spec.topRules;
        this.dialects = spec.dialects || {};
        this.dynamicPrecedences = spec.dynamicPrecedences || null;
        this.tokenPrecTable = spec.tokenPrec;
        this.termNames = spec.termNames || null;
        this.maxNode = this.nodeSet.types.length - 1;
        this.dialect = this.parseDialect();
        this.top = this.topRules[Object.keys(this.topRules)[0]];
      }
      createParse(input, fragments, ranges) {
        let parse = new Parse(this, input, fragments, ranges);
        for (let w of this.wrappers)
          parse = w(parse, input, fragments, ranges);
        return parse;
      }
      /// Get a goto table entry @internal
      getGoto(state, term, loose = false) {
        let table = this.goto;
        if (term >= table[0])
          return -1;
        for (let pos = table[term + 1]; ; ) {
          let groupTag = table[pos++], last = groupTag & 1;
          let target = table[pos++];
          if (last && loose)
            return target;
          for (let end = pos + (groupTag >> 1); pos < end; pos++)
            if (table[pos] == state)
              return target;
          if (last)
            return -1;
        }
      }
      /// Check if this state has an action for a given terminal @internal
      hasAction(state, terminal) {
        let data = this.data;
        for (let set = 0; set < 2; set++) {
          for (let i = this.stateSlot(
            state,
            set ? 2 : 1
            /* Actions */
          ), next; ; i += 3) {
            if ((next = data[i]) == 65535) {
              if (data[i + 1] == 1)
                next = data[i = pair(data, i + 2)];
              else if (data[i + 1] == 2)
                return pair(data, i + 2);
              else
                break;
            }
            if (next == terminal || next == 0)
              return pair(data, i + 1);
          }
        }
        return 0;
      }
      /// @internal
      stateSlot(state, slot) {
        return this.states[state * 6 + slot];
      }
      /// @internal
      stateFlag(state, flag) {
        return (this.stateSlot(
          state,
          0
          /* Flags */
        ) & flag) > 0;
      }
      /// @internal
      validAction(state, action) {
        if (action == this.stateSlot(
          state,
          4
          /* DefaultReduce */
        ))
          return true;
        for (let i = this.stateSlot(
          state,
          1
          /* Actions */
        ); ; i += 3) {
          if (this.data[i] == 65535) {
            if (this.data[i + 1] == 1)
              i = pair(this.data, i + 2);
            else
              return false;
          }
          if (action == pair(this.data, i + 1))
            return true;
        }
      }
      /// Get the states that can follow this one through shift actions or
      /// goto jumps. @internal
      nextStates(state) {
        let result = [];
        for (let i = this.stateSlot(
          state,
          1
          /* Actions */
        ); ; i += 3) {
          if (this.data[i] == 65535) {
            if (this.data[i + 1] == 1)
              i = pair(this.data, i + 2);
            else
              break;
          }
          if ((this.data[i + 2] & 65536 >> 16) == 0) {
            let value = this.data[i + 1];
            if (!result.some((v, i2) => i2 & 1 && v == value))
              result.push(this.data[i], value);
          }
        }
        return result;
      }
      /// @internal
      overrides(token, prev) {
        let iPrev = findOffset(this.data, this.tokenPrecTable, prev);
        return iPrev < 0 || findOffset(this.data, this.tokenPrecTable, token) < iPrev;
      }
      /// Configure the parser. Returns a new parser instance that has the
      /// given settings modified. Settings not provided in `config` are
      /// kept from the original parser.
      configure(config) {
        let copy = Object.assign(Object.create(_LRParser.prototype), this);
        if (config.props)
          copy.nodeSet = this.nodeSet.extend(...config.props);
        if (config.top) {
          let info = this.topRules[config.top];
          if (!info)
            throw new RangeError(`Invalid top rule name ${config.top}`);
          copy.top = info;
        }
        if (config.tokenizers)
          copy.tokenizers = this.tokenizers.map((t) => {
            let found = config.tokenizers.find((r) => r.from == t);
            return found ? found.to : t;
          });
        if (config.contextTracker)
          copy.context = config.contextTracker;
        if (config.dialect)
          copy.dialect = this.parseDialect(config.dialect);
        if (config.strict != null)
          copy.strict = config.strict;
        if (config.wrap)
          copy.wrappers = copy.wrappers.concat(config.wrap);
        if (config.bufferLength != null)
          copy.bufferLength = config.bufferLength;
        return copy;
      }
      /// Returns the name associated with a given term. This will only
      /// work for all terms when the parser was generated with the
      /// `--names` option. By default, only the names of tagged terms are
      /// stored.
      getName(term) {
        return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
      }
      /// The eof term id is always allocated directly after the node
      /// types. @internal
      get eofTerm() {
        return this.maxNode + 1;
      }
      /// The type of top node produced by the parser.
      get topNode() {
        return this.nodeSet.types[this.top[1]];
      }
      /// @internal
      dynamicPrecedence(term) {
        let prec = this.dynamicPrecedences;
        return prec == null ? 0 : prec[term] || 0;
      }
      /// @internal
      parseDialect(dialect) {
        let values = Object.keys(this.dialects), flags = values.map(() => false);
        if (dialect)
          for (let part of dialect.split(" ")) {
            let id2 = values.indexOf(part);
            if (id2 >= 0)
              flags[id2] = true;
          }
        let disabled = null;
        for (let i = 0; i < values.length; i++)
          if (!flags[i]) {
            for (let j = this.dialects[values[i]], id2; (id2 = this.data[j++]) != 65535; )
              (disabled || (disabled = new Uint8Array(this.maxTerm + 1)))[id2] = 1;
          }
        return new Dialect(dialect, flags, disabled);
      }
      /// (used by the output of the parser generator) @internal
      static deserialize(spec) {
        return new _LRParser(spec);
      }
    };
    function pair(data, off) {
      return data[off] | data[off + 1] << 16;
    }
    function findOffset(data, start, term) {
      for (let i = start, next; (next = data[i]) != 65535; i++)
        if (next == term)
          return i - start;
      return -1;
    }
    function findFinished(stacks) {
      let best = null;
      for (let stack of stacks) {
        let stopped = stack.p.stoppedAt;
        if ((stack.pos == stack.p.stream.end || stopped != null && stack.pos > stopped) && stack.p.parser.stateFlag(
          stack.state,
          2
          /* Accepting */
        ) && (!best || best.score < stack.score))
          best = stack;
      }
      return best;
    }
    exports.ContextTracker = ContextTracker;
    exports.ExternalTokenizer = ExternalTokenizer;
    exports.InputStream = InputStream;
    exports.LRParser = LRParser;
    exports.Stack = Stack;
  }
});

// node_modules/@mischnic/json-sourcemap/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/@mischnic/json-sourcemap/dist/index.js"(exports, module2) {
    var $dpHg0$lezercommon = require_dist();
    var $dpHg0$json5 = require_lib();
    var $dpHg0$lezerlr = require_dist2();
    function $parcel$interopDefault(a) {
      return a && a.__esModule ? a.default : a;
    }
    function $parcel$export(e, n, v, s) {
      Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
    }
    $parcel$export(module2.exports, "parse", () => $e9bfae1610a637d5$export$98e6a39c04603d36);
    var $1adaef8fb7bb1497$export$8f49e4af10703ce3 = $dpHg0$lezerlr.LRParser.deserialize({
      version: 13,
      states: "%QO]QPOOOOQO'#Cd'#CdOtQQO'#CgO!PQPO'#ClOOQO'#Cs'#CsQOQPOOOOQO'#Ci'#CiO!WQPO'#ChO!]QPO'#CuOOQO,59R,59RO!eQPO,59ROOQO'#Cm'#CmO!jQPO'#CyOOQO,59W,59WO!rQPO,59WO]QPO,59SO!wQQO,59aO#SQPO,59aOOQO1G.m1G.mO#[QPO,59eO#cQPO,59eOOQO1G.r1G.rOOQO1G.n1G.nOOQO,59Y,59YO#kQQO1G.{OOQO-E6l-E6lOOQO,59Z,59ZO#vQPO1G/POOQO-E6m-E6mPwQQO'#CnP]QPO'#Co",
      stateData: "$R~OfOSPOSQOS~OSSOTSOUSOVSOYQO_ROhPO~OXXOhUOjUO~O^]O~P]Ok_O~Ol`OXiX~OXbO~OlcO^mX~O^eO~OhUOjUOXia~OlhOXia~O^ma~P]OlkO^ma~OhUOjUOXii~O^mi~P]OPQj~",
      goto: "!}nPPPPPPPPoPPow!PPPo!V!_!ePPP!kP!wPPP!z]SOR_cknQWQVg`hmXVQ`hmQ[RVjcknQaWRiaQd[RldQTOWZRcknRf_RYQR^R",
      nodeNames: "\u26A0 LineComment BlockComment JsonText True False Null Number String } { Object Property PropertyName ] [ Array ArrayValue",
      maxTerm: 29,
      nodeProps: [
        [
          $dpHg0$lezercommon.NodeProp.group,
          -7,
          4,
          5,
          6,
          7,
          8,
          11,
          16,
          "Value"
        ],
        [
          $dpHg0$lezercommon.NodeProp.openedBy,
          9,
          "{",
          14,
          "["
        ],
        [
          $dpHg0$lezercommon.NodeProp.closedBy,
          10,
          "}",
          15,
          "]"
        ]
      ],
      skippedNodes: [
        0,
        1,
        2
      ],
      repeatNodeCount: 2,
      tokenData: "NU~R!OXY$RYZ$RZ[$R[]$R]^$Rpq$Rrs$Wtu,ywx/S{|0n|}5U}!O0n!O!P1Q!P!Q5Z!Q!R2Q!R![3f![!]6j!c!k,y!k!l6o!l!p,y!p!q>s!q!},y!}#O@r#O#P-t#P#Q@w#R#S,y#T#Y,y#Y#Z@|#Z#b,y#b#cEz#c#h,y#h#iIz#i#o,y#o#pMz#q#rNP$f$g$R$g$IV,y$IV$IW$R$IW$I|,y$I|$I}$R$I}$JO$R$JU;'S,y;'S;=`.|<%l?HT,y?HT?HU$R?HU~,y~$WOf~~$ZVOp$ppq$Wqr$Wrs%Ss#O$W#O#P&a#P~$W~$sTOr$prs%Ss#O$p#O#P%X#P~$p~%XOh~~%[aYZ$p]^$prs$pwx$p!Q!R$p#O#P$p#T#U$p#U#V$p#Y#Z$p#b#c$p#f#g$p#h#i$p#i#j$p#j#k$p#l#m$p$I|$I}$p$I}$JO$p~&dbYZ$p]^$prs$Wwx$p!P!Q'l!Q!R$p#O#P$W#T#U$p#U#V$W#Y#Z$W#b#c$W#f#g$W#h#i$W#i#j)s#j#k$p#l#m$p$I|$I}$p$I}$JO$p~'oUpq'lqr'lrs%Ss#O'l#O#P(R#P~'l~(UXrs'l!P!Q'l#O#P'l#U#V'l#Y#Z'l#b#c'l#f#g'l#h#i'l#i#j(q~(tR!Q![(}!c!i(}#T#Z(}~)QR!Q![)Z!c!i)Z#T#Z)Z~)^R!Q![)g!c!i)g#T#Z)g~)jR!Q!['l!c!i'l#T#Z'l~)vZOr$prs%Ss!Q$p!Q![*i![!c$p!c!i*i!i#O$p#O#P%X#P#T$p#T#Z*i#Z~$p~*lZOr$prs%Ss!Q$p!Q![+_![!c$p!c!i+_!i#O$p#O#P%X#P#T$p#T#Z+_#Z~$p~+bZOr$prs%Ss!Q$p!Q![,T![!c$p!c!i,T!i#O$p#O#P%X#P#T$p#T#Z,T#Z~$p~,WZOr$prs%Ss!Q$p!Q![$W![!c$p!c!i$W!i#O$p#O#P%X#P#T$p#T#Z$W#Z~$pQ-O[jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yQ-wP#i#j-zQ-}R!Q![.W!c!i.W#T#Z.WQ.ZR!Q![.d!c!i.d#T#Z.dQ.gR!Q![.p!c!i.p#T#Z.pQ.sR!Q![,y!c!i,y#T#Z,yQ/PP;=`<%l,y~/VTOw/Swx%Sx#O/S#O#P/f#P~/S~/iaYZ/S]^/Srs/Swx/S!Q!R/S#O#P/S#T#U/S#U#V/S#Y#Z/S#b#c/S#f#g/S#h#i/S#i#j/S#j#k/S#l#m/S$I|$I}/S$I}$JO/SP0qT!O!P1Q!Q!R2Q!R![3f!k!l3w!p!q4xP1TP!Q![1WP1]RVP!Q![1W!g!h1f#X#Y1fP1iR{|1r}!O1r!Q![1xP1uP!Q![1xP1}PVP!Q![1xP2VTVP!O!P1W!Q![2f!g!h1f#X#Y1f#l#m2zP2iQ!O!P2o!Q![2fP2tQVP!g!h1f#X#Y1fP2}R!Q![3W!c!i3W#T#Z3WP3]RVP!Q![3W!c!i3W#T#Z3WP3kSVP!O!P1W!Q![3f!g!h1f#X#Y1fP3zP#b#c3}P4QP#Y#Z4TP4WP#]#^4ZP4^P#b#c4aP4dP#]#^4gP4jP#h#i4mP4pP#m#n4sP4xOVPP4{P#T#U5OP5RP!p!q4s~5ZOl~~5^Qz{5d!P!Q6X~5gROz5dz{5p{~5d~5sTOz5dz{5p{!P5d!P!Q6S!Q~5d~6XOQ~~6^SP~OY6XZ]6X^$I|6X$JO~6X~6oOk~R6t^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#b,y#b#c7p#c#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yR7u^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#Y,y#Y#Z8q#Z#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yR8v^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#],y#]#^9r#^#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yR9w^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#b,y#b#c:s#c#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yR:x^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#],y#]#^;t#^#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yR;y^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#h,y#h#i<u#i#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yR<z^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#m,y#m#n=v#n#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yR=}[VPjQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yR>x]jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#U?q#U#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yR?v^jQtu,y!Q![,y!c!p,y!p!q=v!q!},y#O#P-t#R#S,y#T#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,y~@wO_~~@|O^~RAR]jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#UAz#U#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRBP^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#`,y#`#aB{#a#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRCQ^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#g,y#g#hC|#h#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRDR^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#X,y#X#YD}#Y#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yREU[TPjQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRFP^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#i,y#i#jF{#j#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRGQ^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#`,y#`#aG|#a#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRHR^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#`,y#`#aH}#a#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRIU[UPjQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRJP^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#f,y#f#gJ{#g#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRKQ^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#i,y#i#jK|#j#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRLR^jQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#X,y#X#YL}#Y#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,yRMU[SPjQtu,y!Q![,y!c!},y#O#P-t#R#S,y#T#o,y$g$IV,y$IW$I|,y$JU;'S,y;'S;=`.|<%l?HT,y?HU~,y~NPOY~~NUOX~",
      tokenizers: [
        0,
        1
      ],
      topRules: {
        "JsonText": [
          0,
          3
        ]
      },
      dialects: {
        json5: 137
      },
      tokenPrec: 0
    });
    function $e9bfae1610a637d5$export$98e6a39c04603d36(input, reviver, { dialect = "json", tabWidth = 4 } = {}) {
      let data = dialect === "JSON5" ? $parcel$interopDefault($dpHg0$json5).parse(input, reviver) : JSON.parse(input, reviver);
      let tree = $1adaef8fb7bb1497$export$8f49e4af10703ce3.configure({
        strict: true,
        dialect: dialect === "JSON5" ? "json5" : "json"
      }).parse(input);
      let pointers = /* @__PURE__ */ new Map();
      let currentPath = [
        ""
      ];
      tree.iterate({
        enter(type, from, to, get) {
          let group = type.prop($dpHg0$lezercommon.NodeProp.group);
          if (group === null || group === void 0 ? void 0 : group.includes("Value"))
            $e9bfae1610a637d5$var$mapMerge(pointers, $e9bfae1610a637d5$var$toJsonPointer(currentPath), {
              value: $e9bfae1610a637d5$var$posToLineColumn(input, from, tabWidth),
              valueEnd: $e9bfae1610a637d5$var$posToLineColumn(input, to, tabWidth)
            });
          if (type.name === "PropertyName") {
            let nameNode = get();
            let name = input.slice(nameNode.from, nameNode.to);
            let quoted = name[0] === `'` || name[0] == `"`;
            currentPath.push(quoted ? name.slice(1, -1) : name);
            $e9bfae1610a637d5$var$mapMerge(pointers, $e9bfae1610a637d5$var$toJsonPointer(currentPath), {
              key: $e9bfae1610a637d5$var$posToLineColumn(input, from, tabWidth),
              keyEnd: $e9bfae1610a637d5$var$posToLineColumn(input, to, tabWidth)
            });
          } else if (type.name === "Array")
            currentPath.push(0);
        },
        leave(type, from, to, get) {
          if (type.name === "Property" || type.name === "Array")
            currentPath.pop();
          else if (type.name === "ArrayValue")
            currentPath[currentPath.length - 1]++;
        }
      });
      return {
        data,
        pointers: Object.fromEntries(pointers)
      };
    }
    function $e9bfae1610a637d5$var$mapMerge(map, key, data) {
      let value = map.get(key);
      value = {
        ...value,
        ...data
      };
      map.set(key, value);
    }
    function $e9bfae1610a637d5$var$posToLineColumn(input, pos, tabWidth) {
      let line = $e9bfae1610a637d5$var$countNewLines(input, pos);
      let lineStart = input.lastIndexOf("\n", pos - 1) + 1;
      let column = $e9bfae1610a637d5$var$countColumn(input, lineStart, pos, tabWidth);
      return {
        line,
        column,
        pos
      };
    }
    function $e9bfae1610a637d5$var$countNewLines(str, end) {
      let count = 0;
      for (let i = 0; i < end; i++)
        if (str[i] === "\n")
          count++;
      return count;
    }
    function $e9bfae1610a637d5$var$countColumn(str, start, end, tabWidth) {
      let count = 0;
      for (let i = start; i < end; i++)
        count += str[i] === "	" ? tabWidth : 1;
      return count;
    }
    var $e9bfae1610a637d5$var$ESCAPE_REGEX = /[~/]/g;
    function $e9bfae1610a637d5$var$toJsonPointer(path3) {
      let str = "";
      for (let e of path3)
        if (typeof e === "string")
          str += e.replace(
            $e9bfae1610a637d5$var$ESCAPE_REGEX,
            (v) => v === "~" ? "~0" : "~1"
          ) + "/";
        else
          str += String(e) + "/";
      return str.slice(0, -1);
    }
  }
});

// node_modules/@parcel/diagnostic/lib/diagnostic.js
var require_diagnostic = __commonJS({
  "node_modules/@parcel/diagnostic/lib/diagnostic.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.anyToDiagnostic = anyToDiagnostic;
    exports.convertSourceLocationToHighlight = convertSourceLocationToHighlight;
    exports.default = void 0;
    exports.encodeJSONKeyComponent = encodeJSONKeyComponent;
    exports.errorToDiagnostic = errorToDiagnostic;
    exports.escapeMarkdown = escapeMarkdown;
    exports.generateJSONCodeHighlights = generateJSONCodeHighlights;
    exports.getJSONHighlightLocation = getJSONHighlightLocation;
    exports.getJSONSourceLocation = getJSONSourceLocation;
    exports.md = md;
    function _assert() {
      const data = _interopRequireDefault(require("assert"));
      _assert = function() {
        return data;
      };
      return data;
    }
    function _nullthrows() {
      const data = _interopRequireDefault(require_nullthrows());
      _nullthrows = function() {
        return data;
      };
      return data;
    }
    function _jsonSourcemap() {
      const data = require_dist3();
      _jsonSourcemap = function() {
        return data;
      };
      return data;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function anyToDiagnostic(input) {
      if (Array.isArray(input)) {
        return input;
      } else if (input instanceof ThrowableDiagnostic2) {
        return input.diagnostics;
      } else if (input instanceof Error) {
        return errorToDiagnostic(input);
      } else if (typeof input === "string") {
        return [{
          message: input
        }];
      } else if (typeof input === "object") {
        return [input];
      } else {
        return errorToDiagnostic(input);
      }
    }
    function errorToDiagnostic(error, defaultValues) {
      var _defaultValues$origin2, _ref4, _error$highlightedCod;
      let codeFrames = void 0;
      if (typeof error === "string") {
        var _defaultValues$origin;
        return [{
          origin: (_defaultValues$origin = defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.origin) !== null && _defaultValues$origin !== void 0 ? _defaultValues$origin : "Error",
          message: escapeMarkdown(error)
        }];
      }
      if (error instanceof ThrowableDiagnostic2) {
        return error.diagnostics.map((d) => {
          var _ref, _d$origin;
          return {
            ...d,
            origin: (_ref = (_d$origin = d.origin) !== null && _d$origin !== void 0 ? _d$origin : defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.origin) !== null && _ref !== void 0 ? _ref : "unknown"
          };
        });
      }
      if (error.loc && error.source != null) {
        var _ref2, _ref3, _error$filePath;
        codeFrames = [{
          filePath: (_ref2 = (_ref3 = (_error$filePath = error.filePath) !== null && _error$filePath !== void 0 ? _error$filePath : error.fileName) !== null && _ref3 !== void 0 ? _ref3 : defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.filePath) !== null && _ref2 !== void 0 ? _ref2 : void 0,
          code: error.source,
          codeHighlights: [{
            start: {
              line: error.loc.line,
              column: error.loc.column
            },
            end: {
              line: error.loc.line,
              column: error.loc.column
            }
          }]
        }];
      }
      return [{
        origin: (_defaultValues$origin2 = defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.origin) !== null && _defaultValues$origin2 !== void 0 ? _defaultValues$origin2 : "Error",
        message: escapeMarkdown(error.message),
        name: error.name,
        stack: codeFrames == null ? (_ref4 = (_error$highlightedCod = error.highlightedCodeFrame) !== null && _error$highlightedCod !== void 0 ? _error$highlightedCod : error.codeFrame) !== null && _ref4 !== void 0 ? _ref4 : error.stack : void 0,
        codeFrames
      }];
    }
    var ThrowableDiagnostic2 = class extends Error {
      constructor(opts) {
        var _diagnostics$0$stack, _diagnostics$0$name;
        let diagnostics = Array.isArray(opts.diagnostic) ? opts.diagnostic : [opts.diagnostic];
        super(diagnostics[0].message);
        this.stack = (_diagnostics$0$stack = diagnostics[0].stack) !== null && _diagnostics$0$stack !== void 0 ? _diagnostics$0$stack : super.stack;
        this.name = (_diagnostics$0$name = diagnostics[0].name) !== null && _diagnostics$0$name !== void 0 ? _diagnostics$0$name : super.name;
        this.diagnostics = diagnostics;
      }
    };
    exports.default = ThrowableDiagnostic2;
    function generateJSONCodeHighlights(data, ids) {
      let map = typeof data == "string" ? (0, _jsonSourcemap().parse)(data, void 0, {
        dialect: "JSON5",
        tabWidth: 1
      }) : data;
      return ids.map(({
        key,
        type,
        message
      }) => {
        let pos = (0, _nullthrows().default)(map.pointers[key]);
        return {
          ...getJSONHighlightLocation(pos, type),
          message
        };
      });
    }
    function getJSONHighlightLocation(pos, type) {
      let key = "key" in pos ? pos.key : void 0;
      let keyEnd = "keyEnd" in pos ? pos.keyEnd : void 0;
      if (!type && key && pos.value) {
        return {
          start: {
            line: key.line + 1,
            column: key.column + 1
          },
          end: {
            line: pos.valueEnd.line + 1,
            column: pos.valueEnd.column
          }
        };
      } else if (type == "key" || !pos.value) {
        (0, _assert().default)(key && keyEnd);
        return {
          start: {
            line: key.line + 1,
            column: key.column + 1
          },
          end: {
            line: keyEnd.line + 1,
            column: keyEnd.column
          }
        };
      } else {
        return {
          start: {
            line: pos.value.line + 1,
            column: pos.value.column + 1
          },
          end: {
            line: pos.valueEnd.line + 1,
            column: pos.valueEnd.column
          }
        };
      }
    }
    function getJSONSourceLocation(pos, type) {
      let v = getJSONHighlightLocation(pos, type);
      return {
        start: v.start,
        end: {
          line: v.end.line,
          column: v.end.column + 1
        }
      };
    }
    function convertSourceLocationToHighlight({
      start,
      end
    }, message) {
      return {
        message,
        start,
        end: {
          line: end.line,
          column: end.column - 1
        }
      };
    }
    function encodeJSONKeyComponent(component) {
      return component.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    var escapeCharacters = ["\\", "*", "_", "~"];
    function escapeMarkdown(s) {
      let result = s;
      for (const char of escapeCharacters) {
        result = result.replace(new RegExp(`\\${char}`, "g"), `\\${char}`);
      }
      return result;
    }
    var mdVerbatim = Symbol();
    function md(strings, ...params) {
      let result = [];
      for (let i = 0; i < params.length; i++) {
        result.push(strings[i]);
        let param = params[i];
        if (Array.isArray(param)) {
          for (let j = 0; j < param.length; j++) {
            var _param$j$mdVerbatim, _param$j;
            result.push((_param$j$mdVerbatim = (_param$j = param[j]) === null || _param$j === void 0 ? void 0 : _param$j[mdVerbatim]) !== null && _param$j$mdVerbatim !== void 0 ? _param$j$mdVerbatim : escapeMarkdown(`${param[j]}`));
            if (j < param.length - 1) {
              result.push(", ");
            }
          }
        } else {
          var _param$mdVerbatim;
          result.push((_param$mdVerbatim = param === null || param === void 0 ? void 0 : param[mdVerbatim]) !== null && _param$mdVerbatim !== void 0 ? _param$mdVerbatim : escapeMarkdown(`${param}`));
        }
      }
      return result.join("") + strings[strings.length - 1];
    }
    md.bold = function(s) {
      return {
        [mdVerbatim]: "**" + escapeMarkdown(`${s}`) + "**"
      };
    };
    md.italic = function(s) {
      return {
        [mdVerbatim]: "_" + escapeMarkdown(`${s}`) + "_"
      };
    };
    md.underline = function(s) {
      return {
        [mdVerbatim]: "__" + escapeMarkdown(`${s}`) + "__"
      };
    };
    md.strikethrough = function(s) {
      return {
        [mdVerbatim]: "~~" + escapeMarkdown(`${s}`) + "~~"
      };
    };
  }
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports, module2) {
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand2(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand2(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m)
        return [str];
      var pre = m.pre;
      var post = m.post.length ? expand2(m.post, false) : [""];
      if (/\$$/.test(m.pre)) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + "{" + m.body + "}" + post[k];
          expansions.push(expansion);
        }
      } else {
        var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
        var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
        var isSequence = isNumericSequence || isAlphaSequence;
        var isOptions = m.body.indexOf(",") >= 0;
        if (!isSequence && !isOptions) {
          if (m.post.match(/,.*\}/)) {
            str = m.pre + "{" + m.body + escClose + m.post;
            return expand2(str);
          }
          return [str];
        }
        var n;
        if (isSequence) {
          n = m.body.split(/\.\./);
        } else {
          n = parseCommaParts(m.body);
          if (n.length === 1) {
            n = expand2(n[0], false).map(embrace);
            if (n.length === 1) {
              return post.map(function(p) {
                return m.pre + n[0] + p;
              });
            }
          }
        }
        var N;
        if (isSequence) {
          var x = numeric(n[0]);
          var y = numeric(n[1]);
          var width = Math.max(n[0].length, n[1].length);
          var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
          var test = lte;
          var reverse = y < x;
          if (reverse) {
            incr *= -1;
            test = gte;
          }
          var pad = n.some(isPadded);
          N = [];
          for (var i = x; test(i, y); i += incr) {
            var c;
            if (isAlphaSequence) {
              c = String.fromCharCode(i);
              if (c === "\\")
                c = "";
            } else {
              c = String(i);
              if (pad) {
                var need = width - c.length;
                if (need > 0) {
                  var z = new Array(need + 1).join("0");
                  if (i < 0)
                    c = "-" + z + c.slice(1);
                  else
                    c = z + c;
                }
              }
            }
            N.push(c);
          }
        } else {
          N = [];
          for (var j = 0; j < n.length; j++) {
            N.push.apply(N, expand2(n[j], false));
          }
        }
        for (var j = 0; j < N.length; j++) {
          for (var k = 0; k < post.length; k++) {
            var expansion = pre + N[j] + post[k];
            if (!isTop || isSequence || expansion)
              expansions.push(expansion);
          }
        }
      }
      return expansions;
    }
  }
});

// node_modules/omit/index.js
var require_omit = __commonJS({
  "node_modules/omit/index.js"(exports, module2) {
    module2.exports = function(rule) {
      function omit2(target) {
        var acceptVal;
        var copy = {};
        var key;
        var val;
        if (!target) {
          return target;
        }
        if (Array.isArray(target)) {
          return target.map(omit2);
        }
        for (var key in target) {
          if (target.hasOwnProperty(key)) {
            acceptVal = typeof rule != "function";
            if (rule.length === 1) {
              acceptVal = !rule(key);
            } else {
              val = target[key];
              acceptVal = !rule(key, val = target[key], target);
            }
            if (acceptVal) {
              copy[key] = val || target[key];
            }
          }
        }
        return copy;
      }
      function omitWhenEqual(value) {
        return function(key) {
          return key === value;
        };
      }
      function omitWhenIn(target) {
        return function(key) {
          return target.indexOf(key) >= 0;
        };
      }
      if (typeof rule == "string" || rule instanceof String) {
        rule = omitWhenEqual(rule);
      }
      if (Array.isArray(rule)) {
        rule = omitWhenIn(rule);
      }
      return arguments[1] !== void 0 ? omit2(arguments[1]) : omit2;
    };
  }
});

// node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "node_modules/fs.realpath/old.js"(exports) {
    var pathModule = require("path");
    var isWindows = process.platform === "win32";
    var fs2 = require("fs");
    var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        if (err) {
          backtrace.message = err.message;
          err = backtrace;
          missingCallback(err);
        }
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          else if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            if (process.traceDeprecation)
              console.trace(msg);
            else
              console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb === "function" ? cb : rethrow();
    }
    var normalize = pathModule.normalize;
    if (isWindows) {
      nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
    } else {
      nextPartRe = /(.*?)(?:[\/]+|$)/g;
    }
    var nextPartRe;
    if (isWindows) {
      splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    } else {
      splitRootRe = /^[\/]*/;
    }
    var splitRootRe;
    exports.realpathSync = function realpathSync(p, cache) {
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return cache[p];
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs2.lstatSync(base);
          knownHard[base] = true;
        }
      }
      while (pos < p.length) {
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          continue;
        }
        var resolvedLink;
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          resolvedLink = cache[base];
        } else {
          var stat = fs2.lstatSync(base);
          if (!stat.isSymbolicLink()) {
            knownHard[base] = true;
            if (cache)
              cache[base] = base;
            continue;
          }
          var linkTarget = null;
          if (!isWindows) {
            var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
            if (seenLinks.hasOwnProperty(id)) {
              linkTarget = seenLinks[id];
            }
          }
          if (linkTarget === null) {
            fs2.statSync(base);
            linkTarget = fs2.readlinkSync(base);
          }
          resolvedLink = pathModule.resolve(previous, linkTarget);
          if (cache)
            cache[base] = resolvedLink;
          if (!isWindows)
            seenLinks[id] = linkTarget;
        }
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
      if (cache)
        cache[original] = p;
      return p;
    };
    exports.realpath = function realpath(p, cache, cb) {
      if (typeof cb !== "function") {
        cb = maybeCallback(cache);
        cache = null;
      }
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return process.nextTick(cb.bind(null, null, cache[p]));
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs2.lstat(base, function(err) {
            if (err)
              return cb(err);
            knownHard[base] = true;
            LOOP();
          });
        } else {
          process.nextTick(LOOP);
        }
      }
      function LOOP() {
        if (pos >= p.length) {
          if (cache)
            cache[original] = p;
          return cb(null, p);
        }
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          return process.nextTick(LOOP);
        }
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          return gotResolvedLink(cache[base]);
        }
        return fs2.lstat(base, gotStat);
      }
      function gotStat(err, stat) {
        if (err)
          return cb(err);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache)
            cache[base] = base;
          return process.nextTick(LOOP);
        }
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            return gotTarget(null, seenLinks[id], base);
          }
        }
        fs2.stat(base, function(err2) {
          if (err2)
            return cb(err2);
          fs2.readlink(base, function(err3, target) {
            if (!isWindows)
              seenLinks[id] = target;
            gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base2) {
        if (err)
          return cb(err);
        var resolvedLink = pathModule.resolve(previous, target);
        if (cache)
          cache[base2] = resolvedLink;
        gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
    };
  }
});

// node_modules/fs.realpath/index.js
var require_fs = __commonJS({
  "node_modules/fs.realpath/index.js"(exports, module2) {
    module2.exports = realpath;
    realpath.realpath = realpath;
    realpath.sync = realpathSync;
    realpath.realpathSync = realpathSync;
    realpath.monkeypatch = monkeypatch;
    realpath.unmonkeypatch = unmonkeypatch;
    var fs2 = require("fs");
    var origRealpath = fs2.realpath;
    var origRealpathSync = fs2.realpathSync;
    var version = process.version;
    var ok = /^v[0-5]\./.test(version);
    var old = require_old();
    function newError(er) {
      return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
    }
    function realpath(p, cache, cb) {
      if (ok) {
        return origRealpath(p, cache, cb);
      }
      if (typeof cache === "function") {
        cb = cache;
        cache = null;
      }
      origRealpath(p, cache, function(er, result) {
        if (newError(er)) {
          old.realpath(p, cache, cb);
        } else {
          cb(er, result);
        }
      });
    }
    function realpathSync(p, cache) {
      if (ok) {
        return origRealpathSync(p, cache);
      }
      try {
        return origRealpathSync(p, cache);
      } catch (er) {
        if (newError(er)) {
          return old.realpathSync(p, cache);
        } else {
          throw er;
        }
      }
    }
    function monkeypatch() {
      fs2.realpath = realpath;
      fs2.realpathSync = realpathSync;
    }
    function unmonkeypatch() {
      fs2.realpath = origRealpath;
      fs2.realpathSync = origRealpathSync;
    }
  }
});

// node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "node_modules/concat-map/index.js"(exports, module2) {
    module2.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x))
          res.push.apply(res, x);
        else
          res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// node_modules/glob/node_modules/brace-expansion/index.js
var require_brace_expansion2 = __commonJS({
  "node_modules/glob/node_modules/brace-expansion/index.js"(exports, module2) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand2(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand2(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre))
        return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand2(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand2(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand2(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand2(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\")
              c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c = "-" + z + c.slice(1);
                else
                  c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function(el) {
          return expand2(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  }
});

// node_modules/glob/node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/glob/node_modules/minimatch/minimatch.js"(exports, module2) {
    module2.exports = minimatch2;
    minimatch2.Minimatch = Minimatch2;
    var path3 = function() {
      try {
        return require("path");
      } catch (e) {
      }
    }() || {
      sep: "/"
    };
    minimatch2.sep = path3.sep;
    var GLOBSTAR2 = minimatch2.GLOBSTAR = Minimatch2.GLOBSTAR = {};
    var expand2 = require_brace_expansion2();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark3 = "[^/]";
    var star3 = qmark3 + "*?";
    var twoStarDot2 = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot2 = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials2 = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch2.filter = filter2;
    function filter2(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch2(p, pattern, options);
      };
    }
    function ext2(a, b) {
      b = b || {};
      var t = {};
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      return t;
    }
    minimatch2.defaults = function(def) {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch2;
      }
      var orig = minimatch2;
      var m = function minimatch3(p, pattern, options) {
        return orig(p, pattern, ext2(def, options));
      };
      m.Minimatch = function Minimatch3(pattern, options) {
        return new orig.Minimatch(pattern, ext2(def, options));
      };
      m.Minimatch.defaults = function defaults2(options) {
        return orig.defaults(ext2(def, options)).Minimatch;
      };
      m.filter = function filter3(pattern, options) {
        return orig.filter(pattern, ext2(def, options));
      };
      m.defaults = function defaults2(options) {
        return orig.defaults(ext2(def, options));
      };
      m.makeRe = function makeRe3(pattern, options) {
        return orig.makeRe(pattern, ext2(def, options));
      };
      m.braceExpand = function braceExpand3(pattern, options) {
        return orig.braceExpand(pattern, ext2(def, options));
      };
      m.match = function(list, pattern, options) {
        return orig.match(list, pattern, ext2(def, options));
      };
      return m;
    };
    Minimatch2.defaults = function(def) {
      return minimatch2.defaults(def).Minimatch;
    };
    function minimatch2(p, pattern, options) {
      assertValidPattern2(pattern);
      if (!options)
        options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch2(pattern, options).match(p);
    }
    function Minimatch2(pattern, options) {
      if (!(this instanceof Minimatch2)) {
        return new Minimatch2(pattern, options);
      }
      assertValidPattern2(pattern);
      if (!options)
        options = {};
      pattern = pattern.trim();
      if (!options.allowWindowsEscape && path3.sep !== "/") {
        pattern = pattern.split(path3.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    Minimatch2.prototype.debug = function() {
    };
    Minimatch2.prototype.make = make;
    function make() {
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug)
        this.debug = function debug() {
          console.error.apply(console, arguments);
        };
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch2.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate)
        return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch2.braceExpand = function(pattern, options) {
      return braceExpand2(pattern, options);
    };
    Minimatch2.prototype.braceExpand = braceExpand2;
    function braceExpand2(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch2) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      assertValidPattern2(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand2(pattern);
    }
    var MAX_PATTERN_LENGTH2 = 1024 * 64;
    var assertValidPattern2 = function(pattern) {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH2) {
        throw new TypeError("pattern is too long");
      }
    };
    Minimatch2.prototype.parse = parse;
    var SUBPARSE = {};
    function parse(pattern, isSub) {
      assertValidPattern2(pattern);
      var options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR2;
        else
          pattern = "*";
      }
      if (pattern === "")
        return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star3;
              hasMagic = true;
              break;
            case "?":
              re += qmark3;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials2[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          case "/": {
            return false;
          }
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1)
                c = "^";
              re += c;
              continue;
            }
            self.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext)
              clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials2[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star3 : pl.type === "?" ? qmark3 : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart2 = false;
      switch (re.charAt(0)) {
        case "[":
        case ".":
        case "(":
          addPatternStart2 = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart2) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch2.makeRe = function(pattern, options) {
      return new Minimatch2(pattern, options || {}).makeRe();
    };
    Minimatch2.prototype.makeRe = makeRe2;
    function makeRe2() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star3 : options.dot ? twoStarDot2 : twoStarNoDot2;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR2 ? twoStar : typeof p === "string" ? regExpEscape3(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate)
        re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch2.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch2(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch2.prototype.match = function match2(f, partial) {
      if (typeof partial === "undefined")
        partial = this.partial;
      this.debug("match", f, this.pattern);
      if (this.comment)
        return false;
      if (this.empty)
        return f === "";
      if (f === "/" && partial)
        return true;
      var options = this.options;
      if (path3.sep !== "/") {
        f = f.split(path3.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename)
          break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate)
            return true;
          return !this.negate;
        }
      }
      if (options.flipNegate)
        return false;
      return this.negate;
    };
    Minimatch2.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug(
        "matchOne",
        { "this": this, file, pattern }
      );
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false)
          return false;
        if (p === GLOBSTAR2) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl)
              return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape3(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function")
        throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "node_modules/path-is-absolute/index.js"(exports, module2) {
    "use strict";
    function posix(path3) {
      return path3.charAt(0) === "/";
    }
    function win32(path3) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path3);
      var device = result[1] || "";
      var isUnc = Boolean(device && device.charAt(1) !== ":");
      return Boolean(result[2] || isUnc);
    }
    module2.exports = process.platform === "win32" ? win32 : posix;
    module2.exports.posix = posix;
    module2.exports.win32 = win32;
  }
});

// node_modules/glob/common.js
var require_common = __commonJS({
  "node_modules/glob/common.js"(exports) {
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var fs2 = require("fs");
    var path3 = require("path");
    var minimatch2 = require_minimatch();
    var isAbsolute = require_path_is_absolute();
    var Minimatch2 = minimatch2.Minimatch;
    function alphasort(a, b) {
      return a.localeCompare(b, "en");
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [];
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore];
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch2(gpattern, { dot: true });
      }
      return {
        matcher: new Minimatch2(pattern, { dot: true }),
        gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent;
      self.pattern = pattern;
      self.strict = options.strict !== false;
      self.realpath = !!options.realpath;
      self.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self.follow = !!options.follow;
      self.dot = !!options.dot;
      self.mark = !!options.mark;
      self.nodir = !!options.nodir;
      if (self.nodir)
        self.mark = true;
      self.sync = !!options.sync;
      self.nounique = !!options.nounique;
      self.nonull = !!options.nonull;
      self.nosort = !!options.nosort;
      self.nocase = !!options.nocase;
      self.stat = !!options.stat;
      self.noprocess = !!options.noprocess;
      self.absolute = !!options.absolute;
      self.fs = options.fs || fs2;
      self.maxLength = options.maxLength || Infinity;
      self.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self, options);
      self.changedCwd = false;
      var cwd = process.cwd();
      if (!ownProp(options, "cwd"))
        self.cwd = cwd;
      else {
        self.cwd = path3.resolve(options.cwd);
        self.changedCwd = self.cwd !== cwd;
      }
      self.root = options.root || path3.resolve(self.cwd, "/");
      self.root = path3.resolve(self.root);
      if (process.platform === "win32")
        self.root = self.root.replace(/\\/g, "/");
      self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
      if (process.platform === "win32")
        self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
      self.nomount = !!options.nomount;
      options.nonegate = true;
      options.nocomment = true;
      options.allowWindowsEscape = false;
      self.minimatch = new Minimatch2(pattern, options);
      self.options = self.minimatch.options;
    }
    function finish(self) {
      var nou = self.nounique;
      var all = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all.push.apply(all, m);
          else
            m.forEach(function(m2) {
              all[m2] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self.nosort)
        all = all.sort(alphasort);
      if (self.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self._mark(all[i]);
        }
        if (self.nodir) {
          all = all.filter(function(e) {
            var notDir = !/\/$/.test(e);
            var c = self.cache[e] || self.cache[makeAbs(self, e)];
            if (notDir && c)
              notDir = c !== "DIR" && !Array.isArray(c);
            return notDir;
          });
        }
      }
      if (self.ignore.length)
        all = all.filter(function(m2) {
          return !isIgnored(self, m2);
        });
      self.found = all;
    }
    function mark(self, p) {
      var abs = makeAbs(self, p);
      var c = self.cache[abs];
      var m = p;
      if (c) {
        var isDir = c === "DIR" || Array.isArray(c);
        var slash = p.slice(-1) === "/";
        if (isDir && !slash)
          m += "/";
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self, m);
          self.statCache[mabs] = self.statCache[abs];
          self.cache[mabs] = self.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self, f) {
      var abs = f;
      if (f.charAt(0) === "/") {
        abs = path3.join(self.root, f);
      } else if (isAbsolute(f) || f === "") {
        abs = f;
      } else if (self.changedCwd) {
        abs = path3.resolve(self.cwd, f);
      } else {
        abs = path3.resolve(f);
      }
      if (process.platform === "win32")
        abs = abs.replace(/\\/g, "/");
      return abs;
    }
    function isIgnored(self, path4) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return item.matcher.match(path4) || !!(item.gmatcher && item.gmatcher.match(path4));
      });
    }
    function childrenIgnored(self, path4) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path4));
      });
    }
  }
});

// node_modules/glob/sync.js
var require_sync = __commonJS({
  "node_modules/glob/sync.js"(exports, module2) {
    module2.exports = globSync;
    globSync.GlobSync = GlobSync;
    var rp = require_fs();
    var minimatch2 = require_minimatch();
    var Minimatch2 = minimatch2.Minimatch;
    var Glob = require_glob().Glob;
    var util = require("util");
    var path3 = require("path");
    var assert2 = require("assert");
    var isAbsolute = require_path_is_absolute();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert2.ok(this instanceof GlobSync);
      if (this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset) {
            try {
              p = self._makeAbs(p);
              var real = rp.realpathSync(p, self.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === "stat")
                set[self._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert2.ok(this instanceof GlobSync);
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return;
      var isGlobStar = remain[0] === minimatch2.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path3.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (isIgnored(this, e))
        return;
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute) {
        e = abs;
      }
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er.code === "ENOENT") {
          return null;
        }
      }
      var isSym = lstat && lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return null;
        if (Array.isArray(c))
          return c;
      }
      try {
        return this._readdirEntries(abs, this.fs.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            throw error;
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path3.join(this.root, prefix);
        } else {
          prefix = path3.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return c;
        if (needDir && c === "FILE")
          return false;
      }
      var exists;
      var stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = this.fs.lstatSync(abs);
        } catch (er) {
          if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
            this.statCache[abs] = false;
            return false;
          }
        }
        if (lstat && lstat.isSymbolicLink()) {
          try {
            stat = this.fs.statSync(abs);
          } catch (er) {
            stat = lstat;
          }
        } else {
          stat = lstat;
        }
      }
      this.statCache[abs] = stat;
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return false;
      return c;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/wrappy/wrappy.js"(exports, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/once/once.js"(exports, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called)
          return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "node_modules/inflight/inflight.js"(exports, module2) {
    var wrappy = require_wrappy();
    var reqs = /* @__PURE__ */ Object.create(null);
    var once = require_once();
    module2.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice(arguments);
        try {
          for (var i = 0; i < len; i++) {
            cbs[i].apply(null, args);
          }
        } finally {
          if (cbs.length > len) {
            cbs.splice(0, len);
            process.nextTick(function() {
              RES.apply(null, args);
            });
          } else {
            delete reqs[key];
          }
        }
      });
    }
    function slice(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++)
        array[i] = args[i];
      return array;
    }
  }
});

// node_modules/glob/glob.js
var require_glob = __commonJS({
  "node_modules/glob/glob.js"(exports, module2) {
    module2.exports = glob;
    var rp = require_fs();
    var minimatch2 = require_minimatch();
    var Minimatch2 = minimatch2.Minimatch;
    var inherits = require_inherits();
    var EE = require("events").EventEmitter;
    var path3 = require("path");
    var assert2 = require("assert");
    var isAbsolute = require_path_is_absolute();
    var globSync = require_sync();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util = require("util");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require_once();
    function glob(pattern, options, cb) {
      if (typeof options === "function")
        cb = options, options = {};
      if (!options)
        options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob.sync = globSync;
    var GlobSync = glob.GlobSync = globSync.GlobSync;
    glob.glob = glob;
    function extend(origin, add) {
      if (add === null || typeof add !== "object") {
        return origin;
      }
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    glob.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (!pattern)
        return false;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== "string")
          return true;
      }
      return false;
    };
    glob.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      if (typeof cb === "function") {
        cb = once(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self = this;
      this._processing = 0;
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n === 0)
        return done();
      var sync = true;
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      sync = false;
      function done() {
        --self._processing;
        if (self._processing <= 0) {
          if (sync) {
            process.nextTick(function() {
              self._finish();
            });
          } else {
            self._finish();
          }
        }
      }
    }
    Glob.prototype._finish = function() {
      assert2(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      var self = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n === 0)
          self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self = this;
      var n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self._makeAbs(p);
        rp.realpath(p, self.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === "stat")
            set[p] = true;
          else
            self.emit("error", er);
          if (--n === 0) {
            self.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert2(this instanceof Glob);
      assert2(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch2.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path3.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = isAbsolute(e) ? e : this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute)
        e = abs;
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit("stat", e, st);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        self.fs.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er && er.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self.symlinks[abs] = isSym;
        if (!isSym && lstat && !lstat.isDirectory()) {
          self.cache[abs] = "FILE";
          cb();
        } else
          self._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return cb();
        if (Array.isArray(c))
          return cb(null, c);
      }
      var self = this;
      self.fs.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self, abs, cb) {
      return function(er, entries) {
        if (er)
          self._readdirError(abs, er, cb);
        else
          self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return;
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            this.emit("error", error);
            this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit("error", er);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er, exists) {
        self._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path3.join(this.root, prefix);
        } else {
          prefix = path3.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return cb(null, c);
        if (needDir && c === "FILE")
          return cb();
      }
      var exists;
      var stat = this.statCache[abs];
      if (stat !== void 0) {
        if (stat === false)
          return cb(null, stat);
        else {
          var type = stat.isDirectory() ? "DIR" : "FILE";
          if (needDir && type === "FILE")
            return cb();
          else
            return cb(null, type, stat);
        }
      }
      var self = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        self.fs.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return self.fs.stat(abs, function(er2, stat2) {
            if (er2)
              self._stat2(f, abs, null, lstat, cb);
            else
              self._stat2(f, abs, er2, stat2, cb);
          });
        } else {
          self._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === "/";
      this.statCache[abs] = stat;
      if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
        return cb(null, false, stat);
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return cb();
      return cb(null, c, stat);
    };
  }
});

// node_modules/rimraf/rimraf.js
var require_rimraf = __commonJS({
  "node_modules/rimraf/rimraf.js"(exports, module2) {
    var assert2 = require("assert");
    var path3 = require("path");
    var fs2 = require("fs");
    var glob = void 0;
    try {
      glob = require_glob();
    } catch (_err) {
    }
    var defaultGlobOpts = {
      nosort: true,
      silent: true
    };
    var timeout = 0;
    var isWindows = process.platform === "win32";
    var defaults2 = (options) => {
      const methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach((m) => {
        options[m] = options[m] || fs2[m];
        m = m + "Sync";
        options[m] = options[m] || fs2[m];
      });
      options.maxBusyTries = options.maxBusyTries || 3;
      options.emfileWait = options.emfileWait || 1e3;
      if (options.glob === false) {
        options.disableGlob = true;
      }
      if (options.disableGlob !== true && glob === void 0) {
        throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
      }
      options.disableGlob = options.disableGlob || false;
      options.glob = options.glob || defaultGlobOpts;
    };
    var rimraf = (p, options, cb) => {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      assert2(p, "rimraf: missing path");
      assert2.equal(typeof p, "string", "rimraf: path should be a string");
      assert2.equal(typeof cb, "function", "rimraf: callback function required");
      assert2(options, "rimraf: invalid options argument provided");
      assert2.equal(typeof options, "object", "rimraf: options should be object");
      defaults2(options);
      let busyTries = 0;
      let errState = null;
      let n = 0;
      const next = (er) => {
        errState = errState || er;
        if (--n === 0)
          cb(errState);
      };
      const afterGlob = (er, results) => {
        if (er)
          return cb(er);
        n = results.length;
        if (n === 0)
          return cb();
        results.forEach((p2) => {
          const CB = (er2) => {
            if (er2) {
              if ((er2.code === "EBUSY" || er2.code === "ENOTEMPTY" || er2.code === "EPERM") && busyTries < options.maxBusyTries) {
                busyTries++;
                return setTimeout(() => rimraf_(p2, options, CB), busyTries * 100);
              }
              if (er2.code === "EMFILE" && timeout < options.emfileWait) {
                return setTimeout(() => rimraf_(p2, options, CB), timeout++);
              }
              if (er2.code === "ENOENT")
                er2 = null;
            }
            timeout = 0;
            next(er2);
          };
          rimraf_(p2, options, CB);
        });
      };
      if (options.disableGlob || !glob.hasMagic(p))
        return afterGlob(null, [p]);
      options.lstat(p, (er, stat) => {
        if (!er)
          return afterGlob(null, [p]);
        glob(p, options.glob, afterGlob);
      });
    };
    var rimraf_ = (p, options, cb) => {
      assert2(p);
      assert2(options);
      assert2(typeof cb === "function");
      options.lstat(p, (er, st) => {
        if (er && er.code === "ENOENT")
          return cb(null);
        if (er && er.code === "EPERM" && isWindows)
          fixWinEPERM(p, options, er, cb);
        if (st && st.isDirectory())
          return rmdir(p, options, er, cb);
        options.unlink(p, (er2) => {
          if (er2) {
            if (er2.code === "ENOENT")
              return cb(null);
            if (er2.code === "EPERM")
              return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
            if (er2.code === "EISDIR")
              return rmdir(p, options, er2, cb);
          }
          return cb(er2);
        });
      });
    };
    var fixWinEPERM = (p, options, er, cb) => {
      assert2(p);
      assert2(options);
      assert2(typeof cb === "function");
      options.chmod(p, 438, (er2) => {
        if (er2)
          cb(er2.code === "ENOENT" ? null : er);
        else
          options.stat(p, (er3, stats) => {
            if (er3)
              cb(er3.code === "ENOENT" ? null : er);
            else if (stats.isDirectory())
              rmdir(p, options, er, cb);
            else
              options.unlink(p, cb);
          });
      });
    };
    var fixWinEPERMSync = (p, options, er) => {
      assert2(p);
      assert2(options);
      try {
        options.chmodSync(p, 438);
      } catch (er2) {
        if (er2.code === "ENOENT")
          return;
        else
          throw er;
      }
      let stats;
      try {
        stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT")
          return;
        else
          throw er;
      }
      if (stats.isDirectory())
        rmdirSync(p, options, er);
      else
        options.unlinkSync(p);
    };
    var rmdir = (p, options, originalEr, cb) => {
      assert2(p);
      assert2(options);
      assert2(typeof cb === "function");
      options.rmdir(p, (er) => {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
          rmkids(p, options, cb);
        else if (er && er.code === "ENOTDIR")
          cb(originalEr);
        else
          cb(er);
      });
    };
    var rmkids = (p, options, cb) => {
      assert2(p);
      assert2(options);
      assert2(typeof cb === "function");
      options.readdir(p, (er, files) => {
        if (er)
          return cb(er);
        let n = files.length;
        if (n === 0)
          return options.rmdir(p, cb);
        let errState;
        files.forEach((f) => {
          rimraf(path3.join(p, f), options, (er2) => {
            if (errState)
              return;
            if (er2)
              return cb(errState = er2);
            if (--n === 0)
              options.rmdir(p, cb);
          });
        });
      });
    };
    var rimrafSync = (p, options) => {
      options = options || {};
      defaults2(options);
      assert2(p, "rimraf: missing path");
      assert2.equal(typeof p, "string", "rimraf: path should be a string");
      assert2(options, "rimraf: missing options");
      assert2.equal(typeof options, "object", "rimraf: options should be object");
      let results;
      if (options.disableGlob || !glob.hasMagic(p)) {
        results = [p];
      } else {
        try {
          options.lstatSync(p);
          results = [p];
        } catch (er) {
          results = glob.sync(p, options.glob);
        }
      }
      if (!results.length)
        return;
      for (let i = 0; i < results.length; i++) {
        const p2 = results[i];
        let st;
        try {
          st = options.lstatSync(p2);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM" && isWindows)
            fixWinEPERMSync(p2, options, er);
        }
        try {
          if (st && st.isDirectory())
            rmdirSync(p2, options, null);
          else
            options.unlinkSync(p2);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM")
            return isWindows ? fixWinEPERMSync(p2, options, er) : rmdirSync(p2, options, er);
          if (er.code !== "EISDIR")
            throw er;
          rmdirSync(p2, options, er);
        }
      }
    };
    var rmdirSync = (p, options, originalEr) => {
      assert2(p);
      assert2(options);
      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "ENOTDIR")
          throw originalEr;
        if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
          rmkidsSync(p, options);
      }
    };
    var rmkidsSync = (p, options) => {
      assert2(p);
      assert2(options);
      options.readdirSync(p).forEach((f) => rimrafSync(path3.join(p, f), options));
      const retries = isWindows ? 100 : 1;
      let i = 0;
      do {
        let threw = true;
        try {
          const ret = options.rmdirSync(p, options);
          threw = false;
          return ret;
        } finally {
          if (++i < retries && threw)
            continue;
        }
      } while (true);
    };
    module2.exports = rimraf;
    rimraf.sync = rimrafSync;
  }
});

// node_modules/tmp/lib/tmp.js
var require_tmp = __commonJS({
  "node_modules/tmp/lib/tmp.js"(exports, module2) {
    var fs2 = require("fs");
    var os = require("os");
    var path3 = require("path");
    var crypto = require("crypto");
    var _c = { fs: fs2.constants, os: os.constants };
    var rimraf = require_rimraf();
    var RANDOM_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var TEMPLATE_PATTERN = /XXXXXX/;
    var DEFAULT_TRIES = 3;
    var CREATE_FLAGS = (_c.O_CREAT || _c.fs.O_CREAT) | (_c.O_EXCL || _c.fs.O_EXCL) | (_c.O_RDWR || _c.fs.O_RDWR);
    var IS_WIN32 = os.platform() === "win32";
    var EBADF = _c.EBADF || _c.os.errno.EBADF;
    var ENOENT = _c.ENOENT || _c.os.errno.ENOENT;
    var DIR_MODE = 448;
    var FILE_MODE = 384;
    var EXIT = "exit";
    var _removeObjects = [];
    var FN_RMDIR_SYNC = fs2.rmdirSync.bind(fs2);
    var FN_RIMRAF_SYNC = rimraf.sync;
    var _gracefulCleanup = false;
    function tmpName(options, callback) {
      const args = _parseArguments(options, callback), opts = args[0], cb = args[1];
      try {
        _assertAndSanitizeOptions(opts);
      } catch (err) {
        return cb(err);
      }
      let tries = opts.tries;
      (function _getUniqueName() {
        try {
          const name = _generateTmpName(opts);
          fs2.stat(name, function(err) {
            if (!err) {
              if (tries-- > 0)
                return _getUniqueName();
              return cb(new Error("Could not get a unique tmp filename, max tries reached " + name));
            }
            cb(null, name);
          });
        } catch (err) {
          cb(err);
        }
      })();
    }
    function tmpNameSync(options) {
      const args = _parseArguments(options), opts = args[0];
      _assertAndSanitizeOptions(opts);
      let tries = opts.tries;
      do {
        const name = _generateTmpName(opts);
        try {
          fs2.statSync(name);
        } catch (e) {
          return name;
        }
      } while (tries-- > 0);
      throw new Error("Could not get a unique tmp filename, max tries reached");
    }
    function file(options, callback) {
      const args = _parseArguments(options, callback), opts = args[0], cb = args[1];
      tmpName(opts, function _tmpNameCreated(err, name) {
        if (err)
          return cb(err);
        fs2.open(name, CREATE_FLAGS, opts.mode || FILE_MODE, function _fileCreated(err2, fd) {
          if (err2)
            return cb(err2);
          if (opts.discardDescriptor) {
            return fs2.close(fd, function _discardCallback(possibleErr) {
              return cb(possibleErr, name, void 0, _prepareTmpFileRemoveCallback(name, -1, opts, false));
            });
          } else {
            const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
            cb(null, name, fd, _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, false));
          }
        });
      });
    }
    function fileSync2(options) {
      const args = _parseArguments(options), opts = args[0];
      const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
      const name = tmpNameSync(opts);
      var fd = fs2.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
      if (opts.discardDescriptor) {
        fs2.closeSync(fd);
        fd = void 0;
      }
      return {
        name,
        fd,
        removeCallback: _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts, true)
      };
    }
    function dir(options, callback) {
      const args = _parseArguments(options, callback), opts = args[0], cb = args[1];
      tmpName(opts, function _tmpNameCreated(err, name) {
        if (err)
          return cb(err);
        fs2.mkdir(name, opts.mode || DIR_MODE, function _dirCreated(err2) {
          if (err2)
            return cb(err2);
          cb(null, name, _prepareTmpDirRemoveCallback(name, opts, false));
        });
      });
    }
    function dirSync(options) {
      const args = _parseArguments(options), opts = args[0];
      const name = tmpNameSync(opts);
      fs2.mkdirSync(name, opts.mode || DIR_MODE);
      return {
        name,
        removeCallback: _prepareTmpDirRemoveCallback(name, opts, true)
      };
    }
    function _removeFileAsync(fdPath, next) {
      const _handler = function(err) {
        if (err && !_isENOENT(err)) {
          return next(err);
        }
        next();
      };
      if (0 <= fdPath[0])
        fs2.close(fdPath[0], function() {
          fs2.unlink(fdPath[1], _handler);
        });
      else
        fs2.unlink(fdPath[1], _handler);
    }
    function _removeFileSync(fdPath) {
      let rethrownException = null;
      try {
        if (0 <= fdPath[0])
          fs2.closeSync(fdPath[0]);
      } catch (e) {
        if (!_isEBADF(e) && !_isENOENT(e))
          throw e;
      } finally {
        try {
          fs2.unlinkSync(fdPath[1]);
        } catch (e) {
          if (!_isENOENT(e))
            rethrownException = e;
        }
      }
      if (rethrownException !== null) {
        throw rethrownException;
      }
    }
    function _prepareTmpFileRemoveCallback(name, fd, opts, sync) {
      const removeCallbackSync = _prepareRemoveCallback(_removeFileSync, [fd, name], sync);
      const removeCallback = _prepareRemoveCallback(_removeFileAsync, [fd, name], sync, removeCallbackSync);
      if (!opts.keep)
        _removeObjects.unshift(removeCallbackSync);
      return sync ? removeCallbackSync : removeCallback;
    }
    function _prepareTmpDirRemoveCallback(name, opts, sync) {
      const removeFunction = opts.unsafeCleanup ? rimraf : fs2.rmdir.bind(fs2);
      const removeFunctionSync = opts.unsafeCleanup ? FN_RIMRAF_SYNC : FN_RMDIR_SYNC;
      const removeCallbackSync = _prepareRemoveCallback(removeFunctionSync, name, sync);
      const removeCallback = _prepareRemoveCallback(removeFunction, name, sync, removeCallbackSync);
      if (!opts.keep)
        _removeObjects.unshift(removeCallbackSync);
      return sync ? removeCallbackSync : removeCallback;
    }
    function _prepareRemoveCallback(removeFunction, fileOrDirName, sync, cleanupCallbackSync) {
      let called = false;
      return function _cleanupCallback(next) {
        if (!called) {
          const toRemove = cleanupCallbackSync || _cleanupCallback;
          const index = _removeObjects.indexOf(toRemove);
          if (index >= 0)
            _removeObjects.splice(index, 1);
          called = true;
          if (sync || removeFunction === FN_RMDIR_SYNC || removeFunction === FN_RIMRAF_SYNC) {
            return removeFunction(fileOrDirName);
          } else {
            return removeFunction(fileOrDirName, next || function() {
            });
          }
        }
      };
    }
    function _garbageCollector() {
      if (!_gracefulCleanup)
        return;
      while (_removeObjects.length) {
        try {
          _removeObjects[0]();
        } catch (e) {
        }
      }
    }
    function _randomChars(howMany) {
      let value = [], rnd = null;
      try {
        rnd = crypto.randomBytes(howMany);
      } catch (e) {
        rnd = crypto.pseudoRandomBytes(howMany);
      }
      for (var i = 0; i < howMany; i++) {
        value.push(RANDOM_CHARS[rnd[i] % RANDOM_CHARS.length]);
      }
      return value.join("");
    }
    function _isBlank(s) {
      return s === null || _isUndefined(s) || !s.trim();
    }
    function _isUndefined(obj) {
      return typeof obj === "undefined";
    }
    function _parseArguments(options, callback) {
      if (typeof options === "function") {
        return [{}, options];
      }
      if (_isUndefined(options)) {
        return [{}, callback];
      }
      const actualOptions = {};
      for (const key of Object.getOwnPropertyNames(options)) {
        actualOptions[key] = options[key];
      }
      return [actualOptions, callback];
    }
    function _generateTmpName(opts) {
      const tmpDir = opts.tmpdir;
      if (!_isUndefined(opts.name))
        return path3.join(tmpDir, opts.dir, opts.name);
      if (!_isUndefined(opts.template))
        return path3.join(tmpDir, opts.dir, opts.template).replace(TEMPLATE_PATTERN, _randomChars(6));
      const name = [
        opts.prefix ? opts.prefix : "tmp",
        "-",
        process.pid,
        "-",
        _randomChars(12),
        opts.postfix ? "-" + opts.postfix : ""
      ].join("");
      return path3.join(tmpDir, opts.dir, name);
    }
    function _assertAndSanitizeOptions(options) {
      options.tmpdir = _getTmpDir(options);
      const tmpDir = options.tmpdir;
      if (!_isUndefined(options.name))
        _assertIsRelative(options.name, "name", tmpDir);
      if (!_isUndefined(options.dir))
        _assertIsRelative(options.dir, "dir", tmpDir);
      if (!_isUndefined(options.template)) {
        _assertIsRelative(options.template, "template", tmpDir);
        if (!options.template.match(TEMPLATE_PATTERN))
          throw new Error(`Invalid template, found "${options.template}".`);
      }
      if (!_isUndefined(options.tries) && isNaN(options.tries) || options.tries < 0)
        throw new Error(`Invalid tries, found "${options.tries}".`);
      options.tries = _isUndefined(options.name) ? options.tries || DEFAULT_TRIES : 1;
      options.keep = !!options.keep;
      options.detachDescriptor = !!options.detachDescriptor;
      options.discardDescriptor = !!options.discardDescriptor;
      options.unsafeCleanup = !!options.unsafeCleanup;
      options.dir = _isUndefined(options.dir) ? "" : path3.relative(tmpDir, _resolvePath(options.dir, tmpDir));
      options.template = _isUndefined(options.template) ? void 0 : path3.relative(tmpDir, _resolvePath(options.template, tmpDir));
      options.template = _isBlank(options.template) ? void 0 : path3.relative(options.dir, options.template);
      options.name = _isUndefined(options.name) ? void 0 : _sanitizeName(options.name);
      options.prefix = _isUndefined(options.prefix) ? "" : options.prefix;
      options.postfix = _isUndefined(options.postfix) ? "" : options.postfix;
    }
    function _resolvePath(name, tmpDir) {
      const sanitizedName = _sanitizeName(name);
      if (sanitizedName.startsWith(tmpDir)) {
        return path3.resolve(sanitizedName);
      } else {
        return path3.resolve(path3.join(tmpDir, sanitizedName));
      }
    }
    function _sanitizeName(name) {
      if (_isBlank(name)) {
        return name;
      }
      return name.replace(/["']/g, "");
    }
    function _assertIsRelative(name, option, tmpDir) {
      if (option === "name") {
        if (path3.isAbsolute(name))
          throw new Error(`${option} option must not contain an absolute path, found "${name}".`);
        let basename = path3.basename(name);
        if (basename === ".." || basename === "." || basename !== name)
          throw new Error(`${option} option must not contain a path, found "${name}".`);
      } else {
        if (path3.isAbsolute(name) && !name.startsWith(tmpDir)) {
          throw new Error(`${option} option must be relative to "${tmpDir}", found "${name}".`);
        }
        let resolvedPath = _resolvePath(name, tmpDir);
        if (!resolvedPath.startsWith(tmpDir))
          throw new Error(`${option} option must be relative to "${tmpDir}", found "${resolvedPath}".`);
      }
    }
    function _isEBADF(error) {
      return _isExpectedError(error, -EBADF, "EBADF");
    }
    function _isENOENT(error) {
      return _isExpectedError(error, -ENOENT, "ENOENT");
    }
    function _isExpectedError(error, errno, code) {
      return IS_WIN32 ? error.code === code : error.code === code && error.errno === errno;
    }
    function setGracefulCleanup() {
      _gracefulCleanup = true;
    }
    function _getTmpDir(options) {
      return path3.resolve(_sanitizeName(options && options.tmpdir || os.tmpdir()));
    }
    process.addListener(EXIT, _garbageCollector);
    Object.defineProperty(module2.exports, "tmpdir", {
      enumerable: true,
      configurable: false,
      get: function() {
        return _getTmpDir();
      }
    });
    module2.exports.dir = dir;
    module2.exports.dirSync = dirSync;
    module2.exports.file = file;
    module2.exports.fileSync = fileSync2;
    module2.exports.tmpName = tmpName;
    module2.exports.tmpNameSync = tmpNameSync;
    module2.exports.setGracefulCleanup = setGracefulCleanup;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_plugin = __toESM(require_PluginAPI());
var import_diagnostic = __toESM(require_diagnostic());

// node_modules/minimatch/dist/mjs/index.js
var import_brace_expansion = __toESM(require_brace_expansion(), 1);

// node_modules/minimatch/dist/mjs/assert-valid-pattern.js
var MAX_PATTERN_LENGTH = 1024 * 64;
var assertValidPattern = (pattern) => {
  if (typeof pattern !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};

// node_modules/minimatch/dist/mjs/brace-expressions.js
var posixClasses = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false]
};
var braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
var regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var rangesToString = (ranges) => ranges.join("");
var parseClass = (glob, position) => {
  const pos = position;
  if (glob.charAt(pos) !== "[") {
    throw new Error("not in a brace expression");
  }
  const ranges = [];
  const negs = [];
  let i = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE:
    while (i < glob.length) {
      const c = glob.charAt(i);
      if ((c === "!" || c === "^") && i === pos + 1) {
        negate = true;
        i++;
        continue;
      }
      if (c === "]" && sawStart && !escaping) {
        endPos = i + 1;
        break;
      }
      sawStart = true;
      if (c === "\\") {
        if (!escaping) {
          escaping = true;
          i++;
          continue;
        }
      }
      if (c === "[" && !escaping) {
        for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
          if (glob.startsWith(cls, i)) {
            if (rangeStart) {
              return ["$.", false, glob.length - pos, true];
            }
            i += cls.length;
            if (neg)
              negs.push(unip);
            else
              ranges.push(unip);
            uflag = uflag || u;
            continue WHILE;
          }
        }
      }
      escaping = false;
      if (rangeStart) {
        if (c > rangeStart) {
          ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
        } else if (c === rangeStart) {
          ranges.push(braceEscape(c));
        }
        rangeStart = "";
        i++;
        continue;
      }
      if (glob.startsWith("-]", i + 1)) {
        ranges.push(braceEscape(c + "-"));
        i += 2;
        continue;
      }
      if (glob.startsWith("-", i + 1)) {
        rangeStart = c;
        i += 2;
        continue;
      }
      ranges.push(braceEscape(c));
      i++;
    }
  if (endPos < i) {
    return ["", false, 0, false];
  }
  if (!ranges.length && !negs.length) {
    return ["$.", false, glob.length - pos, true];
  }
  if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
    const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
    return [regexpEscape(r), false, endPos - pos, false];
  }
  const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
  const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
  const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
  return [comb, uflag, endPos - pos, true];
};

// node_modules/minimatch/dist/mjs/unescape.js
var unescape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
};

// node_modules/minimatch/dist/mjs/ast.js
var types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var isExtglobType = (c) => types.has(c);
var startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
var startNoDot = "(?!\\.)";
var addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
var justDots = /* @__PURE__ */ new Set(["..", "."]);
var reSpecials = new Set("().*{}+?[]^$\\!");
var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var qmark = "[^/]";
var star = qmark + "*?";
var starNoEmpty = qmark + "+?";
var AST = class _AST {
  type;
  #root;
  #hasMagic;
  #uflag = false;
  #parts = [];
  #parent;
  #parentIndex;
  #negs;
  #filledNegs = false;
  #options;
  #toString;
  // set to true if it's an extglob with no children
  // (which really means one child of '')
  #emptyExt = false;
  constructor(type, parent, options = {}) {
    this.type = type;
    if (type)
      this.#hasMagic = true;
    this.#parent = parent;
    this.#root = this.#parent ? this.#parent.#root : this;
    this.#options = this.#root === this ? options : this.#root.#options;
    this.#negs = this.#root === this ? [] : this.#root.#negs;
    if (type === "!" && !this.#root.#filledNegs)
      this.#negs.push(this);
    this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
  }
  get hasMagic() {
    if (this.#hasMagic !== void 0)
      return this.#hasMagic;
    for (const p of this.#parts) {
      if (typeof p === "string")
        continue;
      if (p.type || p.hasMagic)
        return this.#hasMagic = true;
    }
    return this.#hasMagic;
  }
  // reconstructs the pattern
  toString() {
    if (this.#toString !== void 0)
      return this.#toString;
    if (!this.type) {
      return this.#toString = this.#parts.map((p) => String(p)).join("");
    } else {
      return this.#toString = this.type + "(" + this.#parts.map((p) => String(p)).join("|") + ")";
    }
  }
  #fillNegs() {
    if (this !== this.#root)
      throw new Error("should only call on root");
    if (this.#filledNegs)
      return this;
    this.toString();
    this.#filledNegs = true;
    let n;
    while (n = this.#negs.pop()) {
      if (n.type !== "!")
        continue;
      let p = n;
      let pp = p.#parent;
      while (pp) {
        for (let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++) {
          for (const part of n.#parts) {
            if (typeof part === "string") {
              throw new Error("string part in extglob AST??");
            }
            part.copyIn(pp.#parts[i]);
          }
        }
        p = pp;
        pp = p.#parent;
      }
    }
    return this;
  }
  push(...parts) {
    for (const p of parts) {
      if (p === "")
        continue;
      if (typeof p !== "string" && !(p instanceof _AST && p.#parent === this)) {
        throw new Error("invalid part: " + p);
      }
      this.#parts.push(p);
    }
  }
  toJSON() {
    const ret = this.type === null ? this.#parts.slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...this.#parts.map((p) => p.toJSON())];
    if (this.isStart() && !this.type)
      ret.unshift([]);
    if (this.isEnd() && (this === this.#root || this.#root.#filledNegs && this.#parent?.type === "!")) {
      ret.push({});
    }
    return ret;
  }
  isStart() {
    if (this.#root === this)
      return true;
    if (!this.#parent?.isStart())
      return false;
    if (this.#parentIndex === 0)
      return true;
    const p = this.#parent;
    for (let i = 0; i < this.#parentIndex; i++) {
      const pp = p.#parts[i];
      if (!(pp instanceof _AST && pp.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    if (this.#root === this)
      return true;
    if (this.#parent?.type === "!")
      return true;
    if (!this.#parent?.isEnd())
      return false;
    if (!this.type)
      return this.#parent?.isEnd();
    const pl = this.#parent ? this.#parent.#parts.length : 0;
    return this.#parentIndex === pl - 1;
  }
  copyIn(part) {
    if (typeof part === "string")
      this.push(part);
    else
      this.push(part.clone(this));
  }
  clone(parent) {
    const c = new _AST(this.type, parent);
    for (const p of this.#parts) {
      c.copyIn(p);
    }
    return c;
  }
  static #parseAST(str, ast, pos, opt) {
    let escaping = false;
    let inBrace = false;
    let braceStart = -1;
    let braceNeg = false;
    if (ast.type === null) {
      let i2 = pos;
      let acc2 = "";
      while (i2 < str.length) {
        const c = str.charAt(i2++);
        if (escaping || c === "\\") {
          escaping = !escaping;
          acc2 += c;
          continue;
        }
        if (inBrace) {
          if (i2 === braceStart + 1) {
            if (c === "^" || c === "!") {
              braceNeg = true;
            }
          } else if (c === "]" && !(i2 === braceStart + 2 && braceNeg)) {
            inBrace = false;
          }
          acc2 += c;
          continue;
        } else if (c === "[") {
          inBrace = true;
          braceStart = i2;
          braceNeg = false;
          acc2 += c;
          continue;
        }
        if (!opt.noext && isExtglobType(c) && str.charAt(i2) === "(") {
          ast.push(acc2);
          acc2 = "";
          const ext2 = new _AST(c, ast);
          i2 = _AST.#parseAST(str, ext2, i2, opt);
          ast.push(ext2);
          continue;
        }
        acc2 += c;
      }
      ast.push(acc2);
      return i2;
    }
    let i = pos + 1;
    let part = new _AST(null, ast);
    const parts = [];
    let acc = "";
    while (i < str.length) {
      const c = str.charAt(i++);
      if (escaping || c === "\\") {
        escaping = !escaping;
        acc += c;
        continue;
      }
      if (inBrace) {
        if (i === braceStart + 1) {
          if (c === "^" || c === "!") {
            braceNeg = true;
          }
        } else if (c === "]" && !(i === braceStart + 2 && braceNeg)) {
          inBrace = false;
        }
        acc += c;
        continue;
      } else if (c === "[") {
        inBrace = true;
        braceStart = i;
        braceNeg = false;
        acc += c;
        continue;
      }
      if (isExtglobType(c) && str.charAt(i) === "(") {
        part.push(acc);
        acc = "";
        const ext2 = new _AST(c, part);
        part.push(ext2);
        i = _AST.#parseAST(str, ext2, i, opt);
        continue;
      }
      if (c === "|") {
        part.push(acc);
        acc = "";
        parts.push(part);
        part = new _AST(null, ast);
        continue;
      }
      if (c === ")") {
        if (acc === "" && ast.#parts.length === 0) {
          ast.#emptyExt = true;
        }
        part.push(acc);
        acc = "";
        ast.push(...parts, part);
        return i;
      }
      acc += c;
    }
    ast.type = null;
    ast.#hasMagic = void 0;
    ast.#parts = [str.substring(pos - 1)];
    return i;
  }
  static fromGlob(pattern, options = {}) {
    const ast = new _AST(null, void 0, options);
    _AST.#parseAST(pattern, ast, 0, options);
    return ast;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== this.#root)
      return this.#root.toMMPattern();
    const glob = this.toString();
    const [re, body, hasMagic, uflag] = this.toRegExpSource();
    const anyMagic = hasMagic || this.#hasMagic || this.#options.nocase && !this.#options.nocaseMagicOnly && glob.toUpperCase() !== glob.toLowerCase();
    if (!anyMagic) {
      return body;
    }
    const flags = (this.#options.nocase ? "i" : "") + (uflag ? "u" : "");
    return Object.assign(new RegExp(`^${re}$`, flags), {
      _src: re,
      _glob: glob
    });
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(allowDot) {
    const dot = allowDot ?? !!this.#options.dot;
    if (this.#root === this)
      this.#fillNegs();
    if (!this.type) {
      const noEmpty = this.isStart() && this.isEnd();
      const src = this.#parts.map((p) => {
        const [re, _, hasMagic, uflag] = typeof p === "string" ? _AST.#parseGlob(p, this.#hasMagic, noEmpty) : p.toRegExpSource(allowDot);
        this.#hasMagic = this.#hasMagic || hasMagic;
        this.#uflag = this.#uflag || uflag;
        return re;
      }).join("");
      let start2 = "";
      if (this.isStart()) {
        if (typeof this.#parts[0] === "string") {
          const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
          if (!dotTravAllowed) {
            const aps = addPatternStart;
            const needNoTrav = (
              // dots are allowed, and the pattern starts with [ or .
              dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
              src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
              src.startsWith("\\.\\.") && aps.has(src.charAt(4))
            );
            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
            start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && this.#root.#filledNegs && this.#parent?.type === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start2 + src + end;
      return [
        final2,
        unescape(src),
        this.#hasMagic = !!this.#hasMagic,
        this.#uflag
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = this.#partsToRegExp(dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      this.#parts = [s];
      this.type = null;
      this.#hasMagic = void 0;
      return [s, unescape(this.toString()), false, false];
    }
    let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : this.#partsToRegExp(true);
    if (bodyDotAllowed === body) {
      bodyDotAllowed = "";
    }
    if (bodyDotAllowed) {
      body = `(?:${body})(?:${bodyDotAllowed})*?`;
    }
    let final = "";
    if (this.type === "!" && this.#emptyExt) {
      final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
    } else {
      const close = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
      final = start + body + close;
    }
    return [
      final,
      unescape(body),
      this.#hasMagic = !!this.#hasMagic,
      this.#uflag
    ];
  }
  #partsToRegExp(dot) {
    return this.#parts.map((p) => {
      if (typeof p === "string") {
        throw new Error("string type in extglob ast??");
      }
      const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
      this.#uflag = this.#uflag || uflag;
      return re;
    }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
  }
  static #parseGlob(glob, hasMagic, noEmpty = false) {
    let escaping = false;
    let re = "";
    let uflag = false;
    for (let i = 0; i < glob.length; i++) {
      const c = glob.charAt(i);
      if (escaping) {
        escaping = false;
        re += (reSpecials.has(c) ? "\\" : "") + c;
        continue;
      }
      if (c === "\\") {
        if (i === glob.length - 1) {
          re += "\\\\";
        } else {
          escaping = true;
        }
        continue;
      }
      if (c === "[") {
        const [src, needUflag, consumed, magic] = parseClass(glob, i);
        if (consumed) {
          re += src;
          uflag = uflag || needUflag;
          i += consumed - 1;
          hasMagic = hasMagic || magic;
          continue;
        }
      }
      if (c === "*") {
        if (noEmpty && glob === "*")
          re += starNoEmpty;
        else
          re += star;
        hasMagic = true;
        continue;
      }
      if (c === "?") {
        re += qmark;
        hasMagic = true;
        continue;
      }
      re += regExpEscape(c);
    }
    return [re, unescape(glob), !!hasMagic, uflag];
  }
};

// node_modules/minimatch/dist/mjs/escape.js
var escape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};

// node_modules/minimatch/dist/mjs/index.js
var minimatch = (p, pattern, options = {}) => {
  assertValidPattern(pattern);
  if (!options.nocomment && pattern.charAt(0) === "#") {
    return false;
  }
  return new Minimatch(pattern, options).match(p);
};
var starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
var starDotExtTest = (ext2) => (f) => !f.startsWith(".") && f.endsWith(ext2);
var starDotExtTestDot = (ext2) => (f) => f.endsWith(ext2);
var starDotExtTestNocase = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext2);
};
var starDotExtTestNocaseDot = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => f.toLowerCase().endsWith(ext2);
};
var starDotStarRE = /^\*+\.\*+$/;
var starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
var starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
var dotStarRE = /^\.\*+$/;
var dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
var starRE = /^\*+$/;
var starTest = (f) => f.length !== 0 && !f.startsWith(".");
var starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
var qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
var qmarksTestNocase = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTest = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTestNoExt = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && !f.startsWith(".");
};
var qmarksTestNoExtDot = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && f !== "." && f !== "..";
};
var defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
var path = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
};
var sep = defaultPlatform === "win32" ? path.win32.sep : path.posix.sep;
minimatch.sep = sep;
var GLOBSTAR = Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
var qmark2 = "[^/]";
var star2 = qmark2 + "*?";
var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
var filter = (pattern, options = {}) => (p) => minimatch(p, pattern, options);
minimatch.filter = filter;
var ext = (a, b = {}) => Object.assign({}, a, b);
var defaults = (def) => {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  const orig = minimatch;
  const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
  return Object.assign(m, {
    Minimatch: class Minimatch extends orig.Minimatch {
      constructor(pattern, options = {}) {
        super(pattern, ext(def, options));
      }
      static defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      }
    },
    AST: class AST extends orig.AST {
      /* c8 ignore start */
      constructor(type, parent, options = {}) {
        super(type, parent, ext(def, options));
      }
      /* c8 ignore stop */
      static fromGlob(pattern, options = {}) {
        return orig.AST.fromGlob(pattern, ext(def, options));
      }
    },
    unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
    escape: (s, options = {}) => orig.escape(s, ext(def, options)),
    filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
    defaults: (options) => orig.defaults(ext(def, options)),
    makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
    braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
    match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
    sep: orig.sep,
    GLOBSTAR
  });
};
minimatch.defaults = defaults;
var braceExpand = (pattern, options = {}) => {
  assertValidPattern(pattern);
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    return [pattern];
  }
  return (0, import_brace_expansion.default)(pattern);
};
minimatch.braceExpand = braceExpand;
var makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
minimatch.makeRe = makeRe;
var match = (list, pattern, options = {}) => {
  const mm = new Minimatch(pattern, options);
  list = list.filter((f) => mm.match(f));
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
minimatch.match = match;
var globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
var regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var Minimatch = class {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  regexp;
  constructor(pattern, options = {}) {
    assertValidPattern(pattern);
    options = options || {};
    this.options = options;
    this.pattern = pattern;
    this.platform = options.platform || defaultPlatform;
    this.isWindows = this.platform === "win32";
    this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
    if (this.windowsPathsNoEscape) {
      this.pattern = this.pattern.replace(/\\/g, "/");
    }
    this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
    this.regexp = null;
    this.negate = false;
    this.nonegate = !!options.nonegate;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;
    this.nocase = !!this.options.nocase;
    this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
    this.globSet = [];
    this.globParts = [];
    this.set = [];
    this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) {
      return true;
    }
    for (const pattern of this.set) {
      for (const part of pattern) {
        if (typeof part !== "string")
          return true;
      }
    }
    return false;
  }
  debug(..._) {
  }
  make() {
    const pattern = this.pattern;
    const options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    this.globSet = [...new Set(this.braceExpand())];
    if (options.debug) {
      this.debug = (...args) => console.error(...args);
    }
    this.debug(this.pattern, this.globSet);
    const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
    this.globParts = this.preprocess(rawGlobParts);
    this.debug(this.pattern, this.globParts);
    let set = this.globParts.map((s, _, __) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
        const isDrive = /^[a-z]:/i.test(s[0]);
        if (isUNC) {
          return [...s.slice(0, 4), ...s.slice(4).map((ss) => this.parse(ss))];
        } else if (isDrive) {
          return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
        }
      }
      return s.map((ss) => this.parse(ss));
    });
    this.debug(this.pattern, set);
    this.set = set.filter((s) => s.indexOf(false) === -1);
    if (this.isWindows) {
      for (let i = 0; i < this.set.length; i++) {
        const p = this.set[i];
        if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
          p[2] = "?";
        }
      }
    }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(globParts) {
    if (this.options.noglobstar) {
      for (let i = 0; i < globParts.length; i++) {
        for (let j = 0; j < globParts[i].length; j++) {
          if (globParts[i][j] === "**") {
            globParts[i][j] = "*";
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      globParts = this.firstPhasePreProcess(globParts);
      globParts = this.secondPhasePreProcess(globParts);
    } else if (optimizationLevel >= 1) {
      globParts = this.levelOneOptimize(globParts);
    } else {
      globParts = this.adjascentGlobstarOptimize(globParts);
    }
    return globParts;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(globParts) {
    return globParts.map((parts) => {
      let gs = -1;
      while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
        let i = gs;
        while (parts[i + 1] === "**") {
          i++;
        }
        if (i !== gs) {
          parts.splice(gs, i - gs);
        }
      }
      return parts;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(globParts) {
    return globParts.map((parts) => {
      parts = parts.reduce((set, part) => {
        const prev = set[set.length - 1];
        if (part === "**" && prev === "**") {
          return set;
        }
        if (part === "..") {
          if (prev && prev !== ".." && prev !== "." && prev !== "**") {
            set.pop();
            return set;
          }
        }
        set.push(part);
        return set;
      }, []);
      return parts.length === 0 ? [""] : parts;
    });
  }
  levelTwoFileOptimize(parts) {
    if (!Array.isArray(parts)) {
      parts = this.slashSplit(parts);
    }
    let didSomething = false;
    do {
      didSomething = false;
      if (!this.preserveMultipleSlashes) {
        for (let i = 1; i < parts.length - 1; i++) {
          const p = parts[i];
          if (i === 1 && p === "" && parts[0] === "")
            continue;
          if (p === "." || p === "") {
            didSomething = true;
            parts.splice(i, 1);
            i--;
          }
        }
        if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
          didSomething = true;
          parts.pop();
        }
      }
      let dd = 0;
      while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
        const p = parts[dd - 1];
        if (p && p !== "." && p !== ".." && p !== "**") {
          didSomething = true;
          parts.splice(dd - 1, 2);
          dd -= 2;
        }
      }
    } while (didSomething);
    return parts.length === 0 ? [""] : parts;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(globParts) {
    let didSomething = false;
    do {
      didSomething = false;
      for (let parts of globParts) {
        let gs = -1;
        while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
          let gss = gs;
          while (parts[gss + 1] === "**") {
            gss++;
          }
          if (gss > gs) {
            parts.splice(gs + 1, gss - gs);
          }
          let next = parts[gs + 1];
          const p = parts[gs + 2];
          const p2 = parts[gs + 3];
          if (next !== "..")
            continue;
          if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
            continue;
          }
          didSomething = true;
          parts.splice(gs, 1);
          const other = parts.slice(0);
          other[gs] = "**";
          globParts.push(other);
          gs--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < parts.length - 1; i++) {
            const p = parts[i];
            if (i === 1 && p === "" && parts[0] === "")
              continue;
            if (p === "." || p === "") {
              didSomething = true;
              parts.splice(i, 1);
              i--;
            }
          }
          if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
            didSomething = true;
            parts.pop();
          }
        }
        let dd = 0;
        while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
          const p = parts[dd - 1];
          if (p && p !== "." && p !== ".." && p !== "**") {
            didSomething = true;
            const needDot = dd === 1 && parts[dd + 1] === "**";
            const splin = needDot ? ["."] : [];
            parts.splice(dd - 1, 2, ...splin);
            if (parts.length === 0)
              parts.push("");
            dd -= 2;
          }
        }
      }
    } while (didSomething);
    return globParts;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(globParts) {
    for (let i = 0; i < globParts.length - 1; i++) {
      for (let j = i + 1; j < globParts.length; j++) {
        const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
        if (!matched)
          continue;
        globParts[i] = matched;
        globParts[j] = [];
      }
    }
    return globParts.filter((gs) => gs.length);
  }
  partsMatch(a, b, emptyGSMatch = false) {
    let ai = 0;
    let bi = 0;
    let result = [];
    let which = "";
    while (ai < a.length && bi < b.length) {
      if (a[ai] === b[bi]) {
        result.push(which === "b" ? b[bi] : a[ai]);
        ai++;
        bi++;
      } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
        result.push(a[ai]);
        ai++;
      } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
        result.push(b[bi]);
        bi++;
      } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
        if (which === "b")
          return false;
        which = "a";
        result.push(a[ai]);
        ai++;
        bi++;
      } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
        if (which === "a")
          return false;
        which = "b";
        result.push(b[bi]);
        ai++;
        bi++;
      } else {
        return false;
      }
    }
    return a.length === b.length && result;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const pattern = this.pattern;
    let negate = false;
    let negateOffset = 0;
    for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.slice(negateOffset);
    this.negate = negate;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(file, pattern, partial = false) {
    const options = this.options;
    if (this.isWindows) {
      const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
      const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
      const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
      const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
      const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
      const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
      if (typeof fdi === "number" && typeof pdi === "number") {
        const [fd, pd] = [file[fdi], pattern[pdi]];
        if (fd.toLowerCase() === pd.toLowerCase()) {
          pattern[pdi] = fd;
          if (pdi > fdi) {
            pattern = pattern.slice(pdi);
          } else if (fdi > pdi) {
            file = file.slice(fdi);
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      file = this.levelTwoFileOptimize(file);
    }
    this.debug("matchOne", this, { file, pattern });
    this.debug("matchOne", file.length, pattern.length);
    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false) {
        return false;
      }
      if (p === GLOBSTAR) {
        this.debug("GLOBSTAR", [pattern, p, f]);
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug("** at the end");
          for (; fi < fl; fi++) {
            if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
              return false;
          }
          return true;
        }
        while (fr < fl) {
          var swallowee = file[fr];
          this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug("globstar found match!", fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
              this.debug("dot detected!", file, fr, pattern, pr);
              break;
            }
            this.debug("globstar swallow a segment, and continue");
            fr++;
          }
        }
        if (partial) {
          this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
          if (fr === fl) {
            return true;
          }
        }
        return false;
      }
      let hit;
      if (typeof p === "string") {
        hit = f === p;
        this.debug("string match", p, f, hit);
      } else {
        hit = p.test(f);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      return fi === fl - 1 && file[fi] === "";
    } else {
      throw new Error("wtf?");
    }
  }
  braceExpand() {
    return braceExpand(this.pattern, this.options);
  }
  parse(pattern) {
    assertValidPattern(pattern);
    const options = this.options;
    if (pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    let m;
    let fastTest = null;
    if (m = pattern.match(starRE)) {
      fastTest = options.dot ? starTestDot : starTest;
    } else if (m = pattern.match(starDotExtRE)) {
      fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
    } else if (m = pattern.match(qmarksRE)) {
      fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
    } else if (m = pattern.match(starDotStarRE)) {
      fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
    } else if (m = pattern.match(dotStarRE)) {
      fastTest = dotStarTest;
    }
    const re = AST.fromGlob(pattern, this.options).toMMPattern();
    return fastTest ? Object.assign(re, { test: fastTest }) : re;
  }
  makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    const set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    const options = this.options;
    const twoStar = options.noglobstar ? star2 : options.dot ? twoStarDot : twoStarNoDot;
    const flags = new Set(options.nocase ? ["i"] : []);
    let re = set.map((pattern) => {
      const pp = pattern.map((p) => {
        if (p instanceof RegExp) {
          for (const f of p.flags.split(""))
            flags.add(f);
        }
        return typeof p === "string" ? regExpEscape2(p) : p === GLOBSTAR ? GLOBSTAR : p._src;
      });
      pp.forEach((p, i) => {
        const next = pp[i + 1];
        const prev = pp[i - 1];
        if (p !== GLOBSTAR || prev === GLOBSTAR) {
          return;
        }
        if (prev === void 0) {
          if (next !== void 0 && next !== GLOBSTAR) {
            pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
          } else {
            pp[i] = twoStar;
          }
        } else if (next === void 0) {
          pp[i - 1] = prev + "(?:\\/|" + twoStar + ")?";
        } else if (next !== GLOBSTAR) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
          pp[i + 1] = GLOBSTAR;
        }
      });
      return pp.filter((p) => p !== GLOBSTAR).join("/");
    }).join("|");
    const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
    re = "^" + open + re + close + "$";
    if (this.negate)
      re = "^(?!" + re + ").+$";
    try {
      this.regexp = new RegExp(re, [...flags].join(""));
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(p) {
    if (this.preserveMultipleSlashes) {
      return p.split("/");
    } else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
      return ["", ...p.split(/\/+/)];
    } else {
      return p.split(/\/+/);
    }
  }
  match(f, partial = this.partial) {
    this.debug("match", f, this.pattern);
    if (this.comment) {
      return false;
    }
    if (this.empty) {
      return f === "";
    }
    if (f === "/" && partial) {
      return true;
    }
    const options = this.options;
    if (this.isWindows) {
      f = f.split("\\").join("/");
    }
    const ff = this.slashSplit(f);
    this.debug(this.pattern, "split", ff);
    const set = this.set;
    this.debug(this.pattern, "set", set);
    let filename = ff[ff.length - 1];
    if (!filename) {
      for (let i = ff.length - 2; !filename && i >= 0; i--) {
        filename = ff[i];
      }
    }
    for (let i = 0; i < set.length; i++) {
      const pattern = set[i];
      let file = ff;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      const hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) {
          return true;
        }
        return !this.negate;
      }
    }
    if (options.flipNegate) {
      return false;
    }
    return this.negate;
  }
  static defaults(def) {
    return minimatch.defaults(def).Minimatch;
  }
};
minimatch.AST = AST;
minimatch.Minimatch = Minimatch;
minimatch.escape = escape;
minimatch.unescape = unescape;

// src/index.ts
var import_path = __toESM(require("path"));
var import_omit = __toESM(require_omit());
var import_fs = __toESM(require("fs"));
var import_assert = __toESM(require("assert"));
var import_child_process = require("child_process");
var tmp = __toESM(require_tmp());
function mapValues(fun, obj) {
  if (typeof obj === "string") {
    return fun(obj);
  } else if (Array.isArray(obj)) {
    return obj.map((val) => mapValues(fun, val));
  } else if (typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [key, mapValues(fun, val)])
    );
  } else {
    return obj;
  }
}
function isGlobMatch(filepath, pattern, opts = {}) {
  return minimatch(filepath, pattern, { ...opts ?? {}, matchBase: true });
}
function getOptions(filepath, config) {
  const relativeFilepath = import_path.default.relative(config.root, filepath);
  const [_pattern, options] = Object.entries(config.options).find(
    ([pattern, _options]) => isGlobMatch(relativeFilepath, pattern)
  ) ?? [void 0, {}];
  return Array.isArray(options) ? options : [options];
}
function getReader(options, type) {
  if (options.from !== void 0) {
    return options.from;
  } else if (options.read !== void 0) {
    return options.read;
  } else {
    switch (type) {
      case "md":
        return "markdown";
      case "tex":
        return "latex";
      default:
        return type;
    }
  }
}
function getWriter(options) {
  if (options.to !== void 0) {
    return options.to;
  } else if (options.write != void 0) {
    return options.write;
  } else {
    return "html";
  }
}
function getAssetType(writer) {
  if (writer.match(/commonmark|gfm|markdown/)) {
    return "md";
  } else if (writer.match(/latex/)) {
    return "tex";
  } else {
    return writer;
  }
}
function renderOptionsForCLI(options) {
  return Object.entries(options).flatMap(([optionName, optionValue]) => {
    if (typeof optionValue === "boolean") {
      return [`--${optionName}`];
    } else if (typeof optionValue === "string") {
      return [`--${optionName}=${optionValue}`];
    } else if (Array.isArray(optionValue)) {
      return optionValue.map((optionValue2) => {
        return `--${optionName}=${optionValue2}`;
      });
    } else if (typeof optionValue === "object") {
      return Object.entries(optionValue).map(
        ([variableName, variableValue]) => {
          (0, import_assert.default)(typeof variableValue === "string");
          return `${optionName} ${variableName}=${variableValue}`;
        }
      );
    }
  });
}
var src_default = new import_plugin.Transformer({
  async loadConfig({ config, logger }) {
    const configResult = await config.getConfig([".pandocrc"]);
    if (configResult) {
      const { contents, filePath } = configResult;
      logger.verbose({ message: `Found ${filePath}` });
      const root = import_path.default.dirname(filePath);
      return {
        root,
        options: mapValues((val) => val.replace("${.}", root).trim(), contents)
      };
    } else {
      throw new import_diagnostic.default({
        diagnostic: {
          message: "Could not find .pandocrc",
          origin: "parcel-transformer-pandoc"
        }
      });
    }
  },
  async transform({ asset, config, logger }) {
    const sequentialOptions = getOptions(asset.filePath, config);
    for (const options of sequentialOptions) {
      const reader = getReader(options, asset.type);
      const writer = getWriter(options);
      const input = await asset.getCode();
      const logFile = tmp.fileSync({ prefix: "pandoc", postfix: ".json" });
      const logFileIncludedFiles = tmp.fileSync({
        prefix: "included-files",
        postfix: ".log"
      });
      if (typeof options.metadata !== "object")
        options.metadata = {};
      options.metadata["include-log-file"] = logFileIncludedFiles.name;
      const renderedOptions = renderOptionsForCLI({
        ...(0, import_omit.default)(["from", "to", "read", "write"], options),
        from: reader,
        to: writer,
        log: logFile.name
      });
      const command = ["pandoc", ...renderedOptions].join(" ");
      logger.verbose({ message: `Running '${command}'` });
      const output = (0, import_child_process.execSync)(command, {
        input,
        cwd: config.root,
        encoding: "utf-8"
      });
      logger.verbose({ message: `Done` });
      asset.setCode(output);
      const logEntries = JSON.parse(
        import_fs.default.readFileSync(logFile.name, { encoding: "utf8" })
      );
      if (Array.isArray(logEntries)) {
        for (const logEntry of logEntries) {
          if (typeof logEntry === "object" && logEntry.type === "LoadedResource") {
            asset.invalidateOnFileChange(logEntry.from);
          }
        }
      }
      if (import_fs.default.existsSync(logFileIncludedFiles.name)) {
        const includedFiles = import_fs.default.readFileSync(logFileIncludedFiles.name, {
          encoding: "utf8"
        });
        for (const includedFile of includedFiles.split(/\n+/)) {
          asset.invalidateOnFileChange(includedFile.trim());
        }
      }
      asset.type = getAssetType(writer);
    }
    return [asset];
  }
});
/*! Bundled license information:

tmp/lib/tmp.js:
  (*!
   * Tmp
   *
   * Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
   *
   * MIT Licensed
   *)
*/
