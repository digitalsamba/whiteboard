import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const textShapeProps: {
    color: import("..").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
    size: import("..").EnumStyleProp<"m" | "s" | "l" | "xl">;
    font: import("..").EnumStyleProp<"draw" | "sans" | "serif" | "mono">;
    align: import("..").EnumStyleProp<"middle" | "start" | "end" | "start-legacy" | "end-legacy" | "middle-legacy">;
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