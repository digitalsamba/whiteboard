import { Signal } from '@tldraw/state';
import { TLStore } from './TLStore';
import { TLInstancePresence } from './records/TLPresence';
/** @public */
export declare const createPresenceStateDerivation: ($user: Signal<{
    id: string;
    color: string;
    name: string;
}>, instanceId?: TLInstancePresence['id']) => (store: TLStore) => Signal<TLInstancePresence | null>;
//# sourceMappingURL=createPresenceStateDerivation.d.ts.map