import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const GeoShapeGeoStyle: import("../styles/StyleProp").EnumStyleProp<"rectangle" | "triangle" | "diamond" | "cloud" | "ellipse" | "pentagon" | "hexagon" | "octagon" | "star" | "rhombus" | "rhombus-2" | "oval" | "trapezoid" | "arrow-right" | "arrow-left" | "arrow-up" | "arrow-down" | "x-box" | "check-box">;
/** @public */
export type TLGeoShapeGeoStyle = T.TypeOf<typeof GeoShapeGeoStyle>;
/** @public */
export declare const geoShapeProps: {
    geo: import("../styles/StyleProp").EnumStyleProp<"rectangle" | "triangle" | "diamond" | "cloud" | "ellipse" | "pentagon" | "hexagon" | "octagon" | "star" | "rhombus" | "rhombus-2" | "oval" | "trapezoid" | "arrow-right" | "arrow-left" | "arrow-up" | "arrow-down" | "x-box" | "check-box">;
    labelColor: import("../styles/StyleProp").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
    color: import("../styles/StyleProp").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
    fill: import("../styles/StyleProp").EnumStyleProp<"none" | "semi" | "solid" | "pattern">;
    dash: import("../styles/StyleProp").EnumStyleProp<"draw" | "solid" | "dashed" | "dotted">;
    size: import("../styles/StyleProp").EnumStyleProp<"m" | "s" | "l" | "xl">;
    font: import("../styles/StyleProp").EnumStyleProp<"draw" | "sans" | "serif" | "mono">;
    align: import("../styles/StyleProp").EnumStyleProp<"middle" | "start" | "end" | "start-legacy" | "end-legacy" | "middle-legacy">;
    verticalAlign: import("../styles/StyleProp").EnumStyleProp<"middle" | "start" | "end">;
    url: T.Validator<string>;
    w: T.Validator<number>;
    h: T.Validator<number>;
    growY: T.Validator<number>;
    text: T.Validator<string>;
};
/** @public */
export type TLGeoShapeProps = ShapePropsType<typeof geoShapeProps>;
/** @public */
export type TLGeoShape = TLBaseShape<'geo', TLGeoShapeProps>;
declare const Versions: {
    readonly AddUrlProp: 1;
    readonly AddLabelColor: 2;
    readonly RemoveJustify: 3;
    readonly AddCheckBox: 4;
    readonly AddVerticalAlign: 5;
    readonly MigrateLegacyAlign: 6;
    readonly AddCloud: 7;
};
export { Versions as GeoShapeVersions };
/** @internal */
export declare const geoShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLGeoShape.d.ts.map