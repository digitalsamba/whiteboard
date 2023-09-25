import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
export declare const DrawShapeSegment: T.ObjectValidator<{
    type: "free" | "straight";
    points: import("../misc/geometry-types").Vec2dModel[];
}>;
/** @public */
export type TLDrawShapeSegment = T.TypeOf<typeof DrawShapeSegment>;
/** @public */
export declare const drawShapeProps: {
    color: import("..").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
    fill: import("..").EnumStyleProp<"none" | "semi" | "solid" | "pattern">;
    dash: import("..").EnumStyleProp<"draw" | "solid" | "dashed" | "dotted">;
    size: import("..").EnumStyleProp<"m" | "s" | "l" | "xl">;
    segments: T.ArrayOfValidator<{
        type: "free" | "straight";
        points: import("../misc/geometry-types").Vec2dModel[];
    }>;
    isComplete: T.Validator<boolean>;
    isClosed: T.Validator<boolean>;
    isPen: T.Validator<boolean>;
};
/** @public */
export type TLDrawShapeProps = ShapePropsType<typeof drawShapeProps>;
/** @public */
export type TLDrawShape = TLBaseShape<'draw', TLDrawShapeProps>;
/** @internal */
export declare const drawShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLDrawShape.d.ts.map