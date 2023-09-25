/// <reference types="react" />
import { TLUiIconType } from '../../icon-types';
/** @public */
export interface TLUiIconProps extends React.HTMLProps<HTMLDivElement> {
    icon: TLUiIconType;
    small?: boolean;
    color?: string;
    children?: undefined;
    invertIcon?: boolean;
    crossOrigin?: 'anonymous' | 'use-credentials';
}
/** @public */
export declare const Icon: import("react").NamedExoticComponent<TLUiIconProps>;
//# sourceMappingURL=Icon.d.ts.map