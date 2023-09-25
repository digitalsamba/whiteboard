import { BaseRecord, RecordId } from '@tldraw/store';
import { JsonObject } from '@tldraw/utils';
import { T } from '@tldraw/validate';
import { Box2dModel } from '../misc/geometry-types';
import { TLCursor } from '../misc/TLCursor';
import { TLScribble } from '../misc/TLScribble';
import { TLPageId } from './TLPage';
import { TLShapeId } from './TLShape';
/** @public */
export interface TLInstancePresence extends BaseRecord<'instance_presence', TLInstancePresenceID> {
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
    scribble: TLScribble | null;
    screenBounds: Box2dModel;
    followingUserId: string | null;
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
export type TLInstancePresenceID = RecordId<TLInstancePresence>;
/** @internal */
export declare const instancePresenceValidator: T.Validator<TLInstancePresence>;
/** @internal */
export declare const instancePresenceVersions: {
    readonly AddScribbleDelay: 1;
    readonly RemoveInstanceId: 2;
    readonly AddChatMessage: 3;
    readonly AddMeta: 4;
    readonly RenameSelectedShapeIds: 5;
};
export declare const instancePresenceMigrations: import("@tldraw/store").Migrations;
/** @public */
export declare const InstancePresenceRecordType: import("@tldraw/store").RecordType<TLInstancePresence, "currentPageId" | "userId" | "userName">;
//# sourceMappingURL=TLPresence.d.ts.map