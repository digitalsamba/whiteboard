import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
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
export type TLEmbedShapePermissions = {
    [K in keyof typeof embedShapePermissionDefaults]?: boolean;
};
/** @public */
export declare const embedShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    url: T.Validator<string>;
};
/** @public */
export type TLEmbedShapeProps = ShapePropsType<typeof embedShapeProps>;
/** @public */
export type TLEmbedShape = TLBaseShape<'embed', TLEmbedShapeProps>;
/** @public */
export type EmbedDefinition = {
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
export declare const embedShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLEmbedShape.d.ts.map