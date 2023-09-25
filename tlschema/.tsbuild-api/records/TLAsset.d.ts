import { RecordId } from '@tldraw/store';
import { T } from '@tldraw/validate';
import { TLBaseAsset } from '../assets/TLBaseAsset';
import { TLBookmarkAsset } from '../assets/TLBookmarkAsset';
import { TLImageAsset } from '../assets/TLImageAsset';
import { TLVideoAsset } from '../assets/TLVideoAsset';
import { TLShape } from './TLShape';
/** @public */
export type TLAsset = TLBookmarkAsset | TLImageAsset | TLVideoAsset;
/** @internal */
export declare const assetValidator: T.Validator<TLAsset>;
/** @internal */
export declare const assetVersions: {
    AddMeta: number;
};
/** @internal */
export declare const assetMigrations: import("@tldraw/store").Migrations;
/** @public */
export type TLAssetPartial<T extends TLAsset = TLAsset> = T extends T ? {
    id: TLAssetId;
    type: T['type'];
    props?: Partial<T['props']>;
    meta?: Partial<T['meta']>;
} & Partial<Omit<T, 'id' | 'meta' | 'props' | 'type'>> : never;
/** @public */
export declare const AssetRecordType: import("@tldraw/store").RecordType<TLAsset, "props" | "type">;
/** @public */
export type TLAssetId = RecordId<TLBaseAsset<any, any>>;
/** @public */
export type TLAssetShape = Extract<TLShape, {
    props: {
        assetId: TLAssetId;
    };
}>;
//# sourceMappingURL=TLAsset.d.ts.map