import { SerializedStore } from '@tldraw/store';
import { TLRecord } from './records/TLRecord';
/** @internal */
export declare function CLIENT_FIXUP_SCRIPT(persistedStore: SerializedStore<TLRecord>): SerializedStore<TLRecord>;
/** @internal */
export declare function fixupRecord(oldRecord: TLRecord): {
    record: any;
    issues: string[];
};
//# sourceMappingURL=fixup.d.ts.map