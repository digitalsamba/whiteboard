import {
  COARSE_DRAG_DISTANCE,
  DOUBLE_CLICK_DURATION,
  DRAG_DISTANCE,
  MULTI_CLICK_DURATION
} from "../../constants.mjs";
import { Vec2d } from "../../primitives/Vec2d.mjs";
import { uniqueId } from "../../utils/uniqueId.mjs";
const MAX_CLICK_DISTANCE = 40;
class ClickManager {
  constructor(editor) {
    this.editor = editor;
  }
  _clickId = "";
  _clickTimeout;
  _clickScreenPoint;
  _previousScreenPoint;
  _getClickTimeout = (state, id = uniqueId()) => {
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
      state === "idle" || state === "pendingDouble" ? DOUBLE_CLICK_DURATION : MULTI_CLICK_DURATION
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
    this._clickScreenPoint = Vec2d.From(info.point);
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
    this._clickScreenPoint = Vec2d.From(info.point);
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
    if (this._clickState !== "idle" && this._clickScreenPoint && this._clickScreenPoint.dist(this.editor.inputs.currentScreenPoint) > (this.editor.instanceState.isCoarsePointer ? COARSE_DRAG_DISTANCE : DRAG_DISTANCE)) {
      this.cancelDoubleClickTimeout();
    }
  };
}
export {
  ClickManager
};
//# sourceMappingURL=ClickManager.mjs.map
