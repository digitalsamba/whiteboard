import { T } from '@tldraw/validate';
import { TLBaseAsset } from './TLBaseAsset';
/**
 * An asset for images such as PNGs and JPEGs, used by the TLImageShape.
 *
 * @public */
export type TLImageAsset = TLBaseAsset<'image', {
    w: number;
    h: number;
    name: string;
    isAnimated: boolean;
    mimeType: null | string;
    src: null | string;
}>;
/** @internal */
export declare const imageAssetValidator: T.Validator<TLImageAsset>;
/** @internal */
export declare const imageAssetMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLImageAsset.d.ts.map