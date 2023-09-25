import { Computed, ComputedOptions } from '../core';
/**
 * Creates a new computed signal and returns it. The computed signal will be created only once.
 *
 * See [[computed]]
 *
 * @example
 * ```ts
 * type GreeterProps = {
 *   firstName: Signal<string>
 *   lastName: Signal<string>
 * }
 *
 * const Greeter = track(function Greeter ({firstName, lastName}: GreeterProps) {
 *   const fullName = useComputed('fullName', () => `${firstName.value} ${lastName.value}`)
 *   return <div>Hello {fullName.value}!</div>
 * })
 * ```
 *
 * @public
 */
export declare function useComputed<Value>(name: string, compute: () => Value, deps: any[]): Computed<Value>;
/** @public */
export declare function useComputed<Value, Diff = unknown>(name: string, compute: () => Value, opts: ComputedOptions<Value, Diff>, deps: any[]): Computed<Value>;
//# sourceMappingURL=useComputed.d.ts.map