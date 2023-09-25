export type Stack<T> = StackItem<T> | EmptyStackItem<T>;
export declare function stack<T>(items?: Array<T>): Stack<T>;
declare class EmptyStackItem<T> implements Iterable<T> {
    readonly length = 0;
    readonly head: null;
    readonly tail: Stack<T>;
    push(head: T): Stack<T>;
    toArray(): [];
    [Symbol.iterator](): {
        next(): {
            value: undefined;
            done: true;
        };
    };
}
declare class StackItem<T> implements Iterable<T> {
    readonly head: T;
    readonly tail: Stack<T>;
    length: number;
    constructor(head: T, tail: Stack<T>);
    push(head: T): Stack<T>;
    toArray(): (NonNullable<T> | undefined)[];
    [Symbol.iterator](): {
        next(): {
            value: NonNullable<T>;
            done: false;
        } | {
            value: undefined;
            done: true;
        };
    };
}
export {};
//# sourceMappingURL=Stack.d.ts.map