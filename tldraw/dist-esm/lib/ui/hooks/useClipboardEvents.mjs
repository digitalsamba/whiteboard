import {
  isNonNull,
  uniq,
  useEditor,
  useValue
} from "@tldraw/editor";
import { compressToBase64, decompressFromBase64 } from "lz-string";
import { useCallback, useEffect } from "react";
import { pasteExcalidrawContent } from "./clipboard/pasteExcalidrawContent.mjs";
import { pasteFiles } from "./clipboard/pasteFiles.mjs";
import { pasteTldrawContent } from "./clipboard/pasteTldrawContent.mjs";
import { pasteUrl } from "./clipboard/pasteUrl.mjs";
import { useUiEvents } from "./useEventsProvider.mjs";
function stripHtml(html) {
  const doc = document.implementation.createHTMLDocument("");
  doc.documentElement.innerHTML = html.trim();
  return doc.body.textContent || doc.body.innerText || "";
}
const isValidHttpURL = (url) => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch (e) {
    return false;
  }
};
const getValidHttpURLList = (url) => {
  const urls = url.split(/[\n\s]/);
  for (const url2 of urls) {
    try {
      const u = new URL(url2);
      if (!(u.protocol === "http:" || u.protocol === "https:")) {
        return;
      }
    } catch (e) {
      return;
    }
  }
  return uniq(urls);
};
const isSvgText = (text) => {
  return /^<svg/.test(text);
};
const INPUTS = ["input", "select", "textarea"];
function disallowClipboardEvents(editor) {
  const { activeElement } = document;
  return editor.isMenuOpen || activeElement && (activeElement.getAttribute("contenteditable") || INPUTS.indexOf(activeElement.tagName.toLowerCase()) > -1);
}
async function blobAsString(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      const text = reader.result;
      resolve(text);
    });
    reader.addEventListener("error", () => {
      reject(reader.error);
    });
    reader.readAsText(blob);
  });
}
const isFile = (item) => {
  return item.types.find((i) => i.match(/^image\//));
};
const handleText = (editor, data, point, sources) => {
  const validUrlList = getValidHttpURLList(data);
  if (validUrlList) {
    for (const url of validUrlList) {
      pasteUrl(editor, url, point);
    }
  } else if (isValidHttpURL(data)) {
    pasteUrl(editor, data, point);
  } else if (isSvgText(data)) {
    editor.mark("paste");
    editor.putExternalContent({
      type: "svg-text",
      text: data,
      point,
      sources
    });
  } else {
    editor.mark("paste");
    editor.putExternalContent({
      type: "text",
      text: data,
      point,
      sources
    });
  }
};
const handlePasteFromEventClipboardData = async (editor, clipboardData, point) => {
  if (editor.editingShapeId !== null)
    return;
  if (!clipboardData) {
    throw Error("No clipboard data");
  }
  const things = [];
  for (const item of Object.values(clipboardData.items)) {
    switch (item.kind) {
      case "file": {
        things.push({
          type: "file",
          source: new Promise((r) => r(item.getAsFile()))
        });
        break;
      }
      case "string": {
        if (item.type === "text/html") {
          things.push({
            type: "html",
            source: new Promise((r) => item.getAsString(r))
          });
        } else if (item.type === "text/plain") {
          things.push({
            type: "text",
            source: new Promise((r) => item.getAsString(r))
          });
        } else {
          things.push({ type: item.type, source: new Promise((r) => item.getAsString(r)) });
        }
        break;
      }
    }
  }
  handleClipboardThings(editor, things, point);
};
const handlePasteFromClipboardApi = async (editor, clipboardItems, point) => {
  const things = [];
  for (const item of clipboardItems) {
    if (isFile(item)) {
      for (const type of item.types) {
        if (type.match(/^image\//)) {
          things.push({ type: "blob", source: item.getType(type) });
        }
      }
    }
    if (item.types.includes("text/html")) {
      things.push({
        type: "html",
        source: new Promise(
          (r) => item.getType("text/html").then((blob) => blobAsString(blob).then(r))
        )
      });
    }
    if (item.types.includes("text/uri-list")) {
      things.push({
        type: "url",
        source: new Promise(
          (r) => item.getType("text/uri-list").then((blob) => blobAsString(blob).then(r))
        )
      });
    }
    if (item.types.includes("text/plain")) {
      things.push({
        type: "text",
        source: new Promise(
          (r) => item.getType("text/plain").then((blob) => blobAsString(blob).then(r))
        )
      });
    }
  }
  return await handleClipboardThings(editor, things, point);
};
async function handleClipboardThings(editor, things, point) {
  const files = things.filter(
    (t) => (t.type === "file" || t.type === "blob") && t.source !== null
  );
  if (files.length) {
    const fileBlobs = await Promise.all(files.map((t) => t.source));
    const urls = fileBlobs.filter(Boolean).map(
      (blob) => URL.createObjectURL(blob)
    );
    return await pasteFiles(editor, urls, point);
  }
  const results = await Promise.all(
    things.filter((t) => t.type !== "file").map(
      (t) => new Promise((r) => {
        const thing = t;
        if (thing.type === "file") {
          r({ type: "error", data: null, reason: "unexpected file" });
          return;
        }
        thing.source.then((text) => {
          const tldrawHtmlComment = text.match(/<tldraw[^>]*>(.*)<\/tldraw>/)?.[1];
          if (tldrawHtmlComment) {
            try {
              const jsonComment = decompressFromBase64(tldrawHtmlComment);
              if (jsonComment === null) {
                r({
                  type: "error",
                  data: jsonComment,
                  reason: `found tldraw data comment but could not parse base64`
                });
                return;
              } else {
                const json = JSON.parse(jsonComment);
                if (json.type !== "application/tldraw") {
                  r({
                    type: "error",
                    data: json,
                    reason: `found tldraw data comment but JSON was of a different type: ${json.type}`
                  });
                }
                if (typeof json.data === "string") {
                  r({
                    type: "error",
                    data: json,
                    reason: "found tldraw json but data was a string instead of a TLClipboardModel object"
                  });
                  return;
                }
                r({ type: "tldraw", data: json.data });
                return;
              }
            } catch (e) {
              r({
                type: "error",
                data: tldrawHtmlComment,
                reason: "found tldraw json but data was a string instead of a TLClipboardModel object"
              });
              return;
            }
          } else {
            if (thing.type === "html") {
              r({ type: "text", data: text, subtype: "html" });
              return;
            }
            if (thing.type === "url") {
              r({ type: "text", data: text, subtype: "url" });
              return;
            }
            try {
              const json = JSON.parse(text);
              if (json.type === "excalidraw/clipboard") {
                r({ type: "excalidraw", data: json });
                return;
              } else {
                r({ type: "text", data: text, subtype: "json" });
                return;
              }
            } catch (e) {
              r({ type: "text", data: text, subtype: "text" });
              return;
            }
          }
          r({ type: "error", data: text, reason: "unhandled case" });
        });
      })
    )
  );
  for (const result of results) {
    if (result.type === "tldraw") {
      pasteTldrawContent(editor, result.data, point);
      return;
    }
  }
  for (const result of results) {
    if (result.type === "excalidraw") {
      pasteExcalidrawContent(editor, result.data, point);
      return;
    }
  }
  for (const result of results) {
    if (result.type === "text" && result.subtype === "html") {
      const rootNode = new DOMParser().parseFromString(result.data, "text/html");
      const bodyNode = rootNode.querySelector("body");
      const isHtmlSingleLink = bodyNode && Array.from(bodyNode.children).filter((el) => el.nodeType === 1).length === 1 && bodyNode.firstElementChild && bodyNode.firstElementChild.tagName === "A" && bodyNode.firstElementChild.hasAttribute("href") && bodyNode.firstElementChild.getAttribute("href") !== "";
      if (isHtmlSingleLink) {
        const href = bodyNode.firstElementChild.getAttribute("href");
        handleText(editor, href, point, results);
        return;
      }
      if (!results.some((r) => r.type === "text" && r.subtype !== "html") && result.data.trim()) {
        handleText(editor, stripHtml(result.data), point, results);
        return;
      }
    }
  }
  for (const result of results) {
    if (result.type === "text" && result.subtype === "url") {
      pasteUrl(editor, result.data, point, results);
      return;
    }
  }
  for (const result of results) {
    if (result.type === "text" && result.subtype === "text" && result.data.trim()) {
      handleText(editor, result.data, point, results);
      return;
    }
  }
}
const handleNativeOrMenuCopy = (editor) => {
  const content = editor.getContentFromCurrentPage(editor.selectedShapeIds);
  if (!content) {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText("");
    }
    return;
  }
  const stringifiedClipboard = compressToBase64(
    JSON.stringify({
      type: "application/tldraw",
      kind: "content",
      data: content
    })
  );
  if (typeof navigator === "undefined") {
    return;
  } else {
    const textItems = content.shapes.map((shape) => {
      if (editor.isShapeOfType(shape, "text") || editor.isShapeOfType(shape, "geo") || editor.isShapeOfType(shape, "arrow")) {
        return shape.props.text;
      }
      if (editor.isShapeOfType(shape, "bookmark") || editor.isShapeOfType(shape, "embed")) {
        return shape.props.url;
      }
      return null;
    }).filter(isNonNull);
    if (navigator.clipboard?.write) {
      const htmlBlob = new Blob([`<tldraw>${stringifiedClipboard}</tldraw>`], {
        type: "text/html"
      });
      let textContent = textItems.join(" ");
      if (textContent === "") {
        textContent = " ";
      }
      navigator.clipboard.write([
        new ClipboardItem({
          "text/html": htmlBlob,
          // What is this second blob used for?
          "text/plain": new Blob([textContent], { type: "text/plain" })
        })
      ]);
    } else if (navigator.clipboard.writeText) {
      navigator.clipboard.writeText(`<tldraw>${stringifiedClipboard}</tldraw>`);
    }
  }
};
function useMenuClipboardEvents() {
  const editor = useEditor();
  const trackEvent = useUiEvents();
  const copy = useCallback(
    function onCopy(source) {
      if (editor.selectedShapeIds.length === 0)
        return;
      handleNativeOrMenuCopy(editor);
      trackEvent("copy", { source });
    },
    [editor, trackEvent]
  );
  const cut = useCallback(
    function onCut(source) {
      if (editor.selectedShapeIds.length === 0)
        return;
      handleNativeOrMenuCopy(editor);
      editor.deleteShapes(editor.selectedShapeIds);
      trackEvent("cut", { source });
    },
    [editor, trackEvent]
  );
  const paste = useCallback(
    async function onPaste(data, source, point) {
      if (editor.editingShapeId !== null || disallowClipboardEvents(editor))
        return;
      if (Array.isArray(data) && data[0] instanceof ClipboardItem) {
        handlePasteFromClipboardApi(editor, data, point);
        trackEvent("paste", { source: "menu" });
      } else {
        navigator.clipboard.read().then((clipboardItems) => {
          paste(clipboardItems, source, point);
        });
      }
    },
    [editor, trackEvent]
  );
  return {
    copy,
    cut,
    paste
  };
}
function useNativeClipboardEvents() {
  const editor = useEditor();
  const trackEvent = useUiEvents();
  const appIsFocused = useValue("editor.isFocused", () => editor.instanceState.isFocused, [editor]);
  useEffect(() => {
    if (!appIsFocused)
      return;
    const copy = () => {
      if (editor.selectedShapeIds.length === 0 || editor.editingShapeId !== null || disallowClipboardEvents(editor))
        return;
      handleNativeOrMenuCopy(editor);
      trackEvent("copy", { source: "kbd" });
    };
    function cut() {
      if (editor.selectedShapeIds.length === 0 || editor.editingShapeId !== null || disallowClipboardEvents(editor))
        return;
      handleNativeOrMenuCopy(editor);
      editor.deleteShapes(editor.selectedShapeIds);
      trackEvent("cut", { source: "kbd" });
    }
    let disablingMiddleClickPaste = false;
    const pointerUpHandler = (e) => {
      if (e.button === 1) {
        disablingMiddleClickPaste = true;
        requestAnimationFrame(() => {
          disablingMiddleClickPaste = false;
        });
      }
    };
    const paste = (event) => {
      if (disablingMiddleClickPaste) {
        event.stopPropagation();
        return;
      }
      if (editor.editingShapeId !== null || disallowClipboardEvents(editor))
        return;
      if (event.clipboardData && !editor.inputs.shiftKey) {
        handlePasteFromEventClipboardData(editor, event.clipboardData);
      } else {
        navigator.clipboard.read().then((clipboardItems) => {
          if (Array.isArray(clipboardItems) && clipboardItems[0] instanceof ClipboardItem) {
            handlePasteFromClipboardApi(editor, clipboardItems, editor.inputs.currentPagePoint);
          }
        });
      }
      trackEvent("paste", { source: "kbd" });
    };
    document.addEventListener("copy", copy);
    document.addEventListener("cut", cut);
    document.addEventListener("paste", paste);
    document.addEventListener("pointerup", pointerUpHandler);
    return () => {
      document.removeEventListener("copy", copy);
      document.removeEventListener("cut", cut);
      document.removeEventListener("paste", paste);
      document.removeEventListener("pointerup", pointerUpHandler);
    };
  }, [editor, trackEvent, appIsFocused]);
}
export {
  isValidHttpURL,
  useMenuClipboardEvents,
  useNativeClipboardEvents
};
//# sourceMappingURL=useClipboardEvents.mjs.map
