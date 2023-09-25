import { ShapeProps, TLBaseShape } from './TLBaseShape';
/** @public */
export type TLGroupShapeProps = {
    [key in never]: undefined;
};
/** @public */
export type TLGroupShape = TLBaseShape<'group', TLGroupShapeProps>;
/** @internal */
export declare const groupShapeProps: ShapeProps<TLGroupShape>;
/** @internal */
export declare const groupShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLGroupShape.d.ts.map