import { TLRecord, TLStore } from '@tldraw/tlschema';
/** @public */
export type TLBeforeCreateHandler<R extends TLRecord> = (record: R, source: 'remote' | 'user') => R;
/** @public */
export type TLAfterCreateHandler<R extends TLRecord> = (record: R, source: 'remote' | 'user') => void;
/** @public */
export type TLBeforeChangeHandler<R extends TLRecord> = (prev: R, next: R, source: 'remote' | 'user') => R;
/** @public */
export type TLAfterChangeHandler<R extends TLRecord> = (prev: R, next: R, source: 'remote' | 'user') => void;
/** @public */
export type TLBeforeDeleteHandler<R extends TLRecord> = (record: R, source: 'remote' | 'user') => void | false;
/** @public */
export type TLAfterDeleteHandler<R extends TLRecord> = (record: R, source: 'remote' | 'user') => void;
/** @public */
export type TLBatchCompleteHandler = () => void;
/**
 * The side effect manager (aka a "correct state enforcer") is responsible
 * for making sure that the editor's state is always correct. This includes
 * things like: deleting a shape if its parent is deleted; unbinding
 * arrows when their binding target is deleted; etc.
 *
 * @public
 */
export declare class SideEffectManager<CTX extends {
    store: TLStore;
    history: {
        onBatchComplete: () => void;
    };
}> {
    editor: CTX;
    constructor(editor: CTX);
    private _beforeCreateHandlers;
    private _afterCreateHandlers;
    private _beforeChangeHandlers;
    private _afterChangeHandlers;
    private _beforeDeleteHandlers;
    private _afterDeleteHandlers;
    private _batchCompleteHandlers;
    registerBeforeCreateHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLBeforeCreateHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerAfterCreateHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLAfterCreateHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerBeforeChangeHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLBeforeChangeHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerAfterChangeHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLAfterChangeHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerBeforeDeleteHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLBeforeDeleteHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerAfterDeleteHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLAfterDeleteHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    /**
     * Register a handler to be called when a store completes a batch.
     *
     * @example
     * ```ts
     * let count = 0
     *
     * editor.cleanup.registerBatchCompleteHandler(() => count++)
     *
     * editor.selectAll()
     * expect(count).toBe(1)
     *
     * editor.batch(() => {
     *	editor.selectNone()
     * 	editor.selectAll()
     * })
     *
     * expect(count).toBe(2)
     * ```
     *
     * @param handler - The handler to call
     *
     * @public
     */
    registerBatchCompleteHandler(handler: TLBatchCompleteHandler): () => void;
}
//# sourceMappingURL=SideEffectManager.d.ts.map