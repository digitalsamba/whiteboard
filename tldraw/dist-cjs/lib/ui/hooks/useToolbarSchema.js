"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useToolbarSchema_exports = {};
__export(useToolbarSchema_exports, {
  ToolbarSchemaContext: () => ToolbarSchemaContext,
  ToolbarSchemaProvider: () => ToolbarSchemaProvider,
  toolbarItem: () => toolbarItem,
  useToolbarSchema: () => useToolbarSchema
});
module.exports = __toCommonJS(useToolbarSchema_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = __toESM(require("react"));
var import_useTools = require("./useTools");
function toolbarItem(toolItem) {
  return {
    id: toolItem.id,
    type: "item",
    readonlyOk: toolItem.readonlyOk,
    toolItem
  };
}
const ToolbarSchemaContext = import_react.default.createContext([]);
function ToolbarSchemaProvider({ overrides, children }) {
  const editor = (0, import_editor.useEditor)();
  const tools = (0, import_useTools.useTools)();
  const highlighterEnabled = (0, import_editor.useValue)(import_editor.featureFlags.highlighterTool);
  const toolbarSchema = import_react.default.useMemo(() => {
    const schema = (0, import_editor.compact)([
      toolbarItem(tools.select),
      toolbarItem(tools.hand),
      toolbarItem(tools.draw),
      toolbarItem(tools.eraser),
      toolbarItem(tools.arrow),
      toolbarItem(tools.text),
      toolbarItem(tools.note),
      toolbarItem(tools.asset),
      toolbarItem(tools["rectangle"]),
      toolbarItem(tools["ellipse"]),
      toolbarItem(tools["diamond"]),
      toolbarItem(tools["triangle"]),
      toolbarItem(tools["trapezoid"]),
      toolbarItem(tools["rhombus"]),
      toolbarItem(tools["hexagon"]),
      toolbarItem(tools["cloud"]),
      // toolbarItem(tools['octagon']),
      toolbarItem(tools["star"]),
      toolbarItem(tools["oval"]),
      toolbarItem(tools["x-box"]),
      toolbarItem(tools["check-box"]),
      toolbarItem(tools["arrow-left"]),
      toolbarItem(tools["arrow-up"]),
      toolbarItem(tools["arrow-down"]),
      toolbarItem(tools["arrow-right"]),
      toolbarItem(tools.frame),
      toolbarItem(tools.line),
      highlighterEnabled ? toolbarItem(tools.highlight) : null,
      toolbarItem(tools.laser)
    ]);
    if (overrides) {
      return overrides(editor, schema, { tools });
    }
    return schema;
  }, [editor, highlighterEnabled, overrides, tools]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarSchemaContext.Provider, { value: toolbarSchema, children });
}
function useToolbarSchema() {
  const ctx = import_react.default.useContext(ToolbarSchemaContext);
  if (!ctx) {
    throw new Error("useToolbarSchema must be used within a ToolbarSchemaProvider");
  }
  return ctx;
}
//# sourceMappingURL=useToolbarSchema.js.map
