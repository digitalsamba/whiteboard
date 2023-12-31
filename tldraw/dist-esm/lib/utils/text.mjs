import { INDENT } from "../shapes/shared/TextHelpers.mjs";
const rtlRegex = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
function isRightToLeftLanguage(text) {
  return rtlRegex.test(text);
}
function replaceTabsWithSpaces(text) {
  return text.replace(/\t/g, INDENT);
}
function stripCommonMinimumIndentation(text) {
  const lines = text.split("\n");
  while (lines[0].trim().length === 0) {
    lines.shift();
  }
  let minIndentation = Infinity;
  for (const line of lines) {
    if (line.trim().length > 0) {
      const indentation = line.length - line.trimStart().length;
      minIndentation = Math.min(minIndentation, indentation);
    }
  }
  return lines.map((line) => line.slice(minIndentation)).join("\n");
}
function stripTrailingWhitespace(text) {
  return text.replace(/[ \t]+$/gm, "").replace(/\n+$/, "");
}
function cleanupText(text) {
  return stripTrailingWhitespace(stripCommonMinimumIndentation(replaceTabsWithSpaces(text)));
}
const truncateStringWithEllipsis = (str, maxLength) => {
  return str.length <= maxLength ? str : str.substring(0, maxLength - 3) + "...";
};
export {
  cleanupText,
  isRightToLeftLanguage,
  truncateStringWithEllipsis
};
//# sourceMappingURL=text.mjs.map
