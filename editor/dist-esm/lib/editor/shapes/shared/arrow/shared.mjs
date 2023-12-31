import { Matrix2d } from "../../../../primitives/Matrix2d.mjs";
import { Vec2d } from "../../../../primitives/Vec2d.mjs";
function getIsArrowStraight(shape) {
  return Math.abs(shape.props.bend) < 8;
}
function getBoundShapeInfoForTerminal(editor, terminal) {
  if (terminal.type === "point") {
    return;
  }
  const shape = editor.getShape(terminal.boundShapeId);
  const transform = editor.getShapePageTransform(shape);
  const geometry = editor.getShapeGeometry(shape);
  return {
    shape,
    transform,
    isClosed: geometry.isClosed,
    isExact: terminal.isExact,
    didIntersect: false,
    outline: geometry.outerVertices
  };
}
function getArrowTerminalInArrowSpace(editor, arrowPageTransform, terminal) {
  if (terminal.type === "point") {
    return Vec2d.From(terminal);
  }
  const boundShape = editor.getShape(terminal.boundShapeId);
  if (!boundShape) {
    return new Vec2d(0, 0);
  } else {
    const { point, size } = editor.getShapeGeometry(boundShape).bounds;
    const shapePoint = Vec2d.Add(point, Vec2d.MulV(terminal.normalizedAnchor, size));
    const pagePoint = Matrix2d.applyToPoint(editor.getShapePageTransform(boundShape), shapePoint);
    const arrowPoint = Matrix2d.applyToPoint(Matrix2d.Inverse(arrowPageTransform), pagePoint);
    return arrowPoint;
  }
}
function getArrowTerminalsInArrowSpace(editor, shape) {
  const arrowPageTransform = editor.getShapePageTransform(shape);
  const start = getArrowTerminalInArrowSpace(editor, arrowPageTransform, shape.props.start);
  const end = getArrowTerminalInArrowSpace(editor, arrowPageTransform, shape.props.end);
  return { start, end };
}
const MIN_ARROW_LENGTH = 48;
const BOUND_ARROW_OFFSET = 10;
const WAY_TOO_BIG_ARROW_BEND_FACTOR = 10;
const STROKE_SIZES = {
  s: 2,
  m: 3.5,
  l: 5,
  xl: 10
};
export {
  BOUND_ARROW_OFFSET,
  MIN_ARROW_LENGTH,
  STROKE_SIZES,
  WAY_TOO_BIG_ARROW_BEND_FACTOR,
  getArrowTerminalInArrowSpace,
  getArrowTerminalsInArrowSpace,
  getBoundShapeInfoForTerminal,
  getIsArrowStraight
};
//# sourceMappingURL=shared.mjs.map
