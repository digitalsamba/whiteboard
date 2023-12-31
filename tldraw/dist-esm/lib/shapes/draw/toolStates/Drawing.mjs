import {
  DRAG_DISTANCE,
  Matrix2d,
  StateNode,
  Vec2d,
  createShapeId,
  last,
  snapAngle,
  toFixed,
  uniqueId
} from "@tldraw/editor";
import { STROKE_SIZES } from "../../shared/default-shape-constants.mjs";
class Drawing extends StateNode {
  static id = "drawing";
  info = {};
  initialShape;
  shapeType = this.parent.id === "highlight" ? "highlight" : "draw";
  util = this.editor.getShapeUtil(this.shapeType);
  isPen = false;
  segmentMode = "free";
  didJustShiftClickToExtendPreviousShapeLine = false;
  pagePointWhereCurrentSegmentChanged = {};
  pagePointWhereNextSegmentChanged = null;
  lastRecordedPoint = {};
  mergeNextPoint = false;
  currentLineLength = 0;
  canDraw = false;
  markId = null;
  onEnter = (info) => {
    this.markId = null;
    this.info = info;
    this.canDraw = !this.editor.isMenuOpen;
    this.lastRecordedPoint = this.editor.inputs.currentPagePoint.clone();
    if (this.canDraw) {
      this.startShape();
    }
  };
  onPointerMove = () => {
    const {
      editor: { inputs }
    } = this;
    if (this.isPen !== inputs.isPen) {
      this.cancel();
    }
    if (!this.canDraw && inputs.isDragging) {
      this.startShape();
      this.canDraw = true;
    }
    if (this.canDraw) {
      if (inputs.isPen) {
        if (Vec2d.Dist(inputs.currentPagePoint, this.lastRecordedPoint) >= 1 / this.editor.zoomLevel) {
          this.lastRecordedPoint = inputs.currentPagePoint.clone();
          this.mergeNextPoint = false;
        } else {
          this.mergeNextPoint = true;
        }
      } else {
        this.mergeNextPoint = false;
      }
      this.updateShapes();
    }
  };
  onKeyDown = (info) => {
    if (info.key === "Shift") {
      switch (this.segmentMode) {
        case "free": {
          this.segmentMode = "starting_straight";
          this.pagePointWhereNextSegmentChanged = this.editor.inputs.currentPagePoint.clone();
          break;
        }
        case "starting_free": {
          this.segmentMode = "starting_straight";
        }
      }
    }
    this.updateShapes();
  };
  onKeyUp = (info) => {
    if (info.key === "Shift") {
      this.editor.snaps.clear();
      switch (this.segmentMode) {
        case "straight": {
          this.segmentMode = "starting_free";
          this.pagePointWhereNextSegmentChanged = this.editor.inputs.currentPagePoint.clone();
          break;
        }
        case "starting_straight": {
          this.pagePointWhereNextSegmentChanged = null;
          this.segmentMode = "free";
          break;
        }
      }
    }
    this.updateShapes();
  };
  onExit = () => {
    this.editor.snaps.clear();
    this.pagePointWhereCurrentSegmentChanged = this.editor.inputs.currentPagePoint.clone();
  };
  canClose() {
    return this.shapeType !== "highlight";
  }
  getIsClosed(segments, size) {
    if (!this.canClose())
      return false;
    const strokeWidth = STROKE_SIZES[size];
    const firstPoint = segments[0].points[0];
    const lastSegment = segments[segments.length - 1];
    const lastPoint = lastSegment.points[lastSegment.points.length - 1];
    return firstPoint !== lastPoint && this.currentLineLength > strokeWidth * 4 && Vec2d.Dist(firstPoint, lastPoint) < strokeWidth * 2;
  }
  startShape() {
    const {
      inputs: { originPagePoint, isPen }
    } = this.editor;
    this.markId = "draw start " + uniqueId();
    this.editor.mark(this.markId);
    this.isPen = isPen;
    const pressure = this.isPen ? this.info.point.z * 1.25 : 0.5;
    this.segmentMode = this.editor.inputs.shiftKey ? "straight" : "free";
    this.didJustShiftClickToExtendPreviousShapeLine = false;
    this.lastRecordedPoint = originPagePoint.clone();
    if (this.initialShape) {
      const shape = this.editor.getShape(this.initialShape.id);
      if (shape && this.segmentMode === "straight") {
        this.didJustShiftClickToExtendPreviousShapeLine = true;
        const prevSegment = last(shape.props.segments);
        if (!prevSegment)
          throw Error("Expected a previous segment!");
        const prevPoint = last(prevSegment.points);
        if (!prevPoint)
          throw Error("Expected a previous point!");
        const { x, y } = this.editor.getPointInShapeSpace(shape, originPagePoint).toFixed();
        const pressure2 = this.isPen ? this.info.point.z * 1.25 : 0.5;
        const newSegment = {
          type: this.segmentMode,
          points: [
            {
              x: prevPoint.x,
              y: prevPoint.y,
              z: +pressure2.toFixed(2)
            },
            {
              x,
              y,
              z: +pressure2.toFixed(2)
            }
          ]
        };
        const prevPointPageSpace = Matrix2d.applyToPoint(
          this.editor.getShapePageTransform(shape.id),
          prevPoint
        );
        this.pagePointWhereCurrentSegmentChanged = prevPointPageSpace;
        this.pagePointWhereNextSegmentChanged = null;
        const segments = [...shape.props.segments, newSegment];
        this.currentLineLength = this.getLineLength(segments);
        const shapePartial = {
          id: shape.id,
          type: this.shapeType,
          props: {
            segments
          }
        };
        if (this.canClose()) {
          ;
          shapePartial.props.isClosed = this.getIsClosed(
            segments,
            shape.props.size
          );
        }
        this.editor.updateShapes([shapePartial]);
        return;
      }
    }
    this.pagePointWhereCurrentSegmentChanged = originPagePoint.clone();
    const id = createShapeId();
    this.editor.createShapes([
      {
        id,
        type: this.shapeType,
        x: originPagePoint.x,
        y: originPagePoint.y,
        props: {
          isPen: this.isPen,
          segments: [
            {
              type: this.segmentMode,
              points: [
                {
                  x: 0,
                  y: 0,
                  z: +pressure.toFixed(2)
                }
              ]
            }
          ]
        }
      }
    ]);
    this.currentLineLength = 0;
    this.initialShape = this.editor.getShape(id);
  }
  updateShapes() {
    const { inputs } = this.editor;
    const { initialShape } = this;
    if (!initialShape)
      return;
    const {
      id,
      props: { size }
    } = initialShape;
    const shape = this.editor.getShape(id);
    if (!shape)
      return;
    const { segments } = shape.props;
    const { x, y, z } = this.editor.getPointInShapeSpace(shape, inputs.currentPagePoint).toFixed();
    const newPoint = { x, y, z: this.isPen ? +(z * 1.25).toFixed(2) : 0.5 };
    switch (this.segmentMode) {
      case "starting_straight": {
        const { pagePointWhereNextSegmentChanged } = this;
        if (pagePointWhereNextSegmentChanged === null) {
          throw Error("We should have a point where the segment changed");
        }
        const hasMovedFarEnough = Vec2d.Dist(pagePointWhereNextSegmentChanged, inputs.currentPagePoint) > DRAG_DISTANCE;
        if (hasMovedFarEnough) {
          this.pagePointWhereCurrentSegmentChanged = this.pagePointWhereNextSegmentChanged.clone();
          this.pagePointWhereNextSegmentChanged = null;
          this.segmentMode = "straight";
          const prevSegment = last(segments);
          if (!prevSegment)
            throw Error("Expected a previous segment!");
          const prevLastPoint = last(prevSegment.points);
          if (!prevLastPoint)
            throw Error("Expected a previous last point!");
          let newSegment;
          const newLastPoint = this.editor.getPointInShapeSpace(shape, this.pagePointWhereCurrentSegmentChanged).toFixed().toJson();
          if (prevSegment.type === "straight") {
            this.currentLineLength += Vec2d.Dist(prevLastPoint, newLastPoint);
            newSegment = {
              type: "straight",
              points: [{ ...prevLastPoint }, newLastPoint]
            };
            const transform = this.editor.getShapePageTransform(shape);
            this.pagePointWhereCurrentSegmentChanged = Matrix2d.applyToPoint(
              transform,
              prevLastPoint
            );
          } else {
            newSegment = {
              type: "straight",
              points: [newLastPoint, newPoint]
            };
          }
          const shapePartial = {
            id,
            type: this.shapeType,
            props: {
              segments: [...segments, newSegment]
            }
          };
          if (this.canClose()) {
            ;
            shapePartial.props.isClosed = this.getIsClosed(
              segments,
              size
            );
          }
          this.editor.updateShapes([shapePartial], {
            squashing: true
          });
        }
        break;
      }
      case "starting_free": {
        const { pagePointWhereNextSegmentChanged } = this;
        if (pagePointWhereNextSegmentChanged === null) {
          throw Error("We should have a point where the segment changed");
        }
        const hasMovedFarEnough = Vec2d.Dist(pagePointWhereNextSegmentChanged, inputs.currentPagePoint) > DRAG_DISTANCE;
        if (hasMovedFarEnough) {
          this.pagePointWhereCurrentSegmentChanged = this.pagePointWhereNextSegmentChanged.clone();
          this.pagePointWhereNextSegmentChanged = null;
          this.segmentMode = "free";
          const newSegments = segments.slice();
          const prevStraightSegment = newSegments[newSegments.length - 1];
          const prevPoint = last(prevStraightSegment.points);
          if (!prevPoint) {
            throw Error("No previous point!");
          }
          const newFreeSegment = {
            type: "free",
            points: [
              ...Vec2d.PointsBetween(prevPoint, newPoint, 6).map((p) => p.toFixed().toJson())
            ]
          };
          const finalSegments = [...newSegments, newFreeSegment];
          this.currentLineLength = this.getLineLength(finalSegments);
          const shapePartial = {
            id,
            type: this.shapeType,
            props: {
              segments: finalSegments
            }
          };
          if (this.canClose()) {
            ;
            shapePartial.props.isClosed = this.getIsClosed(
              finalSegments,
              size
            );
          }
          this.editor.updateShapes([shapePartial], { squashing: true });
        }
        break;
      }
      case "straight": {
        const newSegments = segments.slice();
        const newSegment = newSegments[newSegments.length - 1];
        const { pagePointWhereCurrentSegmentChanged } = this;
        const { currentPagePoint, ctrlKey } = this.editor.inputs;
        if (!pagePointWhereCurrentSegmentChanged)
          throw Error("We should have a point where the segment changed");
        let pagePoint;
        let shouldSnapToAngle = false;
        if (this.didJustShiftClickToExtendPreviousShapeLine) {
          if (this.editor.inputs.isDragging) {
            shouldSnapToAngle = !ctrlKey;
            this.didJustShiftClickToExtendPreviousShapeLine = false;
          } else {
          }
        } else {
          shouldSnapToAngle = !ctrlKey;
        }
        let newPoint2 = this.editor.getPointInShapeSpace(shape, currentPagePoint).toFixed().toJson();
        let didSnap = false;
        let snapSegment = void 0;
        const shouldSnap = this.editor.user.isSnapMode ? !ctrlKey : ctrlKey;
        if (shouldSnap) {
          if (newSegments.length > 2) {
            let nearestPoint = void 0;
            let minDistance = 8 / this.editor.zoomLevel;
            for (let i = 0, n = segments.length - 2; i < n; i++) {
              const segment = segments[i];
              if (!segment)
                break;
              if (segment.type === "free")
                continue;
              const first = segment.points[0];
              const lastPoint = last(segment.points);
              if (!(first && lastPoint))
                continue;
              const nearestPointOnSegment = Vec2d.NearestPointOnLineSegment(
                first,
                lastPoint,
                newPoint2
              );
              const distance = Vec2d.Dist(nearestPointOnSegment, newPoint2);
              if (distance < minDistance) {
                nearestPoint = nearestPointOnSegment.toFixed().toJson();
                minDistance = distance;
                snapSegment = segment;
                break;
              }
            }
            if (nearestPoint) {
              didSnap = true;
              newPoint2 = nearestPoint;
            }
          }
        }
        if (didSnap && snapSegment) {
          const transform = this.editor.getShapePageTransform(shape);
          const first = snapSegment.points[0];
          const lastPoint = last(snapSegment.points);
          if (!lastPoint)
            throw Error("Expected a last point!");
          const A = Matrix2d.applyToPoint(transform, first);
          const B = Matrix2d.applyToPoint(transform, lastPoint);
          const snappedPoint = Matrix2d.applyToPoint(transform, newPoint2);
          this.editor.snaps.setLines([
            {
              id: uniqueId(),
              type: "points",
              points: [A, snappedPoint, B]
            }
          ]);
        } else {
          this.editor.snaps.clear();
          if (shouldSnapToAngle) {
            const currentAngle = Vec2d.Angle(pagePointWhereCurrentSegmentChanged, currentPagePoint);
            const snappedAngle = snapAngle(currentAngle, 24);
            const angleDiff = snappedAngle - currentAngle;
            pagePoint = Vec2d.RotWith(
              currentPagePoint,
              pagePointWhereCurrentSegmentChanged,
              angleDiff
            );
          } else {
            pagePoint = currentPagePoint;
          }
          newPoint2 = this.editor.getPointInShapeSpace(shape, pagePoint).toFixed().toJson();
        }
        this.currentLineLength += Vec2d.Dist(newSegment.points[0], newPoint2);
        newSegments[newSegments.length - 1] = {
          ...newSegment,
          type: "straight",
          points: [newSegment.points[0], newPoint2]
        };
        const shapePartial = {
          id,
          type: this.shapeType,
          props: {
            segments: newSegments
          }
        };
        if (this.canClose()) {
          ;
          shapePartial.props.isClosed = this.getIsClosed(
            segments,
            size
          );
        }
        this.editor.updateShapes([shapePartial], { squashing: true });
        break;
      }
      case "free": {
        const newSegments = segments.slice();
        const newSegment = newSegments[newSegments.length - 1];
        const newPoints = [...newSegment.points];
        if (newPoints.length && this.mergeNextPoint) {
          const { z: z2 } = newPoints[newPoints.length - 1];
          newPoints[newPoints.length - 1] = {
            x: newPoint.x,
            y: newPoint.y,
            z: z2 ? Math.max(z2, newPoint.z) : newPoint.z
          };
        } else {
          this.currentLineLength += Vec2d.Dist(newPoints[newPoints.length - 1], newPoint);
          newPoints.push(newPoint);
        }
        newSegments[newSegments.length - 1] = {
          ...newSegment,
          points: newPoints
        };
        this.currentLineLength = this.getLineLength(newSegments);
        const shapePartial = {
          id,
          type: this.shapeType,
          props: {
            segments: newSegments
          }
        };
        if (this.canClose()) {
          ;
          shapePartial.props.isClosed = this.getIsClosed(
            newSegments,
            size
          );
        }
        this.editor.updateShapes([shapePartial], { squashing: true });
        if (newPoints.length > 500) {
          this.editor.updateShapes([{ id, type: this.shapeType, props: { isComplete: true } }]);
          const { currentPagePoint } = this.editor.inputs;
          const newShapeId = createShapeId();
          this.editor.createShapes([
            {
              id: newShapeId,
              type: this.shapeType,
              x: toFixed(currentPagePoint.x),
              y: toFixed(currentPagePoint.y),
              props: {
                isPen: this.isPen,
                segments: [
                  {
                    type: "free",
                    points: [{ x: 0, y: 0, z: this.isPen ? +(z * 1.25).toFixed() : 0.5 }]
                  }
                ]
              }
            }
          ]);
          this.initialShape = structuredClone(this.editor.getShape(newShapeId));
          this.mergeNextPoint = false;
          this.lastRecordedPoint = this.editor.inputs.currentPagePoint.clone();
          this.currentLineLength = 0;
        }
        break;
      }
    }
  }
  getLineLength(segments) {
    let length = 0;
    for (const segment of segments) {
      for (let i = 0; i < segment.points.length - 1; i++) {
        const A = segment.points[i];
        const B = segment.points[i + 1];
        length += Vec2d.Sub(B, A).len2();
      }
    }
    return Math.sqrt(length);
  }
  onPointerUp = () => {
    this.complete();
  };
  onCancel = () => {
    this.cancel();
  };
  onComplete = () => {
    this.complete();
  };
  onInterrupt = () => {
    if (this.editor.inputs.isDragging) {
      return;
    }
    if (this.markId) {
      this.editor.bailToMark(this.markId);
    }
    this.cancel();
  };
  complete() {
    if (!this.canDraw) {
      this.cancel();
      return;
    }
    const { initialShape } = this;
    if (!initialShape)
      return;
    this.editor.updateShapes([
      { id: initialShape.id, type: initialShape.type, props: { isComplete: true } }
    ]);
    this.parent.transition("idle", {});
  }
  cancel() {
    this.parent.transition("idle", this.info);
  }
}
export {
  Drawing
};
//# sourceMappingURL=Drawing.mjs.map
