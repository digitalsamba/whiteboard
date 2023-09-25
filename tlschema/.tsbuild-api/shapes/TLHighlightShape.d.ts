import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const highlightShapeProps: {
    color: import("..").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    size: import("..").EnumStyleProp<"l" | "m" | "s" | "xl">;
    segments: T.ArrayOfValidator<{
        type: "free" | "straight";
        points: import("..").Vec2dModel[];
    }>;
    isComplete: T.Validator<boolean>;
    isPen: T.Validator<boolean>;
};
/** @public */
export type TLHighlightShapeProps = ShapePropsType<typeof highlightShapeProps>;
/** @public */
export type TLHighlightShape = TLBaseShape<'highlight', TLHighlightShapeProps>;
/** @internal */
export declare const highlightShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLHighlightShape.d.ts.map