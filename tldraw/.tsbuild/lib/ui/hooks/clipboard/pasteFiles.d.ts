import { Editor, TLExternalContentSource, VecLike } from '@tldraw/editor';
/**
 * When the clipboard has a file, create an image shape from the file and paste it into the scene
 *
 * @param editor - The editor instance.
 * @param urls - The file urls.
 * @param point - (optional) The point at which to paste the file.
 * @internal
 */
export declare function pasteFiles(editor: Editor, urls: string[], point?: VecLike, sources?: TLExternalContentSource[]): Promise<void>;
//# sourceMappingURL=pasteFiles.d.ts.map