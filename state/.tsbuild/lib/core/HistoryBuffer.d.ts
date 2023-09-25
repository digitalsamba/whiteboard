import { RESET_VALUE } from './types';
type RangeTuple<Diff> = [fromEpoch: number, toEpoch: number, diff: Diff];
/**
 * A structure that stores diffs between values of an atom.
 *
 * @internal
 */
export declare class HistoryBuffer<Diff> {
    private readonly capacity;
    private index;
    buffer: Array<RangeTuple<Diff> | undefined>;
    constructor(capacity: number);
    /**
     * Add a diff to the history buffer.
     *
     * @param lastComputedEpoch - The epoch when the diff was computed.
     * @param currentEpoch - The current epoch.
     * @param diff - (optional) The diff to add, or else a reset value.
     */
    pushEntry(lastComputedEpoch: number, currentEpoch: number, diff: Diff | RESET_VALUE): void;
    /**
     * Clear the history buffer.
     */
    clear(): void;
    /**
     * Get the diffs since the given epoch.
     *
     * @param epoch - The epoch to get diffs since.
     * @returns An array of diffs or a flag to reset the history buffer.
     */
    getChangesSince(sinceEpoch: number): RESET_VALUE | Diff[];
}
export {};
//# sourceMappingURL=HistoryBuffer.d.ts.map