import { Editor } from '../Editor';
export declare class EnvironmentManager {
    editor: Editor;
    constructor(editor: Editor);
    /**
     * Whether the editor is running in Safari.
     *
     * @public
     */
    readonly isSafari: boolean;
    /**
     * Whether the editor is running on iOS.
     *
     * @public
     */
    readonly isIos: boolean;
    /**
     * Whether the editor is running on iOS.
     *
     * @public
     */
    readonly isChromeForIos: boolean;
    /**
     * Whether the editor is running on Firefox.
     *
     * @public
     */
    readonly isFirefox: boolean;
    /**
     * Whether the editor is running on Android.
     *
     * @public
     */
    readonly isAndroid: boolean;
}
//# sourceMappingURL=EnvironmentManager.d.ts.map