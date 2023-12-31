import { atom, react } from "@tldraw/state";
const featureFlags = {
  // todo: remove this. it's not used, but we only have one feature flag and i
  // wanted an example :(
  peopleMenu: createFeatureFlag("peopleMenu"),
  highlighterTool: createFeatureFlag("highlighterTool", { all: true })
};
const debugFlags = {
  // --- DEBUG VALUES ---
  preventDefaultLogging: createDebugValue("preventDefaultLogging", {
    defaults: { all: false }
  }),
  pointerCaptureLogging: createDebugValue("pointerCaptureLogging", {
    defaults: { all: false }
  }),
  pointerCaptureTracking: createDebugValue("pointerCaptureTracking", {
    defaults: { all: false }
  }),
  pointerCaptureTrackingObject: createDebugValue(
    "pointerCaptureTrackingObject",
    // ideally we wouldn't store this mutable value in an atom but it's not
    // a big deal for debug values
    {
      defaults: { all: /* @__PURE__ */ new Map() },
      shouldStoreForSession: false
    }
  ),
  elementRemovalLogging: createDebugValue("elementRemovalLogging", {
    defaults: { all: false }
  }),
  debugSvg: createDebugValue("debugSvg", {
    defaults: { all: false }
  }),
  throwToBlob: createDebugValue("throwToBlob", {
    defaults: { all: false }
  }),
  logMessages: createDebugValue("uiLog", { defaults: { all: [] } }),
  resetConnectionEveryPing: createDebugValue("resetConnectionEveryPing", {
    defaults: { all: false }
  }),
  debugCursors: createDebugValue("debugCursors", {
    defaults: { all: false }
  }),
  forceSrgb: createDebugValue("forceSrgbColors", { defaults: { all: false } })
};
if (typeof window !== "undefined") {
  window.tldrawLog = (message) => {
    debugFlags.logMessages.set(debugFlags.logMessages.value.concat(message));
  };
}
if (typeof Element !== "undefined") {
  const nativeElementRemoveChild = Element.prototype.removeChild;
  react("element removal logging", () => {
    if (debugFlags.elementRemovalLogging.value) {
      Element.prototype.removeChild = function(child) {
        console.warn("[tldraw] removing child:", child);
        return nativeElementRemoveChild.call(this, child);
      };
    } else {
      Element.prototype.removeChild = nativeElementRemoveChild;
    }
  });
}
function createDebugValue(name, {
  defaults,
  shouldStoreForSession = true
}) {
  return createDebugValueBase({
    name,
    defaults,
    shouldStoreForSession
  });
}
function createFeatureFlag(name, defaults = { all: true, production: false }) {
  return createDebugValueBase({
    name,
    defaults,
    shouldStoreForSession: true
  });
}
function createDebugValueBase(def) {
  const defaultValue = getDefaultValue(def);
  const storedValue = def.shouldStoreForSession ? getStoredInitialValue(def.name) : null;
  const valueAtom = atom(`debug:${def.name}`, storedValue ?? defaultValue);
  if (typeof window !== "undefined") {
    if (def.shouldStoreForSession) {
      react(`debug:${def.name}`, () => {
        const currentValue = valueAtom.value;
        try {
          if (currentValue === defaultValue) {
            window.sessionStorage.removeItem(`tldraw_debug:${def.name}`);
          } else {
            window.sessionStorage.setItem(`tldraw_debug:${def.name}`, JSON.stringify(currentValue));
          }
        } catch {
        }
      });
    }
    Object.defineProperty(window, `tldraw${def.name.replace(/^[a-z]/, (l) => l.toUpperCase())}`, {
      get() {
        return valueAtom.value;
      },
      set(newValue) {
        valueAtom.set(newValue);
      },
      configurable: true
    });
  }
  return Object.assign(valueAtom, def);
}
function getStoredInitialValue(name) {
  try {
    return JSON.parse(window?.sessionStorage.getItem(`tldraw_debug:${name}`) ?? "null");
  } catch (err) {
    return null;
  }
}
function readEnv(fn) {
  try {
    return fn();
  } catch {
    return null;
  }
}
function getDefaultValue(def) {
  const env = readEnv(() => process.env.TLDRAW_ENV) ?? readEnv(() => process.env.VERCEL_PUBLIC_TLDRAW_ENV) ?? readEnv(() => process.env.NEXT_PUBLIC_TLDRAW_ENV) ?? // default to production because if we don't have one of these, this is probably a library use
  "production";
  switch (env) {
    case "production":
      return def.defaults.production ?? def.defaults.all;
    case "preview":
    case "staging":
      return def.defaults.staging ?? def.defaults.all;
    default:
      return def.defaults.development ?? def.defaults.all;
  }
}
export {
  debugFlags,
  featureFlags
};
//# sourceMappingURL=debug-flags.mjs.map
