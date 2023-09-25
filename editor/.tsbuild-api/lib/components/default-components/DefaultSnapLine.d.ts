import * as React from 'react';
import { type SnapLine } from '../../editor/managers/SnapManager';
/** @public */
export type TLSnapLineComponent = React.ComponentType<{
    className?: string;
    line: SnapLine;
    zoom: number;
}>;
/** @public */
export declare const DefaultSnapLine: TLSnapLineComponent;
//# sourceMappingURL=DefaultSnapLine.d.ts.map