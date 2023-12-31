import { Vec2d } from "@tldraw/editor";
function resizeScaled(shape, {
  initialBounds,
  scaleX,
  scaleY,
  newPoint
}) {
  const scaleDelta = Math.max(0.01, Math.min(Math.abs(scaleX), Math.abs(scaleY)));
  const offset = new Vec2d(0, 0);
  if (scaleX < 0) {
    offset.x = -(initialBounds.width * scaleDelta);
  }
  if (scaleY < 0) {
    offset.y = -(initialBounds.height * scaleDelta);
  }
  const { x, y } = Vec2d.Add(newPoint, offset.rot(shape.rotation));
  return {
    x,
    y,
    props: {
      scale: scaleDelta * shape.props.scale
    }
  };
}
export {
  resizeScaled
};
//# sourceMappingURL=resizeScaled.mjs.map
