import { VecLike } from '@tldraw/editor';
import { TLUiEventSource } from './useEventsProvider';
/** @public */
export declare const isValidHttpURL: (url: string) => boolean;
/** @public */
export declare function useMenuClipboardEvents(): {
    copy: (source: TLUiEventSource) => void;
    cut: (source: TLUiEventSource) => void;
    paste: (data: ClipboardItem[] | DataTransfer, source: TLUiEventSource, point?: VecLike) => Promise<void>;
};
/** @public */
export declare function useNativeClipboardEvents(): void;
//# sourceMappingURL=useClipboardEvents.d.ts.map