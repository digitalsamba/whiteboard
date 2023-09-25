/// <reference types="react" />
import { TLGroupShape } from '@tldraw/tlschema';
import { Geometry2d } from '../../../primitives/geometry/Geometry2d';
import { ShapeUtil, TLOnChildrenChangeHandler } from '../ShapeUtil';
/** @public */
export declare class GroupShapeUtil extends ShapeUtil<TLGroupShape> {
    static type: "group";
    static props: import("@tldraw/tlschema").ShapeProps<TLGroupShape>;
    static migrations: import("@tldraw/store").Migrations;
    hideSelectionBoundsFg: () => boolean;
    canBind: () => boolean;
    getDefaultProps(): TLGroupShape['props'];
    getGeometry(shape: TLGroupShape): Geometry2d;
    component(shape: TLGroupShape): JSX.Element | null;
    indicator(shape: TLGroupShape): JSX.Element;
    onChildrenChange: TLOnChildrenChangeHandler<TLGroupShape>;
}
//# sourceMappingURL=GroupShapeUtil.d.ts.map