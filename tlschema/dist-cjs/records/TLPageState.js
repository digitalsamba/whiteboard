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
var TLPageState_exports = {};
__export(TLPageState_exports, {
  InstancePageStateRecordType: () => InstancePageStateRecordType,
  instancePageStateMigrations: () => instancePageStateMigrations,
  instancePageStateValidator: () => instancePageStateValidator,
  instancePageStateVersions: () => instancePageStateVersions
});
module.exports = __toCommonJS(TLPageState_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_id_validator = require("../misc/id-validator");
var import_TLBaseShape = require("../shapes/TLBaseShape");
var import_TLCamera = require("./TLCamera");
var import_TLInstance = require("./TLInstance");
var import_TLPage = require("./TLPage");
const instancePageStateValidator = import_validate.T.model(
  "instance_page_state",
  import_validate.T.object({
    typeName: import_validate.T.literal("instance_page_state"),
    id: (0, import_id_validator.idValidator)("instance_page_state"),
    pageId: import_TLPage.pageIdValidator,
    selectedShapeIds: import_validate.T.arrayOf(import_TLBaseShape.shapeIdValidator),
    hintingShapeIds: import_validate.T.arrayOf(import_TLBaseShape.shapeIdValidator),
    erasingShapeIds: import_validate.T.arrayOf(import_TLBaseShape.shapeIdValidator),
    hoveredShapeId: import_TLBaseShape.shapeIdValidator.nullable(),
    editingShapeId: import_TLBaseShape.shapeIdValidator.nullable(),
    croppingShapeId: import_TLBaseShape.shapeIdValidator.nullable(),
    focusedGroupId: import_TLBaseShape.shapeIdValidator.nullable(),
    meta: import_validate.T.jsonValue
  })
);
const instancePageStateVersions = {
  AddCroppingId: 1,
  RemoveInstanceIdAndCameraId: 2,
  AddMeta: 3,
  RenameProperties: 4
};
const instancePageStateMigrations = (0, import_store.defineMigrations)({
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
          instanceId: import_TLInstance.TLINSTANCE_ID,
          cameraId: import_TLCamera.CameraRecordType.createId("void")
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
const InstancePageStateRecordType = (0, import_store.createRecordType)(
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
//# sourceMappingURL=TLPageState.js.map
