"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var text_exports = {};
__export(text_exports, {
  cleanupText: () => cleanupText,
  isRightToLeftLanguage: () => isRightToLeftLanguage,
  truncateStringWithEllipsis: () => truncateStringWithEllipsis
});
module.exports = __toCommonJS(text_exports);
var import_TextHelpers = require("../shapes/shared/TextHelpers");
const rtlRegex = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
function isRightToLeftLanguage(text) {
  return rtlRegex.test(text);
}
function replaceTabsWithSpaces(text) {
  return text.replace(/\t/g, import_TextHelpers.INDENT);
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
//# sourceMappingURL=text.js.map
