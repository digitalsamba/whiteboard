import { StateNode, TLEventHandlers, TLPointerEventInfo, TLShape } from '@tldraw/editor';
export declare class PointingShape extends StateNode {
    static id: string;
    hitShape: TLShape;
    hitShapeForPointerUp: TLShape;
    didSelectOnEnter: boolean;
    onEnter: (info: TLPointerEventInfo & {
        target: 'shape';
    }) => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerMove'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private cancel;
}
//# sourceMappingURL=PointingShape.d.ts.map