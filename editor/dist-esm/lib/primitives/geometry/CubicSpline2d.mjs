import { Vec2d } from "../Vec2d.mjs";
import { CubicBezier2d } from "./CubicBezier2d.mjs";
import { Geometry2d } from "./Geometry2d.mjs";
class CubicSpline2d extends Geometry2d {
  points;
  constructor(config) {
    super({ ...config, isClosed: false, isFilled: false });
    const { points } = config;
    this.points = points;
  }
  _segments;
  get segments() {
    if (!this._segments) {
      this._segments = [];
      const { points } = this;
      const len = points.length;
      const last = len - 2;
      const k = 1.25;
      for (let i = 0; i < len - 1; i++) {
        const p0 = i === 0 ? points[0] : points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i === last ? p2 : points[i + 2];
        const start = p1, cp1 = i === 0 ? p0 : new Vec2d(p1.x + (p2.x - p0.x) / 6 * k, p1.y + (p2.y - p0.y) / 6 * k), cp2 = i === last ? p2 : new Vec2d(p2.x - (p3.x - p1.x) / 6 * k, p2.y - (p3.y - p1.y) / 6 * k), end = p2;
        this._segments.push(new CubicBezier2d({ start, cp1, cp2, end }));
      }
    }
    return this._segments;
  }
  _length;
  get length() {
    if (!this._length) {
      this._length = this.segments.reduce((acc, segment) => acc + segment.length, 0);
    }
    return this._length;
  }
  getVertices() {
    const vertices = this.segments.reduce((acc, segment) => {
      return acc.concat(segment.vertices);
    }, []);
    vertices.push(this.points[this.points.length - 1]);
    return vertices;
  }
  nearestPoint(A) {
    let nearest;
    let dist = Infinity;
    for (const segment of this.segments) {
      const p = segment.nearestPoint(A);
      const d = p.dist(A);
      if (d < dist) {
        nearest = p;
        dist = d;
      }
    }
    if (!nearest)
      throw Error("nearest point not found");
    return nearest;
  }
  hitTestLineSegment(A, B, zoom) {
    return this.segments.some((segment) => segment.hitTestLineSegment(A, B, zoom));
  }
}
export {
  CubicSpline2d
};
//# sourceMappingURL=CubicSpline2d.mjs.map