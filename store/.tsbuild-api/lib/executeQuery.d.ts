import { IdOf, UnknownRecord } from './BaseRecord';
import { StoreQueries } from './StoreQueries';
export type ValueMatcher<T> = {
    eq: T;
} | {
    gt: number;
} | {
    neq: T;
};
export type QueryExpression<R extends object> = {
    [k in keyof R & string]?: ValueMatcher<R[k]>;
};
export declare function objectMatchesQuery<T extends object>(query: QueryExpression<T>, object: T): boolean;
export declare function executeQuery<R extends UnknownRecord, TypeName extends R['typeName']>(store: StoreQueries<R>, typeName: TypeName, query: QueryExpression<Extract<R, {
    typeName: TypeName;
}>>): Set<IdOf<Extract<R, {
    typeName: TypeName;
}>>>;
//# sourceMappingURL=executeQuery.d.ts.map