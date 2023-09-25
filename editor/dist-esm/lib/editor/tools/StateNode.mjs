var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import { atom, computed } from "@tldraw/state";
import {
  EVENT_NAME_MAP
} from "../types/event-types.mjs";
class StateNode {
  constructor(editor, parent) {
    this.editor = editor;
    const { id, children, initial } = this.constructor;
    this.id = id;
    this.current = atom("toolState" + this.id, void 0);
    this.path = computed("toolPath" + this.id, () => {
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
    const cbName = EVENT_NAME_MAP[info.name];
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
  _currentToolIdMask = atom("curent tool id mask", void 0);
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
  computed
], StateNode.prototype, "currentToolIdMask", 1);
export {
  StateNode
};
//# sourceMappingURL=StateNode.mjs.map
