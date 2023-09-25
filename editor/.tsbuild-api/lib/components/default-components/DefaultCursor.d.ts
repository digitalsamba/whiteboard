import { Vec2dModel } from '@tldraw/tlschema';
import { ComponentType } from 'react';
/** @public */
export type TLCursorComponent = ComponentType<{
    className?: string;
    point: null | Vec2dModel;
    zoom: number;
    color?: string;
    name: null | string;
    chatMessage: string;
}>;
/** @public */
export declare const DefaultCursor: import("react").NamedExoticComponent<{
    className?: string | undefined;
    point: null | Vec2dModel;
    zoom: number;
    color?: string | undefined;
    name: null | string;
    chatMessage: string;
}>;
//# sourceMappingURL=DefaultCursor.d.ts.map