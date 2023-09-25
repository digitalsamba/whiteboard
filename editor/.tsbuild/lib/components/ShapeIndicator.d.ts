import { TLShapeId } from '@tldraw/tlschema';
import * as React from 'react';
import type { Editor } from '../editor/Editor';
export declare const InnerIndicator: ({ editor, id }: {
    editor: Editor;
    id: TLShapeId;
}) => JSX.Element | null;
/** @public */
export type TLShapeIndicatorComponent = React.ComponentType<{
    id: TLShapeId;
    color?: string | undefined;
    opacity?: number;
    className?: string;
}>;
/** @public */
export declare const ShapeIndicator: React.NamedExoticComponent<{
    id: TLShapeId;
    color?: string | undefined;
    opacity?: number | undefined;
    className?: string | undefined;
}>;
//# sourceMappingURL=ShapeIndicator.d.ts.map