import { TLStore } from '@tldraw/tlschema';
/** @public */
export type TLStoreWithStatus = {
    readonly status: 'error';
    readonly store?: undefined;
    readonly error: Error;
} | {
    readonly status: 'loading';
    readonly store?: undefined;
    readonly error?: undefined;
} | {
    readonly status: 'not-synced';
    readonly store: TLStore;
    readonly error?: undefined;
} | {
    readonly status: 'synced-local';
    readonly store: TLStore;
    readonly error?: undefined;
} | {
    readonly status: 'synced-remote';
    readonly connectionStatus: 'offline' | 'online';
    readonly store: TLStore;
    readonly error?: undefined;
};
//# sourceMappingURL=StoreWithStatus.d.ts.map