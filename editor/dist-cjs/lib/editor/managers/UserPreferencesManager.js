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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var UserPreferencesManager_exports = {};
__export(UserPreferencesManager_exports, {
  UserPreferencesManager: () => UserPreferencesManager
});
module.exports = __toCommonJS(UserPreferencesManager_exports);
var import_state = require("@tldraw/state");
class UserPreferencesManager {
  constructor(user) {
    this.user = user;
  }
  updateUserPreferences = (userPreferences) => {
    this.user.setUserPreferences({
      ...this.userPreferences,
      ...userPreferences
    });
  };
  get userPreferences() {
    return this.user.userPreferences.value;
  }
  get isDarkMode() {
    return this.userPreferences.isDarkMode;
  }
  get animationSpeed() {
    return this.userPreferences.animationSpeed;
  }
  get id() {
    return this.userPreferences.id;
  }
  get name() {
    return this.userPreferences.name;
  }
  get locale() {
    return this.userPreferences.locale;
  }
  get color() {
    return this.userPreferences.color;
  }
  get isSnapMode() {
    return this.userPreferences.isSnapMode;
  }
}
__decorateClass([
  import_state.computed
], UserPreferencesManager.prototype, "userPreferences", 1);
__decorateClass([
  import_state.computed
], UserPreferencesManager.prototype, "isDarkMode", 1);
__decorateClass([
  import_state.computed
], UserPreferencesManager.prototype, "animationSpeed", 1);
__decorateClass([
  import_state.computed
], UserPreferencesManager.prototype, "id", 1);
__decorateClass([
  import_state.computed
], UserPreferencesManager.prototype, "name", 1);
__decorateClass([
  import_state.computed
], UserPreferencesManager.prototype, "locale", 1);
__decorateClass([
  import_state.computed
], UserPreferencesManager.prototype, "color", 1);
__decorateClass([
  import_state.computed
], UserPreferencesManager.prototype, "isSnapMode", 1);
//# sourceMappingURL=UserPreferencesManager.js.map
