import { Computed } from '@tldraw/state';
import { TLShapeId } from '@tldraw/tlschema';
import { Editor } from '../Editor';
export type TLArrowBindingsIndex = Record<TLShapeId, {
    arrowId: TLShapeId;
    handleId: 'end' | 'start';
}[] | undefined>;
export declare const arrowBindingsIndex: (editor: Editor) => Computed<TLArrowBindingsIndex>;
//# sourceMappingURL=arrowBindingsIndex.d.ts.map