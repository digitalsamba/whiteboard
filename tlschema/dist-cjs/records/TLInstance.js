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
var TLInstance_exports = {};
__export(TLInstance_exports, {
  TLINSTANCE_ID: () => TLINSTANCE_ID,
  createInstanceRecordType: () => createInstanceRecordType,
  instanceIdValidator: () => instanceIdValidator,
  instanceMigrations: () => instanceMigrations,
  instanceVersions: () => instanceVersions
});
module.exports = __toCommonJS(TLInstance_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_geometry_types = require("../misc/geometry-types");
var import_id_validator = require("../misc/id-validator");
var import_TLCursor = require("../misc/TLCursor");
var import_TLOpacity = require("../misc/TLOpacity");
var import_TLScribble = require("../misc/TLScribble");
var import_TLPage = require("./TLPage");
const instanceIdValidator = (0, import_id_validator.idValidator)("instance");
function createInstanceRecordType(stylesById) {
  const stylesForNextShapeValidators = {};
  for (const [id, style] of stylesById) {
    stylesForNextShapeValidators[id] = import_validate.T.optional(style);
  }
  const instanceTypeValidator = import_validate.T.model(
    "instance",
    import_validate.T.object({
      typeName: import_validate.T.literal("instance"),
      id: (0, import_id_validator.idValidator)("instance"),
      currentPageId: import_TLPage.pageIdValidator,
      followingUserId: import_validate.T.string.nullable(),
      brush: import_geometry_types.box2dModelValidator.nullable(),
      opacityForNextShape: import_TLOpacity.opacityValidator,
      stylesForNextShape: import_validate.T.object(stylesForNextShapeValidators),
      cursor: import_TLCursor.cursorValidator,
      scribble: import_TLScribble.scribbleValidator.nullable(),
      isFocusMode: import_validate.T.boolean,
      isDebugMode: import_validate.T.boolean,
      isToolLocked: import_validate.T.boolean,
      exportBackground: import_validate.T.boolean,
      screenBounds: import_geometry_types.box2dModelValidator,
      zoomBrush: import_geometry_types.box2dModelValidator.nullable(),
      isPenMode: import_validate.T.boolean,
      isGridMode: import_validate.T.boolean,
      chatMessage: import_validate.T.string,
      isChatting: import_validate.T.boolean,
      highlightedUserIds: import_validate.T.arrayOf(import_validate.T.string),
      canMoveCamera: import_validate.T.boolean,
      isFocused: import_validate.T.boolean,
      devicePixelRatio: import_validate.T.number,
      isCoarsePointer: import_validate.T.boolean,
      openMenus: import_validate.T.arrayOf(import_validate.T.string),
      isChangingStyle: import_validate.T.boolean,
      isReadonly: import_validate.T.boolean,
      meta: import_validate.T.jsonValue
    })
  );
  return (0, import_store.createRecordType)("instance", {
    migrations: instanceMigrations,
    validator: instanceTypeValidator,
    scope: "session"
  }).withDefaultProperties(
    () => ({
      followingUserId: null,
      opacityForNextShape: 1,
      stylesForNextShape: {},
      brush: null,
      scribble: null,
      cursor: {
        type: "default",
        rotation: 0
      },
      isFocusMode: false,
      exportBackground: false,
      isDebugMode: process.env.NODE_ENV === "development",
      isToolLocked: false,
      screenBounds: { x: 0, y: 0, w: 1080, h: 720 },
      zoomBrush: null,
      isGridMode: false,
      isPenMode: false,
      chatMessage: "",
      isChatting: false,
      highlightedUserIds: [],
      canMoveCamera: true,
      isFocused: false,
      devicePixelRatio: typeof window === "undefined" ? 1 : window.devicePixelRatio,
      isCoarsePointer: false,
      openMenus: [],
      isChangingStyle: false,
      isReadonly: false,
      meta: {}
    })
  );
}
const instanceVersions = {
  AddTransparentExportBgs: 1,
  RemoveDialog: 2,
  AddToolLockMode: 3,
  RemoveExtraPropsForNextShape: 4,
  AddLabelColor: 5,
  AddFollowingUserId: 6,
  RemoveAlignJustify: 7,
  AddZoom: 8,
  AddVerticalAlign: 9,
  AddScribbleDelay: 10,
  RemoveUserId: 11,
  AddIsPenModeAndIsGridMode: 12,
  HoistOpacity: 13,
  AddChat: 14,
  AddHighlightedUserIds: 15,
  ReplacePropsForNextShapeWithStylesForNextShape: 16,
  AddMeta: 17,
  RemoveCursorColor: 18,
  AddLonelyProperties: 19,
  ReadOnlyReadonly: 20
};
const instanceMigrations = (0, import_store.defineMigrations)({
  currentVersion: instanceVersions.ReadOnlyReadonly,
  migrators: {
    [instanceVersions.AddTransparentExportBgs]: {
      up: (instance) => {
        return { ...instance, exportBackground: true };
      },
      down: ({ exportBackground: _, ...instance }) => {
        return instance;
      }
    },
    [instanceVersions.RemoveDialog]: {
      up: ({ dialog: _, ...instance }) => {
        return instance;
      },
      down: (instance) => {
        return { ...instance, dialog: null };
      }
    },
    [instanceVersions.AddToolLockMode]: {
      up: (instance) => {
        return { ...instance, isToolLocked: false };
      },
      down: ({ isToolLocked: _, ...instance }) => {
        return instance;
      }
    },
    [instanceVersions.RemoveExtraPropsForNextShape]: {
      up: ({ propsForNextShape, ...instance }) => {
        return {
          ...instance,
          propsForNextShape: Object.fromEntries(
            Object.entries(propsForNextShape).filter(
              ([key]) => [
                "color",
                "labelColor",
                "dash",
                "fill",
                "size",
                "font",
                "align",
                "verticalAlign",
                "icon",
                "geo",
                "arrowheadStart",
                "arrowheadEnd",
                "spline"
              ].includes(key)
            )
          )
        };
      },
      down: (instance) => {
        return instance;
      }
    },
    [instanceVersions.AddLabelColor]: {
      up: ({ propsForNextShape, ...instance }) => {
        return {
          ...instance,
          propsForNextShape: {
            ...propsForNextShape,
            labelColor: "black"
          }
        };
      },
      down: (instance) => {
        const { labelColor: _, ...rest } = instance.propsForNextShape;
        return {
          ...instance,
          propsForNextShape: {
            ...rest
          }
        };
      }
    },
    [instanceVersions.AddFollowingUserId]: {
      up: (instance) => {
        return { ...instance, followingUserId: null };
      },
      down: ({ followingUserId: _, ...instance }) => {
        return instance;
      }
    },
    [instanceVersions.RemoveAlignJustify]: {
      up: (instance) => {
        let newAlign = instance.propsForNextShape.align;
        if (newAlign === "justify") {
          newAlign = "start";
        }
        return {
          ...instance,
          propsForNextShape: {
            ...instance.propsForNextShape,
            align: newAlign
          }
        };
      },
      down: (instance) => {
        return { ...instance };
      }
    },
    [instanceVersions.AddZoom]: {
      up: (instance) => {
        return { ...instance, zoomBrush: null };
      },
      down: ({ zoomBrush: _, ...instance }) => {
        return instance;
      }
    },
    [instanceVersions.AddVerticalAlign]: {
      up: (instance) => {
        return {
          ...instance,
          propsForNextShape: {
            ...instance.propsForNextShape,
            verticalAlign: "middle"
          }
        };
      },
      down: (instance) => {
        const { verticalAlign: _, ...propsForNextShape } = instance.propsForNextShape;
        return {
          ...instance,
          propsForNextShape
        };
      }
    },
    [instanceVersions.AddScribbleDelay]: {
      up: (instance) => {
        if (instance.scribble !== null) {
          return { ...instance, scribble: { ...instance.scribble, delay: 0 } };
        }
        return { ...instance };
      },
      down: (instance) => {
        if (instance.scribble !== null) {
          const { delay: _delay, ...rest } = instance.scribble;
          return { ...instance, scribble: rest };
        }
        return { ...instance };
      }
    },
    [instanceVersions.RemoveUserId]: {
      up: ({ userId: _, ...instance }) => {
        return instance;
      },
      down: (instance) => {
        return { ...instance, userId: "user:none" };
      }
    },
    [instanceVersions.AddIsPenModeAndIsGridMode]: {
      up: (instance) => {
        return { ...instance, isPenMode: false, isGridMode: false };
      },
      down: ({ isPenMode: _, isGridMode: __, ...instance }) => {
        return instance;
      }
    },
    [instanceVersions.HoistOpacity]: {
      up: ({ propsForNextShape: { opacity, ...propsForNextShape }, ...instance }) => {
        return { ...instance, opacityForNextShape: Number(opacity ?? "1"), propsForNextShape };
      },
      down: ({ opacityForNextShape: opacity, ...instance }) => {
        return {
          ...instance,
          propsForNextShape: {
            ...instance.propsForNextShape,
            opacity: opacity < 0.175 ? "0.1" : opacity < 0.375 ? "0.25" : opacity < 0.625 ? "0.5" : opacity < 0.875 ? "0.75" : "1"
          }
        };
      }
    },
    [instanceVersions.AddChat]: {
      up: (instance) => {
        return { ...instance, chatMessage: "", isChatting: false };
      },
      down: ({ chatMessage: _, isChatting: __, ...instance }) => {
        return instance;
      }
    },
    [instanceVersions.AddHighlightedUserIds]: {
      up: (instance) => {
        return { ...instance, highlightedUserIds: [] };
      },
      down: ({ highlightedUserIds: _, ...instance }) => {
        return instance;
      }
    },
    [instanceVersions.ReplacePropsForNextShapeWithStylesForNextShape]: {
      up: ({ propsForNextShape: _, ...instance }) => {
        return { ...instance, stylesForNextShape: {} };
      },
      down: ({ stylesForNextShape: _, ...instance }) => {
        return {
          ...instance,
          propsForNextShape: {
            color: "black",
            labelColor: "black",
            dash: "draw",
            fill: "none",
            size: "m",
            icon: "file",
            font: "draw",
            align: "middle",
            verticalAlign: "middle",
            geo: "rectangle",
            arrowheadStart: "none",
            arrowheadEnd: "arrow",
            spline: "line"
          }
        };
      }
    },
    [instanceVersions.AddMeta]: {
      up: (record) => {
        return {
          ...record,
          meta: {}
        };
      },
      down: ({ meta: _, ...record }) => {
        return {
          ...record
        };
      }
    },
    [instanceVersions.RemoveCursorColor]: {
      up: (record) => {
        const { color: _, ...cursor } = record.cursor;
        return {
          ...record,
          cursor
        };
      },
      down: (record) => {
        return {
          ...record,
          cursor: {
            ...record.cursor,
            color: "black"
          }
        };
      }
    },
    [instanceVersions.AddLonelyProperties]: {
      up: (record) => {
        return {
          ...record,
          canMoveCamera: true,
          isFocused: false,
          devicePixelRatio: 1,
          isCoarsePointer: false,
          openMenus: [],
          isChangingStyle: false,
          isReadOnly: false
        };
      },
      down: ({
        canMoveCamera: _canMoveCamera,
        isFocused: _isFocused,
        devicePixelRatio: _devicePixelRatio,
        isCoarsePointer: _isCoarsePointer,
        openMenus: _openMenus,
        isChangingStyle: _isChangingStyle,
        isReadOnly: _isReadOnly,
        ...record
      }) => {
        return {
          ...record
        };
      }
    },
    [instanceVersions.ReadOnlyReadonly]: {
      up: ({ isReadOnly: _isReadOnly, ...record }) => {
        return {
          ...record,
          isReadonly: _isReadOnly
        };
      },
      down: ({ isReadonly: _isReadonly, ...record }) => {
        return {
          ...record,
          isReadOnly: _isReadonly
        };
      }
    }
  }
});
const TLINSTANCE_ID = "instance:instance";
//# sourceMappingURL=TLInstance.js.map
