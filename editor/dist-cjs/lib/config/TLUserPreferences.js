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
var TLUserPreferences_exports = {};
__export(TLUserPreferences_exports, {
  USER_COLORS: () => USER_COLORS,
  getFreshUserPreferences: () => getFreshUserPreferences,
  getUserPreferences: () => getUserPreferences,
  setUserPreferences: () => setUserPreferences
});
module.exports = __toCommonJS(TLUserPreferences_exports);
var import_state = require("@tldraw/state");
var import_store = require("@tldraw/store");
var import_tlschema = require("@tldraw/tlschema");
var import_validate = require("@tldraw/validate");
var import_uniqueId = require("../utils/uniqueId");
const USER_DATA_KEY = "TLDRAW_USER_DATA_v3";
const userTypeValidator = import_validate.T.object({
  id: import_validate.T.string,
  name: import_validate.T.string,
  locale: import_validate.T.string,
  color: import_validate.T.string,
  isDarkMode: import_validate.T.boolean,
  animationSpeed: import_validate.T.number,
  isSnapMode: import_validate.T.boolean
});
const Versions = {
  AddAnimationSpeed: 1,
  AddIsSnapMode: 2
};
const userMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.AddIsSnapMode,
  migrators: {
    [Versions.AddAnimationSpeed]: {
      up: (user) => {
        return {
          ...user,
          animationSpeed: 1
        };
      },
      down: ({ animationSpeed: _, ...user }) => {
        return user;
      }
    },
    [Versions.AddIsSnapMode]: {
      up: (user) => {
        return { ...user, isSnapMode: false };
      },
      down: ({ isSnapMode: _, ...user }) => {
        return user;
      }
    }
  }
});
const USER_COLORS = [
  "#FF802B",
  "#EC5E41",
  "#F2555A",
  "#F04F88",
  "#E34BA9",
  "#BD54C6",
  "#9D5BD2",
  "#7B66DC",
  "#02B1CC",
  "#11B3A3",
  "#39B178",
  "#55B467"
];
function getRandomColor() {
  return USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
}
function getFreshUserPreferences() {
  return {
    id: (0, import_uniqueId.uniqueId)(),
    locale: typeof window !== "undefined" ? (0, import_tlschema.getDefaultTranslationLocale)() : "en",
    name: "New User",
    color: getRandomColor(),
    // TODO: detect dark mode
    isDarkMode: false,
    animationSpeed: 1,
    isSnapMode: false
  };
}
function migrateUserPreferences(userData) {
  if (userData === null || typeof userData !== "object") {
    return getFreshUserPreferences();
  }
  if (!("version" in userData) || !("user" in userData) || typeof userData.version !== "number") {
    return getFreshUserPreferences();
  }
  const migrationResult = (0, import_store.migrate)({
    value: userData.user,
    fromVersion: userData.version,
    toVersion: userMigrations.currentVersion ?? 0,
    migrations: userMigrations
  });
  if (migrationResult.type === "error") {
    return getFreshUserPreferences();
  }
  try {
    userTypeValidator.validate(migrationResult.value);
  } catch (e) {
    return getFreshUserPreferences();
  }
  return migrationResult.value;
}
function loadUserPreferences() {
  const userData = typeof window === "undefined" ? null : JSON.parse(window?.localStorage?.getItem(USER_DATA_KEY) || "null") ?? null;
  return migrateUserPreferences(userData);
}
const globalUserPreferences = (0, import_state.atom)("globalUserData", loadUserPreferences());
function storeUserPreferences() {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(
      USER_DATA_KEY,
      JSON.stringify({
        version: userMigrations.currentVersion,
        user: globalUserPreferences.value
      })
    );
  }
}
function setUserPreferences(user) {
  userTypeValidator.validate(user);
  globalUserPreferences.set(user);
  storeUserPreferences();
  broadcastUserPreferencesChange();
}
const isTest = typeof process !== "undefined" && process.env.NODE_ENV === "test";
const channel = typeof BroadcastChannel !== "undefined" && !isTest ? new BroadcastChannel("tldraw-user-sync") : null;
channel?.addEventListener("message", (e) => {
  const data = e.data;
  if (data?.type === broadcastEventKey && data?.origin !== broadcastOrigin) {
    globalUserPreferences.set(migrateUserPreferences(data.data));
  }
});
const broadcastOrigin = (0, import_uniqueId.uniqueId)();
const broadcastEventKey = "tldraw-user-preferences-change";
function broadcastUserPreferencesChange() {
  channel?.postMessage({
    type: broadcastEventKey,
    origin: broadcastOrigin,
    data: {
      user: globalUserPreferences.value,
      version: userMigrations.currentVersion
    }
  });
}
function getUserPreferences() {
  return globalUserPreferences.value;
}
//# sourceMappingURL=TLUserPreferences.js.map
