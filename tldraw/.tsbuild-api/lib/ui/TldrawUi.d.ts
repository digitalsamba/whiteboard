import React, { ReactNode } from 'react';
import { TldrawUiContextProviderProps } from './TldrawUiContextProvider';
/**
 * Props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawUi} components.
 *
 * @public
 */
export type TldrawUiProps = TldrawUiBaseProps & TldrawUiContextProviderProps;
/**
 * Base props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawUi} components.
 *
 * @public
 */
export interface TldrawUiBaseProps {
    /**
     * The component's children.
     */
    children?: ReactNode;
    /**
     * Whether to hide the user interface and only display the canvas.
     */
    hideUi?: boolean;
    /**
     * A component to use for the share zone (will be deprecated)
     */
    shareZone?: ReactNode;
    /**
     * A component to use for the top zone (will be deprecated)
     */
    topZone?: ReactNode;
    /**
     * Additional items to add to the debug menu (will be deprecated)
     */
    renderDebugMenuItems?: () => React.ReactNode;
}
/**
 * @public
 */
export declare const TldrawUi: React.NamedExoticComponent<TldrawUiProps>;
//# sourceMappingURL=TldrawUi.d.ts.map