var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import { computed } from "@tldraw/state";
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
  computed
], UserPreferencesManager.prototype, "userPreferences", 1);
__decorateClass([
  computed
], UserPreferencesManager.prototype, "isDarkMode", 1);
__decorateClass([
  computed
], UserPreferencesManager.prototype, "animationSpeed", 1);
__decorateClass([
  computed
], UserPreferencesManager.prototype, "id", 1);
__decorateClass([
  computed
], UserPreferencesManager.prototype, "name", 1);
__decorateClass([
  computed
], UserPreferencesManager.prototype, "locale", 1);
__decorateClass([
  computed
], UserPreferencesManager.prototype, "color", 1);
__decorateClass([
  computed
], UserPreferencesManager.prototype, "isSnapMode", 1);
export {
  UserPreferencesManager
};
//# sourceMappingURL=UserPreferencesManager.mjs.map
