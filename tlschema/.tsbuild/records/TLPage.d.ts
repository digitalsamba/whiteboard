import { BaseRecord, RecordId } from '@tldraw/store';
import { JsonObject } from '@tldraw/utils';
import { T } from '@tldraw/validate';
/**
 * TLPage
 *
 * @public
 */
export interface TLPage extends BaseRecord<'page', TLPageId> {
    name: string;
    index: string;
    meta: JsonObject;
}
/** @public */
export type TLPageId = RecordId<TLPage>;
/** @internal */
export declare const pageIdValidator: T.Validator<TLPageId>;
/** @internal */
export declare const pageValidator: T.Validator<TLPage>;
/** @internal */
export declare const pageVersions: {
    AddMeta: number;
};
/** @internal */
export declare const pageMigrations: import("@tldraw/store").Migrations;
/** @public */
export declare const PageRecordType: import("@tldraw/store").RecordType<TLPage, "name" | "index">;
/** @public */
export declare function isPageId(id: string): id is TLPageId;
//# sourceMappingURL=TLPage.d.ts.map