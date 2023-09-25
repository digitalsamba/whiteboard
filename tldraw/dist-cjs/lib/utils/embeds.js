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
var embeds_exports = {};
__export(embeds_exports, {
  getEmbedInfo: () => getEmbedInfo,
  getEmbedInfoUnsafely: () => getEmbedInfoUnsafely,
  matchEmbedUrl: () => matchEmbedUrl,
  matchUrl: () => matchUrl
});
module.exports = __toCommonJS(embeds_exports);
var import_editor = require("@tldraw/editor");
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function matchEmbedUrl(url) {
  const host = new URL(url).host.replace("www.", "");
  for (const localEmbedDef of import_editor.EMBED_DEFINITIONS) {
    if (checkHostnames(localEmbedDef.hostnames, host)) {
      const originalUrl = localEmbedDef.fromEmbedUrl(url);
      if (originalUrl) {
        return {
          definition: localEmbedDef,
          url: originalUrl,
          embedUrl: url
        };
      }
    }
  }
}
const globlikeRegExp = (input) => {
  return input.split("*").map((str) => escapeStringRegexp(str)).join(".+");
};
const checkHostnames = (hostnames, targetHostname) => {
  return !!hostnames.find((hostname) => {
    const re = new RegExp(globlikeRegExp(hostname));
    return targetHostname.match(re);
  });
};
function matchUrl(url) {
  const host = new URL(url).host.replace("www.", "");
  for (const localEmbedDef of import_editor.EMBED_DEFINITIONS) {
    if (checkHostnames(localEmbedDef.hostnames, host)) {
      const embedUrl = localEmbedDef.toEmbedUrl(url);
      if (embedUrl) {
        return {
          definition: localEmbedDef,
          embedUrl,
          url
        };
      }
    }
  }
}
function getEmbedInfoUnsafely(inputUrl) {
  const result = matchUrl(inputUrl) ?? matchEmbedUrl(inputUrl);
  return result;
}
function getEmbedInfo(inputUrl) {
  try {
    return getEmbedInfoUnsafely(inputUrl);
  } catch (e) {
    console.error(e);
  }
  return void 0;
}
//# sourceMappingURL=embeds.js.map
