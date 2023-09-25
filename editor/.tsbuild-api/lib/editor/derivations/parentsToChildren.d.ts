import { TLParentId, TLShapeId, TLStore } from '@tldraw/tlschema';
type Parents2Children = Record<TLParentId, TLShapeId[]>;
export declare const parentsToChildren: (store: TLStore) => import("@tldraw/state").Computed<Parents2Children, unknown>;
export {};
//# sourceMappingURL=parentsToChildren.d.ts.map