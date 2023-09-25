import { jsx } from "react/jsx-runtime";
import { track, useEditor } from "@tldraw/editor";
import { useActions } from "../hooks/useActions.mjs";
import { useTranslation } from "../hooks/useTranslation/useTranslation.mjs";
import { Button } from "./primitives/Button.mjs";
import { kbdStr } from "./primitives/shared.mjs";
const DuplicateButton = track(function DuplicateButton2() {
  const editor = useEditor();
  const actions = useActions();
  const msg = useTranslation();
  const action = actions["duplicate"];
  return /* @__PURE__ */ jsx(
    Button,
    {
      icon: action.icon,
      onClick: () => action.onSelect("quick-actions"),
      disabled: !(editor.isIn("select") && editor.selectedShapeIds.length > 0),
      title: `${msg(action.label)} ${kbdStr(action.kbd)}`,
      smallIcon: true
    }
  );
});
export {
  DuplicateButton
};
//# sourceMappingURL=DuplicateButton.mjs.map
