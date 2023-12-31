import { jsx } from "react/jsx-runtime";
import {
  DefaultSelectionBackground,
  useEditor,
  useValue
} from "@tldraw/editor";
const TldrawSelectionBackground = ({ bounds, rotation }) => {
  const editor = useEditor();
  const shouldDisplay = useValue(
    "should display",
    () => editor.isInAny(
      "select.idle",
      "select.brushing",
      "select.scribble_brushing",
      "select.pointing_shape",
      "select.pointing_selection",
      "text.resizing"
    ),
    [editor]
  );
  if (!shouldDisplay)
    return null;
  return /* @__PURE__ */ jsx(DefaultSelectionBackground, { bounds, rotation });
};
export {
  TldrawSelectionBackground
};
//# sourceMappingURL=TldrawSelectionBackground.mjs.map
