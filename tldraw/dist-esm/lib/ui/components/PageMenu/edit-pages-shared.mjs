import { getIndexAbove, getIndexBelow, getIndexBetween } from "@tldraw/editor";
const onMovePage = (editor, id, from, to) => {
  let index;
  const pages = editor.pages;
  const below = from > to ? pages[to - 1] : pages[to];
  const above = from > to ? pages[to] : pages[to + 1];
  if (below && !above) {
    index = getIndexAbove(below.index);
  } else if (!below && above) {
    index = getIndexBelow(pages[0].index);
  } else {
    index = getIndexBetween(below.index, above.index);
  }
  if (index !== pages[from].index) {
    editor.mark("moving page");
    editor.updatePage({
      id,
      index
    });
  }
};
export {
  onMovePage
};
//# sourceMappingURL=edit-pages-shared.mjs.map
