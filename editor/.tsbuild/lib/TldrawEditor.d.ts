import { SerializedStore, StoreSnapshot } from '@tldraw/store';
import { TLRecord, TLStore } from '@tldraw/tlschema';
import React from 'react';
import { TLUser } from './config/createTLUser';
import { TLAnyShapeUtilConstructor } from './config/defaultShapes';
import { Editor } from './editor/Editor';
import { TLStateNodeConstructor } from './editor/tools/StateNode';
import { TLEditorComponents } from './hooks/useEditorComponents';
import { TLStoreWithStatus } from './utils/sync/StoreWithStatus';
/**
 * Props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawEditor} components.
 *
 * @public
 **/
export type TldrawEditorProps = TldrawEditorBaseProps & ({
    store: TLStore | TLStoreWithStatus;
} | {
    store?: undefined;
    snapshot?: StoreSnapshot<TLRecord>;
    initialData?: SerializedStore<TLRecord>;
    persistenceKey?: string;
    sessionId?: string;
    defaultName?: string;
});
/**
 * Base props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawEditor} components.
 *
 * @public
 */
export interface TldrawEditorBaseProps {
    /**
     * The component's children.
     */
    children?: any;
    /**
     * An array of shape utils to use in the editor.
     */
    shapeUtils?: readonly TLAnyShapeUtilConstructor[];
    /**
     * An array of tools to add to the editor's state chart.
     */
    tools?: readonly TLStateNodeConstructor[];
    /**
     * Whether to automatically focus the editor when it mounts.
     */
    autoFocus?: boolean;
    /**
     * Overrides for the editor's components, such as handles, collaborator cursors, etc.
     */
    components?: Partial<TLEditorComponents>;
    /**
     * Called when the editor has mounted.
     */
    onMount?: TLOnMountHandler;
    /**
     * The editor's initial state (usually the id of the first active tool).
     */
    initialState?: string;
    /**
     * A classname to pass to the editor's container.
     */
    className?: string;
    /**
     * The user interacting with the editor.
     */
    user?: TLUser;
}
/**
 * Called when the editor has mounted.
 * @example
 * ```ts
 * <Tldraw onMount={(editor) => editor.selectAll()} />
 * ```
 * @param editor - The editor instance.
 *
 * @public
 */
export type TLOnMountHandler = (editor: Editor) => (() => void) | undefined | void;
declare global {
    interface Window {
        tldrawReady: boolean;
    }
}
/** @public */
export declare const TldrawEditor: React.NamedExoticComponent<TldrawEditorProps>;
/** @public */
export declare function LoadingScreen({ children }: {
    children: any;
}): JSX.Element;
/** @public */
export declare function ErrorScreen({ children }: {
    children: any;
}): JSX.Element;
//# sourceMappingURL=TldrawEditor.d.ts.map