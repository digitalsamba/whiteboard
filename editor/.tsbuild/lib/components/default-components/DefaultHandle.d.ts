import { TLHandle, TLShapeId } from '@tldraw/tlschema';
import { ComponentType } from 'react';
/** @public */
export type TLHandleComponent = ComponentType<{
    shapeId: TLShapeId;
    handle: TLHandle;
    zoom: number;
    isCoarse: boolean;
    className?: string;
}>;
/** @public */
export declare const DefaultHandle: TLHandleComponent;
//# sourceMappingURL=DefaultHandle.d.ts.map