import { StateNode } from '@tldraw/editor';
import { Idle } from './children/Idle';
import { PointingCrop } from './children/PointingCrop';
import { TranslatingCrop } from './children/TranslatingCrop';
export declare class Crop extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle | typeof PointingCrop | typeof TranslatingCrop)[];
}
//# sourceMappingURL=Crop.d.ts.map