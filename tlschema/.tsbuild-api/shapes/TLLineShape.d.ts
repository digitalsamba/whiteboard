import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const LineShapeSplineStyle: import("../styles/StyleProp").EnumStyleProp<"cubic" | "line">;
/** @public */
export type TLLineShapeSplineStyle = T.TypeOf<typeof LineShapeSplineStyle>;
/** @public */
export declare const lineShapeProps: {
    color: import("../styles/StyleProp").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    dash: import("../styles/StyleProp").EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
    size: import("../styles/StyleProp").EnumStyleProp<"l" | "m" | "s" | "xl">;
    spline: import("../styles/StyleProp").EnumStyleProp<"cubic" | "line">;
    handles: T.DictValidator<string, import("../misc/TLHandle").TLHandle>;
};
/** @public */
export type TLLineShapeProps = ShapePropsType<typeof lineShapeProps>;
/** @public */
export type TLLineShape = TLBaseShape<'line', TLLineShapeProps>;
/** @internal */
export declare const lineShapeVersions: {
    readonly AddSnapHandles: 1;
};
/** @internal */
export declare const lineShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLLineShape.d.ts.map