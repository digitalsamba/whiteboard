import { jsx, jsxs } from "react/jsx-runtime";
import { track } from "@tldraw/state";
import { modulate } from "@tldraw/utils";
import { HIT_TEST_MARGIN } from "../constants.mjs";
import { useEditor } from "../hooks/useEditor.mjs";
const GeometryDebuggingView = track(function GeometryDebuggingView2({
  showStroke = true,
  showVertices = true,
  showClosestPointOnOutline = false
}) {
  const editor = useEditor();
  const {
    zoomLevel,
    renderingShapes,
    inputs: { currentPagePoint }
  } = editor;
  return /* @__PURE__ */ jsx(
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
        return /* @__PURE__ */ jsxs("g", { transform: pageTransform.toCssString(), children: [
          showStroke && /* @__PURE__ */ jsx(
            "path",
            {
              stroke: "red",
              strokeWidth: 2,
              fill: "none",
              opacity: 0.5,
              d: geometry.toSimpleSvgPath()
            }
          ),
          showVertices && vertices.map((v, i) => /* @__PURE__ */ jsx(
            "circle",
            {
              cx: v.x,
              cy: v.y,
              r: 2,
              fill: `hsl(${modulate(i, [0, vertices.length - 1], [120, 0])}, 100%, 50%)`,
              stroke: "black",
              strokeWidth: "1"
            },
            `v${i}`
          )),
          distanceToPoint > 0 && showClosestPointOnOutline && /* @__PURE__ */ jsx(
            "line",
            {
              x1: nearestPointOnShape.x,
              y1: nearestPointOnShape.y,
              x2: pointInShapeSpace.x,
              y2: pointInShapeSpace.y,
              strokeWidth: 2,
              stroke: distanceToPoint < HIT_TEST_MARGIN / zoomLevel ? "red" : "pink"
            }
          )
        ] }, result.id + "_outline");
      })
    }
  );
});
export {
  GeometryDebuggingView
};
//# sourceMappingURL=GeometryDebuggingView.mjs.map
