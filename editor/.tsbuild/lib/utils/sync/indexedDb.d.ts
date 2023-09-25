import { RecordsDiff, SerializedSchema, SerializedStore } from '@tldraw/store';
import { TLRecord, TLStoreSchema } from '@tldraw/tlschema';
import { TLSessionStateSnapshot } from '../../config/TLSessionStateSnapshot';
type LoadResult = {
    records: TLRecord[];
    schema?: SerializedSchema;
    sessionStateSnapshot?: TLSessionStateSnapshot | null;
};
/** @internal */
export declare function loadDataFromStore({ persistenceKey, sessionId, didCancel, }: {
    persistenceKey: string;
    sessionId?: string;
    didCancel?: () => boolean;
}): Promise<undefined | LoadResult>;
/** @internal */
export declare function storeChangesInIndexedDb({ persistenceKey, schema, changes, sessionId, sessionStateSnapshot, didCancel, }: {
    persistenceKey: string;
    schema: TLStoreSchema;
    changes: RecordsDiff<any>;
    sessionId?: string | null;
    sessionStateSnapshot?: TLSessionStateSnapshot | null;
    didCancel?: () => boolean;
}): Promise<void>;
/** @internal */
export declare function storeSnapshotInIndexedDb({ persistenceKey, schema, snapshot, sessionId, sessionStateSnapshot, didCancel, }: {
    persistenceKey: string;
    schema: TLStoreSchema;
    snapshot: SerializedStore<any>;
    sessionId?: string | null;
    sessionStateSnapshot?: TLSessionStateSnapshot | null;
    didCancel?: () => boolean;
}): Promise<void>;
/** @internal */
export declare function getAllIndexDbNames(): string[];
export {};
//# sourceMappingURL=indexedDb.d.ts.map