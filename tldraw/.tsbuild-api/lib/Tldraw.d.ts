/// <reference types="react" />
import { RecursivePartial, StoreSnapshot, TLRecord, TLStore, TLStoreWithStatus, TldrawEditorBaseProps } from '@tldraw/editor';
import { TLExternalContentProps } from './defaultExternalContentHandlers';
import { TldrawUiProps } from './ui/TldrawUi';
import { TLEditorAssetUrls } from './utils/assetUrls';
/** @public */
export declare function Tldraw(props: TldrawEditorBaseProps & ({
    store: TLStore | TLStoreWithStatus;
} | {
    store?: undefined;
    persistenceKey?: string;
    sessionId?: string;
    defaultName?: string;
    /**
     * A snapshot to load for the store's initial data / schema.
     */
    snapshot?: StoreSnapshot<TLRecord>;
}) & TldrawUiProps & Partial<TLExternalContentProps> & {
    /**
     * Urls for the editor to find fonts and other assets.
     */
    assetUrls?: RecursivePartial<TLEditorAssetUrls>;
}): JSX.Element;
//# sourceMappingURL=Tldraw.d.ts.map