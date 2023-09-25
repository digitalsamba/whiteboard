import { Child, Signal } from './types';
/**
 * Executes the given function without capturing any parents in the current capture context.
 *
 * This is mainly useful if you want to run an effect only when certain signals change while also
 * dereferencing other signals which should not cause the effect to rerun on their own.
 *
 * @example
 * ```ts
 * const name = atom('name', 'Sam')
 * const time = atom('time', () => new Date().getTime())
 *
 * setInterval(() => {
 *   time.set(new Date().getTime())
 * })
 *
 * react('log name changes', () => {
 * 	 print(name.value, 'was changed at', unsafe__withoutCapture(() => time.value))
 * })
 *
 * ```
 *
 * @public
 */
export declare function unsafe__withoutCapture<T>(fn: () => T): T;
export declare function startCapturingParents(child: Child): void;
export declare function stopCapturingParents(): void;
export declare function maybeCaptureParent(p: Signal<any, any>): void;
/**
 * A debugging tool that tells you why a computed signal or effect is running.
 * Call in the body of a computed signal or effect function.
 *
 * @example
 * ```ts
 * const name = atom('name', 'Bob')
 * react('greeting', () => {
 * 	whyAmIRunning()
 *	print('Hello', name.value)
 * })
 *
 * name.set('Alice')
 *
 * // 'greeting' is running because:
 * //     'name' changed => 'Alice'
 * ```
 *
 * @public
 */
export declare function whyAmIRunning(): void;
//# sourceMappingURL=capture.d.ts.map