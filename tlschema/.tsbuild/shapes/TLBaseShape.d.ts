import { BaseRecord } from '@tldraw/store';
import { Expand, JsonObject } from '@tldraw/utils';
import { T } from '@tldraw/validate';
import { TLOpacityType } from '../misc/TLOpacity';
import { TLParentId, TLShapeId } from '../records/TLShape';
/** @public */
export interface TLBaseShape<Type extends string, Props extends object> extends BaseRecord<'shape', TLShapeId> {
    type: Type;
    x: number;
    y: number;
    rotation: number;
    index: string;
    parentId: TLParentId;
    isLocked: boolean;
    opacity: TLOpacityType;
    props: Props;
    meta: JsonObject;
}
/** @public */
export declare const parentIdValidator: T.Validator<TLParentId>;
/** @public */
export declare const shapeIdValidator: T.Validator<TLShapeId>;
/** @public */
export declare function createShapeValidator<Type extends string, Props extends JsonObject, Meta extends JsonObject>(type: Type, props?: {
    [K in keyof Props]: T.Validatable<Props[K]>;
}, meta?: {
    [K in keyof Meta]: T.Validatable<Meta[K]>;
}): T.ObjectValidator<TLBaseShape<Type, Props>>;
/** @public */
export type ShapeProps<Shape extends TLBaseShape<any, any>> = {
    [K in keyof Shape['props']]: T.Validatable<Shape['props'][K]>;
};
export type ShapePropsType<Config extends Record<string, T.Validatable<any>>> = Expand<{
    [K in keyof Config]: T.TypeOf<Config[K]>;
}>;
//# sourceMappingURL=TLBaseShape.d.ts.map