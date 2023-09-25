import React, { FunctionComponent } from 'react';
export declare const ProxyHandlers: {
    /**
     * This is a function call trap for functional components. When this is called, we know it means
     * React did run 'Component()', that means we can use any hooks here to setup our effect and
     * store.
     *
     * With the native Proxy, all other calls such as access/setting to/of properties will be
     * forwarded to the target Component, so we don't need to copy the Component's own or inherited
     * properties.
     *
     * @see https://github.com/facebook/react/blob/2d80a0cd690bb5650b6c8a6c079a87b5dc42bd15/packages/react-reconciler/src/ReactFiberHooks.old.js#L460
     */
    apply(Component: FunctionComponent, thisArg: any, argumentsList: any): null | React.ReactElement<any, any>;
};
export declare const ReactMemoSymbol: unique symbol;
export declare const ReactForwardRefSymbol: unique symbol;
/**
 * Returns a tracked version of the given component.
 * Any signals whose values are read while the component renders will be tracked.
 * If any of the tracked signals change later it will cause the component to re-render.
 *
 * This also wraps the component in a React.memo() call, so it will only re-render if the props change.
 *
 * @example
 * ```ts
 * const Counter = track(function Counter(props: CounterProps) {
 *   const count = useAtom('count', 0)
 *   const increment = useCallback(() => count.set(count.value + 1), [count])
 *   return <button onClick={increment}>{count.value}</button>
 * })
 * ```
 *
 * @param baseComponent - The base component to track.
 * @public
 */
export declare function track<T extends FunctionComponent<any>>(baseComponent: T): T extends React.MemoExoticComponent<any> ? T : React.MemoExoticComponent<T>;
//# sourceMappingURL=track.d.ts.map