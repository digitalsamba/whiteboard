/// <reference types="react" />
/** @internal */
export interface SliderProps {
    steps: number;
    value: number | null;
    label: string;
    title: string;
    onValueChange: (value: number, emphemeral: boolean) => void;
    'data-testid'?: string;
}
/** @internal */
export declare const Slider: import("react").NamedExoticComponent<SliderProps>;
//# sourceMappingURL=Slider.d.ts.map