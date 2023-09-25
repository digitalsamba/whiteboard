import { SerializedSchema } from '@tldraw/store';
import { TLAsset, TLShape, TLShapeId } from '@tldraw/tlschema';
/** @public */
export interface TLContent {
    shapes: TLShape[];
    rootShapeIds: TLShapeId[];
    assets: TLAsset[];
    schema: SerializedSchema;
}
//# sourceMappingURL=clipboard-types.d.ts.map