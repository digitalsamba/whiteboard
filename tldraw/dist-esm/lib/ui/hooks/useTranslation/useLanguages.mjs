import { LANGUAGES, useEditor } from "@tldraw/editor";
function useLanguages() {
  const editor = useEditor();
  return {
    languages: LANGUAGES,
    currentLanguage: editor.user.locale
  };
}
export {
  useLanguages
};
//# sourceMappingURL=useLanguages.mjs.map
