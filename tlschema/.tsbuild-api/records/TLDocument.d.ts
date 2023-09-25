import { BaseRecord, RecordId } from '@tldraw/store';
import { JsonObject } from '@tldraw/utils';
import { T } from '@tldraw/validate';
/**
 * TLDocument
 *
 * @public
 */
export interface TLDocument extends BaseRecord<'document', RecordId<TLDocument>> {
    gridSize: number;
    name: string;
    meta: JsonObject;
}
/** @internal */
export declare const documentValidator: T.Validator<TLDocument>;
/** @internal */
export declare const documentVersions: {
    readonly AddName: 1;
    readonly AddMeta: 2;
};
/** @internal */
export declare const documentMigrations: import("@tldraw/store").Migrations;
/** @public */
export declare const DocumentRecordType: import("@tldraw/store").RecordType<TLDocument, never>;
/** @public */
export declare const TLDOCUMENT_ID: RecordId<TLDocument>;
//# sourceMappingURL=TLDocument.d.ts.map