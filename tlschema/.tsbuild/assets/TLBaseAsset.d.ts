import { BaseRecord } from '@tldraw/store';
import { JsonObject } from '@tldraw/utils';
import { T } from '@tldraw/validate';
import { TLAssetId } from '../records/TLAsset';
/** @public */
export interface TLBaseAsset<Type extends string, Props> extends BaseRecord<'asset', TLAssetId> {
    type: Type;
    props: Props;
    meta: JsonObject;
}
/**
 * A validator for asset record type Ids.
 *
 * @public */
export declare const assetIdValidator: T.Validator<TLAssetId>;
/**
 * Create a validator for an asset record type.
 *
 * @param type - The type of the asset
 * @param props - The validator for the asset's props
 *
 * @public */
export declare function createAssetValidator<Type extends string, Props extends JsonObject>(type: Type, props: T.Validator<Props>): T.ObjectValidator<{
    id: TLAssetId;
    typeName: 'asset';
    type: Type;
    props: Props;
    meta: JsonObject;
}>;
//# sourceMappingURL=TLBaseAsset.d.ts.map