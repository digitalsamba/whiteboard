import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const textShapeProps: {
    color: import("..").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    size: import("..").EnumStyleProp<"l" | "m" | "s" | "xl">;
    font: import("..").EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
    align: import("..").EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
    w: T.Validator<number>;
    text: T.Validator<string>;
    scale: T.Validator<number>;
    autoSize: T.Validator<boolean>;
};
/** @public */
export type TLTextShapeProps = ShapePropsType<typeof textShapeProps>;
/** @public */
export type TLTextShape = TLBaseShape<'text', TLTextShapeProps>;
/** @internal */
export declare const textShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLTextShape.d.ts.map