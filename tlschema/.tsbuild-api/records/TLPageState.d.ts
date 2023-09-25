import { BaseRecord, RecordId } from '@tldraw/store';
import { JsonObject } from '@tldraw/utils';
import { T } from '@tldraw/validate';
import { TLPage } from './TLPage';
import { TLShapeId } from './TLShape';
/**
 * TLInstancePageState
 *
 * State that is unique to a particular page of the document in a particular browser tab
 *
 * @public
 */
export interface TLInstancePageState extends BaseRecord<'instance_page_state', TLInstancePageStateId> {
    pageId: RecordId<TLPage>;
    selectedShapeIds: TLShapeId[];
    hintingShapeIds: TLShapeId[];
    erasingShapeIds: TLShapeId[];
    hoveredShapeId: null | TLShapeId;
    editingShapeId: null | TLShapeId;
    croppingShapeId: null | TLShapeId;
    focusedGroupId: null | TLShapeId;
    meta: JsonObject;
}
/** @internal */
export declare const instancePageStateValidator: T.Validator<TLInstancePageState>;
/** @internal */
export declare const instancePageStateVersions: {
    readonly AddCroppingId: 1;
    readonly RemoveInstanceIdAndCameraId: 2;
    readonly AddMeta: 3;
    readonly RenameProperties: 4;
};
/** @public */
export declare const instancePageStateMigrations: import("@tldraw/store").Migrations;
/** @public */
export declare const InstancePageStateRecordType: import("@tldraw/store").RecordType<TLInstancePageState, "pageId">;
/** @public */
export type TLInstancePageStateId = RecordId<TLInstancePageState>;
//# sourceMappingURL=TLPageState.d.ts.map