import { TLShape, TLShapeId } from '@tldraw/tlschema';
import * as React from 'react';
import { ShapeUtil } from '../editor/shapes/ShapeUtil';
export declare const Shape: React.MemoExoticComponent<({ id, shape, util, index, backgroundIndex, opacity, isCulled, }: {
    id: TLShapeId;
    shape: TLShape;
    util: ShapeUtil;
    index: number;
    backgroundIndex: number;
    opacity: number;
    isCulled: boolean;
}) => JSX.Element | null>;
//# sourceMappingURL=Shape.d.ts.map