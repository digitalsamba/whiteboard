import { StyleProp } from '@tldraw/tlschema';
/**
 * The value of a particular {@link @tldraw/tlschema#StyleProp}.
 *
 * A `mixed` style means that in the current selection, there are lots of different values for the
 * same style prop - e.g. a red and a blue shape are selected.
 *
 * A `shared` style means that all shapes in the selection share the same value for this style prop.
 *
 * @public
 */
export type SharedStyle<T> = {
    readonly type: 'mixed';
} | {
    readonly type: 'shared';
    readonly value: T;
};
/**
 * A map of {@link @tldraw/tlschema#StyleProp | StyleProps} to their {@link SharedStyle} values. See
 * {@link Editor.sharedStyles}.
 *
 * @public
 */
export declare class ReadonlySharedStyleMap {
    /** @internal */
    protected map: Map<StyleProp<unknown>, SharedStyle<unknown>>;
    constructor(entries?: Iterable<[StyleProp<unknown>, SharedStyle<unknown>]>);
    get<T>(prop: StyleProp<T>): SharedStyle<T> | undefined;
    getAsKnownValue<T>(prop: StyleProp<T>): T | undefined;
    get size(): number;
    equals(other: ReadonlySharedStyleMap): boolean;
    keys(): IterableIterator<StyleProp<unknown>>;
    values(): IterableIterator<SharedStyle<unknown>>;
    entries(): IterableIterator<[StyleProp<unknown>, SharedStyle<unknown>]>;
    [Symbol.iterator](): IterableIterator<[StyleProp<unknown>, SharedStyle<unknown>]>;
}
/** @internal */
export declare class SharedStyleMap extends ReadonlySharedStyleMap {
    set<T>(prop: StyleProp<T>, value: SharedStyle<T>): void;
    applyValue<T>(prop: StyleProp<T>, value: T): void;
}
//# sourceMappingURL=SharedStylesMap.d.ts.map