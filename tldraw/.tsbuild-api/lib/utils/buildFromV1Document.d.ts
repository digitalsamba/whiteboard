import { Editor } from '@tldraw/editor';
/** @internal */
export declare function buildFromV1Document(editor: Editor, document: LegacyTldrawDocument): void;
interface TLV1Handle {
    id: string;
    index: number;
    point: number[];
}
interface TLV1Binding {
    id: string;
    toId: string;
    fromId: string;
}
interface TLV1Shape {
    id: string;
    type: string;
    parentId: string;
    childIndex: number;
    name: string;
    point: number[];
    assetId?: string;
    rotation?: number;
    children?: string[];
    handles?: Record<string, TLV1Handle>;
    isGhost?: boolean;
    isHidden?: boolean;
    isLocked?: boolean;
    isGenerated?: boolean;
    isAspectRatioLocked?: boolean;
}
declare enum TDShapeType {
    Sticky = "sticky",
    Ellipse = "ellipse",
    Rectangle = "rectangle",
    Triangle = "triangle",
    Draw = "draw",
    Arrow = "arrow",
    Text = "text",
    Group = "group",
    Image = "image",
    Video = "video"
}
declare enum ColorStyle {
    White = "white",
    LightGray = "lightGray",
    Gray = "gray",
    Black = "black",
    Green = "green",
    Cyan = "cyan",
    Blue = "blue",
    Indigo = "indigo",
    Violet = "violet",
    Red = "red",
    Orange = "orange",
    Yellow = "yellow"
}
declare enum SizeStyle {
    Small = "small",
    Medium = "medium",
    Large = "large"
}
declare enum DashStyle {
    Draw = "draw",
    Solid = "solid",
    Dashed = "dashed",
    Dotted = "dotted"
}
declare enum AlignStyle {
    Start = "start",
    Middle = "middle",
    End = "end",
    Justify = "justify"
}
declare enum FontStyle {
    Script = "script",
    Sans = "sans",
    Serif = "serif",
    Mono = "mono"
}
type ShapeStyles = {
    color: ColorStyle;
    size: SizeStyle;
    dash: DashStyle;
    font?: FontStyle;
    textAlign?: AlignStyle;
    isFilled?: boolean;
    scale?: number;
};
interface TDBaseShape extends TLV1Shape {
    style: ShapeStyles;
    type: TDShapeType;
    label?: string;
    handles?: Record<string, TDHandle>;
}
interface DrawShape extends TDBaseShape {
    type: TDShapeType.Draw;
    points: number[][];
    isComplete: boolean;
}
interface TDHandle extends TLV1Handle {
    canBind?: boolean;
    bindingId?: string;
}
interface RectangleShape extends TDBaseShape {
    type: TDShapeType.Rectangle;
    size: number[];
    label?: string;
    labelPoint?: number[];
}
interface EllipseShape extends TDBaseShape {
    type: TDShapeType.Ellipse;
    radius: number[];
    label?: string;
    labelPoint?: number[];
}
interface TriangleShape extends TDBaseShape {
    type: TDShapeType.Triangle;
    size: number[];
    label?: string;
    labelPoint?: number[];
}
declare enum Decoration {
    Arrow = "arrow"
}
interface ArrowShape extends TDBaseShape {
    type: TDShapeType.Arrow;
    bend: number;
    handles: {
        start: TDHandle;
        bend: TDHandle;
        end: TDHandle;
    };
    decorations?: {
        start?: Decoration;
        end?: Decoration;
        middle?: Decoration;
    };
    label?: string;
    labelPoint?: number[];
}
interface ArrowBinding extends TLV1Binding {
    handleId: keyof ArrowShape['handles'];
    distance: number;
    point: number[];
}
type TDBinding = ArrowBinding;
interface ImageShape extends TDBaseShape {
    type: TDShapeType.Image;
    size: number[];
    assetId: string;
}
interface VideoShape extends TDBaseShape {
    type: TDShapeType.Video;
    size: number[];
    assetId: string;
    isPlaying: boolean;
    currentTime: number;
}
interface TextShape extends TDBaseShape {
    type: TDShapeType.Text;
    text: string;
}
interface StickyShape extends TDBaseShape {
    type: TDShapeType.Sticky;
    size: number[];
    text: string;
}
interface GroupShape extends TDBaseShape {
    type: TDShapeType.Group;
    size: number[];
    children: string[];
}
type TDShape = ArrowShape | DrawShape | EllipseShape | GroupShape | ImageShape | RectangleShape | StickyShape | TextShape | TriangleShape | VideoShape;
type TDPage = {
    id: string;
    name?: string;
    childIndex?: number;
    shapes: Record<string, TDShape>;
    bindings: Record<string, TDBinding>;
};
interface TLV1Bounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    width: number;
    height: number;
    rotation?: number;
}
interface TLV1PageState {
    id: string;
    selectedIds: string[];
    camera: {
        point: number[];
        zoom: number;
    };
    brush?: null | TLV1Bounds;
    pointedId?: null | string;
    hoveredId?: null | string;
    editingId?: null | string;
    bindingId?: null | string;
}
declare enum TDAssetType {
    Image = "image",
    Video = "video"
}
interface TDImageAsset extends TLV1Asset {
    type: TDAssetType.Image;
    fileName: string;
    src: string;
    size: number[];
}
interface TDVideoAsset extends TLV1Asset {
    type: TDAssetType.Video;
    fileName: string;
    src: string;
    size: number[];
}
interface TLV1Asset {
    id: string;
    type: string;
}
type TDAsset = TDImageAsset | TDVideoAsset;
type TDAssets = Record<string, TDAsset>;
/** @internal */
export interface LegacyTldrawDocument {
    id: string;
    name: string;
    version: number;
    pages: Record<string, TDPage>;
    pageStates: Record<string, TLV1PageState>;
    assets: TDAssets;
}
export {};
//# sourceMappingURL=buildFromV1Document.d.ts.map