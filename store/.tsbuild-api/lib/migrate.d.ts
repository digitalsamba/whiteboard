import { UnknownRecord } from './BaseRecord';
import { SerializedSchema } from './StoreSchema';
type EMPTY_SYMBOL = symbol;
/** @public */
export declare function defineMigrations<FirstVersion extends EMPTY_SYMBOL | number = EMPTY_SYMBOL, CurrentVersion extends EMPTY_SYMBOL | Exclude<number, 0> = EMPTY_SYMBOL>(opts: {
    firstVersion?: CurrentVersion extends number ? FirstVersion : never;
    currentVersion?: CurrentVersion;
    migrators?: CurrentVersion extends number ? FirstVersion extends number ? CurrentVersion extends FirstVersion ? {
        [version in Exclude<Range<1, CurrentVersion>, 0>]: Migration;
    } : {
        [version in Exclude<Range<FirstVersion, CurrentVersion>, FirstVersion>]: Migration;
    } : {
        [version in Exclude<Range<1, CurrentVersion>, 0>]: Migration;
    } : never;
    subTypeKey?: string;
    subTypeMigrations?: Record<string, BaseMigrationsInfo>;
}): Migrations;
/** @public */
export type Migration<Before = any, After = any> = {
    up: (oldState: Before) => After;
    down: (newState: After) => Before;
};
interface BaseMigrationsInfo {
    firstVersion: number;
    currentVersion: number;
    migrators: {
        [version: number]: Migration;
    };
}
/** @public */
export interface Migrations extends BaseMigrationsInfo {
    subTypeKey?: string;
    subTypeMigrations?: Record<string, BaseMigrationsInfo>;
}
/** @public */
export type MigrationResult<T> = {
    type: 'error';
    reason: MigrationFailureReason;
} | {
    type: 'success';
    value: T;
};
/** @public */
export declare enum MigrationFailureReason {
    IncompatibleSubtype = "incompatible-subtype",
    UnknownType = "unknown-type",
    TargetVersionTooNew = "target-version-too-new",
    TargetVersionTooOld = "target-version-too-old",
    MigrationError = "migration-error",
    UnrecognizedSubtype = "unrecognized-subtype"
}
/** @public */
export type RecordVersion = {
    rootVersion: number;
    subTypeVersion?: number;
};
/** @public */
export declare function getRecordVersion(record: UnknownRecord, serializedSchema: SerializedSchema): RecordVersion;
/** @public */
export declare function compareRecordVersions(a: RecordVersion, b: RecordVersion): -1 | 0 | 1;
/** @public */
export declare function migrateRecord<R extends UnknownRecord>({ record, migrations, fromVersion, toVersion, }: {
    record: unknown;
    migrations: Migrations;
    fromVersion: number;
    toVersion: number;
}): MigrationResult<R>;
/** @public */
export declare function migrate<T>({ value, migrations, fromVersion, toVersion, }: {
    value: unknown;
    migrations: Migrations;
    fromVersion: number;
    toVersion: number;
}): MigrationResult<T>;
type Range<From extends number, To extends number> = To extends From ? From : Range<From, Decrement<To>> | To;
type Decrement<n extends number> = n extends 0 ? never : n extends 1 ? 0 : n extends 2 ? 1 : n extends 3 ? 2 : n extends 4 ? 3 : n extends 5 ? 4 : n extends 6 ? 5 : n extends 7 ? 6 : n extends 8 ? 7 : n extends 9 ? 8 : n extends 10 ? 9 : n extends 11 ? 10 : n extends 12 ? 11 : n extends 13 ? 12 : n extends 14 ? 13 : n extends 15 ? 14 : n extends 16 ? 15 : n extends 17 ? 16 : n extends 18 ? 17 : n extends 19 ? 18 : n extends 20 ? 19 : n extends 21 ? 20 : n extends 22 ? 21 : n extends 23 ? 22 : n extends 24 ? 23 : n extends 25 ? 24 : n extends 26 ? 25 : n extends 27 ? 26 : n extends 28 ? 27 : n extends 29 ? 28 : n extends 30 ? 29 : n extends 31 ? 30 : n extends 32 ? 31 : n extends 33 ? 32 : n extends 34 ? 33 : n extends 35 ? 34 : n extends 36 ? 35 : n extends 37 ? 36 : n extends 38 ? 37 : n extends 39 ? 38 : n extends 40 ? 39 : n extends 41 ? 40 : n extends 42 ? 41 : n extends 43 ? 42 : n extends 44 ? 43 : n extends 45 ? 44 : n extends 46 ? 45 : n extends 47 ? 46 : n extends 48 ? 47 : n extends 49 ? 48 : n extends 50 ? 49 : n extends 51 ? 50 : never;
export {};
//# sourceMappingURL=migrate.d.ts.map