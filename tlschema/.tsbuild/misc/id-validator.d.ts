import type { RecordId, UnknownRecord } from '@tldraw/store';
import { T } from '@tldraw/validate';
/** @internal */
export declare function idValidator<Id extends RecordId<UnknownRecord>>(prefix: Id['__type__']['typeName']): T.Validator<Id>;
//# sourceMappingURL=id-validator.d.ts.map