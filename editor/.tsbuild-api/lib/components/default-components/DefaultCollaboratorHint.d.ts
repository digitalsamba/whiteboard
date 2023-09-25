import { Vec2dModel } from '@tldraw/tlschema';
import { ComponentType } from 'react';
import { Box2d } from '../../primitives/Box2d';
/** @public */
export type TLCollaboratorHintComponent = ComponentType<{
    className?: string;
    point: Vec2dModel;
    viewport: Box2d;
    zoom: number;
    opacity?: number;
    color: string;
}>;
/** @public */
export declare const DefaultCollaboratorHint: TLCollaboratorHintComponent;
//# sourceMappingURL=DefaultCollaboratorHint.d.ts.map