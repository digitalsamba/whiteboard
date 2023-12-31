import { useComputed, useValue } from "@tldraw/state";
import { useMemo } from "react";
import { uniq } from "../utils/uniq.mjs";
import { useEditor } from "./useEditor.mjs";
function usePeerIds() {
  const editor = useEditor();
  const $presences = useMemo(() => {
    return editor.store.query.records("instance_presence", () => ({
      userId: { neq: editor.user.id }
    }));
  }, [editor]);
  const $userIds = useComputed(
    "userIds",
    () => uniq($presences.value.map((p) => p.userId)).sort(),
    { isEqual: (a, b) => a.join(",") === b.join?.(",") },
    [$presences]
  );
  return useValue($userIds);
}
export {
  usePeerIds
};
//# sourceMappingURL=usePeerIds.mjs.map
