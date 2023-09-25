import { Editor, TLBaseShape, TLImageShapeCrop, Vec2d } from '@tldraw/editor';
export type ShapeWithCrop = TLBaseShape<string, {
    w: number;
    h: number;
    crop: TLImageShapeCrop;
}>;
export declare function getTranslateCroppedImageChange(editor: Editor, shape: TLBaseShape<string, {
    w: number;
    h: number;
    crop: TLImageShapeCrop;
}>, delta: Vec2d): ({
    id: import("@tldraw/editor").TLShapeId;
    type: string;
    props?: Partial<{
        w: number;
        h: number;
        crop: TLImageShapeCrop;
    }> | undefined;
    meta?: Partial<import("@tldraw/editor").JsonObject> | undefined;
} & Partial<Omit<TLBaseShape<string, {
    w: number;
    h: number;
    crop: TLImageShapeCrop;
}>, "id" | "meta" | "props" | "type">>) | undefined;
//# sourceMappingURL=crop_helpers.d.ts.map