import { Atom } from '@tldraw/state';
export declare function getAtomManager<T extends {
    [key: string]: any;
}>(atom: Atom<T>, transform?: (prev: T, next: T) => T): T;
//# sourceMappingURL=getRecordManager.d.ts.map