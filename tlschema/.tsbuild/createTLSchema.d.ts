import { Migrations, StoreSchema } from '@tldraw/store';
import { TLStoreProps } from './TLStore';
import { TLRecord } from './records/TLRecord';
/** @public */
export type SchemaShapeInfo = {
    migrations?: Migrations;
    props?: Record<string, {
        validate: (prop: any) => any;
    }>;
    meta?: Record<string, {
        validate: (prop: any) => any;
    }>;
};
/** @public */
export type TLSchema = StoreSchema<TLRecord, TLStoreProps>;
/**
 * Create a TLSchema with custom shapes. Custom shapes cannot override default shapes.
 *
 * @param opts - Options
 *
 * @public */
export declare function createTLSchema({ shapes }: {
    shapes: Record<string, SchemaShapeInfo>;
}): TLSchema;
//# sourceMappingURL=createTLSchema.d.ts.map