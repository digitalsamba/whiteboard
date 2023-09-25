import { createRecordType, defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { idValidator } from "../misc/id-validator.mjs";
import { shapeIdValidator } from "../shapes/TLBaseShape.mjs";
import { CameraRecordType } from "./TLCamera.mjs";
import { TLINSTANCE_ID } from "./TLInstance.mjs";
import { pageIdValidator } from "./TLPage.mjs";
const instancePageStateValidator = T.model(
  "instance_page_state",
  T.object({
    typeName: T.literal("instance_page_state"),
    id: idValidator("instance_page_state"),
    pageId: pageIdValidator,
    selectedShapeIds: T.arrayOf(shapeIdValidator),
    hintingShapeIds: T.arrayOf(shapeIdValidator),
    erasingShapeIds: T.arrayOf(shapeIdValidator),
    hoveredShapeId: shapeIdValidator.nullable(),
    editingShapeId: shapeIdValidator.nullable(),
    croppingShapeId: shapeIdValidator.nullable(),
    focusedGroupId: shapeIdValidator.nullable(),
    meta: T.jsonValue
  })
);
const instancePageStateVersions = {
  AddCroppingId: 1,
  RemoveInstanceIdAndCameraId: 2,
  AddMeta: 3,
  RenameProperties: 4
};
const instancePageStateMigrations = defineMigrations({
  currentVersion: instancePageStateVersions.RenameProperties,
  migrators: {
    [instancePageStateVersions.AddCroppingId]: {
      up(instance) {
        return { ...instance, croppingShapeId: null };
      },
      down({ croppingShapeId: _croppingShapeId, ...instance }) {
        return instance;
      }
    },
    [instancePageStateVersions.RemoveInstanceIdAndCameraId]: {
      up({ instanceId: _, cameraId: __, ...instance }) {
        return instance;
      },
      down(instance) {
        return {
          ...instance,
          instanceId: TLINSTANCE_ID,
          cameraId: CameraRecordType.createId("void")
        };
      }
    },
    [instancePageStateVersions.AddMeta]: {
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
    [instancePageStateVersions.RenameProperties]: {
      up: (record) => {
        const {
          selectedShapeIds,
          hintingShapeIds,
          erasingShapeIds,
          hoveredShapeId,
          editingShapeId,
          croppingShapeId,
          focusedGroupId,
          ...rest
        } = record;
        return {
          selectedShapeIds,
          hintingShapeIds,
          erasingShapeIds,
          hoveredShapeId,
          editingShapeId,
          croppingShapeId,
          focusedGroupId,
          ...rest
        };
      },
      down: (record) => {
        const {
          selectedShapeIds,
          hintingShapeIds,
          erasingShapeIds,
          hoveredShapeId,
          editingShapeId,
          croppingShapeId,
          focusedGroupId,
          ...rest
        } = record;
        return {
          selectedShapeIds,
          hintingShapeIds,
          erasingShapeIds,
          hoveredShapeId,
          editingShapeId,
          croppingShapeId,
          focusedGroupId,
          ...rest
        };
      }
    }
  }
});
const InstancePageStateRecordType = createRecordType(
  "instance_page_state",
  {
    migrations: instancePageStateMigrations,
    validator: instancePageStateValidator,
    scope: "session"
  }
).withDefaultProperties(
  () => ({
    editingShapeId: null,
    croppingShapeId: null,
    selectedShapeIds: [],
    hoveredShapeId: null,
    erasingShapeIds: [],
    hintingShapeIds: [],
    focusedGroupId: null,
    meta: {}
  })
);
export {
  InstancePageStateRecordType,
  instancePageStateMigrations,
  instancePageStateValidator,
  instancePageStateVersions
};
//# sourceMappingURL=TLPageState.mjs.map
