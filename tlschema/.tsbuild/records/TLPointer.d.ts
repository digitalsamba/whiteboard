import { BaseRecord, RecordId } from '@tldraw/store';
import { JsonObject } from '@tldraw/utils';
import { T } from '@tldraw/validate';
/**
 * TLPointer
 *
 * @public
 */
export interface TLPointer extends BaseRecord<'pointer', TLPointerId> {
    x: number;
    y: number;
    lastActivityTimestamp: number;
    meta: JsonObject;
}
/** @public */
export type TLPointerId = RecordId<TLPointer>;
/** @internal */
export declare const pointerValidator: T.Validator<TLPointer>;
/** @internal */
export declare const pointerVersions: {
    AddMeta: number;
};
/** @internal */
export declare const pointerMigrations: import("@tldraw/store").Migrations;
/** @public */
export declare const PointerRecordType: import("@tldraw/store").RecordType<TLPointer, never>;
/** @public */
export declare const TLPOINTER_ID: TLPointerId;
//# sourceMappingURL=TLPointer.d.ts.map