import { BaseRecord, RecordId } from '@tldraw/store';
import { JsonObject } from '@tldraw/utils';
import { T } from '@tldraw/validate';
import { Box2dModel } from '../misc/geometry-types';
import { TLCursor } from '../misc/TLCursor';
import { TLOpacityType } from '../misc/TLOpacity';
import { TLScribble } from '../misc/TLScribble';
import { StyleProp } from '../styles/StyleProp';
import { TLPageId } from './TLPage';
/**
 * TLInstance
 *
 * State that is particular to a single browser tab
 *
 * @public
 */
export interface TLInstance extends BaseRecord<'instance', TLInstanceId> {
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
export type TLInstanceId = RecordId<TLInstance>;
/** @internal */
export declare const instanceIdValidator: T.Validator<TLInstanceId>;
export declare function createInstanceRecordType(stylesById: Map<string, StyleProp<unknown>>): import("@tldraw/store").RecordType<TLInstance, "currentPageId">;
/** @internal */
export declare const instanceVersions: {
    readonly AddTransparentExportBgs: 1;
    readonly RemoveDialog: 2;
    readonly AddToolLockMode: 3;
    readonly RemoveExtraPropsForNextShape: 4;
    readonly AddLabelColor: 5;
    readonly AddFollowingUserId: 6;
    readonly RemoveAlignJustify: 7;
    readonly AddZoom: 8;
    readonly AddVerticalAlign: 9;
    readonly AddScribbleDelay: 10;
    readonly RemoveUserId: 11;
    readonly AddIsPenModeAndIsGridMode: 12;
    readonly HoistOpacity: 13;
    readonly AddChat: 14;
    readonly AddHighlightedUserIds: 15;
    readonly ReplacePropsForNextShapeWithStylesForNextShape: 16;
    readonly AddMeta: 17;
    readonly RemoveCursorColor: 18;
    readonly AddLonelyProperties: 19;
    readonly ReadOnlyReadonly: 20;
};
/** @public */
export declare const instanceMigrations: import("@tldraw/store").Migrations;
/** @public */
export declare const TLINSTANCE_ID: TLInstanceId;
//# sourceMappingURL=TLInstance.d.ts.map