import { Box2dModel } from '@tldraw/tlschema';
import { ComponentType } from 'react';
/** @public */
export type TLBrushComponent = ComponentType<{
    brush: Box2dModel;
    color?: string;
    opacity?: number;
    className?: string;
}>;
/** @public */
export declare const DefaultBrush: TLBrushComponent;
//# sourceMappingURL=DefaultBrush.d.ts.map