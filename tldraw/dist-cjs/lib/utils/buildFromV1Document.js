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
var buildFromV1Document_exports = {};
__export(buildFromV1Document_exports, {
  buildFromV1Document: () => buildFromV1Document
});
module.exports = __toCommonJS(buildFromV1Document_exports);
var import_editor = require("@tldraw/editor");
const TLDRAW_V1_VERSION = 15.5;
function buildFromV1Document(editor, document) {
  editor.batch(() => {
    document = migrate(document, TLDRAW_V1_VERSION);
    editor.cancel().cancel().cancel().cancel();
    const firstPageId = editor.pages[0].id;
    editor.setCurrentPage(firstPageId);
    for (const page of editor.pages.slice(1)) {
      editor.deletePage(page.id);
    }
    editor.selectAll();
    editor.deleteShapes(editor.selectedShapeIds);
    const v1AssetIdsToV2AssetIds = /* @__PURE__ */ new Map();
    Object.values(document.assets ?? {}).forEach((v1Asset) => {
      switch (v1Asset.type) {
        case "image" /* Image */: {
          const assetId = import_editor.AssetRecordType.createId();
          v1AssetIdsToV2AssetIds.set(v1Asset.id, assetId);
          const placeholderAsset = {
            id: assetId,
            typeName: "asset",
            type: "image",
            props: {
              w: coerceDimension(v1Asset.size[0]),
              h: coerceDimension(v1Asset.size[1]),
              name: v1Asset.fileName ?? "Untitled",
              isAnimated: false,
              mimeType: null,
              src: v1Asset.src
            },
            meta: {}
          };
          editor.createAssets([placeholderAsset]);
          tryMigrateAsset(editor, placeholderAsset);
          break;
        }
        case "video" /* Video */:
          {
            const assetId = import_editor.AssetRecordType.createId();
            v1AssetIdsToV2AssetIds.set(v1Asset.id, assetId);
            editor.createAssets([
              {
                id: assetId,
                typeName: "asset",
                type: "video",
                props: {
                  w: coerceDimension(v1Asset.size[0]),
                  h: coerceDimension(v1Asset.size[1]),
                  name: v1Asset.fileName ?? "Untitled",
                  isAnimated: true,
                  mimeType: null,
                  src: v1Asset.src
                },
                meta: {}
              }
            ]);
          }
          break;
      }
    });
    const v1PageIdsToV2PageIds = /* @__PURE__ */ new Map();
    Object.values(document.pages ?? {}).sort((a, b) => (a.childIndex ?? 1) < (b.childIndex ?? 1) ? -1 : 1).forEach((v1Page, i) => {
      if (i === 0) {
        v1PageIdsToV2PageIds.set(v1Page.id, editor.currentPageId);
      } else {
        const pageId = import_editor.PageRecordType.createId();
        v1PageIdsToV2PageIds.set(v1Page.id, pageId);
        editor.createPage({ name: v1Page.name ?? "Page", id: pageId });
      }
    });
    Object.values(document.pages ?? {}).sort((a, b) => (a.childIndex ?? 1) < (b.childIndex ?? 1) ? -1 : 1).forEach((v1Page) => {
      editor.setCurrentPage(v1PageIdsToV2PageIds.get(v1Page.id));
      const v1ShapeIdsToV2ShapeIds = /* @__PURE__ */ new Map();
      const v1GroupShapeIdsToV1ChildIds = /* @__PURE__ */ new Map();
      const v1Shapes = Object.values(v1Page.shapes ?? {}).sort((a, b) => a.childIndex < b.childIndex ? -1 : 1).slice(0, import_editor.MAX_SHAPES_PER_PAGE);
      v1Shapes.forEach((v1Shape) => {
        if (v1Shape.type !== "group" /* Group */)
          return;
        const shapeId = (0, import_editor.createShapeId)();
        v1ShapeIdsToV2ShapeIds.set(v1Shape.id, shapeId);
        v1GroupShapeIdsToV1ChildIds.set(v1Shape.id, []);
      });
      function decideNotToCreateShape(v1Shape) {
        v1ShapeIdsToV2ShapeIds.delete(v1Shape.id);
        const v1GroupParent = v1GroupShapeIdsToV1ChildIds.has(v1Shape.parentId);
        if (v1GroupParent) {
          const ids = v1GroupShapeIdsToV1ChildIds.get(v1Shape.parentId).filter((id) => id !== v1Shape.id);
          v1GroupShapeIdsToV1ChildIds.set(v1Shape.parentId, ids);
        }
      }
      v1Shapes.forEach((v1Shape) => {
        if (v1Shape.type === "group" /* Group */) {
          return;
        }
        const shapeId = (0, import_editor.createShapeId)();
        v1ShapeIdsToV2ShapeIds.set(v1Shape.id, shapeId);
        if (v1Shape.parentId !== v1Page.id) {
          if (v1GroupShapeIdsToV1ChildIds.has(v1Shape.parentId)) {
            v1GroupShapeIdsToV1ChildIds.get(v1Shape.parentId).push(v1Shape.id);
          } else {
            console.warn("parent does not exist", v1Shape);
          }
        }
        const parentId = v1PageIdsToV2PageIds.get(v1Page.id);
        const inCommon = {
          id: shapeId,
          parentId,
          x: coerceNumber(v1Shape.point[0]),
          y: coerceNumber(v1Shape.point[1]),
          rotation: 0,
          isLocked: !!v1Shape.isLocked
        };
        switch (v1Shape.type) {
          case "sticky" /* Sticky */: {
            editor.createShapes([
              {
                ...inCommon,
                type: "note",
                props: {
                  text: v1Shape.text ?? "",
                  color: getV2Color(v1Shape.style.color),
                  size: getV2Size(v1Shape.style.size),
                  font: getV2Font(v1Shape.style.font),
                  align: getV2Align(v1Shape.style.textAlign)
                }
              }
            ]);
            break;
          }
          case "rectangle" /* Rectangle */: {
            editor.createShapes([
              {
                ...inCommon,
                type: "geo",
                props: {
                  geo: "rectangle",
                  w: coerceDimension(v1Shape.size[0]),
                  h: coerceDimension(v1Shape.size[1]),
                  text: v1Shape.label ?? "",
                  fill: getV2Fill(v1Shape.style.isFilled, v1Shape.style.color),
                  labelColor: getV2Color(v1Shape.style.color),
                  color: getV2Color(v1Shape.style.color),
                  size: getV2Size(v1Shape.style.size),
                  font: getV2Font(v1Shape.style.font),
                  dash: getV2Dash(v1Shape.style.dash),
                  align: "middle"
                }
              }
            ]);
            const pageBoundsBeforeLabel = editor.getShapePageBounds(inCommon.id);
            editor.updateShapes([
              {
                id: inCommon.id,
                type: "geo",
                props: {
                  text: v1Shape.label ?? ""
                }
              }
            ]);
            if (pageBoundsBeforeLabel.width === pageBoundsBeforeLabel.height) {
              const shape = editor.getShape(inCommon.id);
              const { growY } = shape.props;
              const w = coerceDimension(shape.props.w);
              const h = coerceDimension(shape.props.h);
              const newW = w + growY / 2;
              const newH = h + growY / 2;
              editor.updateShapes([
                {
                  id: inCommon.id,
                  type: "geo",
                  x: coerceNumber(shape.x) - (newW - w) / 2,
                  y: coerceNumber(shape.y) - (newH - h) / 2,
                  props: {
                    w: newW,
                    h: newH
                  }
                }
              ]);
            }
            break;
          }
          case "triangle" /* Triangle */: {
            editor.createShapes([
              {
                ...inCommon,
                type: "geo",
                props: {
                  geo: "triangle",
                  w: coerceDimension(v1Shape.size[0]),
                  h: coerceDimension(v1Shape.size[1]),
                  fill: getV2Fill(v1Shape.style.isFilled, v1Shape.style.color),
                  labelColor: getV2Color(v1Shape.style.color),
                  color: getV2Color(v1Shape.style.color),
                  size: getV2Size(v1Shape.style.size),
                  font: getV2Font(v1Shape.style.font),
                  dash: getV2Dash(v1Shape.style.dash),
                  align: "middle"
                }
              }
            ]);
            const pageBoundsBeforeLabel = editor.getShapePageBounds(inCommon.id);
            editor.updateShapes([
              {
                id: inCommon.id,
                type: "geo",
                props: {
                  text: v1Shape.label ?? ""
                }
              }
            ]);
            if (pageBoundsBeforeLabel.width === pageBoundsBeforeLabel.height) {
              const shape = editor.getShape(inCommon.id);
              const { growY } = shape.props;
              const w = coerceDimension(shape.props.w);
              const h = coerceDimension(shape.props.h);
              const newW = w + growY / 2;
              const newH = h + growY / 2;
              editor.updateShapes([
                {
                  id: inCommon.id,
                  type: "geo",
                  x: coerceNumber(shape.x) - (newW - w) / 2,
                  y: coerceNumber(shape.y) - (newH - h) / 2,
                  props: {
                    w: newW,
                    h: newH
                  }
                }
              ]);
            }
            break;
          }
          case "ellipse" /* Ellipse */: {
            editor.createShapes([
              {
                ...inCommon,
                type: "geo",
                props: {
                  geo: "ellipse",
                  w: coerceDimension(v1Shape.radius[0]) * 2,
                  h: coerceDimension(v1Shape.radius[1]) * 2,
                  fill: getV2Fill(v1Shape.style.isFilled, v1Shape.style.color),
                  labelColor: getV2Color(v1Shape.style.color),
                  color: getV2Color(v1Shape.style.color),
                  size: getV2Size(v1Shape.style.size),
                  font: getV2Font(v1Shape.style.font),
                  dash: getV2Dash(v1Shape.style.dash),
                  align: "middle"
                }
              }
            ]);
            const pageBoundsBeforeLabel = editor.getShapePageBounds(inCommon.id);
            editor.updateShapes([
              {
                id: inCommon.id,
                type: "geo",
                props: {
                  text: v1Shape.label ?? ""
                }
              }
            ]);
            if (pageBoundsBeforeLabel.width === pageBoundsBeforeLabel.height) {
              const shape = editor.getShape(inCommon.id);
              const { growY } = shape.props;
              const w = coerceDimension(shape.props.w);
              const h = coerceDimension(shape.props.h);
              const newW = w + growY / 2;
              const newH = h + growY / 2;
              editor.updateShapes([
                {
                  id: inCommon.id,
                  type: "geo",
                  x: coerceNumber(shape.x) - (newW - w) / 2,
                  y: coerceNumber(shape.y) - (newH - h) / 2,
                  props: {
                    w: newW,
                    h: newH
                  }
                }
              ]);
            }
            break;
          }
          case "draw" /* Draw */: {
            if (v1Shape.points.length === 0) {
              decideNotToCreateShape(v1Shape);
              break;
            }
            editor.createShapes([
              {
                ...inCommon,
                type: "draw",
                props: {
                  fill: getV2Fill(v1Shape.style.isFilled, v1Shape.style.color),
                  color: getV2Color(v1Shape.style.color),
                  size: getV2Size(v1Shape.style.size),
                  dash: getV2Dash(v1Shape.style.dash),
                  isPen: false,
                  isComplete: v1Shape.isComplete,
                  segments: [{ type: "free", points: v1Shape.points.map(getV2Point) }]
                }
              }
            ]);
            break;
          }
          case "arrow" /* Arrow */: {
            const v1Bend = coerceNumber(v1Shape.bend);
            const v1Start = getV2Point(v1Shape.handles.start.point);
            const v1End = getV2Point(v1Shape.handles.end.point);
            const dist = import_editor.Vec2d.Dist(v1Start, v1End);
            const v2Bend = dist * -v1Bend / 2;
            editor.createShapes([
              {
                ...inCommon,
                type: "arrow",
                props: {
                  text: v1Shape.label ?? "",
                  color: getV2Color(v1Shape.style.color),
                  labelColor: getV2Color(v1Shape.style.color),
                  size: getV2Size(v1Shape.style.size),
                  font: getV2Font(v1Shape.style.font),
                  dash: getV2Dash(v1Shape.style.dash),
                  arrowheadStart: getV2Arrowhead(v1Shape.decorations?.start),
                  arrowheadEnd: getV2Arrowhead(v1Shape.decorations?.end),
                  start: {
                    type: "point",
                    x: coerceNumber(v1Shape.handles.start.point[0]),
                    y: coerceNumber(v1Shape.handles.start.point[1])
                  },
                  end: {
                    type: "point",
                    x: coerceNumber(v1Shape.handles.end.point[0]),
                    y: coerceNumber(v1Shape.handles.end.point[1])
                  },
                  bend: v2Bend
                }
              }
            ]);
            break;
          }
          case "text" /* Text */: {
            editor.createShapes([
              {
                ...inCommon,
                type: "text",
                props: {
                  text: v1Shape.text ?? " ",
                  color: getV2Color(v1Shape.style.color),
                  size: getV2TextSize(v1Shape.style.size),
                  font: getV2Font(v1Shape.style.font),
                  align: getV2Align(v1Shape.style.textAlign),
                  scale: v1Shape.style.scale ?? 1
                }
              }
            ]);
            break;
          }
          case "image" /* Image */: {
            const assetId = v1AssetIdsToV2AssetIds.get(v1Shape.assetId);
            if (!assetId) {
              console.warn("Could not find asset id", v1Shape.assetId);
              return;
            }
            editor.createShapes([
              {
                ...inCommon,
                type: "image",
                props: {
                  w: coerceDimension(v1Shape.size[0]),
                  h: coerceDimension(v1Shape.size[1]),
                  assetId
                }
              }
            ]);
            break;
          }
          case "video" /* Video */: {
            const assetId = v1AssetIdsToV2AssetIds.get(v1Shape.assetId);
            if (!assetId) {
              console.warn("Could not find asset id", v1Shape.assetId);
              return;
            }
            editor.createShapes([
              {
                ...inCommon,
                type: "video",
                props: {
                  w: coerceDimension(v1Shape.size[0]),
                  h: coerceDimension(v1Shape.size[1]),
                  assetId
                }
              }
            ]);
            break;
          }
        }
        const rotation = coerceNumber(v1Shape.rotation);
        if (rotation !== 0) {
          editor.select(shapeId);
          editor.rotateShapesBy([shapeId], rotation);
        }
      });
      v1GroupShapeIdsToV1ChildIds.forEach((v1ChildIds, v1GroupId) => {
        const v2ChildShapeIds = v1ChildIds.map((id) => v1ShapeIdsToV2ShapeIds.get(id));
        const v2GroupId = v1ShapeIdsToV2ShapeIds.get(v1GroupId);
        editor.groupShapes(v2ChildShapeIds, v2GroupId);
        const v1Group = v1Page.shapes[v1GroupId];
        const rotation = coerceNumber(v1Group.rotation);
        if (rotation !== 0) {
          editor.select(v2GroupId);
          editor.rotateShapesBy([v2GroupId], rotation);
        }
      });
      v1Shapes.forEach((v1Shape) => {
        if (v1Shape.type !== "arrow" /* Arrow */) {
          return;
        }
        const v2ShapeId = v1ShapeIdsToV2ShapeIds.get(v1Shape.id);
        const util = editor.getShapeUtil("arrow");
        editor.inputs.ctrlKey = false;
        for (const handleId of ["start", "end"]) {
          const bindingId = v1Shape.handles[handleId].bindingId;
          if (bindingId) {
            const binding = v1Page.bindings[bindingId];
            if (!binding) {
              continue;
            }
            const targetId = v1ShapeIdsToV2ShapeIds.get(binding.toId);
            const targetShape = editor.getShape(targetId);
            if (!targetShape)
              continue;
            if (targetId) {
              const bounds2 = editor.getShapePageBounds(targetId);
              const v2ShapeFresh = editor.getShape(v2ShapeId);
              const nx = (0, import_editor.clamp)((coerceNumber(binding.point[0]) + 0.5) / 2, 0.2, 0.8);
              const ny = (0, import_editor.clamp)((coerceNumber(binding.point[1]) + 0.5) / 2, 0.2, 0.8);
              const point = editor.getPointInShapeSpace(v2ShapeFresh, {
                x: bounds2.minX + bounds2.width * nx,
                y: bounds2.minY + bounds2.height * ny
              });
              const handles = editor.getShapeHandles(v2ShapeFresh);
              const change = util.onHandleChange(v2ShapeFresh, {
                handle: {
                  ...handles.find((h) => h.id === handleId),
                  x: point.x,
                  y: point.y
                },
                isPrecise: point.x !== 0.5 || point.y !== 0.5
              });
              if (change) {
                if (change.props?.[handleId]) {
                  const terminal = change.props?.[handleId];
                  if (terminal.type === "binding") {
                    terminal.isExact = binding.distance === 0;
                    if (terminal.boundShapeId !== targetId) {
                      console.warn("Hit the wrong shape!");
                      terminal.boundShapeId = targetId;
                      terminal.normalizedAnchor = { x: 0.5, y: 0.5 };
                    }
                  }
                }
                editor.updateShapes([change]);
              }
            }
          }
        }
      });
    });
    editor.setCurrentPage(firstPageId);
    editor.history.clear();
    editor.selectNone();
    editor.updateViewportScreenBounds();
    const bounds = editor.currentPageBounds;
    if (bounds) {
      editor.zoomToBounds(bounds, 1);
    }
  });
}
function coerceNumber(n) {
  if (typeof n !== "number")
    return 0;
  if (Number.isNaN(n))
    return 0;
  if (!Number.isFinite(n))
    return 0;
  return n;
}
function coerceDimension(d) {
  const n = coerceNumber(d);
  if (n <= 0)
    return 1;
  return n;
}
async function tryMigrateAsset(editor, placeholderAsset) {
  try {
    if (placeholderAsset.type === "bookmark" || !placeholderAsset.props.src)
      return;
    const response = await fetch(placeholderAsset.props.src);
    if (!response.ok)
      return;
    const file = new File([await response.blob()], placeholderAsset.props.name, {
      type: response.headers.get("content-type") ?? placeholderAsset.props.mimeType ?? void 0
    });
    const newAsset = await editor.getAssetForExternalContent({ type: "file", file });
    if (!newAsset)
      throw new Error("Could not get asset for external content");
    if (newAsset.type === "bookmark")
      return;
    editor.updateAssets([
      {
        id: placeholderAsset.id,
        type: placeholderAsset.type,
        props: {
          ...newAsset.props,
          name: placeholderAsset.props.name
        }
      }
    ]);
  } catch (err) {
  }
}
function migrate(document, newVersion) {
  const { version = 0 } = document;
  if (!document.assets) {
    document.assets = {};
  }
  const assetIdsInUse = /* @__PURE__ */ new Set();
  Object.values(document.pages).forEach(
    (page) => Object.values(page.shapes).forEach((shape) => {
      const { parentId, children, assetId } = shape;
      if (assetId) {
        assetIdsInUse.add(assetId);
      }
      if (parentId !== page.id && !page.shapes[parentId]) {
        console.warn("Encountered a shape with a missing parent!");
        shape.parentId = page.id;
      }
      if (shape.type === "group" /* Group */ && children) {
        children.forEach((childId) => {
          if (!page.shapes[childId]) {
            console.warn("Encountered a parent with a missing child!", shape.id, childId);
            children?.splice(children.indexOf(childId), 1);
          }
        });
      }
    })
  );
  Object.keys(document.assets).forEach((assetId) => {
    if (!assetIdsInUse.has(assetId)) {
      delete document.assets[assetId];
    }
  });
  if (version !== newVersion) {
    if (version < 14) {
      Object.values(document.pages).forEach((page) => {
        Object.values(page.shapes).filter((shape) => shape.type === "text" /* Text */).forEach((shape) => {
          if (shape.style.font === void 0) {
            ;
            shape.style.font === "script" /* Script */;
          }
        });
      });
    }
    if (version <= 13) {
      Object.values(document.pages).forEach((page) => {
        Object.values(page.bindings).forEach((binding) => {
          Object.assign(binding, binding.meta);
        });
        Object.values(page.shapes).forEach((shape) => {
          Object.entries(shape.style).forEach(([id, style]) => {
            if (typeof style === "string") {
              shape.style[id] = style.toLowerCase();
            }
          });
          if (shape.type === "arrow" /* Arrow */) {
            if (shape.decorations) {
              Object.entries(shape.decorations).forEach(([id, decoration]) => {
                if (decoration === "Arrow") {
                  shape.decorations = {
                    ...shape.decorations,
                    [id]: "arrow" /* Arrow */
                  };
                }
              });
            }
          }
        });
      });
    }
    if (version <= 13.1 && document.name == null) {
      document.name = "New Document";
    }
    if (version < 15 && document.assets == null) {
      document.assets = {};
    }
    Object.values(document.pages).forEach((page) => {
      Object.values(page.shapes).forEach((shape) => {
        if (version < 15.2) {
          if ((shape.type === "image" /* Image */ || shape.type === "video" /* Video */) && shape.style.isFilled == null) {
            shape.style.isFilled = true;
          }
        }
        if (version < 15.3) {
          if (shape.type === "rectangle" /* Rectangle */ || shape.type === "triangle" /* Triangle */ || shape.type === "ellipse" /* Ellipse */ || shape.type === "arrow" /* Arrow */) {
            if ("text" in shape && typeof shape.text === "string") {
              shape.label = shape.text;
            }
            if (!shape.label) {
              shape.label = "";
            }
            if (!shape.labelPoint) {
              shape.labelPoint = [0.5, 0.5];
            }
          }
        }
      });
    });
  }
  Object.values(document.pageStates).forEach((pageState) => {
    pageState.selectedIds = pageState.selectedIds.filter((id) => {
      return document.pages[pageState.id].shapes[id] !== void 0;
    });
    pageState.bindingId = void 0;
    pageState.editingId = void 0;
    pageState.hoveredId = void 0;
    pageState.pointedId = void 0;
  });
  document.version = newVersion;
  return document;
}
var TDShapeType = /* @__PURE__ */ ((TDShapeType2) => {
  TDShapeType2["Sticky"] = "sticky";
  TDShapeType2["Ellipse"] = "ellipse";
  TDShapeType2["Rectangle"] = "rectangle";
  TDShapeType2["Triangle"] = "triangle";
  TDShapeType2["Draw"] = "draw";
  TDShapeType2["Arrow"] = "arrow";
  TDShapeType2["Text"] = "text";
  TDShapeType2["Group"] = "group";
  TDShapeType2["Image"] = "image";
  TDShapeType2["Video"] = "video";
  return TDShapeType2;
})(TDShapeType || {});
var ColorStyle = /* @__PURE__ */ ((ColorStyle2) => {
  ColorStyle2["White"] = "white";
  ColorStyle2["LightGray"] = "lightGray";
  ColorStyle2["Gray"] = "gray";
  ColorStyle2["Black"] = "black";
  ColorStyle2["Green"] = "green";
  ColorStyle2["Cyan"] = "cyan";
  ColorStyle2["Blue"] = "blue";
  ColorStyle2["Indigo"] = "indigo";
  ColorStyle2["Violet"] = "violet";
  ColorStyle2["Red"] = "red";
  ColorStyle2["Orange"] = "orange";
  ColorStyle2["Yellow"] = "yellow";
  return ColorStyle2;
})(ColorStyle || {});
var SizeStyle = /* @__PURE__ */ ((SizeStyle2) => {
  SizeStyle2["Small"] = "small";
  SizeStyle2["Medium"] = "medium";
  SizeStyle2["Large"] = "large";
  return SizeStyle2;
})(SizeStyle || {});
var DashStyle = /* @__PURE__ */ ((DashStyle2) => {
  DashStyle2["Draw"] = "draw";
  DashStyle2["Solid"] = "solid";
  DashStyle2["Dashed"] = "dashed";
  DashStyle2["Dotted"] = "dotted";
  return DashStyle2;
})(DashStyle || {});
var AlignStyle = /* @__PURE__ */ ((AlignStyle2) => {
  AlignStyle2["Start"] = "start";
  AlignStyle2["Middle"] = "middle";
  AlignStyle2["End"] = "end";
  AlignStyle2["Justify"] = "justify";
  return AlignStyle2;
})(AlignStyle || {});
var FontStyle = /* @__PURE__ */ ((FontStyle2) => {
  FontStyle2["Script"] = "script";
  FontStyle2["Sans"] = "sans";
  FontStyle2["Serif"] = "serif";
  FontStyle2["Mono"] = "mono";
  return FontStyle2;
})(FontStyle || {});
var Decoration = /* @__PURE__ */ ((Decoration2) => {
  Decoration2["Arrow"] = "arrow";
  return Decoration2;
})(Decoration || {});
var TDAssetType = /* @__PURE__ */ ((TDAssetType2) => {
  TDAssetType2["Image"] = "image";
  TDAssetType2["Video"] = "video";
  return TDAssetType2;
})(TDAssetType || {});
const v1ColorsToV2Colors = {
  ["white" /* White */]: "black",
  ["black" /* Black */]: "black",
  ["lightGray" /* LightGray */]: "grey",
  ["gray" /* Gray */]: "grey",
  ["green" /* Green */]: "light-green",
  ["cyan" /* Cyan */]: "green",
  ["blue" /* Blue */]: "light-blue",
  ["indigo" /* Indigo */]: "blue",
  ["orange" /* Orange */]: "orange",
  ["yellow" /* Yellow */]: "yellow",
  ["red" /* Red */]: "red",
  ["violet" /* Violet */]: "light-violet"
};
const v1FontsToV2Fonts = {
  ["mono" /* Mono */]: "mono",
  ["sans" /* Sans */]: "sans",
  ["script" /* Script */]: "draw",
  ["serif" /* Serif */]: "serif"
};
const v1AlignsToV2Aligns = {
  ["start" /* Start */]: "start",
  ["middle" /* Middle */]: "middle",
  ["end" /* End */]: "end",
  ["justify" /* Justify */]: "start"
};
const v1TextSizesToV2TextSizes = {
  ["small" /* Small */]: "s",
  ["medium" /* Medium */]: "l",
  ["large" /* Large */]: "xl"
};
const v1SizesToV2Sizes = {
  ["small" /* Small */]: "m",
  ["medium" /* Medium */]: "l",
  ["large" /* Large */]: "xl"
};
const v1DashesToV2Dashes = {
  ["solid" /* Solid */]: "solid",
  ["dashed" /* Dashed */]: "dashed",
  ["dotted" /* Dotted */]: "dotted",
  ["draw" /* Draw */]: "draw"
};
function getV2Color(color) {
  return color ? v1ColorsToV2Colors[color] ?? "black" : "black";
}
function getV2Font(font) {
  return font ? v1FontsToV2Fonts[font] ?? "draw" : "draw";
}
function getV2Align(align) {
  return align ? v1AlignsToV2Aligns[align] ?? "middle" : "middle";
}
function getV2TextSize(size) {
  return size ? v1TextSizesToV2TextSizes[size] ?? "m" : "m";
}
function getV2Size(size) {
  return size ? v1SizesToV2Sizes[size] ?? "l" : "l";
}
function getV2Dash(dash) {
  return dash ? v1DashesToV2Dashes[dash] ?? "draw" : "draw";
}
function getV2Point(point) {
  return {
    x: coerceNumber(point[0]),
    y: coerceNumber(point[1]),
    z: point[2] == null ? 0.5 : coerceNumber(point[2])
  };
}
function getV2Arrowhead(decoration) {
  return decoration === "arrow" /* Arrow */ ? "arrow" : "none";
}
function getV2Fill(isFilled, color) {
  return isFilled ? color === "black" /* Black */ || color === "white" /* White */ ? "semi" : "solid" : "none";
}
//# sourceMappingURL=buildFromV1Document.js.map
