"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var StateNode_exports = {};
__export(StateNode_exports, {
  StateNode: () => StateNode
});
module.exports = __toCommonJS(StateNode_exports);
var import_state = require("@tldraw/state");
var import_event_types = require("../types/event-types");
class StateNode {
  constructor(editor, parent) {
    this.editor = editor;
    const { id, children, initial } = this.constructor;
    this.id = id;
    this.current = (0, import_state.atom)("toolState" + this.id, void 0);
    this.path = (0, import_state.computed)("toolPath" + this.id, () => {
      const current = this.current.value;
      return this.id + (current ? `.${current.path.value}` : "");
    });
    this.parent = parent ?? {};
    if (this.parent) {
      if (children && initial) {
        this.type = "branch";
        this.initial = initial;
        this.children = Object.fromEntries(
          children().map((Ctor) => [Ctor.id, new Ctor(this.editor, this)])
        );
        this.current.set(this.children[this.initial]);
      } else {
        this.type = "leaf";
      }
    } else {
      this.type = "root";
      if (children && initial) {
        this.initial = initial;
        this.children = Object.fromEntries(
          children().map((Ctor) => [Ctor.id, new Ctor(this.editor, this)])
        );
        this.current.set(this.children[this.initial]);
      }
    }
  }
  path;
  static id;
  static initial;
  static children;
  id;
  current;
  type;
  shapeType;
  initial;
  children;
  parent;
  isActive = false;
  transition(id, info) {
    const path = id.split(".");
    let currState = this;
    for (let i = 0; i < path.length; i++) {
      const id2 = path[i];
      const prevChildState = currState.current.value;
      const nextChildState = currState.children?.[id2];
      if (!nextChildState) {
        throw Error(`${currState.id} - no child state exists with the id ${id2}.`);
      }
      if (prevChildState?.id !== nextChildState.id) {
        prevChildState?.exit(info, id2);
        currState.current.set(nextChildState);
        nextChildState.enter(info, prevChildState?.id || "initial");
        if (!nextChildState.isActive)
          break;
      }
      currState = nextChildState;
    }
    return this;
  }
  handleEvent(info) {
    const cbName = import_event_types.EVENT_NAME_MAP[info.name];
    const x = this.current.value;
    this[cbName]?.(info);
    if (this.current.value === x && this.isActive) {
      x?.handleEvent(info);
    }
  }
  enter(info, from) {
    this.isActive = true;
    this.onEnter?.(info, from);
    if (this.children && this.initial && this.isActive) {
      const initial = this.children[this.initial];
      this.current.set(initial);
      initial.enter(info, from);
    }
  }
  exit(info, from) {
    this.isActive = false;
    this.onExit?.(info, from);
    if (!this.isActive) {
      this.current.value?.exit(info, from);
    }
  }
  /**
   * This is a hack / escape hatch that will tell the editor to
   * report a different state as active (in `currentToolId`) when
   * this state is active. This is usually used when a tool transitions
   * to a child of a different state for a certain interaction and then
   * returns to the original tool when that interaction completes; and
   * where we would want to show the original tool as active in the UI.
   *
   * @public
   */
  _currentToolIdMask = (0, import_state.atom)("curent tool id mask", void 0);
  get currentToolIdMask() {
    return this._currentToolIdMask.value;
  }
  set currentToolIdMask(id) {
    this._currentToolIdMask.set(id);
  }
  onWheel;
  onPointerDown;
  onPointerMove;
  onPointerUp;
  onDoubleClick;
  onTripleClick;
  onQuadrupleClick;
  onRightClick;
  onMiddleClick;
  onKeyDown;
  onKeyUp;
  onKeyRepeat;
  onCancel;
  onComplete;
  onInterrupt;
  onEnter;
  onExit;
}
__decorateClass([
  import_state.computed
], StateNode.prototype, "currentToolIdMask", 1);
//# sourceMappingURL=StateNode.js.map
