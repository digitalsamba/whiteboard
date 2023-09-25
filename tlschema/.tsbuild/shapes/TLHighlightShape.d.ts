import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const highlightShapeProps: {
    color: import("..").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
    size: import("..").EnumStyleProp<"m" | "s" | "l" | "xl">;
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