import { RecordId, UnknownRecord } from '@tldraw/store';
import { T } from '@tldraw/validate';
import { SchemaShapeInfo } from '../createTLSchema';
import { TLArrowShape } from '../shapes/TLArrowShape';
import { TLBaseShape } from '../shapes/TLBaseShape';
import { TLBookmarkShape } from '../shapes/TLBookmarkShape';
import { TLDrawShape } from '../shapes/TLDrawShape';
import { TLEmbedShape } from '../shapes/TLEmbedShape';
import { TLFrameShape } from '../shapes/TLFrameShape';
import { TLGeoShape } from '../shapes/TLGeoShape';
import { TLGroupShape } from '../shapes/TLGroupShape';
import { TLHighlightShape } from '../shapes/TLHighlightShape';
import { TLImageShape } from '../shapes/TLImageShape';
import { TLLineShape } from '../shapes/TLLineShape';
import { TLNoteShape } from '../shapes/TLNoteShape';
import { TLTextShape } from '../shapes/TLTextShape';
import { TLVideoShape } from '../shapes/TLVideoShape';
import { StyleProp } from '../styles/StyleProp';
import { TLPageId } from './TLPage';
/**
 * The default set of shapes that are available in the editor.
 *
 * @public */
export type TLDefaultShape = TLArrowShape | TLBookmarkShape | TLDrawShape | TLEmbedShape | TLFrameShape | TLGeoShape | TLGroupShape | TLImageShape | TLLineShape | TLNoteShape | TLTextShape | TLVideoShape | TLHighlightShape;
/**
 * A type for a shape that is available in the editor but whose type is
 * unknown—either one of the editor's default shapes or else a custom shape.
 *
 * @public */
export type TLUnknownShape = TLBaseShape<string, object>;
/**
 * The set of all shapes that are available in the editor, including unknown shapes.
 *
 * @public
 */
export type TLShape = TLDefaultShape | TLUnknownShape;
/** @public */
export type TLShapePartial<T extends TLShape = TLShape> = T extends T ? {
    id: TLShapeId;
    type: T['type'];
    props?: Partial<T['props']>;
    meta?: Partial<T['meta']>;
} & Partial<Omit<T, 'type' | 'id' | 'props' | 'meta'>> : never;
/** @public */
export type TLShapeId = RecordId<TLUnknownShape>;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type Identity<T> = {
    [K in keyof T]: T[K];
};
/** @public */
export type TLShapeProps = Identity<UnionToIntersection<TLDefaultShape['props']>>;
/** @public */
export type TLShapeProp = keyof TLShapeProps;
/** @public */
export type TLParentId = TLPageId | TLShapeId;
/** @internal */
export declare const rootShapeVersions: {
    readonly AddIsLocked: 1;
    readonly HoistOpacity: 2;
    readonly AddMeta: 3;
};
/** @internal */
export declare const rootShapeMigrations: import("@tldraw/store").Migrations;
/** @public */
export declare function isShape(record?: UnknownRecord): record is TLShape;
/** @public */
export declare function isShapeId(id?: string): id is TLShapeId;
/** @public */
export declare function createShapeId(id?: string): TLShapeId;
/** @internal */
export declare function getShapePropKeysByStyle(props: Record<string, T.Validatable<any>>): Map<StyleProp<unknown>, string>;
/** @internal */
export declare function createShapeRecordType(shapes: Record<string, SchemaShapeInfo>): import("@tldraw/store").RecordType<TLShape, "type" | "index" | "props" | "parentId">;
export {};
//# sourceMappingURL=TLShape.d.ts.map