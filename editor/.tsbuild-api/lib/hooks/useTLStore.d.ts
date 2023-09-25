import { StoreSnapshot } from '@tldraw/store';
import { TLRecord } from '@tldraw/tlschema';
import { TLStoreOptions } from '../config/createTLStore';
/** @public */
export declare function useTLStore(opts: TLStoreOptions & {
    snapshot?: StoreSnapshot<TLRecord>;
}): import("@tldraw/tlschema").TLStore;
//# sourceMappingURL=useTLStore.d.ts.map