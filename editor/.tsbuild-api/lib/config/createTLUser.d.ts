import { Signal } from '@tldraw/state';
import { TLInstancePresence, TLStore } from '@tldraw/tlschema';
import { TLUserPreferences } from './TLUserPreferences';
/** @public */
export interface TLUser {
    readonly derivePresenceState: (store: TLStore) => Signal<null | TLInstancePresence>;
    readonly userPreferences: Signal<TLUserPreferences>;
    readonly setUserPreferences: (userPreferences: TLUserPreferences) => void;
}
/** @public */
export declare function createTLUser(opts?: {
    /** @internal */
    derivePresenceState?: ((store: TLStore) => Signal<null | TLInstancePresence>) | undefined;
    userPreferences?: Signal<TLUserPreferences, unknown> | undefined;
    setUserPreferences?: ((userPreferences: TLUserPreferences) => void) | undefined;
}): TLUser;
//# sourceMappingURL=createTLUser.d.ts.map