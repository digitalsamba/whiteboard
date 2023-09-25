import { HistoryEntry } from '@tldraw/store';
import { TLPageId, TLRecord } from '@tldraw/tlschema';
import { TLEventInfo } from './event-types';
/** @public */
export interface TLEventMap {
    mount: [];
    'max-shapes': [{
        name: string;
        pageId: TLPageId;
        count: number;
    }];
    change: [HistoryEntry<TLRecord>];
    update: [];
    crash: [{
        error: unknown;
    }];
    'stop-camera-animation': [];
    'stop-following': [];
    event: [TLEventInfo];
    tick: [number];
    frame: [number];
    'change-history': [{
        reason: 'bail';
        markId?: string;
    } | {
        reason: 'push' | 'redo' | 'undo';
    }];
    'mark-history': [{
        id: string;
    }];
}
/** @public */
export type TLEventMapHandler<T extends keyof TLEventMap> = (...args: TLEventMap[T]) => void;
//# sourceMappingURL=emit-types.d.ts.map