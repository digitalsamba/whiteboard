import {
  EMPTY_ARRAY,
  atom,
  computed,
  react,
  track,
  transact,
  transaction,
  useComputed,
  useQuickReactor,
  useReactor,
  useValue,
  whyAmIRunning
} from "@tldraw/state";
export * from "@tldraw/store";
export * from "@tldraw/tlschema";
export * from "@tldraw/utils";
export * from "@tldraw/validate";
import {
  ErrorScreen,
  LoadingScreen,
  TldrawEditor
} from "./lib/TldrawEditor.mjs";
import { Canvas } from "./lib/components/Canvas.mjs";
import {
  ErrorBoundary,
  OptionalErrorBoundary
} from "./lib/components/ErrorBoundary.mjs";
import { HTMLContainer } from "./lib/components/HTMLContainer.mjs";
import { PositionedOnCanvas } from "./lib/components/PositionedOnCanvas.mjs";
import { SVGContainer } from "./lib/components/SVGContainer.mjs";
import { ShapeIndicator } from "./lib/components/ShapeIndicator.mjs";
import {
  DefaultBackground
} from "./lib/components/default-components/DefaultBackground.mjs";
import {
  DefaultBrush
} from "./lib/components/default-components/DefaultBrush.mjs";
import {
  DefaultCollaboratorHint
} from "./lib/components/default-components/DefaultCollaboratorHint.mjs";
import {
  DefaultCursor
} from "./lib/components/default-components/DefaultCursor.mjs";
import { DefaultErrorFallback } from "./lib/components/default-components/DefaultErrorFallback.mjs";
import { DefaultGrid } from "./lib/components/default-components/DefaultGrid.mjs";
import {
  DefaultHandle
} from "./lib/components/default-components/DefaultHandle.mjs";
import {
  DefaultHandles
} from "./lib/components/default-components/DefaultHandles.mjs";
import {
  DefaultHoveredShapeIndicator
} from "./lib/components/default-components/DefaultHoveredShapeIndicator.mjs";
import {
  DefaultScribble
} from "./lib/components/default-components/DefaultScribble.mjs";
import {
  DefaultSelectionBackground
} from "./lib/components/default-components/DefaultSelectionBackground.mjs";
import {
  DefaultSelectionForeground
} from "./lib/components/default-components/DefaultSelectionForeground.mjs";
import {
  DefaultSnapLine
} from "./lib/components/default-components/DefaultSnapLine.mjs";
import {
  DefaultSpinner
} from "./lib/components/default-components/DefaultSpinner.mjs";
import {
  DefaultSvgDefs
} from "./lib/components/default-components/DefaultSvgDefs.mjs";
import {
  TAB_ID,
  createSessionStateSnapshotSignal,
  extractSessionStateFromLegacySnapshot,
  loadSessionStateSnapshotIntoStore
} from "./lib/config/TLSessionStateSnapshot.mjs";
import {
  USER_COLORS,
  getFreshUserPreferences,
  getUserPreferences,
  setUserPreferences
} from "./lib/config/TLUserPreferences.mjs";
import {
  createTLStore
} from "./lib/config/createTLStore.mjs";
import { createTLUser } from "./lib/config/createTLUser.mjs";
import { coreShapes } from "./lib/config/defaultShapes.mjs";
import {
  ANIMATION_MEDIUM_MS,
  ANIMATION_SHORT_MS,
  CAMERA_SLIDE_FRICTION,
  DEFAULT_ANIMATION_OPTIONS,
  DOUBLE_CLICK_DURATION,
  DRAG_DISTANCE,
  GRID_STEPS,
  HASH_PATTERN_ZOOM_NAMES,
  HIT_TEST_MARGIN,
  MAX_PAGES,
  MAX_SHAPES_PER_PAGE,
  MAX_ZOOM,
  MIN_ZOOM,
  MULTI_CLICK_DURATION,
  SVG_PADDING,
  ZOOMS
} from "./lib/constants.mjs";
import {
  Editor
} from "./lib/editor/Editor.mjs";
import {
  SnapManager
} from "./lib/editor/managers/SnapManager.mjs";
import { BaseBoxShapeUtil } from "./lib/editor/shapes/BaseBoxShapeUtil.mjs";
import {
  ShapeUtil
} from "./lib/editor/shapes/ShapeUtil.mjs";
import { GroupShapeUtil } from "./lib/editor/shapes/group/GroupShapeUtil.mjs";
import { getArrowheadPathForType } from "./lib/editor/shapes/shared/arrow/arrowheads.mjs";
import {
  getCurvedArrowHandlePath,
  getSolidCurvedArrowPath
} from "./lib/editor/shapes/shared/arrow/curved-arrow.mjs";
import { getArrowTerminalsInArrowSpace } from "./lib/editor/shapes/shared/arrow/shared.mjs";
import {
  getSolidStraightArrowPath,
  getStraightArrowHandlePath
} from "./lib/editor/shapes/shared/arrow/straight-arrow.mjs";
import { resizeBox } from "./lib/editor/shapes/shared/resizeBox.mjs";
import { BaseBoxShapeTool } from "./lib/editor/tools/BaseBoxShapeTool/BaseBoxShapeTool.mjs";
import { StateNode } from "./lib/editor/tools/StateNode.mjs";
import {
  EVENT_NAME_MAP
} from "./lib/editor/types/event-types.mjs";
import { useContainer } from "./lib/hooks/useContainer.mjs";
import { getCursor } from "./lib/hooks/useCursor.mjs";
import { useEditor } from "./lib/hooks/useEditor.mjs";
import { useIsCropping } from "./lib/hooks/useIsCropping.mjs";
import { useIsDarkMode } from "./lib/hooks/useIsDarkMode.mjs";
import { useIsEditing } from "./lib/hooks/useIsEditing.mjs";
import { useLocalStore } from "./lib/hooks/useLocalStore.mjs";
import { usePeerIds } from "./lib/hooks/usePeerIds.mjs";
import { usePresence } from "./lib/hooks/usePresence.mjs";
import { useSelectionEvents } from "./lib/hooks/useSelectionEvents.mjs";
import { useTLStore } from "./lib/hooks/useTLStore.mjs";
import { useTransform } from "./lib/hooks/useTransform.mjs";
import {
  Box2d,
  ROTATE_CORNER_TO_SELECTION_CORNER,
  rotateSelectionHandle
} from "./lib/primitives/Box2d.mjs";
import { Matrix2d } from "./lib/primitives/Matrix2d.mjs";
import { Vec2d } from "./lib/primitives/Vec2d.mjs";
import { EASINGS } from "./lib/primitives/easings.mjs";
import { Arc2d } from "./lib/primitives/geometry/Arc2d.mjs";
import { Circle2d } from "./lib/primitives/geometry/Circle2d.mjs";
import { CubicBezier2d } from "./lib/primitives/geometry/CubicBezier2d.mjs";
import { CubicSpline2d } from "./lib/primitives/geometry/CubicSpline2d.mjs";
import { Edge2d } from "./lib/primitives/geometry/Edge2d.mjs";
import { Ellipse2d } from "./lib/primitives/geometry/Ellipse2d.mjs";
import { Geometry2d } from "./lib/primitives/geometry/Geometry2d.mjs";
import { Group2d } from "./lib/primitives/geometry/Group2d.mjs";
import { Polygon2d } from "./lib/primitives/geometry/Polygon2d.mjs";
import { Polyline2d } from "./lib/primitives/geometry/Polyline2d.mjs";
import { Rectangle2d } from "./lib/primitives/geometry/Rectangle2d.mjs";
import { Stadium2d } from "./lib/primitives/geometry/Stadium2d.mjs";
import {
  intersectLineSegmentPolygon,
  intersectLineSegmentPolyline,
  intersectPolygonPolygon,
  linesIntersect,
  polygonsIntersect
} from "./lib/primitives/intersect.mjs";
import {
  EPSILON,
  PI,
  PI2,
  SIN,
  TAU,
  angleDelta,
  approximately,
  areAnglesCompatible,
  average,
  canonicalizeRotation,
  clamp,
  clampRadians,
  degreesToRadians,
  getArcLength,
  getPointOnCircle,
  getPolygonVertices,
  getStarBounds,
  getSweep,
  isAngleBetween,
  isSafeFloat,
  lerpAngles,
  longAngleDist,
  perimeterOfEllipse,
  pointInBounds,
  pointInCircle,
  pointInEllipse,
  pointInPolygon,
  pointInPolyline,
  pointInRect,
  pointNearToLineSegment,
  pointNearToPolyline,
  precise,
  radiansToDegrees,
  rangeIntersection,
  shortAngleDist,
  snapAngle,
  toDomPrecision,
  toFixed,
  toPrecision
} from "./lib/primitives/utils.mjs";
import {
  ReadonlySharedStyleMap,
  SharedStyleMap
} from "./lib/utils/SharedStylesMap.mjs";
import { WeakMapCache } from "./lib/utils/WeakMapCache.mjs";
import { dataUrlToFile } from "./lib/utils/assets.mjs";
import { debugFlags, featureFlags } from "./lib/utils/debug-flags.mjs";
import {
  loopToHtmlElement,
  preventDefault,
  releasePointerCapture,
  setPointerCapture,
  stopEventPropagation
} from "./lib/utils/dom.mjs";
import { getIncrementedName } from "./lib/utils/getIncrementedName.mjs";
import { getPointerInfo } from "./lib/utils/getPointerInfo.mjs";
import { getSvgPathFromPoints } from "./lib/utils/getSvgPathFromPoints.mjs";
import { hardResetEditor } from "./lib/utils/hardResetEditor.mjs";
import { normalizeWheel } from "./lib/utils/normalizeWheel.mjs";
import { refreshPage } from "./lib/utils/refreshPage.mjs";
import {
  getIndexAbove,
  getIndexBelow,
  getIndexBetween,
  getIndices,
  getIndicesAbove,
  getIndicesBelow,
  getIndicesBetween,
  sortByIndex
} from "./lib/utils/reordering/reordering.mjs";
import {
  applyRotationToSnapshotShapes,
  getRotationSnapshot
} from "./lib/utils/rotation.mjs";
import { runtime, setRuntimeOverrides } from "./lib/utils/runtime.mjs";
import { hardReset } from "./lib/utils/sync/hardReset.mjs";
import { uniq } from "./lib/utils/uniq.mjs";
import { uniqueId } from "./lib/utils/uniqueId.mjs";
import { openWindow } from "./lib/utils/window-open.mjs";
import "core-js/stable/array/at";
import "core-js/stable/array/flat";
import "core-js/stable/array/flat-map";
import "core-js/stable/string/at";
import "core-js/stable/string/replace-all";
export {
  ANIMATION_MEDIUM_MS,
  ANIMATION_SHORT_MS,
  Arc2d,
  BaseBoxShapeTool,
  BaseBoxShapeUtil,
  Box2d,
  CAMERA_SLIDE_FRICTION,
  Canvas,
  Circle2d,
  CubicBezier2d,
  CubicSpline2d,
  DEFAULT_ANIMATION_OPTIONS,
  DOUBLE_CLICK_DURATION,
  DRAG_DISTANCE,
  DefaultBackground,
  DefaultBrush,
  DefaultCollaboratorHint,
  DefaultCursor,
  DefaultErrorFallback,
  DefaultGrid,
  DefaultHandle,
  DefaultHandles,
  DefaultHoveredShapeIndicator,
  DefaultScribble,
  DefaultSelectionBackground,
  DefaultSelectionForeground,
  DefaultSnapLine,
  DefaultSpinner,
  DefaultSvgDefs,
  EASINGS,
  EMPTY_ARRAY,
  EPSILON,
  EVENT_NAME_MAP,
  Edge2d,
  Editor,
  Ellipse2d,
  ErrorBoundary,
  ErrorScreen,
  GRID_STEPS,
  Geometry2d,
  Group2d,
  GroupShapeUtil,
  HASH_PATTERN_ZOOM_NAMES,
  HIT_TEST_MARGIN,
  HTMLContainer,
  LoadingScreen,
  MAX_PAGES,
  MAX_SHAPES_PER_PAGE,
  MAX_ZOOM,
  MIN_ZOOM,
  MULTI_CLICK_DURATION,
  Matrix2d,
  OptionalErrorBoundary,
  PI,
  PI2,
  Polygon2d,
  Polyline2d,
  PositionedOnCanvas,
  ROTATE_CORNER_TO_SELECTION_CORNER,
  ReadonlySharedStyleMap,
  Rectangle2d,
  SIN,
  SVGContainer,
  SVG_PADDING,
  ShapeIndicator,
  ShapeUtil,
  SharedStyleMap,
  SnapManager,
  Stadium2d,
  StateNode,
  TAB_ID,
  TAU,
  TldrawEditor,
  USER_COLORS,
  Vec2d,
  WeakMapCache,
  ZOOMS,
  angleDelta,
  applyRotationToSnapshotShapes,
  approximately,
  areAnglesCompatible,
  atom,
  average,
  canonicalizeRotation,
  clamp,
  clampRadians,
  computed,
  coreShapes,
  createSessionStateSnapshotSignal,
  createTLStore,
  createTLUser,
  dataUrlToFile,
  debugFlags,
  degreesToRadians,
  extractSessionStateFromLegacySnapshot,
  featureFlags,
  getArcLength,
  getArrowTerminalsInArrowSpace,
  getArrowheadPathForType,
  getCursor,
  getCurvedArrowHandlePath,
  getFreshUserPreferences,
  getIncrementedName,
  getIndexAbove,
  getIndexBelow,
  getIndexBetween,
  getIndices,
  getIndicesAbove,
  getIndicesBelow,
  getIndicesBetween,
  getPointOnCircle,
  getPointerInfo,
  getPolygonVertices,
  getRotationSnapshot,
  getSolidCurvedArrowPath,
  getSolidStraightArrowPath,
  getStarBounds,
  getStraightArrowHandlePath,
  getSvgPathFromPoints,
  getSweep,
  getUserPreferences,
  hardReset,
  hardResetEditor,
  intersectLineSegmentPolygon,
  intersectLineSegmentPolyline,
  intersectPolygonPolygon,
  isAngleBetween,
  isSafeFloat,
  lerpAngles,
  linesIntersect,
  loadSessionStateSnapshotIntoStore,
  longAngleDist,
  loopToHtmlElement,
  normalizeWheel,
  openWindow,
  perimeterOfEllipse,
  pointInBounds,
  pointInCircle,
  pointInEllipse,
  pointInPolygon,
  pointInPolyline,
  pointInRect,
  pointNearToLineSegment,
  pointNearToPolyline,
  polygonsIntersect,
  precise,
  preventDefault,
  radiansToDegrees,
  rangeIntersection,
  react,
  refreshPage,
  releasePointerCapture,
  resizeBox,
  rotateSelectionHandle,
  runtime,
  setPointerCapture,
  setRuntimeOverrides,
  setUserPreferences,
  shortAngleDist,
  snapAngle,
  sortByIndex,
  stopEventPropagation,
  toDomPrecision,
  toFixed,
  toPrecision,
  track,
  transact,
  transaction,
  uniq,
  uniqueId,
  useComputed,
  useContainer,
  useEditor,
  useIsCropping,
  useIsDarkMode,
  useIsEditing,
  useLocalStore,
  usePeerIds,
  usePresence,
  useQuickReactor,
  useReactor,
  useSelectionEvents,
  useTLStore,
  useTransform,
  useValue,
  whyAmIRunning
};
//# sourceMappingURL=index.mjs.map
