"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  ArrowShapeArrowheadEndStyle: () => import_TLArrowShape.ArrowShapeArrowheadEndStyle,
  ArrowShapeArrowheadStartStyle: () => import_TLArrowShape.ArrowShapeArrowheadStartStyle,
  AssetRecordType: () => import_TLAsset.AssetRecordType,
  CLIENT_FIXUP_SCRIPT: () => import_fixup.CLIENT_FIXUP_SCRIPT,
  CameraRecordType: () => import_TLCamera.CameraRecordType,
  DefaultColorStyle: () => import_TLColorStyle.DefaultColorStyle,
  DefaultColorThemePalette: () => import_TLColorStyle.DefaultColorThemePalette,
  DefaultDashStyle: () => import_TLDashStyle.DefaultDashStyle,
  DefaultFillStyle: () => import_TLFillStyle.DefaultFillStyle,
  DefaultFontFamilies: () => import_TLFontStyle.DefaultFontFamilies,
  DefaultFontStyle: () => import_TLFontStyle.DefaultFontStyle,
  DefaultHorizontalAlignStyle: () => import_TLHorizontalAlignStyle.DefaultHorizontalAlignStyle,
  DefaultSizeStyle: () => import_TLSizeStyle.DefaultSizeStyle,
  DefaultVerticalAlignStyle: () => import_TLVerticalAlignStyle.DefaultVerticalAlignStyle,
  DocumentRecordType: () => import_TLDocument.DocumentRecordType,
  EMBED_DEFINITIONS: () => import_TLEmbedShape.EMBED_DEFINITIONS,
  EnumStyleProp: () => import_StyleProp.EnumStyleProp,
  GeoShapeGeoStyle: () => import_TLGeoShape.GeoShapeGeoStyle,
  InstancePageStateRecordType: () => import_TLPageState.InstancePageStateRecordType,
  InstancePresenceRecordType: () => import_TLPresence.InstancePresenceRecordType,
  LANGUAGES: () => import_translations.LANGUAGES,
  LineShapeSplineStyle: () => import_TLLineShape.LineShapeSplineStyle,
  PageRecordType: () => import_TLPage.PageRecordType,
  PointerRecordType: () => import_TLPointer.PointerRecordType,
  StyleProp: () => import_StyleProp.StyleProp,
  TLDOCUMENT_ID: () => import_TLDocument.TLDOCUMENT_ID,
  TLINSTANCE_ID: () => import_TLInstance.TLINSTANCE_ID,
  TLPOINTER_ID: () => import_TLPointer.TLPOINTER_ID,
  TL_CANVAS_UI_COLOR_TYPES: () => import_TLColor.TL_CANVAS_UI_COLOR_TYPES,
  arrowShapeMigrations: () => import_TLArrowShape.arrowShapeMigrations,
  arrowShapeProps: () => import_TLArrowShape.arrowShapeProps,
  assetIdValidator: () => import_TLBaseAsset.assetIdValidator,
  assetMigrations: () => import_TLAsset.assetMigrations,
  assetValidator: () => import_TLAsset.assetValidator,
  bookmarkShapeMigrations: () => import_TLBookmarkShape.bookmarkShapeMigrations,
  bookmarkShapeProps: () => import_TLBookmarkShape.bookmarkShapeProps,
  box2dModelValidator: () => import_geometry_types.box2dModelValidator,
  canvasUiColorTypeValidator: () => import_TLColor.canvasUiColorTypeValidator,
  createAssetValidator: () => import_TLBaseAsset.createAssetValidator,
  createPresenceStateDerivation: () => import_createPresenceStateDerivation.createPresenceStateDerivation,
  createShapeId: () => import_TLShape.createShapeId,
  createShapeValidator: () => import_TLBaseShape.createShapeValidator,
  createTLSchema: () => import_createTLSchema.createTLSchema,
  drawShapeMigrations: () => import_TLDrawShape.drawShapeMigrations,
  drawShapeProps: () => import_TLDrawShape.drawShapeProps,
  embedShapeMigrations: () => import_TLEmbedShape.embedShapeMigrations,
  embedShapePermissionDefaults: () => import_TLEmbedShape.embedShapePermissionDefaults,
  embedShapeProps: () => import_TLEmbedShape.embedShapeProps,
  fixupRecord: () => import_fixup.fixupRecord,
  frameShapeMigrations: () => import_TLFrameShape.frameShapeMigrations,
  frameShapeProps: () => import_TLFrameShape.frameShapeProps,
  geoShapeMigrations: () => import_TLGeoShape.geoShapeMigrations,
  geoShapeProps: () => import_TLGeoShape.geoShapeProps,
  getDefaultColorTheme: () => import_TLColorStyle.getDefaultColorTheme,
  getDefaultTranslationLocale: () => import_translations.getDefaultTranslationLocale,
  getShapePropKeysByStyle: () => import_TLShape.getShapePropKeysByStyle,
  groupShapeMigrations: () => import_TLGroupShape.groupShapeMigrations,
  groupShapeProps: () => import_TLGroupShape.groupShapeProps,
  highlightShapeMigrations: () => import_TLHighlightShape.highlightShapeMigrations,
  highlightShapeProps: () => import_TLHighlightShape.highlightShapeProps,
  idValidator: () => import_id_validator.idValidator,
  imageShapeMigrations: () => import_TLImageShape.imageShapeMigrations,
  imageShapeProps: () => import_TLImageShape.imageShapeProps,
  isPageId: () => import_TLPage.isPageId,
  isShape: () => import_TLShape.isShape,
  isShapeId: () => import_TLShape.isShapeId,
  lineShapeMigrations: () => import_TLLineShape.lineShapeMigrations,
  lineShapeProps: () => import_TLLineShape.lineShapeProps,
  noteShapeMigrations: () => import_TLNoteShape.noteShapeMigrations,
  noteShapeProps: () => import_TLNoteShape.noteShapeProps,
  opacityValidator: () => import_TLOpacity.opacityValidator,
  pageIdValidator: () => import_TLPage.pageIdValidator,
  parentIdValidator: () => import_TLBaseShape.parentIdValidator,
  rootShapeMigrations: () => import_TLShape.rootShapeMigrations,
  scribbleValidator: () => import_TLScribble.scribbleValidator,
  shapeIdValidator: () => import_TLBaseShape.shapeIdValidator,
  textShapeMigrations: () => import_TLTextShape.textShapeMigrations,
  textShapeProps: () => import_TLTextShape.textShapeProps,
  vec2dModelValidator: () => import_geometry_types.vec2dModelValidator,
  videoShapeMigrations: () => import_TLVideoShape.videoShapeMigrations,
  videoShapeProps: () => import_TLVideoShape.videoShapeProps
});
module.exports = __toCommonJS(src_exports);
var import_TLBaseAsset = require("./assets/TLBaseAsset");
var import_createPresenceStateDerivation = require("./createPresenceStateDerivation");
var import_createTLSchema = require("./createTLSchema");
var import_fixup = require("./fixup");
var import_TLColor = require("./misc/TLColor");
var import_TLOpacity = require("./misc/TLOpacity");
var import_TLScribble = require("./misc/TLScribble");
var import_geometry_types = require("./misc/geometry-types");
var import_id_validator = require("./misc/id-validator");
var import_TLAsset = require("./records/TLAsset");
var import_TLCamera = require("./records/TLCamera");
var import_TLDocument = require("./records/TLDocument");
var import_TLInstance = require("./records/TLInstance");
var import_TLPage = require("./records/TLPage");
var import_TLPageState = require("./records/TLPageState");
var import_TLPointer = require("./records/TLPointer");
var import_TLPresence = require("./records/TLPresence");
var import_TLShape = require("./records/TLShape");
var import_TLArrowShape = require("./shapes/TLArrowShape");
var import_TLBaseShape = require("./shapes/TLBaseShape");
var import_TLBookmarkShape = require("./shapes/TLBookmarkShape");
var import_TLDrawShape = require("./shapes/TLDrawShape");
var import_TLEmbedShape = require("./shapes/TLEmbedShape");
var import_TLFrameShape = require("./shapes/TLFrameShape");
var import_TLGeoShape = require("./shapes/TLGeoShape");
var import_TLGroupShape = require("./shapes/TLGroupShape");
var import_TLHighlightShape = require("./shapes/TLHighlightShape");
var import_TLImageShape = require("./shapes/TLImageShape");
var import_TLLineShape = require("./shapes/TLLineShape");
var import_TLNoteShape = require("./shapes/TLNoteShape");
var import_TLTextShape = require("./shapes/TLTextShape");
var import_TLVideoShape = require("./shapes/TLVideoShape");
var import_StyleProp = require("./styles/StyleProp");
var import_TLColorStyle = require("./styles/TLColorStyle");
var import_TLDashStyle = require("./styles/TLDashStyle");
var import_TLFillStyle = require("./styles/TLFillStyle");
var import_TLFontStyle = require("./styles/TLFontStyle");
var import_TLHorizontalAlignStyle = require("./styles/TLHorizontalAlignStyle");
var import_TLSizeStyle = require("./styles/TLSizeStyle");
var import_TLVerticalAlignStyle = require("./styles/TLVerticalAlignStyle");
var import_translations = require("./translations/translations");
//# sourceMappingURL=index.js.map
