import { computed } from "@tldraw/state";
import { CameraRecordType } from "./records/TLCamera.mjs";
import { TLINSTANCE_ID } from "./records/TLInstance.mjs";
import { InstancePageStateRecordType } from "./records/TLPageState.mjs";
import { TLPOINTER_ID } from "./records/TLPointer.mjs";
import { InstancePresenceRecordType } from "./records/TLPresence.mjs";
const createPresenceStateDerivation = ($user, instanceId) => (store) => {
  return computed("instancePresence", () => {
    const instance = store.get(TLINSTANCE_ID);
    const pageState = store.get(InstancePageStateRecordType.createId(instance?.currentPageId));
    const camera = store.get(CameraRecordType.createId(instance?.currentPageId));
    const pointer = store.get(TLPOINTER_ID);
    const user = $user.value;
    if (!pageState || !instance || !camera || !pointer || !user) {
      return null;
    }
    return InstancePresenceRecordType.create({
      id: instanceId ?? InstancePresenceRecordType.createId(store.id),
      selectedShapeIds: pageState.selectedShapeIds,
      brush: instance.brush,
      scribble: instance.scribble,
      userId: user.id,
      userName: user.name,
      followingUserId: instance.followingUserId,
      camera: {
        x: camera.x,
        y: camera.y,
        z: camera.z
      },
      color: user.color,
      currentPageId: instance.currentPageId,
      cursor: {
        x: pointer.x,
        y: pointer.y,
        rotation: instance.cursor.rotation,
        type: instance.cursor.type
      },
      lastActivityTimestamp: pointer.lastActivityTimestamp,
      screenBounds: instance.screenBounds,
      chatMessage: instance.chatMessage,
      meta: {}
    });
  });
};
export {
  createPresenceStateDerivation
};
//# sourceMappingURL=createPresenceStateDerivation.mjs.map
