import { TLCommandHandler, TLCommandHistoryOptions, TLHistoryEntry } from '../types/history-types';
import { Stack } from './Stack';
type CommandFn<Data> = (...args: any[]) => ({
    data: Data;
} & TLCommandHistoryOptions) | null | undefined | void;
type ExtractData<Fn> = Fn extends CommandFn<infer Data> ? Data : never;
type ExtractArgs<Fn> = Parameters<Extract<Fn, (...args: any[]) => any>>;
export declare class HistoryManager<CTX extends {
    emit: (name: 'change-history' | 'mark-history', ...args: any) => void;
}> {
    private readonly ctx;
    private readonly annotateError;
    _undos: import("@tldraw/state").Atom<Stack<TLHistoryEntry>, unknown>;
    _redos: import("@tldraw/state").Atom<Stack<TLHistoryEntry>, unknown>;
    _batchDepth: number;
    constructor(ctx: CTX, annotateError: (error: unknown) => void);
    onBatchComplete: () => void;
    private _commands;
    get numUndos(): number;
    get numRedos(): number;
    createCommand: <Name extends string, Constructor extends CommandFn<any>>(name: Name, constructor: Constructor, handle: TLCommandHandler<ExtractData<Constructor>>) => (...args: Parameters<Extract<Constructor, (...args: any[]) => any>>) => CTX;
    batch: (fn: () => void) => this;
    private ignoringUpdates;
    private _undo;
    undo: () => this;
    redo: () => this;
    bail: () => this;
    bailToMark: (id: string) => this;
    mark: (id?: string, onUndo?: boolean, onRedo?: boolean) => string;
    clear(): void;
}
export {};
//# sourceMappingURL=HistoryManager.d.ts.map