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
var HistoryManager_exports = {};
__export(HistoryManager_exports, {
  HistoryManager: () => HistoryManager
});
module.exports = __toCommonJS(HistoryManager_exports);
var import_state = require("@tldraw/state");
var import_store = require("@tldraw/store");
var import_uniqueId = require("../../utils/uniqueId");
var import_Stack = require("./Stack");
class HistoryManager {
  // A flag for whether the user is in a batch operation
  constructor(ctx, annotateError) {
    this.ctx = ctx;
    this.annotateError = annotateError;
  }
  _undos = (0, import_state.atom)("HistoryManager.undos", (0, import_Stack.stack)());
  // Updated by each action that includes and undo
  _redos = (0, import_state.atom)("HistoryManager.redos", (0, import_Stack.stack)());
  // Updated when a user undoes
  _batchDepth = 0;
  onBatchComplete = () => void 0;
  _commands = {};
  get numUndos() {
    return this._undos.value.length;
  }
  get numRedos() {
    return this._redos.value.length;
  }
  createCommand = (name, constructor, handle) => {
    if (this._commands[name]) {
      throw new Error(`Duplicate command: ${name}`);
    }
    this._commands[name] = handle;
    const exec = (...args) => {
      if (!this._batchDepth) {
        this.batch(() => exec(...args));
        return this.ctx;
      }
      const result = constructor(...args);
      if (!result) {
        return this.ctx;
      }
      const { data, ephemeral, squashing, preservesRedoStack } = result;
      this.ignoringUpdates((undos, redos) => {
        handle.do(data);
        return { undos, redos };
      });
      if (!ephemeral) {
        const prev = this._undos.value.head;
        if (squashing && prev && prev.type === "command" && prev.name === name && prev.preservesRedoStack === preservesRedoStack) {
          this._undos.update(
            (undos) => undos.tail.push({
              ...prev,
              id: (0, import_uniqueId.uniqueId)(),
              data: (0, import_store.devFreeze)(handle.squash(prev.data, data))
            })
          );
        } else {
          this._undos.update(
            (undos) => undos.push({
              type: "command",
              name,
              data: (0, import_store.devFreeze)(data),
              id: (0, import_uniqueId.uniqueId)(),
              preservesRedoStack
            })
          );
        }
        if (!result.preservesRedoStack) {
          this._redos.set((0, import_Stack.stack)());
        }
        this.ctx.emit("change-history", { reason: "push" });
      }
      return this.ctx;
    };
    return exec;
  };
  batch = (fn) => {
    try {
      this._batchDepth++;
      if (this._batchDepth === 1) {
        (0, import_state.transact)(() => {
          const mostRecentActionId = this._undos.value.head?.id;
          fn();
          if (mostRecentActionId !== this._undos.value.head?.id) {
            this.onBatchComplete();
          }
        });
      } else {
        fn();
      }
    } catch (error) {
      this.annotateError(error);
      throw error;
    } finally {
      this._batchDepth--;
    }
    return this;
  };
  ignoringUpdates = (fn) => {
    let undos = this._undos.value;
    let redos = this._redos.value;
    this._undos.set((0, import_Stack.stack)());
    this._redos.set((0, import_Stack.stack)());
    try {
      ;
      ({ undos, redos } = (0, import_state.transact)(() => fn(undos, redos)));
    } finally {
      this._undos.set(undos);
      this._redos.set(redos);
    }
  };
  // History
  _undo = ({
    pushToRedoStack,
    toMark = void 0
  }) => {
    this.ignoringUpdates((undos, redos) => {
      if (undos.length === 0) {
        return { undos, redos };
      }
      while (undos.head?.type === "STOP") {
        const mark = undos.head;
        undos = undos.tail;
        if (pushToRedoStack) {
          redos = redos.push(mark);
        }
        if (mark.id === toMark) {
          this.ctx.emit(
            "change-history",
            pushToRedoStack ? { reason: "undo" } : { reason: "bail", markId: toMark }
          );
          return { undos, redos };
        }
      }
      if (undos.length === 0) {
        this.ctx.emit(
          "change-history",
          pushToRedoStack ? { reason: "undo" } : { reason: "bail", markId: toMark }
        );
        return { undos, redos };
      }
      while (undos.head) {
        const command = undos.head;
        undos = undos.tail;
        if (pushToRedoStack) {
          redos = redos.push(command);
        }
        if (command.type === "STOP") {
          if (command.onUndo && (!toMark || command.id === toMark)) {
            this.ctx.emit(
              "change-history",
              pushToRedoStack ? { reason: "undo" } : { reason: "bail", markId: toMark }
            );
            return { undos, redos };
          }
        } else {
          const handler = this._commands[command.name];
          handler.undo(command.data);
        }
      }
      this.ctx.emit(
        "change-history",
        pushToRedoStack ? { reason: "undo" } : { reason: "bail", markId: toMark }
      );
      return { undos, redos };
    });
    return this;
  };
  undo = () => {
    this._undo({ pushToRedoStack: true });
    return this;
  };
  redo = () => {
    this.ignoringUpdates((undos, redos) => {
      if (redos.length === 0) {
        return { undos, redos };
      }
      while (redos.head?.type === "STOP") {
        undos = undos.push(redos.head);
        redos = redos.tail;
      }
      if (redos.length === 0) {
        this.ctx.emit("change-history", { reason: "redo" });
        return { undos, redos };
      }
      while (redos.head) {
        const command = redos.head;
        undos = undos.push(redos.head);
        redos = redos.tail;
        if (command.type === "STOP") {
          if (command.onRedo) {
            break;
          }
        } else {
          const handler = this._commands[command.name];
          if (handler.redo) {
            handler.redo(command.data);
          } else {
            handler.do(command.data);
          }
        }
      }
      this.ctx.emit("change-history", { reason: "redo" });
      return { undos, redos };
    });
    return this;
  };
  bail = () => {
    this._undo({ pushToRedoStack: false });
    return this;
  };
  bailToMark = (id) => {
    this._undo({ pushToRedoStack: false, toMark: id });
    return this;
  };
  mark = (id = (0, import_uniqueId.uniqueId)(), onUndo = true, onRedo = true) => {
    const mostRecent = this._undos.value.head;
    if (mostRecent && mostRecent.type === "STOP") {
      if (mostRecent.id === id && mostRecent.onUndo === onUndo && mostRecent.onRedo === onRedo) {
        return mostRecent.id;
      }
    }
    this._undos.update((undos) => undos.push({ type: "STOP", id, onUndo, onRedo }));
    this.ctx.emit("mark-history", { id });
    return id;
  };
  clear() {
    this._undos.set((0, import_Stack.stack)());
    this._redos.set((0, import_Stack.stack)());
  }
}
//# sourceMappingURL=HistoryManager.js.map
