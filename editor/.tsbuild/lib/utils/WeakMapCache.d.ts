/** @public */
export declare class WeakMapCache<T extends object, K> {
    items: WeakMap<T, K>;
    get<P extends T>(item: P, cb: (item: P) => K): NonNullable<K>;
    access(item: T): K | undefined;
    set(item: T, value: K): void;
    has(item: T): boolean;
    invalidate(item: T): void;
    bust(): void;
}
//# sourceMappingURL=WeakMapCache.d.ts.map