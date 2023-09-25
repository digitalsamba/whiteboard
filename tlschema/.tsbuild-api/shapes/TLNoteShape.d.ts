import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const noteShapeProps: {
    color: import("..").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    size: import("..").EnumStyleProp<"l" | "m" | "s" | "xl">;
    font: import("..").EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
    align: import("..").EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
    verticalAlign: import("..").EnumStyleProp<"end" | "middle" | "start">;
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