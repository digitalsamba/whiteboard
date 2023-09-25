import { TLScribble } from '@tldraw/tlschema';
import { ComponentType } from 'react';
/** @public */
export type TLScribbleComponent = ComponentType<{
    scribble: TLScribble;
    zoom: number;
    color?: string;
    opacity?: number;
    className?: string;
}>;
/** @public */
export declare const DefaultScribble: TLScribbleComponent;
//# sourceMappingURL=DefaultScribble.d.ts.map