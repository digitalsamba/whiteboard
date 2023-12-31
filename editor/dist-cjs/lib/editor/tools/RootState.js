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
var RootState_exports = {};
__export(RootState_exports, {
  RootState: () => RootState
});
module.exports = __toCommonJS(RootState_exports);
var import_StateNode = require("./StateNode");
class RootState extends import_StateNode.StateNode {
  static id = "root";
  static initial = "";
  static children = () => [];
  onKeyDown = (info) => {
    switch (info.code) {
      case "KeyZ": {
        if (!(info.shiftKey || info.ctrlKey)) {
          const currentTool = this.current.value;
          if (currentTool && currentTool.current.value?.id === "idle") {
            if (this.children["zoom"]) {
              this.editor.setCurrentTool("zoom", { ...info, onInteractionEnd: currentTool.id });
            }
          }
        }
        break;
      }
    }
  };
}
//# sourceMappingURL=RootState.js.map
