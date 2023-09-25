import { StateNode } from '@tldraw/editor';
import { Brushing } from './children/Brushing';
import { Crop } from './children/Crop/Crop';
import { Cropping } from './children/Cropping';
import { DraggingHandle } from './children/DraggingHandle';
import { EditingShape } from './children/EditingShape';
import { Idle } from './children/Idle';
import { PointingCanvas } from './children/PointingCanvas';
import { PointingCropHandle } from './children/PointingCropHandle';
import { PointingHandle } from './children/PointingHandle';
import { PointingResizeHandle } from './children/PointingResizeHandle';
import { PointingRotateHandle } from './children/PointingRotateHandle';
import { PointingSelection } from './children/PointingSelection';
import { PointingShape } from './children/PointingShape';
import { Resizing } from './children/Resizing';
import { Rotating } from './children/Rotating';
import { ScribbleBrushing } from './children/ScribbleBrushing';
import { Translating } from './children/Translating';
/** @public */
export declare class SelectTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Brushing | typeof Crop | typeof Cropping | typeof DraggingHandle | typeof EditingShape | typeof Idle | typeof PointingCanvas | typeof PointingCropHandle | typeof PointingHandle | typeof PointingResizeHandle | typeof PointingRotateHandle | typeof PointingSelection | typeof PointingShape | typeof Resizing | typeof Rotating | typeof ScribbleBrushing | typeof Translating)[];
    onExit: () => void;
}
//# sourceMappingURL=SelectTool.d.ts.map