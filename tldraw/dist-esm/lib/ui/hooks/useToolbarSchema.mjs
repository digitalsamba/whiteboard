import { jsx } from "react/jsx-runtime";
import { compact, featureFlags, useEditor, useValue } from "@tldraw/editor";
import React from "react";
import { useTools } from "./useTools.mjs";
function toolbarItem(toolItem) {
  return {
    id: toolItem.id,
    type: "item",
    readonlyOk: toolItem.readonlyOk,
    toolItem
  };
}
const ToolbarSchemaContext = React.createContext([]);
function ToolbarSchemaProvider({ overrides, children }) {
  const editor = useEditor();
  const tools = useTools();
  const highlighterEnabled = useValue(featureFlags.highlighterTool);
  const toolbarSchema = React.useMemo(() => {
    const schema = compact([
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
  return /* @__PURE__ */ jsx(ToolbarSchemaContext.Provider, { value: toolbarSchema, children });
}
function useToolbarSchema() {
  const ctx = React.useContext(ToolbarSchemaContext);
  if (!ctx) {
    throw new Error("useToolbarSchema must be used within a ToolbarSchemaProvider");
  }
  return ctx;
}
export {
  ToolbarSchemaContext,
  ToolbarSchemaProvider,
  toolbarItem,
  useToolbarSchema
};
//# sourceMappingURL=useToolbarSchema.mjs.map
