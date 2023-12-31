import { createRecordType, defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { box2dModelValidator } from "../misc/geometry-types.mjs";
import { idValidator } from "../misc/id-validator.mjs";
import { cursorValidator } from "../misc/TLCursor.mjs";
import { opacityValidator } from "../misc/TLOpacity.mjs";
import { scribbleValidator } from "../misc/TLScribble.mjs";
import { pageIdValidator } from "./TLPage.mjs";
const instanceIdValidator = idValidator("instance");
function createInstanceRecordType(stylesById) {
  const stylesForNextShapeValidators = {};
  for (const [id, style] of stylesById) {
    stylesForNextShapeValidators[id] = T.optional(style);
  }
  const instanceTypeValidator = T.model(
    "instance",
    T.object({
      typeName: T.literal("instance"),
      id: idValidator("instance"),
      currentPageId: pageIdValidator,
      followingUserId: T.string.nullable(),
      brush: box2dModelValidator.nullable(),
      opacityForNextShape: opacityValidator,
      stylesForNextShape: T.object(stylesForNextShapeValidators),
      cursor: cursorValidator,
      scribble: scribbleValidator.nullable(),
      isFocusMode: T.boolean,
      isDebugMode: T.boolean,
      isToolLocked: T.boolean,
      exportBackground: T.boolean,
      screenBounds: box2dModelValidator,
      zoomBrush: box2dModelValidator.nullable(),
      isPenMode: T.boolean,
      isGridMode: T.boolean,
      chatMessage: T.string,
      isChatting: T.boolean,
      highlightedUserIds: T.arrayOf(T.string),
      canMoveCamera: T.boolean,
      isFocused: T.boolean,
      devicePixelRatio: T.number,
      isCoarsePointer: T.boolean,
      openMenus: T.arrayOf(T.string),
      isChangingStyle: T.boolean,
      isReadonly: T.boolean,
      meta: T.jsonValue
    })
  );
  return createRecordType("instance", {
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
const instanceMigrations = defineMigrations({
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
export {
  TLINSTANCE_ID,
  createInstanceRecordType,
  instanceIdValidator,
  instanceMigrations,
  instanceVersions
};
//# sourceMappingURL=TLInstance.mjs.map
