"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  ArrowShapeUtil: () => import_ArrowShapeUtil.ArrowShapeUtil,
  AssetUrlsProvider: () => import_useAssetUrls.AssetUrlsProvider,
  BookmarkShapeUtil: () => import_BookmarkShapeUtil.BookmarkShapeUtil,
  BreakPointProvider: () => import_useBreakpoint.BreakPointProvider,
  Button: () => import_Button.Button,
  ContextMenu: () => import_ContextMenu.ContextMenu,
  DEFAULT_ACCEPTED_IMG_TYPE: () => import_assets.DEFAULT_ACCEPTED_IMG_TYPE,
  DEFAULT_ACCEPTED_VID_TYPE: () => import_assets.DEFAULT_ACCEPTED_VID_TYPE,
  Dialog: () => Dialog,
  DrawShapeUtil: () => import_DrawShapeUtil.DrawShapeUtil,
  DropdownMenu: () => DropdownMenu,
  EmbedShapeUtil: () => import_EmbedShapeUtil.EmbedShapeUtil,
  EraserTool: () => import_EraserTool.EraserTool,
  FrameShapeUtil: () => import_FrameShapeUtil.FrameShapeUtil,
  GeoShapeUtil: () => import_GeoShapeUtil.GeoShapeUtil,
  HandTool: () => import_HandTool.HandTool,
  HighlightShapeUtil: () => import_HighlightShapeUtil.HighlightShapeUtil,
  Icon: () => import_Icon.Icon,
  ImageShapeUtil: () => import_ImageShapeUtil.ImageShapeUtil,
  Input: () => import_Input.Input,
  LaserTool: () => import_LaserTool.LaserTool,
  LineShapeUtil: () => import_LineShapeUtil.LineShapeUtil,
  NoteShapeUtil: () => import_NoteShapeUtil.NoteShapeUtil,
  SelectTool: () => import_SelectTool.SelectTool,
  TLDRAW_FILE_EXTENSION: () => import_file.TLDRAW_FILE_EXTENSION,
  TextShapeUtil: () => import_TextShapeUtil.TextShapeUtil,
  Tldraw: () => import_Tldraw.Tldraw,
  TldrawUi: () => import_TldrawUi.TldrawUi,
  TldrawUiContextProvider: () => import_TldrawUiContextProvider.TldrawUiContextProvider,
  UiEventsProvider: () => import_useEventsProvider.UiEventsProvider,
  VideoShapeUtil: () => import_VideoShapeUtil.VideoShapeUtil,
  ZoomTool: () => import_ZoomTool.ZoomTool,
  buildFromV1Document: () => import_buildFromV1Document.buildFromV1Document,
  compactMenuItems: () => import_menuHelpers.compactMenuItems,
  containBoxSize: () => import_assets.containBoxSize,
  defaultShapeTools: () => import_defaultShapeTools.defaultShapeTools,
  defaultShapeUtils: () => import_defaultShapeUtils.defaultShapeUtils,
  defaultTools: () => import_defaultTools.defaultTools,
  findMenuItem: () => import_menuHelpers.findMenuItem,
  getEmbedInfo: () => import_embeds.getEmbedInfo,
  getResizedImageDataUrl: () => import_assets.getResizedImageDataUrl,
  isGifAnimated: () => import_assets.isGifAnimated,
  menuCustom: () => import_menuHelpers.menuCustom,
  menuGroup: () => import_menuHelpers.menuGroup,
  menuItem: () => import_menuHelpers.menuItem,
  menuSubmenu: () => import_menuHelpers.menuSubmenu,
  parseAndLoadDocument: () => import_file.parseAndLoadDocument,
  parseTldrawJsonFile: () => import_file.parseTldrawJsonFile,
  serializeTldrawJson: () => import_file.serializeTldrawJson,
  serializeTldrawJsonBlob: () => import_file.serializeTldrawJsonBlob,
  setDefaultEditorAssetUrls: () => import_assetUrls2.setDefaultEditorAssetUrls,
  setDefaultUiAssetUrls: () => import_assetUrls.setDefaultUiAssetUrls,
  toolbarItem: () => import_useToolbarSchema.toolbarItem,
  truncateStringWithEllipsis: () => import_text.truncateStringWithEllipsis,
  useActions: () => import_useActions.useActions,
  useActionsMenuSchema: () => import_useActionsMenuSchema.useActionsMenuSchema,
  useAssetUrls: () => import_useAssetUrls.useAssetUrls,
  useBreakpoint: () => import_useBreakpoint.useBreakpoint,
  useCanRedo: () => import_useCanRedo.useCanRedo,
  useCanUndo: () => import_useCanUndo.useCanUndo,
  useContextMenuSchema: () => import_useContextMenuSchema.useContextMenuSchema,
  useCopyAs: () => import_useCopyAs.useCopyAs,
  useDefaultHelpers: () => import_overrides.useDefaultHelpers,
  useDialogs: () => import_useDialogsProvider.useDialogs,
  useExportAs: () => import_useExportAs.useExportAs,
  useHelpMenuSchema: () => import_useHelpMenuSchema.useHelpMenuSchema,
  useKeyboardShortcuts: () => import_useKeyboardShortcuts.useKeyboardShortcuts,
  useKeyboardShortcutsSchema: () => import_useKeyboardShortcutsSchema.useKeyboardShortcutsSchema,
  useLocalStorageState: () => import_useLocalStorageState.useLocalStorageState,
  useMenuClipboardEvents: () => import_useClipboardEvents.useMenuClipboardEvents,
  useMenuIsOpen: () => import_useMenuIsOpen.useMenuIsOpen,
  useMenuSchema: () => import_useMenuSchema.useMenuSchema,
  useNativeClipboardEvents: () => import_useClipboardEvents.useNativeClipboardEvents,
  useReadonly: () => import_useReadonly.useReadonly,
  useToasts: () => import_useToastsProvider.useToasts,
  useToolbarSchema: () => import_useToolbarSchema.useToolbarSchema,
  useTools: () => import_useTools.useTools,
  useTranslation: () => import_useTranslation.useTranslation,
  useUiEvents: () => import_useEventsProvider.useUiEvents
});
module.exports = __toCommonJS(src_exports);
var Dialog = __toESM(require("./lib/ui/components/primitives/Dialog"));
var DropdownMenu = __toESM(require("./lib/ui/components/primitives/DropdownMenu"));
__reExport(src_exports, require("@tldraw/editor"), module.exports);
var import_Tldraw = require("./lib/Tldraw");
var import_defaultShapeTools = require("./lib/defaultShapeTools");
var import_defaultShapeUtils = require("./lib/defaultShapeUtils");
var import_defaultTools = require("./lib/defaultTools");
var import_ArrowShapeUtil = require("./lib/shapes/arrow/ArrowShapeUtil");
var import_BookmarkShapeUtil = require("./lib/shapes/bookmark/BookmarkShapeUtil");
var import_DrawShapeUtil = require("./lib/shapes/draw/DrawShapeUtil");
var import_EmbedShapeUtil = require("./lib/shapes/embed/EmbedShapeUtil");
var import_FrameShapeUtil = require("./lib/shapes/frame/FrameShapeUtil");
var import_GeoShapeUtil = require("./lib/shapes/geo/GeoShapeUtil");
var import_HighlightShapeUtil = require("./lib/shapes/highlight/HighlightShapeUtil");
var import_ImageShapeUtil = require("./lib/shapes/image/ImageShapeUtil");
var import_LineShapeUtil = require("./lib/shapes/line/LineShapeUtil");
var import_NoteShapeUtil = require("./lib/shapes/note/NoteShapeUtil");
var import_TextShapeUtil = require("./lib/shapes/text/TextShapeUtil");
var import_VideoShapeUtil = require("./lib/shapes/video/VideoShapeUtil");
var import_EraserTool = require("./lib/tools/EraserTool/EraserTool");
var import_HandTool = require("./lib/tools/HandTool/HandTool");
var import_LaserTool = require("./lib/tools/LaserTool/LaserTool");
var import_SelectTool = require("./lib/tools/SelectTool/SelectTool");
var import_ZoomTool = require("./lib/tools/ZoomTool/ZoomTool");
var import_TldrawUi = require("./lib/ui/TldrawUi");
var import_TldrawUiContextProvider = require("./lib/ui/TldrawUiContextProvider");
var import_assetUrls = require("./lib/ui/assetUrls");
var import_ContextMenu = require("./lib/ui/components/ContextMenu");
var import_Button = require("./lib/ui/components/primitives/Button");
var import_Icon = require("./lib/ui/components/primitives/Icon");
var import_Input = require("./lib/ui/components/primitives/Input");
var import_menuHelpers = require("./lib/ui/hooks/menuHelpers");
var import_useActions = require("./lib/ui/hooks/useActions");
var import_useActionsMenuSchema = require("./lib/ui/hooks/useActionsMenuSchema");
var import_useAssetUrls = require("./lib/ui/hooks/useAssetUrls");
var import_useBreakpoint = require("./lib/ui/hooks/useBreakpoint");
var import_useCanRedo = require("./lib/ui/hooks/useCanRedo");
var import_useCanUndo = require("./lib/ui/hooks/useCanUndo");
var import_useClipboardEvents = require("./lib/ui/hooks/useClipboardEvents");
var import_useContextMenuSchema = require("./lib/ui/hooks/useContextMenuSchema");
var import_useCopyAs = require("./lib/ui/hooks/useCopyAs");
var import_useDialogsProvider = require("./lib/ui/hooks/useDialogsProvider");
var import_useEventsProvider = require("./lib/ui/hooks/useEventsProvider");
var import_useExportAs = require("./lib/ui/hooks/useExportAs");
var import_useHelpMenuSchema = require("./lib/ui/hooks/useHelpMenuSchema");
var import_useKeyboardShortcuts = require("./lib/ui/hooks/useKeyboardShortcuts");
var import_useKeyboardShortcutsSchema = require("./lib/ui/hooks/useKeyboardShortcutsSchema");
var import_useLocalStorageState = require("./lib/ui/hooks/useLocalStorageState");
var import_useMenuIsOpen = require("./lib/ui/hooks/useMenuIsOpen");
var import_useMenuSchema = require("./lib/ui/hooks/useMenuSchema");
var import_useReadonly = require("./lib/ui/hooks/useReadonly");
var import_useToastsProvider = require("./lib/ui/hooks/useToastsProvider");
var import_useToolbarSchema = require("./lib/ui/hooks/useToolbarSchema");
var import_useTools = require("./lib/ui/hooks/useTools");
var import_useTranslation = require("./lib/ui/hooks/useTranslation/useTranslation");
var import_overrides = require("./lib/ui/overrides");
var import_assetUrls2 = require("./lib/utils/assetUrls");
var import_assets = require("./lib/utils/assets");
var import_buildFromV1Document = require("./lib/utils/buildFromV1Document");
var import_embeds = require("./lib/utils/embeds");
var import_file = require("./lib/utils/file");
var import_text = require("./lib/utils/text");
//# sourceMappingURL=index.js.map
