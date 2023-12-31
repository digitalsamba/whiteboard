import { Box2d } from "../Box2d.mjs";
import { Vec2d } from "../Vec2d.mjs";
import { intersectLineSegmentCircle } from "../intersect.mjs";
import { PI2 } from "../utils.mjs";
import { Geometry2d } from "./Geometry2d.mjs";
import { getVerticesCountForLength } from "./geometry-constants.mjs";
class Circle2d extends Geometry2d {
  constructor(config) {
    super({ isClosed: true, ...config });
    this.config = config;
    const { x = 0, y = 0, radius } = config;
    this.x = x;
    this.y = y;
    this._center = new Vec2d(radius + x, radius + y);
    this.radius = radius;
  }
  _center;
  radius;
  x;
  y;
  getBounds() {
    return new Box2d(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  getVertices() {
    const { _center, radius } = this;
    const perimeter = PI2 * radius;
    const vertices = [];
    for (let i = 0, n = getVerticesCountForLength(perimeter); i < n; i++) {
      const angle = i / n * PI2;
      vertices.push(_center.clone().add(Vec2d.FromAngle(angle).mul(radius)));
    }
    return vertices;
  }
  nearestPoint(point) {
    const { _center, radius } = this;
    return _center.clone().add(point.clone().sub(_center).uni().mul(radius));
  }
  hitTestLineSegment(A, B, _zoom) {
    const { _center, radius } = this;
    return intersectLineSegmentCircle(A, B, _center, radius) !== null;
  }
}
export {
  Circle2d
};
//# sourceMappingURL=Circle2d.mjs.map
