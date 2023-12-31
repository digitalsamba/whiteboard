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
var TLPresence_exports = {};
__export(TLPresence_exports, {
  InstancePresenceRecordType: () => InstancePresenceRecordType,
  instancePresenceMigrations: () => instancePresenceMigrations,
  instancePresenceValidator: () => instancePresenceValidator,
  instancePresenceVersions: () => instancePresenceVersions
});
module.exports = __toCommonJS(TLPresence_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_geometry_types = require("../misc/geometry-types");
var import_id_validator = require("../misc/id-validator");
var import_TLCursor = require("../misc/TLCursor");
var import_TLScribble = require("../misc/TLScribble");
var import_TLInstance = require("./TLInstance");
const instancePresenceValidator = import_validate.T.model(
  "instance_presence",
  import_validate.T.object({
    typeName: import_validate.T.literal("instance_presence"),
    id: (0, import_id_validator.idValidator)("instance_presence"),
    userId: import_validate.T.string,
    userName: import_validate.T.string,
    lastActivityTimestamp: import_validate.T.number,
    followingUserId: import_validate.T.string.nullable(),
    cursor: import_validate.T.object({
      x: import_validate.T.number,
      y: import_validate.T.number,
      type: import_TLCursor.cursorTypeValidator,
      rotation: import_validate.T.number
    }),
    color: import_validate.T.string,
    camera: import_validate.T.object({
      x: import_validate.T.number,
      y: import_validate.T.number,
      z: import_validate.T.number
    }),
    screenBounds: import_geometry_types.box2dModelValidator,
    selectedShapeIds: import_validate.T.arrayOf((0, import_id_validator.idValidator)("shape")),
    currentPageId: (0, import_id_validator.idValidator)("page"),
    brush: import_geometry_types.box2dModelValidator.nullable(),
    scribble: import_TLScribble.scribbleValidator.nullable(),
    chatMessage: import_validate.T.string,
    meta: import_validate.T.jsonValue
  })
);
const instancePresenceVersions = {
  AddScribbleDelay: 1,
  RemoveInstanceId: 2,
  AddChatMessage: 3,
  AddMeta: 4,
  RenameSelectedShapeIds: 5
};
const instancePresenceMigrations = (0, import_store.defineMigrations)({
  currentVersion: instancePresenceVersions.RenameSelectedShapeIds,
  migrators: {
    [instancePresenceVersions.AddScribbleDelay]: {
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
    [instancePresenceVersions.RemoveInstanceId]: {
      up: ({ instanceId: _, ...instance }) => {
        return instance;
      },
      down: (instance) => {
        return { ...instance, instanceId: import_TLInstance.TLINSTANCE_ID };
      }
    },
    [instancePresenceVersions.AddChatMessage]: {
      up: (instance) => {
        return { ...instance, chatMessage: "" };
      },
      down: ({ chatMessage: _, ...instance }) => {
        return instance;
      }
    },
    [instancePresenceVersions.AddMeta]: {
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
    [instancePresenceVersions.RenameSelectedShapeIds]: {
      up: (record) => {
        const { selectedShapeIds, ...rest } = record;
        return {
          selectedShapeIds,
          ...rest
        };
      },
      down: (record) => {
        const { selectedShapeIds, ...rest } = record;
        return {
          selectedShapeIds,
          ...rest
        };
      }
    }
  }
});
const InstancePresenceRecordType = (0, import_store.createRecordType)(
  "instance_presence",
  {
    migrations: instancePresenceMigrations,
    validator: instancePresenceValidator,
    scope: "presence"
  }
).withDefaultProperties(() => ({
  lastActivityTimestamp: 0,
  followingUserId: null,
  color: "#FF0000",
  camera: {
    x: 0,
    y: 0,
    z: 1
  },
  cursor: {
    x: 0,
    y: 0,
    type: "default",
    rotation: 0
  },
  screenBounds: {
    x: 0,
    y: 0,
    w: 1,
    h: 1
  },
  selectedShapeIds: [],
  brush: null,
  scribble: null,
  chatMessage: "",
  meta: {}
}));
//# sourceMappingURL=TLPresence.js.map
