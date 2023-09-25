import { _Atom } from './Atom';
export declare let globalEpoch: number;
export declare function advanceGlobalEpoch(): void;
declare class Transaction {
    readonly parent: null | Transaction;
    constructor(parent: null | Transaction);
    initialAtomValues: Map<_Atom<any, unknown>, any>;
    /**
     * Get whether this transaction is a root (no parents).
     *
     * @public
     */
    get isRoot(): boolean;
    /**
     * Commit the transaction's changes.
     *
     * @public
     */
    commit(): void;
    /**
     * Abort the transaction.
     *
     * @public
     */
    abort(): void;
}
/**
 * Handle a change to an atom.
 *
 * @param atom The atom that changed.
 * @param previousValue The atom's previous value.
 *
 * @internal
 */
export declare function atomDidChange(atom: _Atom<any>, previousValue: any): void;
/**
 * The current transaction, if there is one.
 *
 * @global
 * @public
 */
export declare let currentTransaction: null | Transaction;
/**
 * Batches state updates, deferring side effects until after the transaction completes.
 *
 * @example
 * ```ts
 * const firstName = atom('John')
 * const lastName = atom('Doe')
 *
 * react('greet', () => {
 *   print(`Hello, ${firstName.value} ${lastName.value}!`)
 * })
 *
 * // Logs "Hello, John Doe!"
 *
 * transaction(() => {
 *  firstName.set('Jane')
 *  lastName.set('Smith')
 * })
 *
 * // Logs "Hello, Jane Smith!"
 * ```
 *
 * If the function throws, the transaction is aborted and any signals that were updated during the transaction revert to their state before the transaction began.
 *
 * @example
 * ```ts
 * const firstName = atom('John')
 * const lastName = atom('Doe')
 *
 * react('greet', () => {
 *   print(`Hello, ${firstName.value} ${lastName.value}!`)
 * })
 *
 * // Logs "Hello, John Doe!"
 *
 * transaction(() => {
 *  firstName.set('Jane')
 *  throw new Error('oops')
 * })
 *
 * // Does not log
 * // firstName.value === 'John'
 * ```
 *
 * A `rollback` callback is passed into the function.
 * Calling this will prevent the transaction from committing and will revert any signals that were updated during the transaction to their state before the transaction began.
 *
 *  * @example
 * ```ts
 * const firstName = atom('John')
 * const lastName = atom('Doe')
 *
 * react('greet', () => {
 *   print(`Hello, ${firstName.value} ${lastName.value}!`)
 * })
 *
 * // Logs "Hello, John Doe!"
 *
 * transaction((rollback) => {
 *  firstName.set('Jane')
 *  lastName.set('Smith')
 *  rollback()
 * })
 *
 * // Does not log
 * // firstName.value === 'John'
 * // lastName.value === 'Doe'
 * ```
 *
 * @param fn - The function to run in a transaction, called with a function to roll back the change.
 * @public
 */
export declare function transaction<T>(fn: (rollback: () => void) => T): T;
/**
 * Like [transaction](#transaction), but does not create a new transaction if there is already one in progress.
 *
 * @param fn - The function to run in a transaction.
 * @public
 */
export declare function transact<T>(fn: () => T): T;
export {};
//# sourceMappingURL=transactions.d.ts.map