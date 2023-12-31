import { Box2d } from "../Box2d.mjs";
import { Vec2d } from "../Vec2d.mjs";
import { pointInPolygon } from "../utils.mjs";
class Geometry2d {
  isFilled = false;
  isClosed = true;
  isLabel = false;
  isSnappable = true;
  constructor(opts) {
    this.isFilled = opts.isFilled;
    this.isClosed = opts.isClosed;
    this.isSnappable = opts.isSnappable ?? false;
    this.isLabel = opts.isLabel ?? false;
  }
  hitTestPoint(point, margin = 0, hitInside = false) {
    if (!this.bounds.containsPoint(point, margin))
      return false;
    return this.distanceToPoint(point, hitInside) <= margin;
  }
  distanceToPoint(point, hitInside = false) {
    const dist = point.dist(this.nearestPoint(point));
    if (this.isClosed && (this.isFilled || hitInside) && pointInPolygon(point, this.vertices)) {
      return -dist;
    }
    return dist;
  }
  distanceToLineSegment(A, B) {
    const point = this.nearestPointOnLineSegment(A, B);
    const dist = Vec2d.DistanceToLineSegment(A, B, point);
    return this.isClosed && this.isFilled && pointInPolygon(point, this.vertices) ? -dist : dist;
  }
  hitTestLineSegment(A, B, distance = 0) {
    return this.distanceToLineSegment(A, B) <= distance;
  }
  nearestPointOnLineSegment(A, B) {
    let distance = Infinity;
    let nearest;
    for (let i = 0; i < this.vertices.length; i++) {
      const point = this.vertices[i];
      const d = Vec2d.DistanceToLineSegment(A, B, point);
      if (d < distance) {
        distance = d;
        nearest = point;
      }
    }
    if (!nearest)
      throw Error("nearest point not found");
    return nearest;
  }
  isPointInBounds(point, margin = 0) {
    const { bounds } = this;
    return !(point.x < bounds.minX - margin || point.y < bounds.minY - margin || point.x > bounds.maxX + margin || point.y > bounds.maxY + margin);
  }
  _vertices;
  get vertices() {
    if (!this._vertices) {
      this._vertices = this.getVertices();
    }
    return this._vertices;
  }
  get outerVertices() {
    return this.vertices;
  }
  getBounds() {
    return Box2d.FromPoints(this.vertices);
  }
  _bounds;
  get bounds() {
    if (!this._bounds) {
      this._bounds = this.getBounds();
    }
    return this._bounds;
  }
  _snapPoints;
  get snapPoints() {
    if (!this._snapPoints) {
      this._snapPoints = this.bounds.snapPoints;
    }
    return this._snapPoints;
  }
  get center() {
    return this.bounds.center;
  }
  _area;
  get area() {
    if (!this._area) {
      this._area = this.getArea();
    }
    return this._area;
  }
  getArea() {
    if (!this.isClosed) {
      return 0;
    }
    const { vertices } = this;
    let area = 0;
    for (let i = 0, n = vertices.length; i < n; i++) {
      const curr = vertices[i];
      const next = vertices[(i + 1) % n];
      area += curr.x * next.y - next.x * curr.y;
    }
    return area / 2;
  }
  toSimpleSvgPath() {
    let path = "";
    const { vertices } = this;
    const n = vertices.length;
    if (n === 0)
      return path;
    path += `M${vertices[0].x},${vertices[0].y}`;
    for (let i = 1; i < n; i++) {
      path += `L${vertices[i].x},${vertices[i].y}`;
    }
    if (this.isClosed) {
      path += "Z";
    }
    return path;
  }
}
export {
  Geometry2d
};
//# sourceMappingURL=Geometry2d.mjs.map
