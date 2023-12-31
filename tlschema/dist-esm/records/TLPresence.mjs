import { createRecordType, defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { box2dModelValidator } from "../misc/geometry-types.mjs";
import { idValidator } from "../misc/id-validator.mjs";
import { cursorTypeValidator } from "../misc/TLCursor.mjs";
import { scribbleValidator } from "../misc/TLScribble.mjs";
import { TLINSTANCE_ID } from "./TLInstance.mjs";
const instancePresenceValidator = T.model(
  "instance_presence",
  T.object({
    typeName: T.literal("instance_presence"),
    id: idValidator("instance_presence"),
    userId: T.string,
    userName: T.string,
    lastActivityTimestamp: T.number,
    followingUserId: T.string.nullable(),
    cursor: T.object({
      x: T.number,
      y: T.number,
      type: cursorTypeValidator,
      rotation: T.number
    }),
    color: T.string,
    camera: T.object({
      x: T.number,
      y: T.number,
      z: T.number
    }),
    screenBounds: box2dModelValidator,
    selectedShapeIds: T.arrayOf(idValidator("shape")),
    currentPageId: idValidator("page"),
    brush: box2dModelValidator.nullable(),
    scribble: scribbleValidator.nullable(),
    chatMessage: T.string,
    meta: T.jsonValue
  })
);
const instancePresenceVersions = {
  AddScribbleDelay: 1,
  RemoveInstanceId: 2,
  AddChatMessage: 3,
  AddMeta: 4,
  RenameSelectedShapeIds: 5
};
const instancePresenceMigrations = defineMigrations({
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
        return { ...instance, instanceId: TLINSTANCE_ID };
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
const InstancePresenceRecordType = createRecordType(
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
export {
  InstancePresenceRecordType,
  instancePresenceMigrations,
  instancePresenceValidator,
  instancePresenceVersions
};
//# sourceMappingURL=TLPresence.mjs.map
