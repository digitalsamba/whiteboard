import { Signal } from '@tldraw/state';
import { UnknownRecord } from '@tldraw/store';
import { TLPageId, TLShapeId, TLStore } from '@tldraw/tlschema';
/**
 * A string that is unique per browser tab
 * @public
 */
export declare const TAB_ID: string;
export declare const CURRENT_SESSION_STATE_SNAPSHOT_VERSION: 0;
/**
 * The state of the editor instance, not including any document state.
 *
 * @public
 */
export interface TLSessionStateSnapshot {
    version: number;
    currentPageId: TLPageId;
    isFocusMode: boolean;
    exportBackground: boolean;
    isDebugMode: boolean;
    isToolLocked: boolean;
    isGridMode: boolean;
    pageStates: Array<{
        pageId: TLPageId;
        camera: {
            x: number;
            y: number;
            z: number;
        };
        selectedShapeIds: TLShapeId[];
        focusedGroupId: null | TLShapeId;
    }>;
}
/**
 * Creates a signal of the instance state for a given store.
 * @public
 * @param store - The store to create the instance state snapshot signal for
 * @returns
 */
export declare function createSessionStateSnapshotSignal(store: TLStore): Signal<null | TLSessionStateSnapshot>;
/**
 * Loads a snapshot of the editor's instance state into the store of a new editor instance.
 *
 * @public
 * @param store - The store to load the instance state into
 * @param snapshot - The instance state snapshot to load
 * @returns
 */
export declare function loadSessionStateSnapshotIntoStore(store: TLStore, snapshot: TLSessionStateSnapshot): void;
/**
 * @internal
 */
export declare function extractSessionStateFromLegacySnapshot(store: Record<string, UnknownRecord>): null | TLSessionStateSnapshot;
//# sourceMappingURL=TLSessionStateSnapshot.d.ts.map