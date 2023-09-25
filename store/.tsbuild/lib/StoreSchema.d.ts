import { UnknownRecord } from './BaseRecord';
import { RecordType } from './RecordType';
import { SerializedStore, Store, StoreSnapshot } from './Store';
import { MigrationResult, Migrations } from './migrate';
/** @public */
export interface SerializedSchema {
    /** Schema version is the version for this type you're looking at right now */
    schemaVersion: number;
    /**
     * Store version is the version for the structure of the store. e.g. higher level structure like
     * removing or renaming a record type.
     */
    storeVersion: number;
    /** Record versions are the versions for each record type. e.g. adding a new field to a record */
    recordVersions: Record<string, {
        version: number;
    } | {
        version: number;
        subTypeVersions: Record<string, number>;
        subTypeKey: string;
    }>;
}
/** @public */
export type StoreSchemaOptions<R extends UnknownRecord, P> = {
    /** @public */
    snapshotMigrations?: Migrations;
    /** @public */
    onValidationFailure?: (data: {
        error: unknown;
        store: Store<R>;
        record: R;
        phase: 'initialize' | 'createRecord' | 'updateRecord' | 'tests';
        recordBefore: R | null;
    }) => R;
    /** @internal */
    createIntegrityChecker?: (store: Store<R, P>) => void;
};
/** @public */
export declare class StoreSchema<R extends UnknownRecord, P = unknown> {
    readonly types: {
        [Record in R as Record['typeName']]: RecordType<R, any>;
    };
    private readonly options;
    static create<R extends UnknownRecord, P = unknown>(types: {
        [TypeName in R['typeName']]: {
            createId: any;
        };
    }, options?: StoreSchemaOptions<R, P>): StoreSchema<R, P>;
    private constructor();
    get currentStoreVersion(): number;
    validateRecord(store: Store<R>, record: R, phase: 'initialize' | 'createRecord' | 'updateRecord' | 'tests', recordBefore: R | null): R;
    migratePersistedRecord(record: R, persistedSchema: SerializedSchema, direction?: 'up' | 'down'): MigrationResult<R>;
    migrateStoreSnapshot(snapshot: StoreSnapshot<R>): MigrationResult<SerializedStore<R>>;
    /** @internal */
    createIntegrityChecker(store: Store<R, P>): (() => void) | undefined;
    serialize(): SerializedSchema;
    serializeEarliestVersion(): SerializedSchema;
}
//# sourceMappingURL=StoreSchema.d.ts.map