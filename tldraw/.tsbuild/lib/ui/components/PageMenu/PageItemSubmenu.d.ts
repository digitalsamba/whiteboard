/// <reference types="react" />
export interface PageItemSubmenuProps {
    index: number;
    item: {
        id: string;
        name: string;
    };
    listSize: number;
    onRename?: () => void;
}
export declare const PageItemSubmenu: import("react").MemoExoticComponent<({ index, listSize, item, onRename, }: PageItemSubmenuProps) => JSX.Element>;
//# sourceMappingURL=PageItemSubmenu.d.ts.map