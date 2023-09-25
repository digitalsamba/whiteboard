import { Signal } from '../core';
/**
 * Extracts the value from a signal and subscribes to it.
 *
 * Note that you do not need to use this hook if you are wrapping the component with [[track]]
 *
 * @example
 * ```ts
 * const Counter: React.FC = () => {
 *   const $count = useAtom('count', 0)
 *   const increment = useCallback(() => $count.set($count.value + 1), [count])
 *   const currentCount = useValue($count)
 *   return <button onClick={increment}>{currentCount}</button>
 * }
 * ```
 *
 * You can also pass a function to compute the value and it will be memoized as in [[useComputed]]:
 *
 * @example
 * ```ts
 * type GreeterProps = {
 *   firstName: Signal<string>
 *   lastName: Signal<string>
 * }
 *
 * const Greeter = track(function Greeter({ firstName, lastName }: GreeterProps) {
 *   const fullName = useValue('fullName', () => `${firstName.value} ${lastName.value}`, [
 *     firstName,
 *     lastName,
 *   ])
 *   return <div>Hello {fullName}!</div>
 * })
 * ```
 *
 * @public
 */
export declare function useValue<Value>(value: Signal<Value>): Value;
/** @public */
export declare function useValue<Value>(name: string, fn: () => Value, deps: unknown[]): Value;
//# sourceMappingURL=useValue.d.ts.map