import { Atom } from '@tldraw/state';
import { IdOf, RecordId, UnknownRecord } from './BaseRecord';
import { RecordScope } from './RecordType';
import { StoreQueries } from './StoreQueries';
import { SerializedSchema, StoreSchema } from './StoreSchema';
type RecFromId<K extends RecordId<UnknownRecord>> = K extends RecordId<infer R> ? R : never;
/**
 * A diff describing the changes to a record.
 *
 * @public
 */
export type RecordsDiff<R extends UnknownRecord> = {
    added: Record<IdOf<R>, R>;
    updated: Record<IdOf<R>, [from: R, to: R]>;
    removed: Record<IdOf<R>, R>;
};
/**
 * A diff describing the changes to a collection.
 *
 * @public
 */
export type CollectionDiff<T> = {
    added?: Set<T>;
    removed?: Set<T>;
};
export type ChangeSource = 'remote' | 'user';
export type StoreListenerFilters = {
    source: 'all' | ChangeSource;
    scope: 'all' | RecordScope;
};
/**
 * An entry containing changes that originated either by user actions or remote changes.
 *
 * @public
 */
export type HistoryEntry<R extends UnknownRecord = UnknownRecord> = {
    changes: RecordsDiff<R>;
    source: ChangeSource;
};
/**
 * A function that will be called when the history changes.
 *
 * @public
 */
export type StoreListener<R extends UnknownRecord> = (entry: HistoryEntry<R>) => void;
/**
 * A record store is a collection of records of different types.
 *
 * @public
 */
export type ComputedCache<Data, R extends UnknownRecord> = {
    get(id: IdOf<R>): Data | undefined;
};
/**
 * A serialized snapshot of the record store's values.
 *
 * @public
 */
export type SerializedStore<R extends UnknownRecord> = Record<IdOf<R>, R>;
/** @public */
export type StoreSnapshot<R extends UnknownRecord> = {
    store: SerializedStore<R>;
    schema: SerializedSchema;
};
/** @public */
export type StoreValidator<R extends UnknownRecord> = {
    validate: (record: unknown) => R;
};
/** @public */
export type StoreValidators<R extends UnknownRecord> = {
    [K in R['typeName']]: StoreValidator<Extract<R, {
        typeName: K;
    }>>;
};
/** @public */
export type StoreError = {
    error: Error;
    phase: 'createRecord' | 'initialize' | 'tests' | 'updateRecord';
    recordBefore?: unknown;
    recordAfter: unknown;
    isExistingValidationIssue: boolean;
};
/** @internal */
export type StoreRecord<S extends Store<any>> = S extends Store<infer R> ? R : never;
/**
 * A store of records.
 *
 * @public
 */
export declare class Store<R extends UnknownRecord = UnknownRecord, Props = unknown> {
    /**
     * The random id of the store.
     */
    readonly id: string;
    /**
     * An atom containing the store's atoms.
     *
     * @internal
     * @readonly
     */
    private readonly atoms;
    /**
     * An atom containing the store's history.
     *
     * @public
     * @readonly
     */
    readonly history: Atom<number, RecordsDiff<R>>;
    /**
     * A StoreQueries instance for this store.
     *
     * @public
     * @readonly
     */
    readonly query: StoreQueries<R>;
    /**
     * A set containing listeners that have been added to this store.
     *
     * @internal
     */
    private listeners;
    /**
     * An array of history entries that have not yet been flushed.
     *
     * @internal
     */
    private historyAccumulator;
    /**
     * A reactor that responds to changes to the history by squashing the accumulated history and
     * notifying listeners of the changes.
     *
     * @internal
     */
    private historyReactor;
    readonly schema: StoreSchema<R, Props>;
    readonly props: Props;
    readonly scopedTypes: {
        readonly [K in RecordScope]: ReadonlySet<R['typeName']>;
    };
    constructor(config: {
        /** The store's initial data. */
        initialData?: SerializedStore<R>;
        /**
         * A map of validators for each record type. A record's validator will be called when the record
         * is created or updated. It should throw an error if the record is invalid.
         */
        schema: StoreSchema<R, Props>;
        props: Props;
    });
    _flushHistory(): void;
    /**
     * Filters out non-document changes from a diff. Returns null if there are no changes left.
     * @param change - the records diff
     * @returns
     */
    filterChangesByScope(change: RecordsDiff<R>, scope: RecordScope): {
        added: { [K in IdOf<R>]: R; };
        updated: { [K_1 in IdOf<R>]: [from: R, to: R]; };
        removed: { [K in IdOf<R>]: R; };
    } | null;
    /**
     * Update the history with a diff of changes.
     *
     * @param changes - The changes to add to the history.
     */
    private updateHistory;
    validate(phase: 'createRecord' | 'initialize' | 'tests' | 'updateRecord'): void;
    /**
     * A callback fired after each record's change.
     *
     * @param prev - The previous value, if any.
     * @param next - The next value.
     */
    onBeforeCreate?: (next: R, source: 'remote' | 'user') => R;
    /**
     * A callback fired after a record is created. Use this to perform related updates to other
     * records in the store.
     *
     * @param record - The record to be created
     */
    onAfterCreate?: (record: R, source: 'remote' | 'user') => void;
    /**
     * A callback before after each record's change.
     *
     * @param prev - The previous value, if any.
     * @param next - The next value.
     */
    onBeforeChange?: (prev: R, next: R, source: 'remote' | 'user') => R;
    /**
     * A callback fired after each record's change.
     *
     * @param prev - The previous value, if any.
     * @param next - The next value.
     */
    onAfterChange?: (prev: R, next: R, source: 'remote' | 'user') => void;
    /**
     * A callback fired before a record is deleted.
     *
     * @param prev - The record that will be deleted.
     */
    onBeforeDelete?: (prev: R, source: 'remote' | 'user') => false | void;
    /**
     * A callback fired after a record is deleted.
     *
     * @param prev - The record that will be deleted.
     */
    onAfterDelete?: (prev: R, source: 'remote' | 'user') => void;
    private _runCallbacks;
    /**
     * Add some records to the store. It's an error if they already exist.
     *
     * @param records - The records to add.
     * @public
     */
    put: (records: R[], phaseOverride?: 'initialize') => void;
    /**
     * Remove some records from the store via their ids.
     *
     * @param ids - The ids of the records to remove.
     * @public
     */
    remove: (ids: IdOf<R>[]) => void;
    /**
     * Get the value of a store record by its id.
     *
     * @param id - The id of the record to get.
     * @public
     */
    get: <K extends IdOf<R>>(id: K) => RecFromId<K> | undefined;
    /**
     * Get the value of a store record by its id without updating its epoch.
     *
     * @param id - The id of the record to get.
     * @public
     */
    unsafeGetWithoutCapture: <K extends IdOf<R>>(id: K) => RecFromId<K> | undefined;
    /**
     * Creates a JSON payload from the record store.
     *
     * @param scope - The scope of records to serialize. Defaults to 'document'.
     * @returns The record store snapshot as a JSON payload.
     */
    serialize: (scope?: 'all' | RecordScope) => SerializedStore<R>;
    /**
     * Get a serialized snapshot of the store and its schema.
     *
     * ```ts
     * const snapshot = store.getSnapshot()
     * store.loadSnapshot(snapshot)
     * ```
     *
     * @param scope - The scope of records to serialize. Defaults to 'document'.
     *
     * @public
     */
    getSnapshot(scope?: 'all' | RecordScope): StoreSnapshot<R>;
    /**
     * Migrate a serialized snapshot of the store and its schema.
     *
     * ```ts
     * const snapshot = store.getSnapshot()
     * store.migrateSnapshot(snapshot)
     * ```
     *
     * @param snapshot - The snapshot to load.
     * @public
     */
    migrateSnapshot(snapshot: StoreSnapshot<R>): StoreSnapshot<R>;
    /**
     * Load a serialized snapshot.
     *
     * ```ts
     * const snapshot = store.getSnapshot()
     * store.loadSnapshot(snapshot)
     * ```
     *
     * @param snapshot - The snapshot to load.
     * @public
     */
    loadSnapshot(snapshot: StoreSnapshot<R>): void;
    /**
     * Get an array of all values in the store.
     *
     * @returns An array of all values in the store.
     * @public
     */
    allRecords: () => R[];
    /**
     * Removes all records from the store.
     *
     * @public
     */
    clear: () => void;
    /**
     * Update a record. To update multiple records at once, use the `update` method of the
     * `TypedStore` class.
     *
     * @param id - The id of the record to update.
     * @param updater - A function that updates the record.
     */
    update: <K extends IdOf<R>>(id: K, updater: (record: RecFromId<K>) => RecFromId<K>) => void;
    /**
     * Get whether the record store has a id.
     *
     * @param id - The id of the record to check.
     * @public
     */
    has: <K extends IdOf<R>>(id: K) => boolean;
    /**
     * Add a new listener to the store.
     *
     * @param onHistory - The listener to call when the store updates.
     * @param filters - Filters to apply to the listener.
     * @returns A function to remove the listener.
     */
    listen: (onHistory: StoreListener<R>, filters?: Partial<StoreListenerFilters>) => () => void;
    private isMergingRemoteChanges;
    /**
     * Merge changes from a remote source without triggering listeners.
     *
     * @param fn - A function that merges the external changes.
     * @public
     */
    mergeRemoteChanges: (fn: () => void) => void;
    extractingChanges(fn: () => void): RecordsDiff<R>;
    applyDiff(diff: RecordsDiff<R>, runCallbacks?: boolean): void;
    /**
     * Create a computed cache.
     *
     * @param name - The name of the derivation cache.
     * @param derive - A function used to derive the value of the cache.
     * @public
     */
    createComputedCache: <T, V extends R = R>(name: string, derive: (record: V) => T | undefined, isEqual?: ((a: V, b: V) => boolean) | undefined) => ComputedCache<T, V>;
    /**
     * Create a computed cache from a selector
     *
     * @param name - The name of the derivation cache.
     * @param selector - A function that returns a subset of the original shape
     * @param derive - A function used to derive the value of the cache.
     * @public
     */
    createSelectedComputedCache: <T, J, V extends R = R>(name: string, selector: (record: V) => T | undefined, derive: (input: T) => J | undefined) => ComputedCache<J, V>;
    getRecordType: <T extends R>(record: R) => T;
    private _integrityChecker?;
    /** @internal */
    ensureStoreIsUsable(): void;
    private _isPossiblyCorrupted;
    /** @internal */
    markAsPossiblyCorrupted(): void;
    /** @internal */
    isPossiblyCorrupted(): boolean;
}
/**
 * Squash a collection of diffs into a single diff.
 *
 * @param diffs - An array of diffs to squash.
 * @returns A single diff that represents the squashed diffs.
 * @public
 */
export declare function squashRecordDiffs<T extends UnknownRecord>(diffs: RecordsDiff<T>[]): RecordsDiff<T>;
/** @public */
export declare function reverseRecordsDiff(diff: RecordsDiff<any>): RecordsDiff<any>;
export {};
//# sourceMappingURL=Store.d.ts.map