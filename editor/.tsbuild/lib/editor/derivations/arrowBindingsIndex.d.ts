import { Computed } from '@tldraw/state';
import { TLShapeId } from '@tldraw/tlschema';
import { Editor } from '../Editor';
export type TLArrowBindingsIndex = Record<TLShapeId, undefined | {
    arrowId: TLShapeId;
    handleId: 'start' | 'end';
}[]>;
export declare const arrowBindingsIndex: (editor: Editor) => Computed<TLArrowBindingsIndex>;
//# sourceMappingURL=arrowBindingsIndex.d.ts.map