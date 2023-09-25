import { SerializedStore, Store, StoreSchema, StoreSchemaOptions, StoreSnapshot } from '@tldraw/store';
import { TLRecord } from './records/TLRecord';
/** @public */
export type TLStoreSchema = StoreSchema<TLRecord, TLStoreProps>;
/** @public */
export type TLSerializedStore = SerializedStore<TLRecord>;
/** @public */
export type TLStoreSnapshot = StoreSnapshot<TLRecord>;
/** @public */
export type TLStoreProps = {
    defaultName: string;
};
/** @public */
export type TLStore = Store<TLRecord, TLStoreProps>;
/** @public */
export declare const onValidationFailure: StoreSchemaOptions<TLRecord, TLStoreProps>['onValidationFailure'];
/** @internal */
export declare function createIntegrityChecker(store: TLStore): () => void;
//# sourceMappingURL=TLStore.d.ts.map