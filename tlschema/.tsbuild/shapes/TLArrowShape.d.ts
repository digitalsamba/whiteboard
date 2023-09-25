import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const ArrowShapeArrowheadStartStyle: import("../styles/StyleProp").EnumStyleProp<"none" | "arrow" | "triangle" | "square" | "dot" | "pipe" | "diamond" | "inverted" | "bar">;
/** @public */
export declare const ArrowShapeArrowheadEndStyle: import("../styles/StyleProp").EnumStyleProp<"none" | "arrow" | "triangle" | "square" | "dot" | "pipe" | "diamond" | "inverted" | "bar">;
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
    labelColor: import("../styles/StyleProp").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
    color: import("../styles/StyleProp").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
    fill: import("../styles/StyleProp").EnumStyleProp<"none" | "semi" | "solid" | "pattern">;
    dash: import("../styles/StyleProp").EnumStyleProp<"draw" | "solid" | "dashed" | "dotted">;
    size: import("../styles/StyleProp").EnumStyleProp<"m" | "s" | "l" | "xl">;
    arrowheadStart: import("../styles/StyleProp").EnumStyleProp<"none" | "arrow" | "triangle" | "square" | "dot" | "pipe" | "diamond" | "inverted" | "bar">;
    arrowheadEnd: import("../styles/StyleProp").EnumStyleProp<"none" | "arrow" | "triangle" | "square" | "dot" | "pipe" | "diamond" | "inverted" | "bar">;
    font: import("../styles/StyleProp").EnumStyleProp<"draw" | "sans" | "serif" | "mono">;
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