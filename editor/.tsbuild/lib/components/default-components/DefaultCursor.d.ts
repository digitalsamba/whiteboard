import { Vec2dModel } from '@tldraw/tlschema';
import { ComponentType } from 'react';
/** @public */
export type TLCursorComponent = ComponentType<{
    className?: string;
    point: Vec2dModel | null;
    zoom: number;
    color?: string;
    name: string | null;
    chatMessage: string;
}>;
/** @public */
export declare const DefaultCursor: import("react").NamedExoticComponent<{
    className?: string | undefined;
    point: Vec2dModel | null;
    zoom: number;
    color?: string | undefined;
    name: string | null;
    chatMessage: string;
}>;
//# sourceMappingURL=DefaultCursor.d.ts.map