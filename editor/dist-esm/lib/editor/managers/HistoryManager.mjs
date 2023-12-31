import { atom, transact } from "@tldraw/state";
import { devFreeze } from "@tldraw/store";
import { uniqueId } from "../../utils/uniqueId.mjs";
import { stack } from "./Stack.mjs";
class HistoryManager {
  // A flag for whether the user is in a batch operation
  constructor(ctx, annotateError) {
    this.ctx = ctx;
    this.annotateError = annotateError;
  }
  _undos = atom("HistoryManager.undos", stack());
  // Updated by each action that includes and undo
  _redos = atom("HistoryManager.redos", stack());
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
              id: uniqueId(),
              data: devFreeze(handle.squash(prev.data, data))
            })
          );
        } else {
          this._undos.update(
            (undos) => undos.push({
              type: "command",
              name,
              data: devFreeze(data),
              id: uniqueId(),
              preservesRedoStack
            })
          );
        }
        if (!result.preservesRedoStack) {
          this._redos.set(stack());
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
        transact(() => {
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
    this._undos.set(stack());
    this._redos.set(stack());
    try {
      ;
      ({ undos, redos } = transact(() => fn(undos, redos)));
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
  mark = (id = uniqueId(), onUndo = true, onRedo = true) => {
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
    this._undos.set(stack());
    this._redos.set(stack());
  }
}
export {
  HistoryManager
};
//# sourceMappingURL=HistoryManager.mjs.map
