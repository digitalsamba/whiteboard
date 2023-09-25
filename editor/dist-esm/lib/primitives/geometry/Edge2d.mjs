import { linesIntersect } from "../intersect.mjs";
import { Geometry2d } from "./Geometry2d.mjs";
class Edge2d extends Geometry2d {
  start;
  end;
  d;
  u;
  length;
  constructor(config) {
    super({ ...config, isClosed: false, isFilled: false });
    const { start, end } = config;
    this.start = start;
    this.end = end;
    this.d = start.clone().sub(end);
    this.u = this.d.clone().uni();
    this.length = this.d.len();
  }
  midPoint() {
    return this.start.lrp(this.end, 0.5);
  }
  getVertices() {
    return [this.start, this.end];
  }
  nearestPoint(point) {
    const { start, end, u } = this;
    if (start.equals(end))
      return start.clone();
    const C = start.clone().add(u.clone().mul(point.clone().sub(start).pry(u)));
    if (C.x < Math.min(start.x, end.x))
      return start.x < end.x ? start : end;
    if (C.x > Math.max(start.x, end.x))
      return start.x > end.x ? start : end;
    if (C.y < Math.min(start.y, end.y))
      return start.y < end.y ? start : end;
    if (C.y > Math.max(start.y, end.y))
      return start.y > end.y ? start : end;
    return C;
  }
  hitTestLineSegment(A, B, _zoom) {
    return linesIntersect(A, B, this.start, this.end);
  }
}
export {
  Edge2d
};
//# sourceMappingURL=Edge2d.mjs.map
