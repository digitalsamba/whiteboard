import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const ArrowShapeArrowheadStartStyle: import("../styles/StyleProp").EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;
/** @public */
export declare const ArrowShapeArrowheadEndStyle: import("../styles/StyleProp").EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;
/** @public */
export type TLArrowShapeArrowheadStyle = T.TypeOf<typeof ArrowShapeArrowheadStartStyle>;
/** @public */
declare const ArrowShapeTerminal: T.UnionValidator<"type", {
    binding: T.ObjectValidator<{
        type: "binding";
        boundShapeId: import("..").TLShapeId;
        normalizedAnchor: import("../misc/geometry-types").Vec2dModel;
        isExact: boolean;
    }>;
    point: T.ObjectValidator<{
        type: "point";
        x: number;
        y: number;
    }>;
}, never>;
/** @public */
export type TLArrowShapeTerminal = T.TypeOf<typeof ArrowShapeTerminal>;
/** @public */
export declare const arrowShapeProps: {
    labelColor: import("../styles/StyleProp").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    color: import("../styles/StyleProp").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    fill: import("../styles/StyleProp").EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
    dash: import("../styles/StyleProp").EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
    size: import("../styles/StyleProp").EnumStyleProp<"l" | "m" | "s" | "xl">;
    arrowheadStart: import("../styles/StyleProp").EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;
    arrowheadEnd: import("../styles/StyleProp").EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;
    font: import("../styles/StyleProp").EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
    start: T.UnionValidator<"type", {
        binding: T.ObjectValidator<{
            type: "binding";
            boundShapeId: import("..").TLShapeId;
            normalizedAnchor: import("../misc/geometry-types").Vec2dModel;
            isExact: boolean;
        }>;
        point: T.ObjectValidator<{
            type: "point";
            x: number;
            y: number;
        }>;
    }, never>;
    end: T.UnionValidator<"type", {
        binding: T.ObjectValidator<{
            type: "binding";
            boundShapeId: import("..").TLShapeId;
            normalizedAnchor: import("../misc/geometry-types").Vec2dModel;
            isExact: boolean;
        }>;
        point: T.ObjectValidator<{
            type: "point";
            x: number;
            y: number;
        }>;
    }, never>;
    bend: T.Validator<number>;
    text: T.Validator<string>;
};
/** @public */
export type TLArrowShapeProps = ShapePropsType<typeof arrowShapeProps>;
/** @public */
export type TLArrowShape = TLBaseShape<'arrow', TLArrowShapeProps>;
/** @internal */
export declare const arrowShapeMigrations: import("@tldraw/store").Migrations;
export {};
//# sourceMappingURL=TLArrowShape.d.ts.map