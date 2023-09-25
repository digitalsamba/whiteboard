import { EmbedDefinition } from '@tldraw/tlschema';
import { VecLike } from '../../primitives/Vec2d';
import { TLContent } from './clipboard-types';
/** @public */
export type TLExternalContentSource = {
    type: 'error';
    data: null | string;
    reason: string;
} | {
    type: 'excalidraw';
    data: any;
} | {
    type: 'text';
    data: string;
    subtype: 'html' | 'json' | 'text' | 'url';
} | {
    type: 'tldraw';
    data: TLContent;
};
/** @public */
export type TLExternalContent = {
    sources?: TLExternalContentSource[];
    point?: VecLike;
} & ({
    type: 'embed';
    url: string;
    embed: EmbedDefinition;
} | {
    type: 'files';
    files: File[];
    ignoreParent: boolean;
} | {
    type: 'svg-text';
    text: string;
} | {
    type: 'text';
    text: string;
} | {
    type: 'url';
    url: string;
});
/** @public */
export type TLExternalAssetContent = {
    type: 'file';
    file: File;
} | {
    type: 'url';
    url: string;
};
//# sourceMappingURL=external-content.d.ts.map