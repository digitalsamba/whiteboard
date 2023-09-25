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
var GeometryDebuggingView_exports = {};
__export(GeometryDebuggingView_exports, {
  GeometryDebuggingView: () => GeometryDebuggingView
});
module.exports = __toCommonJS(GeometryDebuggingView_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_state = require("@tldraw/state");
var import_utils = require("@tldraw/utils");
var import_constants = require("../constants");
var import_useEditor = require("../hooks/useEditor");
const GeometryDebuggingView = (0, import_state.track)(function GeometryDebuggingView2({
  showStroke = true,
  showVertices = true,
  showClosestPointOnOutline = false
}) {
  const editor = (0, import_useEditor.useEditor)();
  const {
    zoomLevel,
    renderingShapes,
    inputs: { currentPagePoint }
  } = editor;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      style: {
        position: "absolute",
        pointerEvents: "none",
        zIndex: 999999999,
        top: 0,
        left: 0,
        overflow: "visible"
      },
      children: renderingShapes.map((result) => {
        const shape = editor.getShape(result.id);
        if (shape.type === "group")
          return null;
        const geometry = editor.getShapeGeometry(shape);
        const pageTransform = editor.getShapePageTransform(shape);
        const pointInShapeSpace = editor.getPointInShapeSpace(shape, currentPagePoint);
        const nearestPointOnShape = geometry.nearestPoint(pointInShapeSpace);
        const distanceToPoint = geometry.distanceToPoint(pointInShapeSpace);
        const { vertices } = geometry;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: pageTransform.toCssString(), children: [
          showStroke && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              stroke: "red",
              strokeWidth: 2,
              fill: "none",
              opacity: 0.5,
              d: geometry.toSimpleSvgPath()
            }
          ),
          showVertices && vertices.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "circle",
            {
              cx: v.x,
              cy: v.y,
              r: 2,
              fill: `hsl(${(0, import_utils.modulate)(i, [0, vertices.length - 1], [120, 0])}, 100%, 50%)`,
              stroke: "black",
              strokeWidth: "1"
            },
            `v${i}`
          )),
          distanceToPoint > 0 && showClosestPointOnOutline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "line",
            {
              x1: nearestPointOnShape.x,
              y1: nearestPointOnShape.y,
              x2: pointInShapeSpace.x,
              y2: pointInShapeSpace.y,
              strokeWidth: 2,
              stroke: distanceToPoint < import_constants.HIT_TEST_MARGIN / zoomLevel ? "red" : "pink"
            }
          )
        ] }, result.id + "_outline");
      })
    }
  );
});
//# sourceMappingURL=GeometryDebuggingView.js.map
