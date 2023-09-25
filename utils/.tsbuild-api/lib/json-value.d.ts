/** @public */
export type JsonValue = JsonArray | JsonObject | JsonPrimitive;
/** @public */
export type JsonPrimitive = boolean | null | number | string;
/** @public */
export type JsonArray = JsonValue[];
/** @public */
export type JsonObject = {
    [key: string]: JsonValue | undefined;
};
//# sourceMappingURL=json-value.d.ts.map