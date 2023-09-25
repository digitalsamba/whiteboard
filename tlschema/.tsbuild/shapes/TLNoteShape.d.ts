import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const noteShapeProps: {
    color: import("..").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
    size: import("..").EnumStyleProp<"m" | "s" | "l" | "xl">;
    font: import("..").EnumStyleProp<"draw" | "sans" | "serif" | "mono">;
    align: import("..").EnumStyleProp<"middle" | "start" | "end" | "start-legacy" | "end-legacy" | "middle-legacy">;
    verticalAlign: import("..").EnumStyleProp<"middle" | "start" | "end">;
    growY: T.Validator<number>;
    url: T.Validator<string>;
    text: T.Validator<string>;
};
/** @public */
export type TLNoteShapeProps = ShapePropsType<typeof noteShapeProps>;
/** @public */
export type TLNoteShape = TLBaseShape<'note', TLNoteShapeProps>;
/** @internal */
export declare const noteShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLNoteShape.d.ts.map