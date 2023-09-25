import { IdOf, OmitMeta, UnknownRecord } from './BaseRecord';
import { StoreValidator } from './Store';
import { Migrations } from './migrate';
export type RecordTypeRecord<R extends RecordType<any, any>> = ReturnType<R['create']>;
/**
 * Defines the scope of the record
 *
 * instance: The record belongs to a single instance of the store. It should not be synced, and any persistence logic should 'de-instance-ize' the record before persisting it, and apply the reverse when rehydrating.
 * document: The record is persisted and synced. It is available to all store instances.
 * presence: The record belongs to a single instance of the store. It may be synced to other instances, but other instances should not make changes to it. It should not be persisted.
 *
 * @public
 * */
export type RecordScope = 'session' | 'document' | 'presence';
/**
 * A record type is a type that can be stored in a record store. It is created with
 * `createRecordType`.
 *
 * @public
 */
export declare class RecordType<R extends UnknownRecord, RequiredProperties extends keyof Omit<R, 'id' | 'typeName'>> {
    /**
     * The unique type associated with this record.
     *
     * @public
     * @readonly
     */
    readonly typeName: R['typeName'];
    readonly createDefaultProperties: () => Exclude<OmitMeta<R>, RequiredProperties>;
    readonly migrations: Migrations;
    readonly validator: StoreValidator<R> | {
        validate: (r: unknown) => R;
    };
    readonly scope: RecordScope;
    constructor(
    /**
     * The unique type associated with this record.
     *
     * @public
     * @readonly
     */
    typeName: R['typeName'], config: {
        readonly createDefaultProperties: () => Exclude<OmitMeta<R>, RequiredProperties>;
        readonly migrations: Migrations;
        readonly validator?: StoreValidator<R> | {
            validate: (r: unknown) => R;
        };
        readonly scope?: RecordScope;
    });
    /**
     * Create a new record of this type.
     *
     * @param properties - The properties of the record.
     * @returns The new record.
     */
    create(properties: Pick<R, RequiredProperties> & Omit<Partial<R>, RequiredProperties>): R;
    /**
     * Clone a record of this type.
     *
     * @param record - The record to clone.
     * @returns The cloned record.
     * @public
     */
    clone(record: R): R;
    /**
     * Create a new ID for this record type.
     *
     * @example
     *
     * ```ts
     * const id = recordType.createId()
     * ```
     *
     * @returns The new ID.
     * @public
     */
    createId(customUniquePart?: string): IdOf<R>;
    /**
     * Create a new ID for this record type based on the given ID.
     *
     * @example
     *
     * ```ts
     * const id = recordType.createCustomId('myId')
     * ```
     *
     * @deprecated - Use `createId` instead.
     * @param id - The ID to base the new ID on.
     * @returns The new ID.
     */
    createCustomId(id: string): IdOf<R>;
    /**
     * Takes an id like `user:123` and returns the part after the colon `123`
     *
     * @param id - The id
     * @returns
     */
    parseId(id: IdOf<R>): string;
    /**
     * Check whether a record is an instance of this record type.
     *
     * @example
     *
     * ```ts
     * const result = recordType.isInstance(someRecord)
     * ```
     *
     * @param record - The record to check.
     * @returns Whether the record is an instance of this record type.
     */
    isInstance: (record?: UnknownRecord) => record is R;
    /**
     * Check whether an id is an id of this type.
     *
     * @example
     *
     * ```ts
     * const result = recordType.isIn('someId')
     * ```
     *
     * @param id - The id to check.
     * @returns Whether the id is an id of this type.
     */
    isId(id?: string): id is IdOf<R>;
    /**
     * Create a new RecordType that has the same type name as this RecordType and includes the given
     * default properties.
     *
     * @example
     *
     * ```ts
     * const authorType = createRecordType('author', () => ({ living: true }))
     * const deadAuthorType = authorType.withDefaultProperties({ living: false })
     * ```
     *
     * @param fn - A function that returns the default properties of the new RecordType.
     * @returns The new RecordType.
     */
    withDefaultProperties<DefaultProps extends Omit<Partial<R>, 'typeName' | 'id'>>(createDefaultProperties: () => DefaultProps): RecordType<R, Exclude<RequiredProperties, keyof DefaultProps>>;
    /**
     * Check that the passed in record passes the validations for this type. Returns its input
     * correctly typed if it does, but throws an error otherwise.
     */
    validate(record: unknown): R;
}
/**
 * Create a record type.
 *
 * @example
 *
 * ```ts
 * const Book = createRecordType<Book>('book')
 * ```
 *
 * @param typeName - The name of the type to create.
 * @public
 */
export declare function createRecordType<R extends UnknownRecord>(typeName: R['typeName'], config: {
    migrations?: Migrations;
    validator?: StoreValidator<R>;
    scope: RecordScope;
}): RecordType<R, keyof Omit<R, 'id' | 'typeName'>>;
/**
 * Assert whether an id correspond to a record type.
 *
 * @example
 *
 * ```ts
 * assertIdType(myId, "shape")
 * ```
 *
 * @param id - The id to check.
 * @param type - The type of the record.
 * @public
 */
export declare function assertIdType<R extends UnknownRecord>(id: string | undefined, type: RecordType<R, any>): asserts id is IdOf<R>;
//# sourceMappingURL=RecordType.d.ts.map