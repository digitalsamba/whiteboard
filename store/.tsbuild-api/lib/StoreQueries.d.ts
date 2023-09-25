import { Atom, Computed } from '@tldraw/state';
import { IdOf, UnknownRecord } from './BaseRecord';
import { QueryExpression } from './executeQuery';
import { CollectionDiff, RecordsDiff } from './Store';
export type RSIndexDiff<R extends UnknownRecord, Property extends string & keyof R = string & keyof R> = Map<R[Property], CollectionDiff<IdOf<R>>>;
export type RSIndexMap<R extends UnknownRecord, Property extends string & keyof R = string & keyof R> = Map<R[Property], Set<IdOf<R>>>;
export type RSIndex<R extends UnknownRecord, Property extends string & keyof R = string & keyof R> = Computed<Map<R[Property], Set<IdOf<R>>>, RSIndexDiff<R, Property>>;
/**
 * A class that provides a 'namespace' for the various kinds of indexes one may wish to derive from
 * the record store.
 */
export declare class StoreQueries<R extends UnknownRecord> {
    private readonly atoms;
    private readonly history;
    constructor(atoms: Atom<Record<IdOf<R>, Atom<R>>>, history: Atom<number, RecordsDiff<R>>);
    /**
     * A cache of derivations (indexes).
     *
     * @internal
     */
    private indexCache;
    /**
     * A cache of derivations (filtered histories).
     *
     * @internal
     */
    private historyCache;
    /**
     * Create a derivation that contains the hisotry for a given type
     *
     * @param typeName - The name of the type to filter by.
     * @returns A derivation that returns the ids of all records of the given type.
     * @public
     */
    filterHistory<TypeName extends R['typeName']>(typeName: TypeName): Computed<number, RecordsDiff<Extract<R, {
        typeName: TypeName;
    }>>>;
    /**
     * Create a derivation that returns an index on a property for the given type.
     *
     * @param typeName - The name of the type.
     * @param property - The name of the property.
     * @public
     */
    index<TypeName extends R['typeName'], Property extends string & keyof Extract<R, {
        typeName: TypeName;
    }>>(typeName: TypeName, property: Property): RSIndex<Extract<R, {
        typeName: TypeName;
    }>, Property>;
    /**
     * Create a derivation that returns an index on a property for the given type.
     *
     * @param typeName - The name of the type?.
     * @param property - The name of the property?.
     * @internal
     */
    __uncached_createIndex<TypeName extends R['typeName'], Property extends string & keyof Extract<R, {
        typeName: TypeName;
    }>>(typeName: TypeName, property: Property): RSIndex<Extract<R, {
        typeName: TypeName;
    }>, Property>;
    /**
     * Create a derivation that will return a signle record matching the given query.
     *
     * It will return undefined if there is no matching record
     *
     * @param typeName - The name of the type?
     * @param queryCreator - A function that returns the query expression.
     * @param name - (optinal) The name of the query.
     */
    record<TypeName extends R['typeName']>(typeName: TypeName, queryCreator?: () => QueryExpression<Extract<R, {
        typeName: TypeName;
    }>>, name?: string): Computed<Extract<R, {
        typeName: TypeName;
    }> | undefined>;
    /**
     * Create a derivation that will return an array of records matching the given query
     *
     * @param typeName - The name of the type?
     * @param queryCreator - A function that returns the query expression.
     * @param name - (optinal) The name of the query.
     */
    records<TypeName extends R['typeName']>(typeName: TypeName, queryCreator?: () => QueryExpression<Extract<R, {
        typeName: TypeName;
    }>>, name?: string): Computed<Array<Extract<R, {
        typeName: TypeName;
    }>>>;
    /**
     * Create a derivation that will return the ids of all records of the given type.
     *
     * @param typeName - The name of the type.
     * @param queryCreator - A function that returns the query expression.
     * @param name - (optinal) The name of the query.
     */
    ids<TypeName extends R['typeName']>(typeName: TypeName, queryCreator?: () => QueryExpression<Extract<R, {
        typeName: TypeName;
    }>>, name?: string): Computed<Set<IdOf<Extract<R, {
        typeName: TypeName;
    }>>>, CollectionDiff<IdOf<Extract<R, {
        typeName: TypeName;
    }>>>>;
    exec<TypeName extends R['typeName']>(typeName: TypeName, query: QueryExpression<Extract<R, {
        typeName: TypeName;
    }>>): Array<Extract<R, {
        typeName: TypeName;
    }>>;
}
//# sourceMappingURL=StoreQueries.d.ts.map