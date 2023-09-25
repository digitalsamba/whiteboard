import { BaseRecord, RecordId } from '@tldraw/store';
import { JsonObject } from '@tldraw/utils';
import { T } from '@tldraw/validate';
/**
 * A camera record.
 *
 * @public
 */
export interface TLCamera extends BaseRecord<'camera', TLCameraId> {
    x: number;
    y: number;
    z: number;
    meta: JsonObject;
}
/**
 * The id of a camera record.
 *
 * @public */
export type TLCameraId = RecordId<TLCamera>;
/** @internal */
export declare const cameraValidator: T.Validator<TLCamera>;
/** @internal */
export declare const cameraVersions: {
    AddMeta: number;
};
/** @internal */
export declare const cameraMigrations: import("@tldraw/store").Migrations;
/** @public */
export declare const CameraRecordType: import("@tldraw/store").RecordType<TLCamera, never>;
//# sourceMappingURL=TLCamera.d.ts.map