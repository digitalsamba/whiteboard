import { StoreSnapshot } from '@tldraw/store';
import { TLRecord } from '@tldraw/tlschema';
import { TLStoreOptions } from '../config/createTLStore';
import { TLStoreWithStatus } from '../utils/sync/StoreWithStatus';
/** @internal */
export declare function useLocalStore({ persistenceKey, sessionId, ...rest }: {
    persistenceKey?: string;
    sessionId?: string;
    snapshot?: StoreSnapshot<TLRecord>;
} & TLStoreOptions): TLStoreWithStatus;
//# sourceMappingURL=useLocalStore.d.ts.map