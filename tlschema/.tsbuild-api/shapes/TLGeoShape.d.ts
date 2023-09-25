import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const GeoShapeGeoStyle: import("../styles/StyleProp").EnumStyleProp<"arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box">;
/** @public */
export type TLGeoShapeGeoStyle = T.TypeOf<typeof GeoShapeGeoStyle>;
/** @public */
export declare const geoShapeProps: {
    geo: import("../styles/StyleProp").EnumStyleProp<"arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box">;
    labelColor: import("../styles/StyleProp").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    color: import("../styles/StyleProp").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    fill: import("../styles/StyleProp").EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
    dash: import("../styles/StyleProp").EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
    size: import("../styles/StyleProp").EnumStyleProp<"l" | "m" | "s" | "xl">;
    font: import("../styles/StyleProp").EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
    align: import("../styles/StyleProp").EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
    verticalAlign: import("../styles/StyleProp").EnumStyleProp<"end" | "middle" | "start">;
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