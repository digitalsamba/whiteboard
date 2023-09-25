/// <reference types="react" />
import { RecursivePartial } from '@tldraw/editor';
import { TLUiAssetUrls } from './assetUrls';
import { TLUiEventHandler } from './hooks/useEventsProvider';
import { TLUiOverrides } from './overrides';
/**
 * Props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawUi} components.
 *
 * @public
 **/
export interface TldrawUiContextProviderProps {
    /**
     * Urls for where to find fonts and other assets for the UI.
     */
    assetUrls?: RecursivePartial<TLUiAssetUrls>;
    /**
     * Overrides for the UI.
     */
    overrides?: TLUiOverrides | TLUiOverrides[];
    /**
     * Callback for when an event occurs in the UI.
     */
    onUiEvent?: TLUiEventHandler;
    /**
     * The component's children.
     */
    children?: any;
}
/** @public */
export declare function TldrawUiContextProvider({ overrides, assetUrls, onUiEvent, children, }: TldrawUiContextProviderProps): JSX.Element;
//# sourceMappingURL=TldrawUiContextProvider.d.ts.map