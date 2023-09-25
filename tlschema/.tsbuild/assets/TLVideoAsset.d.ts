import { T } from '@tldraw/validate';
import { TLBaseAsset } from './TLBaseAsset';
/**
 * An asset used for videos, used by the TLVideoShape.
 *
 * @public */
export type TLVideoAsset = TLBaseAsset<'video', {
    w: number;
    h: number;
    name: string;
    isAnimated: boolean;
    mimeType: string | null;
    src: string | null;
}>;
/** @internal */
export declare const videoAssetValidator: T.Validator<TLVideoAsset>;
/** @internal */
export declare const videoAssetMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLVideoAsset.d.ts.map