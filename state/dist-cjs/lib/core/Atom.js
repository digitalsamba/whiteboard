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
var Atom_exports = {};
__export(Atom_exports, {
  _Atom: () => _Atom,
  atom: () => atom,
  isAtom: () => isAtom
});
module.exports = __toCommonJS(Atom_exports);
var import_ArraySet = require("./ArraySet");
var import_capture = require("./capture");
var import_helpers = require("./helpers");
var import_HistoryBuffer = require("./HistoryBuffer");
var import_transactions = require("./transactions");
var import_types = require("./types");
class _Atom {
  constructor(name, current, options) {
    this.name = name;
    this.current = current;
    this.isEqual = options?.isEqual ?? null;
    if (!options)
      return;
    if (options.historyLength) {
      this.historyBuffer = new import_HistoryBuffer.HistoryBuffer(options.historyLength);
    }
    this.computeDiff = options.computeDiff;
  }
  isEqual;
  computeDiff;
  lastChangedEpoch = import_transactions.globalEpoch;
  children = new import_ArraySet.ArraySet();
  historyBuffer;
  __unsafe__getWithoutCapture() {
    return this.current;
  }
  get value() {
    (0, import_capture.maybeCaptureParent)(this);
    return this.current;
  }
  set(value, diff) {
    if (this.isEqual?.(this.current, value) ?? (0, import_helpers.equals)(this.current, value)) {
      return this.current;
    }
    (0, import_transactions.advanceGlobalEpoch)();
    if (this.historyBuffer) {
      this.historyBuffer.pushEntry(
        this.lastChangedEpoch,
        import_transactions.globalEpoch,
        diff ?? this.computeDiff?.(this.current, value, this.lastChangedEpoch, import_transactions.globalEpoch) ?? import_types.RESET_VALUE
      );
    }
    this.lastChangedEpoch = import_transactions.globalEpoch;
    const oldValue = this.current;
    this.current = value;
    (0, import_transactions.atomDidChange)(this, oldValue);
    return value;
  }
  update(updater) {
    return this.set(updater(this.current));
  }
  getDiffSince(epoch) {
    (0, import_capture.maybeCaptureParent)(this);
    if (epoch >= this.lastChangedEpoch) {
      return import_helpers.EMPTY_ARRAY;
    }
    return this.historyBuffer?.getChangesSince(epoch) ?? import_types.RESET_VALUE;
  }
}
function atom(name, initialValue, options) {
  return new _Atom(name, initialValue, options);
}
function isAtom(value) {
  return value instanceof _Atom;
}
//# sourceMappingURL=Atom.js.map
