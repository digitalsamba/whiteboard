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
var useValue_exports = {};
__export(useValue_exports, {
  useValue: () => useValue
});
module.exports = __toCommonJS(useValue_exports);
var import_react = require("react");
var import_core = require("../core");
function useValue() {
  const args = arguments;
  const deps = args.length === 3 ? args[2] : [args[0]];
  const name = args.length === 3 ? args[0] : `useValue(${args[0].name})`;
  const isInRender = (0, import_react.useRef)(true);
  isInRender.current = true;
  const $val = (0, import_react.useMemo)(() => {
    if (args.length === 1) {
      return args[0];
    }
    return (0, import_core.computed)(name, () => {
      if (isInRender.current) {
        return args[1]();
      } else {
        try {
          return args[1]();
        } catch {
          return {};
        }
      }
    });
  }, deps);
  try {
    const { subscribe, getSnapshot } = (0, import_react.useMemo)(() => {
      return {
        subscribe: (listen) => {
          return (0, import_core.react)(`useValue(${name})`, () => {
            $val.value;
            listen();
          });
        },
        getSnapshot: () => $val.value
      };
    }, [$val]);
    return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
  } finally {
    isInRender.current = false;
  }
}
//# sourceMappingURL=useValue.js.map
