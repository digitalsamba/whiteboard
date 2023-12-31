import { useEditor } from "@tldraw/editor";
import { useCallback, useEffect, useRef } from "react";
function useInsertMedia() {
  const editor = useEditor();
  const inputRef = useRef();
  useEffect(() => {
    const input = window.document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif,image/svg+xml,video/mp4,video/quicktime";
    input.multiple = true;
    inputRef.current = input;
    async function onchange(e) {
      const fileList = e.target.files;
      if (!fileList || fileList.length === 0)
        return;
      await editor.putExternalContent({
        type: "files",
        files: Array.from(fileList),
        point: editor.viewportPageBounds.center,
        ignoreParent: false
      });
      input.value = "";
    }
    input.addEventListener("change", onchange);
    return () => {
      inputRef.current = void 0;
      input.removeEventListener("change", onchange);
    };
  }, [editor]);
  return useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);
}
export {
  useInsertMedia
};
//# sourceMappingURL=useInsertMedia.mjs.map
