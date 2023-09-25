import { HistoryEntry, SerializedStore, StoreSchema } from '@tldraw/store';
import { TLRecord, TLStore, TLStoreProps } from '@tldraw/tlschema';
import { TLAnyShapeUtilConstructor } from './defaultShapes';
/** @public */
export type TLStoreOptions = {
    initialData?: SerializedStore<TLRecord>;
    defaultName?: string;
} & ({
    shapeUtils?: readonly TLAnyShapeUtilConstructor[];
} | {
    schema?: StoreSchema<TLRecord, TLStoreProps>;
});
/** @public */
export type TLStoreEventInfo = HistoryEntry<TLRecord>;
/**
 * A helper for creating a TLStore. Custom shapes cannot override default shapes.
 *
 * @param opts - Options for creating the store.
 *
 * @public */
export declare function createTLStore({ initialData, defaultName, ...rest }: TLStoreOptions): TLStore;
//# sourceMappingURL=createTLStore.d.ts.map