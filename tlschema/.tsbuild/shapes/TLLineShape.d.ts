import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const LineShapeSplineStyle: import("../styles/StyleProp").EnumStyleProp<"line" | "cubic">;
/** @public */
export type TLLineShapeSplineStyle = T.TypeOf<typeof LineShapeSplineStyle>;
/** @public */
export declare const lineShapeProps: {
    color: import("../styles/StyleProp").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
    dash: import("../styles/StyleProp").EnumStyleProp<"draw" | "solid" | "dashed" | "dotted">;
    size: import("../styles/StyleProp").EnumStyleProp<"m" | "s" | "l" | "xl">;
    spline: import("../styles/StyleProp").EnumStyleProp<"line" | "cubic">;
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