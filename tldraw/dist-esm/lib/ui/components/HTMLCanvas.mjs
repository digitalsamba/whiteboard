import { jsx } from "react/jsx-runtime";
import { track, useEditor } from "@tldraw/editor";
import * as React from "react";
const HTMLCanvas = track(function HTMLCanvas2() {
  const editor = useEditor();
  const rCanvas = React.useRef(null);
  const camera = editor.camera;
  const shapes = editor.currentPageShapes;
  if (rCanvas.current) {
    const cvs = rCanvas.current;
    const ctx = cvs.getContext("2d");
    ctx.resetTransform();
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    const path = new Path2D();
    ctx.translate(camera.x, camera.y);
    for (const shape of shapes) {
      const bounds = editor.getShapePageBounds(shape);
      path.rect(bounds.minX, bounds.minY, bounds.width, bounds.height);
    }
    ctx.fillStyle = "#cccccc";
    ctx.fill(path);
  }
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: rCanvas,
      width: editor.viewportScreenBounds.width,
      height: editor.viewportScreenBounds.height,
      style: { width: "100%", height: "100%" }
    }
  );
});
export {
  HTMLCanvas
};
//# sourceMappingURL=HTMLCanvas.mjs.map
