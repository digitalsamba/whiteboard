import { omitFromStackTrace } from "./function.mjs";
const Result = {
  ok(value) {
    return { ok: true, value };
  },
  err(error) {
    return { ok: false, error };
  }
};
function exhaustiveSwitchError(value, property) {
  const debugValue = property && value && typeof value === "object" && property in value ? value[property] : value;
  throw new Error(`Unknown switch case ${debugValue}`);
}
const assert = omitFromStackTrace(
  (value, message) => {
    if (!value) {
      throw new Error(message || "Assertion Error");
    }
  }
);
const assertExists = omitFromStackTrace((value, message) => {
  if (value == null) {
    throw new Error(message ?? "value must be defined");
  }
  return value;
});
function promiseWithResolve() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return Object.assign(promise, {
    resolve,
    reject
  });
}
export {
  Result,
  assert,
  assertExists,
  exhaustiveSwitchError,
  promiseWithResolve
};
//# sourceMappingURL=control.mjs.map
