import { Expand } from '@tldraw/utils';
import { T } from '@tldraw/validate';
declare const colors: readonly ["black", "grey", "light-violet", "violet", "blue", "light-blue", "yellow", "orange", "green", "light-green", "light-red", "red"];
/** @public */
export type TLDefaultColorThemeColor = {
    solid: string;
    semi: string;
    pattern: string;
    highlight: {
        srgb: string;
        p3: string;
    };
};
/** @public */
export type TLDefaultColorTheme = Expand<{
    id: 'light' | 'dark';
    text: string;
    background: string;
    solid: string;
} & Record<(typeof colors)[number], TLDefaultColorThemeColor>>;
/** @public */
export declare const DefaultColorThemePalette: {
    lightMode: TLDefaultColorTheme;
    darkMode: TLDefaultColorTheme;
};
/** @public */
export declare function getDefaultColorTheme(opts: {
    isDarkMode: boolean;
}): TLDefaultColorTheme;
/** @public */
export declare const DefaultColorStyle: import("./StyleProp").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
/** @public */
export declare const DefaultLabelColorStyle: import("./StyleProp").EnumStyleProp<"black" | "grey" | "light-violet" | "violet" | "blue" | "light-blue" | "yellow" | "orange" | "green" | "light-green" | "light-red" | "red">;
/** @public */
export type TLDefaultColorStyle = T.TypeOf<typeof DefaultColorStyle>;
export {};
//# sourceMappingURL=TLColorStyle.d.ts.map