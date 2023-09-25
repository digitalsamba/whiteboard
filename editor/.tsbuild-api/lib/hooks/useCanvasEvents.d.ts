import React from 'react';
export declare function useCanvasEvents(): {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onDragOver: (e: React.DragEvent<Element>) => void;
    onDrop: (e: React.DragEvent<Element>) => Promise<void>;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
};
//# sourceMappingURL=useCanvasEvents.d.ts.map