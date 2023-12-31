import { useValue } from "@tldraw/state";
import { useMemo } from "react";
import { useEditor } from "./useEditor.mjs";
function usePresence(userId) {
  const editor = useEditor();
  const $presences = useMemo(() => {
    return editor.store.query.records("instance_presence", () => ({
      userId: { eq: userId }
    }));
  }, [editor, userId]);
  const latestPresence = useValue(
    `latestPresence:${userId}`,
    () => {
      return $presences.value.slice().sort((a, b) => b.lastActivityTimestamp - a.lastActivityTimestamp)[0];
    },
    []
  );
  return latestPresence ?? null;
}
export {
  usePresence
};
//# sourceMappingURL=usePresence.mjs.map
