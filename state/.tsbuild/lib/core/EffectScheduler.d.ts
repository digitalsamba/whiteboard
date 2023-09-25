import { Signal } from './types';
interface EffectSchedulerOptions {
    /**
     * scheduleEffect is a function that will be called when the effect is scheduled.
     *
     * It can be used to defer running effects until a later time, for example to batch them together with requestAnimationFrame.
     *
     *
     * @example
     * ```ts
     * let isRafScheduled = false
     * const scheduledEffects: Array<() => void> = []
     * const scheduleEffect = (runEffect: () => void) => {
     * 	scheduledEffects.push(runEffect)
     * 	if (!isRafScheduled) {
     * 		isRafScheduled = true
     * 		requestAnimationFrame(() => {
     * 			isRafScheduled = false
     * 			scheduledEffects.forEach((runEffect) => runEffect())
     * 			scheduledEffects.length = 0
     * 		})
     * 	}
     * }
     * const stop = react('set page title', () => {
     * 	document.title = doc.title,
     * }, scheduleEffect)
     * ```
     *
     * @param execute - A function that will execute the effect.
     * @returns
     */
    scheduleEffect?: (execute: () => void) => void;
}
/**
 * An EffectScheduler is responsible for executing side effects in response to changes in state.
 *
 * You probably don't need to use this directly unless you're integrating this library with a framework of some kind.
 *
 * Instead, use the [[react]] and [[reactor]] functions.
 *
 * @example
 * ```ts
 * const render = new EffectScheduler('render', drawToCanvas)
 *
 * render.attach()
 * render.execute()
 * ```
 *
 * @public
 */
export declare class EffectScheduler<Result> {
    readonly name: string;
    private readonly runEffect;
    private _isActivelyListening;
    /**
     * Whether this scheduler is attached and actively listening to its parents.
     * @public
     */
    get isActivelyListening(): boolean;
    /** @internal */
    lastTraversedEpoch: number;
    private lastReactedEpoch;
    private _scheduleCount;
    /**
     * The number of times this effect has been scheduled.
     * @public
     */
    get scheduleCount(): number;
    /** @internal */
    parentEpochs: number[];
    /** @internal */
    parents: Signal<any, any>[];
    private readonly _scheduleEffect?;
    constructor(name: string, runEffect: (lastReactedEpoch: number) => Result, options?: EffectSchedulerOptions);
    /** @internal */
    maybeScheduleEffect(): void;
    /** @internal */
    scheduleEffect(): void;
    private maybeExecute;
    /**
     * Makes this scheduler become 'actively listening' to its parents.
     * If it has been executed before it will immediately become eligible to receive 'maybeScheduleEffect' calls.
     * If it has not executed before it will need to be manually executed once to become eligible for scheduling, i.e. by calling [[EffectScheduler.execute]].
     * @public
     */
    attach(): void;
    /**
     * Makes this scheduler stop 'actively listening' to its parents.
     * It will no longer be eligible to receive 'maybeScheduleEffect' calls until [[EffectScheduler.attach]] is called again.
     */
    detach(): void;
    /**
     * Executes the effect immediately and returns the result.
     * @returns The result of the effect.
     */
    execute(): Result;
}
/**
 * Starts a new effect scheduler, scheduling the effect immediately.
 *
 * Returns a function that can be called to stop the scheduler.
 *
 * @example
 * ```ts
 * const color = atom('color', 'red')
 * const stop = react('set style', () => {
 *   divElem.style.color = color.value
 * })
 * color.set('blue')
 * // divElem.style.color === 'blue'
 * stop()
 * color.set('green')
 * // divElem.style.color === 'blue'
 * ```
 *
 *
 * Also useful in React applications for running effects outside of the render cycle.
 *
 * @example
 * ```ts
 * useEffect(() => react('set style', () => {
 *   divRef.current.style.color = color.value
 * }), [])
 * ```
 *
 * @public
 */
export declare function react(name: string, fn: (lastReactedEpoch: number) => any, options?: EffectSchedulerOptions): () => void;
/**
 * The reactor is a user-friendly interface for starting and stopping an [[EffectScheduler]].
 *
 * Calling .start() will attach the scheduler and execute the effect immediately the first time it is called.
 *
 * If the reactor is stopped, calling `.start()` will re-attach the scheduler but will only execute the effect if any of its parents have changed since it was stopped.
 *
 * You can create a reactor with [[reactor]].
 * @public
 */
export interface Reactor<T = unknown> {
    /**
     * The underlying effect scheduler.
     * @public
     */
    scheduler: EffectScheduler<T>;
    /**
     * Start the scheduler. The first time this is called the effect will be scheduled immediately.
     *
     * If the reactor is stopped, calling this will start the scheduler again but will only execute the effect if any of its parents have changed since it was stopped.
     *
     * If you need to force re-execution of the effect, pass `{ force: true }`.
     * @public
     */
    start(options?: {
        force?: boolean;
    }): void;
    /**
     * Stop the scheduler.
     * @public
     */
    stop(): void;
}
/**
 * Creates a [[Reactor]], which is a thin wrapper around an [[EffectScheduler]].
 *
 * @public
 */
export declare function reactor<Result>(name: string, fn: (lastReactedEpoch: number) => Result, options?: EffectSchedulerOptions): Reactor<Result>;
export {};
//# sourceMappingURL=EffectScheduler.d.ts.map