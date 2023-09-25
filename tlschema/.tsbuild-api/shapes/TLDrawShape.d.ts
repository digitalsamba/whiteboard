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
    color: import("..").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    fill: import("..").EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
    dash: import("..").EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
    size: import("..").EnumStyleProp<"l" | "m" | "s" | "xl">;
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