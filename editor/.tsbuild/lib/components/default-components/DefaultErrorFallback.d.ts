import { ComponentType } from 'react';
import { Editor } from '../../editor/Editor';
/** @public */
export type TLErrorFallbackComponent = ComponentType<{
    error: unknown;
    editor?: Editor;
}>;
/** @public */
export declare const DefaultErrorFallback: TLErrorFallbackComponent;
//# sourceMappingURL=DefaultErrorFallback.d.ts.map