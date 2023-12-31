import { assetIdValidator, createAssetValidator } from "./assets/TLBaseAsset.mjs";
import { createPresenceStateDerivation } from "./createPresenceStateDerivation.mjs";
import { createTLSchema } from "./createTLSchema.mjs";
import { CLIENT_FIXUP_SCRIPT, fixupRecord } from "./fixup.mjs";
import {
  TL_CANVAS_UI_COLOR_TYPES,
  canvasUiColorTypeValidator
} from "./misc/TLColor.mjs";
import { opacityValidator } from "./misc/TLOpacity.mjs";
import { scribbleValidator } from "./misc/TLScribble.mjs";
import {
  box2dModelValidator,
  vec2dModelValidator
} from "./misc/geometry-types.mjs";
import { idValidator } from "./misc/id-validator.mjs";
import {
  AssetRecordType,
  assetMigrations,
  assetValidator
} from "./records/TLAsset.mjs";
import { CameraRecordType } from "./records/TLCamera.mjs";
import { DocumentRecordType, TLDOCUMENT_ID } from "./records/TLDocument.mjs";
import { TLINSTANCE_ID } from "./records/TLInstance.mjs";
import {
  PageRecordType,
  isPageId,
  pageIdValidator
} from "./records/TLPage.mjs";
import { InstancePageStateRecordType } from "./records/TLPageState.mjs";
import { PointerRecordType, TLPOINTER_ID } from "./records/TLPointer.mjs";
import { InstancePresenceRecordType } from "./records/TLPresence.mjs";
import {
  createShapeId,
  getShapePropKeysByStyle,
  isShape,
  isShapeId,
  rootShapeMigrations
} from "./records/TLShape.mjs";
import {
  ArrowShapeArrowheadEndStyle,
  ArrowShapeArrowheadStartStyle,
  arrowShapeMigrations,
  arrowShapeProps
} from "./shapes/TLArrowShape.mjs";
import {
  createShapeValidator,
  parentIdValidator,
  shapeIdValidator
} from "./shapes/TLBaseShape.mjs";
import {
  bookmarkShapeMigrations,
  bookmarkShapeProps
} from "./shapes/TLBookmarkShape.mjs";
import {
  drawShapeMigrations,
  drawShapeProps
} from "./shapes/TLDrawShape.mjs";
import {
  EMBED_DEFINITIONS,
  embedShapeMigrations,
  embedShapePermissionDefaults,
  embedShapeProps
} from "./shapes/TLEmbedShape.mjs";
import { frameShapeMigrations, frameShapeProps } from "./shapes/TLFrameShape.mjs";
import {
  GeoShapeGeoStyle,
  geoShapeMigrations,
  geoShapeProps
} from "./shapes/TLGeoShape.mjs";
import { groupShapeMigrations, groupShapeProps } from "./shapes/TLGroupShape.mjs";
import {
  highlightShapeMigrations,
  highlightShapeProps
} from "./shapes/TLHighlightShape.mjs";
import {
  imageShapeMigrations,
  imageShapeProps
} from "./shapes/TLImageShape.mjs";
import {
  LineShapeSplineStyle,
  lineShapeMigrations,
  lineShapeProps
} from "./shapes/TLLineShape.mjs";
import { noteShapeMigrations, noteShapeProps } from "./shapes/TLNoteShape.mjs";
import {
  textShapeMigrations,
  textShapeProps
} from "./shapes/TLTextShape.mjs";
import { videoShapeMigrations, videoShapeProps } from "./shapes/TLVideoShape.mjs";
import { EnumStyleProp, StyleProp } from "./styles/StyleProp.mjs";
import {
  DefaultColorStyle,
  DefaultColorThemePalette,
  getDefaultColorTheme
} from "./styles/TLColorStyle.mjs";
import { DefaultDashStyle } from "./styles/TLDashStyle.mjs";
import { DefaultFillStyle } from "./styles/TLFillStyle.mjs";
import {
  DefaultFontFamilies,
  DefaultFontStyle
} from "./styles/TLFontStyle.mjs";
import {
  DefaultHorizontalAlignStyle
} from "./styles/TLHorizontalAlignStyle.mjs";
import { DefaultSizeStyle } from "./styles/TLSizeStyle.mjs";
import {
  DefaultVerticalAlignStyle
} from "./styles/TLVerticalAlignStyle.mjs";
import {
  LANGUAGES,
  getDefaultTranslationLocale
} from "./translations/translations.mjs";
export {
  ArrowShapeArrowheadEndStyle,
  ArrowShapeArrowheadStartStyle,
  AssetRecordType,
  CLIENT_FIXUP_SCRIPT,
  CameraRecordType,
  DefaultColorStyle,
  DefaultColorThemePalette,
  DefaultDashStyle,
  DefaultFillStyle,
  DefaultFontFamilies,
  DefaultFontStyle,
  DefaultHorizontalAlignStyle,
  DefaultSizeStyle,
  DefaultVerticalAlignStyle,
  DocumentRecordType,
  EMBED_DEFINITIONS,
  EnumStyleProp,
  GeoShapeGeoStyle,
  InstancePageStateRecordType,
  InstancePresenceRecordType,
  LANGUAGES,
  LineShapeSplineStyle,
  PageRecordType,
  PointerRecordType,
  StyleProp,
  TLDOCUMENT_ID,
  TLINSTANCE_ID,
  TLPOINTER_ID,
  TL_CANVAS_UI_COLOR_TYPES,
  arrowShapeMigrations,
  arrowShapeProps,
  assetIdValidator,
  assetMigrations,
  assetValidator,
  bookmarkShapeMigrations,
  bookmarkShapeProps,
  box2dModelValidator,
  canvasUiColorTypeValidator,
  createAssetValidator,
  createPresenceStateDerivation,
  createShapeId,
  createShapeValidator,
  createTLSchema,
  drawShapeMigrations,
  drawShapeProps,
  embedShapeMigrations,
  embedShapePermissionDefaults,
  embedShapeProps,
  fixupRecord,
  frameShapeMigrations,
  frameShapeProps,
  geoShapeMigrations,
  geoShapeProps,
  getDefaultColorTheme,
  getDefaultTranslationLocale,
  getShapePropKeysByStyle,
  groupShapeMigrations,
  groupShapeProps,
  highlightShapeMigrations,
  highlightShapeProps,
  idValidator,
  imageShapeMigrations,
  imageShapeProps,
  isPageId,
  isShape,
  isShapeId,
  lineShapeMigrations,
  lineShapeProps,
  noteShapeMigrations,
  noteShapeProps,
  opacityValidator,
  pageIdValidator,
  parentIdValidator,
  rootShapeMigrations,
  scribbleValidator,
  shapeIdValidator,
  textShapeMigrations,
  textShapeProps,
  vec2dModelValidator,
  videoShapeMigrations,
  videoShapeProps
};
//# sourceMappingURL=index.mjs.map
