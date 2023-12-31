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
var ClickManager_exports = {};
__export(ClickManager_exports, {
  ClickManager: () => ClickManager
});
module.exports = __toCommonJS(ClickManager_exports);
var import_constants = require("../../constants");
var import_Vec2d = require("../../primitives/Vec2d");
var import_uniqueId = require("../../utils/uniqueId");
const MAX_CLICK_DISTANCE = 40;
class ClickManager {
  constructor(editor) {
    this.editor = editor;
  }
  _clickId = "";
  _clickTimeout;
  _clickScreenPoint;
  _previousScreenPoint;
  _getClickTimeout = (state, id = (0, import_uniqueId.uniqueId)()) => {
    this._clickId = id;
    clearTimeout(this._clickTimeout);
    this._clickTimeout = setTimeout(
      () => {
        if (this._clickState === state && this._clickId === id) {
          switch (this._clickState) {
            case "pendingTriple": {
              this.editor.dispatch({
                ...this.lastPointerInfo,
                type: "click",
                name: "double_click",
                phase: "settle"
              });
              break;
            }
            case "pendingQuadruple": {
              this.editor.dispatch({
                ...this.lastPointerInfo,
                type: "click",
                name: "triple_click",
                phase: "settle"
              });
              break;
            }
            case "pendingOverflow": {
              this.editor.dispatch({
                ...this.lastPointerInfo,
                type: "click",
                name: "quadruple_click",
                phase: "settle"
              });
              break;
            }
            default: {
            }
          }
          this._clickState = "idle";
        }
      },
      state === "idle" || state === "pendingDouble" ? import_constants.DOUBLE_CLICK_DURATION : import_constants.MULTI_CLICK_DURATION
    );
  };
  /**
   * The current click state.
   *
   * @internal
   */
  _clickState = "idle";
  /**
   * The current click state.
   *
   * @public
   */
  get clickState() {
    return this._clickState;
  }
  lastPointerInfo = {};
  /**
   * Start the double click timeout.
   *
   * @param info - The event info.
   */
  transformPointerDownEvent = (info) => {
    if (!this._clickState)
      return info;
    this._clickScreenPoint = import_Vec2d.Vec2d.From(info.point);
    if (this._previousScreenPoint && this._previousScreenPoint.dist(this._clickScreenPoint) > MAX_CLICK_DISTANCE) {
      this._clickState = "idle";
    }
    this._previousScreenPoint = this._clickScreenPoint;
    this.lastPointerInfo = info;
    switch (this._clickState) {
      case "idle": {
        this._clickState = "pendingDouble";
        this._clickTimeout = this._getClickTimeout(this._clickState);
        return info;
      }
      case "pendingDouble": {
        this._clickState = "pendingTriple";
        this._clickTimeout = this._getClickTimeout(this._clickState);
        return {
          ...info,
          type: "click",
          name: "double_click",
          phase: "down"
        };
      }
      case "pendingTriple": {
        this._clickState = "pendingQuadruple";
        this._clickTimeout = this._getClickTimeout(this._clickState);
        return {
          ...info,
          type: "click",
          name: "triple_click",
          phase: "down"
        };
      }
      case "pendingQuadruple": {
        this._clickState = "pendingOverflow";
        this._clickTimeout = this._getClickTimeout(this._clickState);
        return {
          ...info,
          type: "click",
          name: "quadruple_click",
          phase: "down"
        };
      }
      case "pendingOverflow": {
        this._clickState = "overflow";
        this._clickTimeout = this._getClickTimeout(this._clickState);
        return info;
      }
      default: {
        this._clickTimeout = this._getClickTimeout(this._clickState);
        return info;
      }
    }
  };
  /**
   * Emit click_up events on pointer up.
   *
   * @param info - The event info.
   */
  transformPointerUpEvent = (info) => {
    if (!this._clickState)
      return info;
    this._clickScreenPoint = import_Vec2d.Vec2d.From(info.point);
    switch (this._clickState) {
      case "pendingTriple": {
        return {
          ...this.lastPointerInfo,
          type: "click",
          name: "double_click",
          phase: "up"
        };
      }
      case "pendingQuadruple": {
        return {
          ...this.lastPointerInfo,
          type: "click",
          name: "triple_click",
          phase: "up"
        };
      }
      case "pendingOverflow": {
        return {
          ...this.lastPointerInfo,
          type: "click",
          name: "quadruple_click",
          phase: "up"
        };
      }
      default: {
        return info;
      }
    }
  };
  /**
   * Cancel the double click timeout.
   *
   * @internal
   */
  cancelDoubleClickTimeout = () => {
    this._clickTimeout = clearTimeout(this._clickTimeout);
    this._clickState = "idle";
  };
  /**
   * Handle a move event, possibly cancelling the click timeout.
   *
   * @internal
   */
  handleMove = () => {
    if (this._clickState !== "idle" && this._clickScreenPoint && this._clickScreenPoint.dist(this.editor.inputs.currentScreenPoint) > (this.editor.instanceState.isCoarsePointer ? import_constants.COARSE_DRAG_DISTANCE : import_constants.DRAG_DISTANCE)) {
      this.cancelDoubleClickTimeout();
    }
  };
}
//# sourceMappingURL=ClickManager.js.map
