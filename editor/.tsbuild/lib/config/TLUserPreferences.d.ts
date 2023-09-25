/**
 * A user of tldraw
 *
 * @public
 */
export interface TLUserPreferences {
    id: string;
    name: string;
    locale: string;
    color: string;
    isDarkMode: boolean;
    animationSpeed: number;
    isSnapMode: boolean;
}
/** @internal */
export declare const USER_COLORS: readonly ["#FF802B", "#EC5E41", "#F2555A", "#F04F88", "#E34BA9", "#BD54C6", "#9D5BD2", "#7B66DC", "#02B1CC", "#11B3A3", "#39B178", "#55B467"];
/** @public */
export declare function getFreshUserPreferences(): TLUserPreferences;
/** @public */
export declare function setUserPreferences(user: TLUserPreferences): void;
/** @public */
export declare function getUserPreferences(): TLUserPreferences;
//# sourceMappingURL=TLUserPreferences.d.ts.map