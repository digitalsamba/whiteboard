import { TLScribble, TLTickEvent, Vec2dModel } from '@tldraw/editor';
/** @public */
export declare class ScribbleManager implements TLScribble {
    state: "starting" | "paused" | "active" | "stopping";
    points: Vec2dModel[];
    size: number;
    color: "black" | "white" | "accent" | "selection-stroke" | "selection-fill" | "laser" | "muted-1";
    opacity: number;
    delay: number;
    timeoutMs: number;
    delayRemaining: number;
    private onUpdate;
    private onComplete;
    private prev;
    private next;
    constructor(opts: {
        onUpdate: (scribble: TLScribble) => void;
        onComplete: () => void;
        size?: TLScribble['size'];
        color?: TLScribble['color'];
        opacity?: TLScribble['opacity'];
        delay?: TLScribble['delay'];
    });
    resume: () => void;
    pause: () => void;
    /**
     * Start stopping the scribble. The scribble won't be removed until its last point is cleared.
     *
     * @public
     */
    stop: () => void;
    /**
     * Set the scribble's next point.
     *
     * @param point - The point to add.
     * @public
     */
    addPoint: (x: number, y: number) => void;
    /**
     * Get the current TLScribble object from the scribble manager.
     *
     * @public
     */
    getScribble(): TLScribble;
    private updateScribble;
    tick: TLTickEvent;
}
//# sourceMappingURL=ScribbleManager.d.ts.map