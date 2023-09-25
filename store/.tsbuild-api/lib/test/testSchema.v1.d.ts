import { BaseRecord, RecordId } from '../BaseRecord';
import { StoreSchema } from '../StoreSchema';
/** A user of tldraw */
interface User extends BaseRecord<'user', RecordId<User>> {
    name: string;
    locale: string;
    phoneNumber: null | string;
}
declare const User: import("../RecordType").RecordType<User, "locale" | "phoneNumber">;
type ShapeId = RecordId<Shape<object>>;
interface Shape<Props> extends BaseRecord<'shape', ShapeId> {
    type: string;
    x: number;
    y: number;
    rotation: number;
    parentId: null | ShapeId;
    props: Props;
}
interface RectangleProps {
    width: number;
    height: number;
    opactiy: number;
}
interface OvalProps {
    radius: number;
    borderStyle: 'dashed' | 'solid';
}
declare const Shape: import("../RecordType").RecordType<Shape<OvalProps | RectangleProps>, "props" | "type">;
export declare const testSchemaV1: StoreSchema<Shape<any> | User, unknown>;
export {};
//# sourceMappingURL=testSchema.v1.d.ts.map