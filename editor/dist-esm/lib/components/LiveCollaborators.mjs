import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { track } from "@tldraw/state";
import { useEffect, useRef, useState } from "react";
import {
  COLLABORATOR_CHECK_INTERVAL,
  COLLABORATOR_IDLE_TIMEOUT,
  COLLABORATOR_INACTIVE_TIMEOUT
} from "../constants.mjs";
import { useEditor } from "../hooks/useEditor.mjs";
import { useEditorComponents } from "../hooks/useEditorComponents.mjs";
import { usePeerIds } from "../hooks/usePeerIds.mjs";
import { usePresence } from "../hooks/usePresence.mjs";
const LiveCollaborators = track(function Collaborators() {
  const peerIds = usePeerIds();
  return /* @__PURE__ */ jsx(Fragment, { children: peerIds.map((id) => /* @__PURE__ */ jsx(CollaboratorGuard, { collaboratorId: id }, id)) });
});
const CollaboratorGuard = track(function CollaboratorGuard2({
  collaboratorId
}) {
  const editor = useEditor();
  const presence = usePresence(collaboratorId);
  const collaboratorState = useCollaboratorState(presence);
  if (!(presence && presence.currentPageId === editor.currentPageId)) {
    return null;
  }
  switch (collaboratorState) {
    case "inactive": {
      const { followingUserId, highlightedUserIds } = editor.instanceState;
      if (!(followingUserId === presence.userId || highlightedUserIds.includes(presence.userId))) {
        return null;
      }
      break;
    }
    case "idle": {
      const { highlightedUserIds } = editor.instanceState;
      if (presence.followingUserId === editor.user.id && !(presence.chatMessage || highlightedUserIds.includes(presence.userId))) {
        return null;
      }
      break;
    }
    case "active": {
      break;
    }
  }
  return /* @__PURE__ */ jsx(Collaborator, { latestPresence: presence });
});
const Collaborator = track(function Collaborator2({
  latestPresence
}) {
  const editor = useEditor();
  const {
    CollaboratorBrush,
    CollaboratorScribble,
    CollaboratorCursor,
    CollaboratorHint,
    CollaboratorShapeIndicator
  } = useEditorComponents();
  const { viewportPageBounds, zoomLevel } = editor;
  const { userId, chatMessage, brush, scribble, selectedShapeIds, userName, cursor, color } = latestPresence;
  const isCursorInViewport = !(cursor.x < viewportPageBounds.minX - 12 / zoomLevel || cursor.y < viewportPageBounds.minY - 16 / zoomLevel || cursor.x > viewportPageBounds.maxX - 12 / zoomLevel || cursor.y > viewportPageBounds.maxY - 16 / zoomLevel);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    brush && CollaboratorBrush ? /* @__PURE__ */ jsx(
      CollaboratorBrush,
      {
        className: "tl-collaborator__brush",
        brush,
        color,
        opacity: 0.1
      },
      userId + "_brush"
    ) : null,
    isCursorInViewport && CollaboratorCursor ? /* @__PURE__ */ jsx(
      CollaboratorCursor,
      {
        className: "tl-collaborator__cursor",
        point: cursor,
        color,
        zoom: zoomLevel,
        name: userName !== "New User" ? userName : null,
        chatMessage
      },
      userId + "_cursor"
    ) : CollaboratorHint ? /* @__PURE__ */ jsx(
      CollaboratorHint,
      {
        className: "tl-collaborator__cursor-hint",
        point: cursor,
        color,
        zoom: zoomLevel,
        viewport: viewportPageBounds
      },
      userId + "_cursor_hint"
    ) : null,
    scribble && CollaboratorScribble ? /* @__PURE__ */ jsx(
      CollaboratorScribble,
      {
        className: "tl-collaborator__scribble",
        scribble,
        color,
        zoom: zoomLevel,
        opacity: scribble.color === "laser" ? 0.5 : 0.1
      },
      userId + "_scribble"
    ) : null,
    CollaboratorShapeIndicator && selectedShapeIds.map((shapeId) => /* @__PURE__ */ jsx(
      CollaboratorShapeIndicator,
      {
        className: "tl-collaborator__shape-indicator",
        id: shapeId,
        color,
        opacity: 0.5
      },
      userId + "_" + shapeId
    ))
  ] });
});
function getStateFromElapsedTime(elapsed) {
  return elapsed > COLLABORATOR_INACTIVE_TIMEOUT ? "inactive" : elapsed > COLLABORATOR_IDLE_TIMEOUT ? "idle" : "active";
}
function useCollaboratorState(latestPresence) {
  const rLastActivityTimestamp = useRef(latestPresence?.lastActivityTimestamp ?? -1);
  const [state, setState] = useState(
    () => getStateFromElapsedTime(Date.now() - rLastActivityTimestamp.current)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setState(getStateFromElapsedTime(Date.now() - rLastActivityTimestamp.current));
    }, COLLABORATOR_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, []);
  if (latestPresence) {
    rLastActivityTimestamp.current = latestPresence.lastActivityTimestamp;
  }
  return state;
}
export {
  LiveCollaborators
};
//# sourceMappingURL=LiveCollaborators.mjs.map
