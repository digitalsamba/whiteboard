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
var LiveCollaborators_exports = {};
__export(LiveCollaborators_exports, {
  LiveCollaborators: () => LiveCollaborators
});
module.exports = __toCommonJS(LiveCollaborators_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_state = require("@tldraw/state");
var import_react = require("react");
var import_constants = require("../constants");
var import_useEditor = require("../hooks/useEditor");
var import_useEditorComponents = require("../hooks/useEditorComponents");
var import_usePeerIds = require("../hooks/usePeerIds");
var import_usePresence = require("../hooks/usePresence");
const LiveCollaborators = (0, import_state.track)(function Collaborators() {
  const peerIds = (0, import_usePeerIds.usePeerIds)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: peerIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollaboratorGuard, { collaboratorId: id }, id)) });
});
const CollaboratorGuard = (0, import_state.track)(function CollaboratorGuard2({
  collaboratorId
}) {
  const editor = (0, import_useEditor.useEditor)();
  const presence = (0, import_usePresence.usePresence)(collaboratorId);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collaborator, { latestPresence: presence });
});
const Collaborator = (0, import_state.track)(function Collaborator2({
  latestPresence
}) {
  const editor = (0, import_useEditor.useEditor)();
  const {
    CollaboratorBrush,
    CollaboratorScribble,
    CollaboratorCursor,
    CollaboratorHint,
    CollaboratorShapeIndicator
  } = (0, import_useEditorComponents.useEditorComponents)();
  const { viewportPageBounds, zoomLevel } = editor;
  const { userId, chatMessage, brush, scribble, selectedShapeIds, userName, cursor, color } = latestPresence;
  const isCursorInViewport = !(cursor.x < viewportPageBounds.minX - 12 / zoomLevel || cursor.y < viewportPageBounds.minY - 16 / zoomLevel || cursor.x > viewportPageBounds.maxX - 12 / zoomLevel || cursor.y > viewportPageBounds.maxY - 16 / zoomLevel);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    brush && CollaboratorBrush ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      CollaboratorBrush,
      {
        className: "tl-collaborator__brush",
        brush,
        color,
        opacity: 0.1
      },
      userId + "_brush"
    ) : null,
    isCursorInViewport && CollaboratorCursor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    ) : CollaboratorHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    scribble && CollaboratorScribble ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    CollaboratorShapeIndicator && selectedShapeIds.map((shapeId) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return elapsed > import_constants.COLLABORATOR_INACTIVE_TIMEOUT ? "inactive" : elapsed > import_constants.COLLABORATOR_IDLE_TIMEOUT ? "idle" : "active";
}
function useCollaboratorState(latestPresence) {
  const rLastActivityTimestamp = (0, import_react.useRef)(latestPresence?.lastActivityTimestamp ?? -1);
  const [state, setState] = (0, import_react.useState)(
    () => getStateFromElapsedTime(Date.now() - rLastActivityTimestamp.current)
  );
  (0, import_react.useEffect)(() => {
    const interval = setInterval(() => {
      setState(getStateFromElapsedTime(Date.now() - rLastActivityTimestamp.current));
    }, import_constants.COLLABORATOR_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, []);
  if (latestPresence) {
    rLastActivityTimestamp.current = latestPresence.lastActivityTimestamp;
  }
  return state;
}
//# sourceMappingURL=LiveCollaborators.js.map
