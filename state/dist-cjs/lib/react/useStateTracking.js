"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useStateTracking_exports = {};
__export(useStateTracking_exports, {
  useStateTracking: () => useStateTracking
});
module.exports = __toCommonJS(useStateTracking_exports);
var import_react = __toESM(require("react"));
var import_core = require("../core");
function useStateTracking(name, render) {
  const renderRef = import_react.default.useRef(render);
  renderRef.current = render;
  const [scheduler, subscribe, getSnapshot] = import_react.default.useMemo(() => {
    let scheduleUpdate = null;
    const subscribe2 = (cb) => {
      scheduleUpdate = cb;
      return () => {
        scheduleUpdate = null;
      };
    };
    const scheduler2 = new import_core.EffectScheduler(
      `useStateTracking(${name})`,
      // this is what `scheduler.execute()` will call
      () => renderRef.current?.(),
      // this is what will be invoked when @tldraw/state detects a change in an upstream reactive value
      {
        scheduleEffect() {
          scheduleUpdate?.();
        }
      }
    );
    const getSnapshot2 = () => scheduler2.scheduleCount;
    return [scheduler2, subscribe2, getSnapshot2];
  }, [name]);
  import_react.default.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  import_react.default.useEffect(() => {
    scheduler.attach();
    scheduler.maybeScheduleEffect();
    return () => {
      scheduler.detach();
    };
  }, [scheduler]);
  return scheduler.execute();
}
//# sourceMappingURL=useStateTracking.js.map
