import { uniqueId } from "../../utils/uniqueId.mjs";
const fixNewLines = /\r?\n|\r/g;
function normalizeTextForDom(text) {
  return text.replace(fixNewLines, "\n").split("\n").map((x) => x || " ").join("\n");
}
const textAlignmentsForLtr = {
  start: "left",
  "start-legacy": "left",
  middle: "center",
  "middle-legacy": "center",
  end: "right",
  "end-legacy": "right"
};
const spaceCharacterRegex = /\s/;
class TextManager {
  constructor(editor) {
    this.editor = editor;
  }
  getTextElement() {
    const oldElm = document.querySelector(".tl-text-measure");
    oldElm?.remove();
    const elm = document.createElement("div");
    this.editor.getContainer().appendChild(elm);
    elm.id = `__textMeasure_${uniqueId()}`;
    elm.classList.add("tl-text");
    elm.classList.add("tl-text-measure");
    elm.tabIndex = -1;
    return elm;
  }
  measureText = (textToMeasure, opts) => {
    const elm = this.getTextElement();
    elm.setAttribute("dir", "ltr");
    elm.style.setProperty("font-family", opts.fontFamily);
    elm.style.setProperty("font-style", opts.fontStyle);
    elm.style.setProperty("font-weight", opts.fontWeight);
    elm.style.setProperty("font-size", opts.fontSize + "px");
    elm.style.setProperty("line-height", opts.lineHeight * opts.fontSize + "px");
    elm.style.setProperty("width", opts.width);
    elm.style.setProperty("min-width", opts.minWidth ?? null);
    elm.style.setProperty("max-width", opts.maxWidth);
    elm.style.setProperty("padding", opts.padding);
    elm.textContent = normalizeTextForDom(textToMeasure);
    const rect = elm.getBoundingClientRect();
    return {
      x: 0,
      y: 0,
      w: rect.width,
      h: rect.height
    };
  };
  /**
   * Given an html element, measure the position of each span of unbroken
   * word/white-space characters within any text nodes it contains.
   */
  measureElementTextNodeSpans(element, { shouldTruncateToFirstLine = false } = {}) {
    const spans = [];
    const elmBounds = element.getBoundingClientRect();
    const offsetX = -elmBounds.left;
    const offsetY = -elmBounds.top;
    const range = new Range();
    const textNode = element.childNodes[0];
    let idx = 0;
    let currentSpan = null;
    let prevCharWasSpaceCharacter = null;
    let prevCharTop = 0;
    let didTruncate = false;
    for (const childNode of element.childNodes) {
      if (childNode.nodeType !== Node.TEXT_NODE)
        continue;
      for (const char of childNode.textContent ?? "") {
        range.setStart(textNode, idx);
        range.setEnd(textNode, idx + char.length);
        const rects = range.getClientRects();
        const rect = rects[rects.length - 1];
        const top = rect.top + offsetY;
        const left = rect.left + offsetX;
        const right = rect.right + offsetX;
        const isSpaceCharacter = spaceCharacterRegex.test(char);
        if (
          // If we're at a word boundary...
          isSpaceCharacter !== prevCharWasSpaceCharacter || // ...or we're on a different line...
          top !== prevCharTop || // ...or we're at the start of the text and haven't created a span yet...
          !currentSpan
        ) {
          if (currentSpan) {
            if (shouldTruncateToFirstLine && top !== prevCharTop) {
              didTruncate = true;
              break;
            }
            spans.push(currentSpan);
          }
          currentSpan = {
            box: { x: left, y: top, w: rect.width, h: rect.height },
            text: char
          };
        } else {
          currentSpan.box.w = right - currentSpan.box.x;
          currentSpan.text += char;
        }
        prevCharWasSpaceCharacter = isSpaceCharacter;
        prevCharTop = top;
        idx += char.length;
      }
    }
    if (currentSpan) {
      spans.push(currentSpan);
    }
    return { spans, didTruncate };
  }
  /**
   * Measure text into individual spans. Spans are created by rendering the
   * text, then dividing it up according to line breaks and word boundaries.
   *
   * It works by having the browser render the text, then measuring the
   * position of each character. You can use this to replicate the text-layout
   * algorithm of the current browser in e.g. an SVG export.
   */
  measureTextSpans(textToMeasure, opts) {
    const shouldTruncateToFirstLine = opts.overflow === "truncate-ellipsis" || opts.overflow === "truncate-clip";
    const element = this.getTextElement();
    const elementWidth = Math.ceil(opts.width - opts.padding * 2);
    element.style.setProperty("width", `${elementWidth}px`);
    element.style.setProperty("height", "min-content");
    element.style.setProperty("dir", "ltr");
    element.style.setProperty("font-size", `${opts.fontSize}px`);
    element.style.setProperty("font-family", opts.fontFamily);
    element.style.setProperty("font-weight", opts.fontWeight);
    element.style.setProperty("line-height", `${opts.lineHeight * opts.fontSize}px`);
    element.style.setProperty("text-align", textAlignmentsForLtr[opts.textAlign]);
    if (shouldTruncateToFirstLine) {
      element.style.setProperty("overflow-wrap", "anywhere");
      element.style.setProperty("word-break", "break-all");
    }
    element.textContent = textToMeasure;
    const { spans, didTruncate } = this.measureElementTextNodeSpans(element, {
      shouldTruncateToFirstLine
    });
    if (opts.overflow === "truncate-ellipsis" && didTruncate) {
      element.textContent = "\u2026";
      const ellipsisWidth = Math.ceil(this.measureElementTextNodeSpans(element).spans[0].box.w);
      element.style.setProperty("width", `${elementWidth - ellipsisWidth}px`);
      element.textContent = textToMeasure;
      const truncatedSpans = this.measureElementTextNodeSpans(element, {
        shouldTruncateToFirstLine: true
      }).spans;
      const lastSpan = truncatedSpans[truncatedSpans.length - 1];
      truncatedSpans.push({
        text: "\u2026",
        box: {
          x: Math.min(lastSpan.box.x + lastSpan.box.w, opts.width - opts.padding - ellipsisWidth),
          y: lastSpan.box.y,
          w: ellipsisWidth,
          h: lastSpan.box.h
        }
      });
      return truncatedSpans;
    }
    element.remove();
    return spans;
  }
}
export {
  TextManager
};
//# sourceMappingURL=TextManager.mjs.map
