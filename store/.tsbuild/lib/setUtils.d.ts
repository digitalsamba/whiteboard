import { CollectionDiff } from './Store';
/**
 * Combine multiple sets into a single set containing only the common elements of all sets.
 *
 * @param sets - The sets to combine.
 */
export declare function intersectSets<T>(sets: Set<T>[]): Set<T>;
/**
 * Calculates a diff between two sets.
 *
 * @param prev - The previous set
 * @param next - The next set
 */
export declare function diffSets<T>(prev: Set<T>, next: Set<T>): CollectionDiff<T> | undefined;
//# sourceMappingURL=setUtils.d.ts.map