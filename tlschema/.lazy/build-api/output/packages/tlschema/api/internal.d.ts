import { BaseRecord } from '@tldraw/store';
import { Expand } from '@tldraw/utils';
import { JsonObject } from '@tldraw/utils';
import { Migrations } from '@tldraw/store';
import { RecordId } from '@tldraw/store';
import { RecordType } from '@tldraw/store';
import { SerializedStore } from '@tldraw/store';
import { Signal } from '@tldraw/state';
import { Store } from '@tldraw/store';
import { StoreSchema } from '@tldraw/store';
import { StoreSnapshot } from '@tldraw/store';
import { T } from '@tldraw/validate';
import { UnknownRecord } from '@tldraw/store';

/** @public */
export declare const ArrowShapeArrowheadEndStyle: EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;

/** @public */
export declare const ArrowShapeArrowheadStartStyle: EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;

/** @internal */
export declare const arrowShapeMigrations: Migrations;

/** @public */
export declare const arrowShapeProps: {
    labelColor: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    fill: EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
    dash: EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
    size: EnumStyleProp<"l" | "m" | "s" | "xl">;
    arrowheadStart: EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;
    arrowheadEnd: EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;
    font: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
    start: T.UnionValidator<"type", {
        binding: T.ObjectValidator<{
            type: "binding";
            boundShapeId: TLShapeId;
            normalizedAnchor: Vec2dModel;
            isExact: boolean;
        }>;
        point: T.ObjectValidator<{
            type: "point";
            x: number;
            y: number;
        }>;
    }, never>;
    end: T.UnionValidator<"type", {
        binding: T.ObjectValidator<{
            type: "binding";
            boundShapeId: TLShapeId;
            normalizedAnchor: Vec2dModel;
            isExact: boolean;
        }>;
        point: T.ObjectValidator<{
            type: "point";
            x: number;
            y: number;
        }>;
    }, never>;
    bend: T.Validator<number>;
    text: T.Validator<string>;
};

/** @public */
declare const ArrowShapeTerminal: T.UnionValidator<"type", {
    binding: T.ObjectValidator<{
        type: "binding";
        boundShapeId: TLShapeId;
        normalizedAnchor: Vec2dModel;
        isExact: boolean;
    }>;
    point: T.ObjectValidator<{
        type: "point";
        x: number;
        y: number;
    }>;
}, never>;

/**
 * A validator for asset record type Ids.
 *
 * @public */
export declare const assetIdValidator: T.Validator<TLAssetId>;

/** @internal */
export declare const assetMigrations: Migrations;

/** @public */
export declare const AssetRecordType: RecordType<TLAsset, "props" | "type">;

/** @internal */
export declare const assetValidator: T.Validator<TLAsset>;

/** @internal */
export declare const bookmarkShapeMigrations: Migrations;

/** @public */
export declare const bookmarkShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    assetId: T.Validator<TLAssetId | null>;
    url: T.Validator<string>;
};

/**
 * A serializable model for 2D boxes.
 *
 * @public */
export declare interface Box2dModel {
    x: number;
    y: number;
    w: number;
    h: number;
}

/** @public */
export declare const box2dModelValidator: T.Validator<Box2dModel>;

/** @public */
export declare const CameraRecordType: RecordType<TLCamera, never>;

/**
 * A validator for the colors used by tldraw's default shapes.
 *
 * @public */
export declare const canvasUiColorTypeValidator: T.Validator<"accent" | "black" | "laser" | "muted-1" | "selection-fill" | "selection-stroke" | "white">;

/** @internal */
export declare function CLIENT_FIXUP_SCRIPT(persistedStore: SerializedStore<TLRecord>): SerializedStore<TLRecord>;

declare const colors: readonly ["black", "grey", "light-violet", "violet", "blue", "light-blue", "yellow", "orange", "green", "light-green", "light-red", "red"];

/**
 * Create a validator for an asset record type.
 *
 * @param type - The type of the asset
 * @param props - The validator for the asset's props
 *
 * @public */
export declare function createAssetValidator<Type extends string, Props extends JsonObject>(type: Type, props: T.Validator<Props>): T.ObjectValidator<{
    id: TLAssetId;
    typeName: 'asset';
    type: Type;
    props: Props;
    meta: JsonObject;
}>;

/** @public */
export declare const createPresenceStateDerivation: ($user: Signal<{
    id: string;
    color: string;
    name: string;
}>, instanceId?: TLInstancePresence['id']) => (store: TLStore) => Signal<null | TLInstancePresence>;

/** @public */
export declare function createShapeId(id?: string): TLShapeId;

/** @public */
export declare function createShapeValidator<Type extends string, Props extends JsonObject, Meta extends JsonObject>(type: Type, props?: {
    [K in keyof Props]: T.Validatable<Props[K]>;
}, meta?: {
    [K in keyof Meta]: T.Validatable<Meta[K]>;
}): T.ObjectValidator<TLBaseShape<Type, Props>>;

/**
 * Create a TLSchema with custom shapes. Custom shapes cannot override default shapes.
 *
 * @param opts - Options
 *
 * @public */
export declare function createTLSchema({ shapes }: {
    shapes: Record<string, SchemaShapeInfo>;
}): TLSchema;

/** @public */
export declare const DefaultColorStyle: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;

/** @public */
export declare const DefaultColorThemePalette: {
    lightMode: TLDefaultColorTheme;
    darkMode: TLDefaultColorTheme;
};

/** @public */
export declare const DefaultDashStyle: EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;

/** @public */
export declare const DefaultFillStyle: EnumStyleProp<"none" | "pattern" | "semi" | "solid">;

/** @public */
export declare const DefaultFontFamilies: {
    draw: string;
    sans: string;
    serif: string;
    mono: string;
};

/** @public */
export declare const DefaultFontStyle: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;

/** @public */
export declare const DefaultHorizontalAlignStyle: EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;

/** @public */
export declare const DefaultSizeStyle: EnumStyleProp<"l" | "m" | "s" | "xl">;

/** @public */
export declare const DefaultVerticalAlignStyle: EnumStyleProp<"end" | "middle" | "start">;

/** @public */
export declare const DocumentRecordType: RecordType<TLDocument, never>;

/** @internal */
export declare const drawShapeMigrations: Migrations;

/** @public */
export declare const drawShapeProps: {
    color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    fill: EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
    dash: EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
    size: EnumStyleProp<"l" | "m" | "s" | "xl">;
    segments: T.ArrayOfValidator<{
        type: "free" | "straight";
        points: Vec2dModel[];
    }>;
    isComplete: T.Validator<boolean>;
    isClosed: T.Validator<boolean>;
    isPen: T.Validator<boolean>;
};

declare const DrawShapeSegment: T.ObjectValidator<{
    type: "free" | "straight";
    points: Vec2dModel[];
}>;

/** @public */
export declare const EMBED_DEFINITIONS: readonly [{
    readonly type: "tldraw";
    readonly title: "tldraw";
    readonly hostnames: readonly ["beta.tldraw.com", "tldraw.com"];
    readonly minWidth: 300;
    readonly minHeight: 300;
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: true;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "figma";
    readonly title: "Figma";
    readonly hostnames: readonly ["figma.com"];
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: true;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "google_maps";
    readonly title: "Google Maps";
    readonly hostnames: readonly ["google.*"];
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "val_town";
    readonly title: "Val Town";
    readonly hostnames: readonly ["val.town"];
    readonly minWidth: 260;
    readonly minHeight: 100;
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "codesandbox";
    readonly title: "CodeSandbox";
    readonly hostnames: readonly ["codesandbox.io"];
    readonly minWidth: 300;
    readonly minHeight: 300;
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "codepen";
    readonly title: "Codepen";
    readonly hostnames: readonly ["codepen.io"];
    readonly minWidth: 300;
    readonly minHeight: 300;
    readonly width: 520;
    readonly height: 400;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "scratch";
    readonly title: "Scratch";
    readonly hostnames: readonly ["scratch.mit.edu"];
    readonly width: 520;
    readonly height: 400;
    readonly doesResize: false;
    readonly canUnmount: false;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "youtube";
    readonly title: "YouTube";
    readonly hostnames: readonly ["*.youtube.com", "youtube.com", "youtu.be"];
    readonly width: 800;
    readonly height: 450;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly overridePermissions: {
        readonly 'allow-presentation': true;
    };
    readonly isAspectRatioLocked: true;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "google_calendar";
    readonly title: "Google Calendar";
    readonly hostnames: readonly ["calendar.google.*"];
    readonly width: 720;
    readonly height: 500;
    readonly minWidth: 460;
    readonly minHeight: 360;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly instructionLink: "https://support.google.com/calendar/answer/41207?hl=en";
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "google_slides";
    readonly title: "Google Slides";
    readonly hostnames: readonly ["docs.google.*"];
    readonly width: 720;
    readonly height: 500;
    readonly minWidth: 460;
    readonly minHeight: 360;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "github_gist";
    readonly title: "GitHub Gist";
    readonly hostnames: readonly ["gist.github.com"];
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: true;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "replit";
    readonly title: "Replit";
    readonly hostnames: readonly ["replit.com"];
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "felt";
    readonly title: "Felt";
    readonly hostnames: readonly ["felt.com"];
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "spotify";
    readonly title: "Spotify";
    readonly hostnames: readonly ["open.spotify.com"];
    readonly width: 720;
    readonly height: 500;
    readonly minHeight: 500;
    readonly overrideOutlineRadius: 12;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "vimeo";
    readonly title: "Vimeo";
    readonly hostnames: readonly ["vimeo.com", "player.vimeo.com"];
    readonly width: 640;
    readonly height: 360;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly isAspectRatioLocked: true;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "excalidraw";
    readonly title: "Excalidraw";
    readonly hostnames: readonly ["excalidraw.com"];
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly isAspectRatioLocked: true;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}, {
    readonly type: "observable";
    readonly title: "Observable";
    readonly hostnames: readonly ["observablehq.com"];
    readonly width: 720;
    readonly height: 500;
    readonly doesResize: true;
    readonly canUnmount: false;
    readonly isAspectRatioLocked: false;
    readonly backgroundColor: "#fff";
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
}];

/** @public */
export declare type EmbedDefinition = {
    readonly type: string;
    readonly title: string;
    readonly hostnames: readonly string[];
    readonly minWidth?: number;
    readonly minHeight?: number;
    readonly width: number;
    readonly height: number;
    readonly doesResize: boolean;
    readonly canUnmount: boolean;
    readonly isAspectRatioLocked?: boolean;
    readonly overridePermissions?: TLEmbedShapePermissions;
    readonly instructionLink?: string;
    readonly backgroundColor?: string;
    readonly overrideOutlineRadius?: number;
    readonly toEmbedUrl: (url: string) => string | undefined;
    readonly fromEmbedUrl: (url: string) => string | undefined;
};

/** @internal */
export declare const embedShapeMigrations: Migrations;

/**
 * Permissions with note inline from
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox
 *
 * @public
 */
export declare const embedShapePermissionDefaults: {
    readonly 'allow-downloads-without-user-activation': false;
    readonly 'allow-downloads': false;
    readonly 'allow-modals': false;
    readonly 'allow-orientation-lock': false;
    readonly 'allow-pointer-lock': false;
    readonly 'allow-popups': true;
    readonly 'allow-popups-to-escape-sandbox': false;
    readonly 'allow-presentation': false;
    readonly 'allow-storage-access-by-user-activation': false;
    readonly 'allow-top-navigation': false;
    readonly 'allow-top-navigation-by-user-activation': false;
    readonly 'allow-scripts': true;
    readonly 'allow-same-origin': true;
    readonly 'allow-forms': true;
};

/** @public */
export declare const embedShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    url: T.Validator<string>;
};

/**
 * See {@link StyleProp} & {@link StyleProp.defineEnum}
 *
 * @public
 */
export declare class EnumStyleProp<T> extends StyleProp<T> {
    readonly values: readonly T[];
    /** @internal */
    constructor(id: string, defaultValue: T, values: readonly T[]);
}

/** @internal */
export declare function fixupRecord(oldRecord: TLRecord): {
    record: any;
    issues: string[];
};

/** @internal */
export declare const frameShapeMigrations: Migrations;

/** @public */
export declare const frameShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    name: T.Validator<string>;
};

/** @public */
export declare const GeoShapeGeoStyle: EnumStyleProp<"arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box">;

/** @internal */
export declare const geoShapeMigrations: Migrations;

/** @public */
export declare const geoShapeProps: {
    geo: EnumStyleProp<"arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box">;
    labelColor: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    fill: EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
    dash: EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
    size: EnumStyleProp<"l" | "m" | "s" | "xl">;
    font: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
    align: EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
    verticalAlign: EnumStyleProp<"end" | "middle" | "start">;
    url: T.Validator<string>;
    w: T.Validator<number>;
    h: T.Validator<number>;
    growY: T.Validator<number>;
    text: T.Validator<string>;
};

/** @public */
export declare function getDefaultColorTheme(opts: {
    isDarkMode: boolean;
}): TLDefaultColorTheme;

/** @public */
export declare function getDefaultTranslationLocale(): TLLanguage['locale'];

/** @internal */
export declare function getShapePropKeysByStyle(props: Record<string, T.Validatable<any>>): Map<StyleProp<unknown>, string>;

/** @internal */
export declare const groupShapeMigrations: Migrations;

/** @internal */
export declare const groupShapeProps: ShapeProps<TLGroupShape>;

/** @internal */
export declare const highlightShapeMigrations: Migrations;

/** @public */
export declare const highlightShapeProps: {
    color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    size: EnumStyleProp<"l" | "m" | "s" | "xl">;
    segments: T.ArrayOfValidator<{
        type: "free" | "straight";
        points: Vec2dModel[];
    }>;
    isComplete: T.Validator<boolean>;
    isPen: T.Validator<boolean>;
};

declare type Identity<T> = {
    [K in keyof T]: T[K];
};

/** @internal */
export declare function idValidator<Id extends RecordId<UnknownRecord>>(prefix: Id['__type__']['typeName']): T.Validator<Id>;

/** @public */
declare const ImageShapeCrop: T.ObjectValidator<{
    topLeft: Vec2dModel;
    bottomRight: Vec2dModel;
}>;

/** @internal */
export declare const imageShapeMigrations: Migrations;

/** @public */
export declare const imageShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    playing: T.Validator<boolean>;
    url: T.Validator<string>;
    assetId: T.Validator<TLAssetId | null>;
    crop: T.Validator<{
        topLeft: Vec2dModel;
        bottomRight: Vec2dModel;
    } | null>;
};

/** @public */
export declare const InstancePageStateRecordType: RecordType<TLInstancePageState, "pageId">;

/** @public */
export declare const InstancePresenceRecordType: RecordType<TLInstancePresence, "currentPageId" | "userId" | "userName">;

/** @public */
export declare function isPageId(id: string): id is TLPageId;

/** @public */
export declare function isShape(record?: UnknownRecord): record is TLShape;

/** @public */
export declare function isShapeId(id?: string): id is TLShapeId;

/** @public */
export declare const LANGUAGES: readonly [{
    readonly locale: "ar";
    readonly label: "عربي";
}, {
    readonly locale: "ca";
    readonly label: "Català";
}, {
    readonly locale: "da";
    readonly label: "Danish";
}, {
    readonly locale: "de";
    readonly label: "Deutsch";
}, {
    readonly locale: "en";
    readonly label: "English";
}, {
    readonly locale: "es";
    readonly label: "Español";
}, {
    readonly locale: "fa";
    readonly label: "فارسی";
}, {
    readonly locale: "fi";
    readonly label: "Suomi";
}, {
    readonly locale: "fr";
    readonly label: "Français";
}, {
    readonly locale: "gl";
    readonly label: "Galego";
}, {
    readonly locale: "he";
    readonly label: "עברית";
}, {
    readonly locale: "it";
    readonly label: "Italiano";
}, {
    readonly locale: "ja";
    readonly label: "日本語";
}, {
    readonly locale: "ko-kr";
    readonly label: "한국어";
}, {
    readonly locale: "ku";
    readonly label: "کوردی";
}, {
    readonly locale: "hi-in";
    readonly label: "हिन्दी";
}, {
    readonly locale: "hu";
    readonly label: "Magyar";
}, {
    readonly locale: "my";
    readonly label: "မြန်မာစာ";
}, {
    readonly locale: "ne";
    readonly label: "नेपाली";
}, {
    readonly locale: "no";
    readonly label: "Norwegian";
}, {
    readonly locale: "pl";
    readonly label: "Polski";
}, {
    readonly locale: "pt-br";
    readonly label: "Português - Brasil";
}, {
    readonly locale: "pt-pt";
    readonly label: "Português - Europeu";
}, {
    readonly locale: "ro";
    readonly label: "Română";
}, {
    readonly locale: "ru";
    readonly label: "Russian";
}, {
    readonly locale: "sv";
    readonly label: "Svenska";
}, {
    readonly locale: "te";
    readonly label: "తెలుగు";
}, {
    readonly locale: "th";
    readonly label: "ภาษาไทย";
}, {
    readonly locale: "tr";
    readonly label: "Türkçe";
}, {
    readonly locale: "uk";
    readonly label: "Ukrainian";
}, {
    readonly locale: "vi";
    readonly label: "Tiếng Việt";
}, {
    readonly locale: "zh-cn";
    readonly label: "Chinese - Simplified";
}, {
    readonly locale: "zh-tw";
    readonly label: "繁體中文 (台灣)";
}];

/** @internal */
export declare const lineShapeMigrations: Migrations;

/** @public */
export declare const lineShapeProps: {
    color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    dash: EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
    size: EnumStyleProp<"l" | "m" | "s" | "xl">;
    spline: EnumStyleProp<"cubic" | "line">;
    handles: T.DictValidator<string, TLHandle>;
};

/** @public */
export declare const LineShapeSplineStyle: EnumStyleProp<"cubic" | "line">;

/** @internal */
export declare const noteShapeMigrations: Migrations;

/** @public */
export declare const noteShapeProps: {
    color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    size: EnumStyleProp<"l" | "m" | "s" | "xl">;
    font: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
    align: EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
    verticalAlign: EnumStyleProp<"end" | "middle" | "start">;
    growY: T.Validator<number>;
    url: T.Validator<string>;
    text: T.Validator<string>;
};

/** @internal */
export declare const opacityValidator: T.Validator<number>;

/** @internal */
export declare const pageIdValidator: T.Validator<TLPageId>;

/** @public */
export declare const PageRecordType: RecordType<TLPage, "index" | "name">;

/** @public */
export declare const parentIdValidator: T.Validator<TLParentId>;

/** @public */
export declare const PointerRecordType: RecordType<TLPointer, never>;

/** @internal */
export declare const rootShapeMigrations: Migrations;

/** @public */
export declare type SchemaShapeInfo = {
    migrations?: Migrations;
    props?: Record<string, {
        validate: (prop: any) => any;
    }>;
    meta?: Record<string, {
        validate: (prop: any) => any;
    }>;
};

/** @internal */
export declare const scribbleValidator: T.Validator<TLScribble>;

/** @public */
declare type SetValue<T extends Set<any>> = T extends Set<infer U> ? U : never;

/** @public */
export declare const shapeIdValidator: T.Validator<TLShapeId>;

/** @public */
export declare type ShapeProps<Shape extends TLBaseShape<any, any>> = {
    [K in keyof Shape['props']]: T.Validatable<Shape['props'][K]>;
};

declare type ShapePropsType<Config extends Record<string, T.Validatable<any>>> = Expand<{
    [K in keyof Config]: T.TypeOf<Config[K]>;
}>;

/**
 * A `StyleProp` is a property of a shape that follows some special rules.
 *
 * 1. The same value can be set on lots of shapes at the same time.
 *
 * 2. The last used value is automatically saved and applied to new shapes.
 *
 * For example, {@link DefaultColorStyle} is a style prop used by tldraw's default shapes to set
 * their color. If you try selecting several shapes on tldraw.com and changing their color, you'll
 * see that the color is applied to all of them. Then, if you draw a new shape, it'll have the same
 * color as the one you just set.
 *
 * You can use styles in your own shapes by either defining your own (see {@link StyleProp.define}
 * and {@link StyleProp.defineEnum}) or using tldraw's default ones, like {@link DefaultColorStyle}.
 * When you define a shape, pass a `props` object describing all of your shape's properties, using
 * `StyleProp`s for the ones you want to be styles. See the
 * {@link https://github.com/tldraw/tldraw/tree/main/apps/examples/src/16-custom-styles | custom styles example}
 * for more.
 *
 * @public
 */
export declare class StyleProp<Type> implements T.Validatable<Type> {
    readonly id: string;
    readonly defaultValue: Type;
    readonly type: T.Validatable<Type>;
    /**
     * Define a new {@link StyleProp}.
     *
     * @param uniqueId - Each StyleProp must have a unique ID. We recommend you prefix this with
     * your app/library name.
     * @param options -
     * - `defaultValue`: The default value for this style prop.
     *
     * - `type`: Optionally, describe what type of data you expect for this style prop.
     *
     * @example
     * ```ts
     * import {T} from '@tldraw/validate'
     * import {StyleProp} from '@tldraw/tlschema'
     *
     * const MyLineWidthProp = StyleProp.define('myApp:lineWidth', {
     *   defaultValue: 1,
     *   type: T.number,
     * })
     * ```
     * @public
     */
    static define<Type>(uniqueId: string, options: {
        defaultValue: Type;
        type?: T.Validatable<Type>;
    }): StyleProp<Type>;
    /**
     * Define a new {@link StyleProp} as a list of possible values.
     *
     * @param uniqueId - Each StyleProp must have a unique ID. We recommend you prefix this with
     * your app/library name.
     * @param options -
     * - `defaultValue`: The default value for this style prop.
     *
     * - `values`: An array of possible values of this style prop.
     *
     * @example
     * ```ts
     * import {StyleProp} from '@tldraw/tlschema'
     *
     * const MySizeProp = StyleProp.defineEnum('myApp:size', {
     *   defaultValue: 'medium',
     *   values: ['small', 'medium', 'large'],
     * })
     * ```
     */
    static defineEnum<const Values extends readonly unknown[]>(uniqueId: string, options: {
        defaultValue: Values[number];
        values: Values;
    }): EnumStyleProp<Values[number]>;
    /** @internal */
    protected constructor(id: string, defaultValue: Type, type: T.Validatable<Type>);
    validate(value: unknown): Type;
}

/** @internal */
export declare const textShapeMigrations: Migrations;

/** @public */
export declare const textShapeProps: {
    color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
    size: EnumStyleProp<"l" | "m" | "s" | "xl">;
    font: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
    align: EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
    w: T.Validator<number>;
    text: T.Validator<string>;
    scale: T.Validator<number>;
    autoSize: T.Validator<boolean>;
};

/**
 * The colors used by tldraw's default shapes.
 *
 *  @public */
export declare const TL_CANVAS_UI_COLOR_TYPES: Set<"accent" | "black" | "laser" | "muted-1" | "selection-fill" | "selection-stroke" | "white">;

/**
 * The cursor types used by tldraw's default shapes.
 *
 * @public */
declare const TL_CURSOR_TYPES: Set<string>;

/**
 * The handle types used by tldraw's default shapes.
 *
 * @public */
declare const TL_HANDLE_TYPES: Set<"create" | "vertex" | "virtual">;

/**
 * The scribble states used by tldraw.
 *
 *  @public */
declare const TL_SCRIBBLE_STATES: Set<"active" | "paused" | "starting" | "stopping">;

/** @public */
export declare type TLArrowShape = TLBaseShape<'arrow', TLArrowShapeProps>;

/** @public */
export declare type TLArrowShapeArrowheadStyle = T.TypeOf<typeof ArrowShapeArrowheadStartStyle>;

/** @public */
export declare type TLArrowShapeProps = ShapePropsType<typeof arrowShapeProps>;

/** @public */
export declare type TLArrowShapeTerminal = T.TypeOf<typeof ArrowShapeTerminal>;

/** @public */
export declare type TLAsset = TLBookmarkAsset | TLImageAsset | TLVideoAsset;

/** @public */
export declare type TLAssetId = RecordId<TLBaseAsset<any, any>>;

/** @public */
export declare type TLAssetPartial<T extends TLAsset = TLAsset> = T extends T ? {
    id: TLAssetId;
    type: T['type'];
    props?: Partial<T['props']>;
    meta?: Partial<T['meta']>;
} & Partial<Omit<T, 'id' | 'meta' | 'props' | 'type'>> : never;

/** @public */
export declare type TLAssetShape = Extract<TLShape, {
    props: {
        assetId: TLAssetId;
    };
}>;

/** @public */
export declare interface TLBaseAsset<Type extends string, Props> extends BaseRecord<'asset', TLAssetId> {
    type: Type;
    props: Props;
    meta: JsonObject;
}

/** @public */
export declare interface TLBaseShape<Type extends string, Props extends object> extends BaseRecord<'shape', TLShapeId> {
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

/**
 * An asset used for URL bookmarks, used by the TLBookmarkShape.
 *
 *  @public */
export declare type TLBookmarkAsset = TLBaseAsset<'bookmark', {
    title: string;
    description: string;
    image: string;
    src: null | string;
}>;

/** @public */
export declare type TLBookmarkShape = TLBaseShape<'bookmark', TLBookmarkShapeProps>;

/** @public */
declare type TLBookmarkShapeProps = ShapePropsType<typeof bookmarkShapeProps>;

/**
 * A camera record.
 *
 * @public
 */
export declare interface TLCamera extends BaseRecord<'camera', TLCameraId> {
    x: number;
    y: number;
    z: number;
    meta: JsonObject;
}

/**
 * The id of a camera record.
 *
 * @public */
export declare type TLCameraId = RecordId<TLCamera>;

/**
 * A type for the colors used by tldraw's default shapes.
 *
 *  @public */
export declare type TLCanvasUiColor = SetValue<typeof TL_CANVAS_UI_COLOR_TYPES>;

/**
 * A cursor used by tldraw.
 *
 *  @public */
export declare interface TLCursor {
    type: TLCursorType;
    rotation: number;
}

/**
 * A type for the cursor types used by tldraw's default shapes.
 *
 *  @public */
export declare type TLCursorType = SetValue<typeof TL_CURSOR_TYPES>;

/** @public */
export declare type TLDefaultColorStyle = T.TypeOf<typeof DefaultColorStyle>;

/** @public */
export declare type TLDefaultColorTheme = Expand<{
    id: 'dark' | 'light';
    text: string;
    background: string;
    solid: string;
} & Record<(typeof colors)[number], TLDefaultColorThemeColor>>;

/** @public */
export declare type TLDefaultColorThemeColor = {
    solid: string;
    semi: string;
    pattern: string;
    highlight: {
        srgb: string;
        p3: string;
    };
};

/** @public */
export declare type TLDefaultDashStyle = T.TypeOf<typeof DefaultDashStyle>;

/** @public */
export declare type TLDefaultFillStyle = T.TypeOf<typeof DefaultFillStyle>;

/** @public */
export declare type TLDefaultFontStyle = T.TypeOf<typeof DefaultFontStyle>;

/** @public */
export declare type TLDefaultHorizontalAlignStyle = T.TypeOf<typeof DefaultHorizontalAlignStyle>;

/**
 * The default set of shapes that are available in the editor.
 *
 * @public */
export declare type TLDefaultShape = TLArrowShape | TLBookmarkShape | TLDrawShape | TLEmbedShape | TLFrameShape | TLGeoShape | TLGroupShape | TLHighlightShape | TLImageShape | TLLineShape | TLNoteShape | TLTextShape | TLVideoShape;

/** @public */
export declare type TLDefaultSizeStyle = T.TypeOf<typeof DefaultSizeStyle>;

/** @public */
export declare type TLDefaultVerticalAlignStyle = T.TypeOf<typeof DefaultVerticalAlignStyle>;

/**
 * TLDocument
 *
 * @public
 */
export declare interface TLDocument extends BaseRecord<'document', RecordId<TLDocument>> {
    gridSize: number;
    name: string;
    meta: JsonObject;
}

/** @public */
export declare const TLDOCUMENT_ID: RecordId<TLDocument>;

/** @public */
export declare type TLDrawShape = TLBaseShape<'draw', TLDrawShapeProps>;

/** @public */
declare type TLDrawShapeProps = ShapePropsType<typeof drawShapeProps>;

/** @public */
export declare type TLDrawShapeSegment = T.TypeOf<typeof DrawShapeSegment>;

/** @public */
export declare type TLEmbedShape = TLBaseShape<'embed', TLEmbedShapeProps>;

/** @public */
export declare type TLEmbedShapePermissions = {
    [K in keyof typeof embedShapePermissionDefaults]?: boolean;
};

/** @public */
declare type TLEmbedShapeProps = ShapePropsType<typeof embedShapeProps>;

/** @public */
export declare type TLFrameShape = TLBaseShape<'frame', TLFrameShapeProps>;

declare type TLFrameShapeProps = ShapePropsType<typeof frameShapeProps>;

/** @public */
export declare type TLGeoShape = TLBaseShape<'geo', TLGeoShapeProps>;

/** @public */
declare type TLGeoShapeProps = ShapePropsType<typeof geoShapeProps>;

/** @public */
export declare type TLGroupShape = TLBaseShape<'group', TLGroupShapeProps>;

/** @public */
declare type TLGroupShapeProps = {
    [key in never]: undefined;
};

/**
 * A base interface for a shape's handles.
 *
 * @public
 */
export declare interface TLHandle {
    /** A unique identifier for the handle. */
    id: string;
    type: TLHandleType;
    canBind?: boolean;
    canSnap?: boolean;
    index: string;
    x: number;
    y: number;
}

/**
 * A type for the handle types used by tldraw's default shapes.
 *
 * @public */
export declare type TLHandleType = SetValue<typeof TL_HANDLE_TYPES>;

/** @public */
export declare type TLHighlightShape = TLBaseShape<'highlight', TLHighlightShapeProps>;

/** @public */
declare type TLHighlightShapeProps = ShapePropsType<typeof highlightShapeProps>;

/**
 * An asset for images such as PNGs and JPEGs, used by the TLImageShape.
 *
 * @public */
export declare type TLImageAsset = TLBaseAsset<'image', {
    w: number;
    h: number;
    name: string;
    isAnimated: boolean;
    mimeType: null | string;
    src: null | string;
}>;

/** @public */
export declare type TLImageShape = TLBaseShape<'image', TLImageShapeProps>;

/** @public */
export declare type TLImageShapeCrop = T.TypeOf<typeof ImageShapeCrop>;

/** @public */
export declare type TLImageShapeProps = ShapePropsType<typeof imageShapeProps>;

/**
 * TLInstance
 *
 * State that is particular to a single browser tab
 *
 * @public
 */
export declare interface TLInstance extends BaseRecord<'instance', TLInstanceId> {
    currentPageId: TLPageId;
    opacityForNextShape: TLOpacityType;
    stylesForNextShape: Record<string, unknown>;
    followingUserId: null | string;
    highlightedUserIds: string[];
    brush: Box2dModel | null;
    cursor: TLCursor;
    scribble: null | TLScribble;
    isFocusMode: boolean;
    isDebugMode: boolean;
    isToolLocked: boolean;
    exportBackground: boolean;
    screenBounds: Box2dModel;
    zoomBrush: Box2dModel | null;
    chatMessage: string;
    isChatting: boolean;
    isPenMode: boolean;
    isGridMode: boolean;
    canMoveCamera: boolean;
    isFocused: boolean;
    devicePixelRatio: number;
    isCoarsePointer: boolean;
    openMenus: string[];
    isChangingStyle: boolean;
    isReadonly: boolean;
    meta: JsonObject;
}

/** @public */
export declare const TLINSTANCE_ID: TLInstanceId;

/** @public */
export declare type TLInstanceId = RecordId<TLInstance>;

/**
 * TLInstancePageState
 *
 * State that is unique to a particular page of the document in a particular browser tab
 *
 * @public
 */
export declare interface TLInstancePageState extends BaseRecord<'instance_page_state', TLInstancePageStateId> {
    pageId: RecordId<TLPage>;
    selectedShapeIds: TLShapeId[];
    hintingShapeIds: TLShapeId[];
    erasingShapeIds: TLShapeId[];
    hoveredShapeId: null | TLShapeId;
    editingShapeId: null | TLShapeId;
    croppingShapeId: null | TLShapeId;
    focusedGroupId: null | TLShapeId;
    meta: JsonObject;
}

/** @public */
declare type TLInstancePageStateId = RecordId<TLInstancePageState>;

/** @public */
export declare interface TLInstancePresence extends BaseRecord<'instance_presence', TLInstancePresenceID> {
    userId: string;
    userName: string;
    lastActivityTimestamp: number;
    color: string;
    camera: {
        x: number;
        y: number;
        z: number;
    };
    selectedShapeIds: TLShapeId[];
    currentPageId: TLPageId;
    brush: Box2dModel | null;
    scribble: null | TLScribble;
    screenBounds: Box2dModel;
    followingUserId: null | string;
    cursor: {
        x: number;
        y: number;
        type: TLCursor['type'];
        rotation: number;
    };
    chatMessage: string;
    meta: JsonObject;
}

/** @public */
declare type TLInstancePresenceID = RecordId<TLInstancePresence>;

/** @public */
export declare type TLLanguage = (typeof LANGUAGES)[number];

/** @public */
export declare type TLLineShape = TLBaseShape<'line', TLLineShapeProps>;

/** @public */
declare type TLLineShapeProps = ShapePropsType<typeof lineShapeProps>;

/** @public */
export declare type TLNoteShape = TLBaseShape<'note', TLNoteShapeProps>;

/** @public */
declare type TLNoteShapeProps = ShapePropsType<typeof noteShapeProps>;

/** @public */
export declare type TLOpacityType = number;

/**
 * TLPage
 *
 * @public
 */
export declare interface TLPage extends BaseRecord<'page', TLPageId> {
    name: string;
    index: string;
    meta: JsonObject;
}

/** @public */
export declare type TLPageId = RecordId<TLPage>;

/** @public */
export declare type TLParentId = TLPageId | TLShapeId;

/**
 * TLPointer
 *
 * @public
 */
declare interface TLPointer extends BaseRecord<'pointer', TLPointerId> {
    x: number;
    y: number;
    lastActivityTimestamp: number;
    meta: JsonObject;
}

/** @public */
export declare const TLPOINTER_ID: TLPointerId;

/** @public */
declare type TLPointerId = RecordId<TLPointer>;

/** @public */
export declare type TLRecord = TLAsset | TLCamera | TLDocument | TLInstance | TLInstancePageState | TLInstancePresence | TLPage | TLPointer | TLShape;

/** @public */
export declare type TLSchema = StoreSchema<TLRecord, TLStoreProps>;

/**
 * A type for the scribble used by tldraw.
 *
 * @public */
export declare type TLScribble = {
    points: Vec2dModel[];
    size: number;
    color: TLCanvasUiColor;
    opacity: number;
    state: SetValue<typeof TL_SCRIBBLE_STATES>;
    delay: number;
};

/** @public */
export declare type TLSerializedStore = SerializedStore<TLRecord>;

/**
 * The set of all shapes that are available in the editor, including unknown shapes.
 *
 * @public
 */
export declare type TLShape = TLDefaultShape | TLUnknownShape;

/** @public */
export declare type TLShapeId = RecordId<TLUnknownShape>;

/** @public */
export declare type TLShapePartial<T extends TLShape = TLShape> = T extends T ? {
    id: TLShapeId;
    type: T['type'];
    props?: Partial<T['props']>;
    meta?: Partial<T['meta']>;
} & Partial<Omit<T, 'id' | 'meta' | 'props' | 'type'>> : never;

/** @public */
export declare type TLShapeProp = keyof TLShapeProps;

/** @public */
export declare type TLShapeProps = Identity<UnionToIntersection<TLDefaultShape['props']>>;

/** @public */
export declare type TLStore = Store<TLRecord, TLStoreProps>;

/** @public */
export declare type TLStoreProps = {
    defaultName: string;
};

/** @public */
export declare type TLStoreSchema = StoreSchema<TLRecord, TLStoreProps>;

/** @public */
export declare type TLStoreSnapshot = StoreSnapshot<TLRecord>;

/** @public */
export declare type TLTextShape = TLBaseShape<'text', TLTextShapeProps>;

/** @public */
export declare type TLTextShapeProps = ShapePropsType<typeof textShapeProps>;

/**
 * A type for a shape that is available in the editor but whose type is
 * unknown—either one of the editor's default shapes or else a custom shape.
 *
 * @public */
export declare type TLUnknownShape = TLBaseShape<string, object>;

/**
 * An asset used for videos, used by the TLVideoShape.
 *
 * @public */
export declare type TLVideoAsset = TLBaseAsset<'video', {
    w: number;
    h: number;
    name: string;
    isAnimated: boolean;
    mimeType: null | string;
    src: null | string;
}>;

/** @public */
export declare type TLVideoShape = TLBaseShape<'video', TLVideoShapeProps>;

/** @public */
declare type TLVideoShapeProps = ShapePropsType<typeof videoShapeProps>;

declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/**
 * A serializable model for 2D vectors.
 *
 * @public */
export declare interface Vec2dModel {
    x: number;
    y: number;
    z?: number;
}

/** @public */
export declare const vec2dModelValidator: T.Validator<Vec2dModel>;

/** @internal */
export declare const videoShapeMigrations: Migrations;

/** @public */
export declare const videoShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    time: T.Validator<number>;
    playing: T.Validator<boolean>;
    url: T.Validator<string>;
    assetId: T.Validator<TLAssetId | null>;
};

export { }
