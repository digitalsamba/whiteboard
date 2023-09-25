import React, { FC } from 'react';
type PopoverProps = {
    id: string;
    open?: boolean;
    children: React.ReactNode;
    onOpenChange?: (isOpen: boolean) => void;
};
export declare const Popover: FC<PopoverProps>;
export declare const PopoverTrigger: FC<{
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}>;
export declare const PopoverContent: FC<{
    children: React.ReactNode;
    side: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    sideOffset?: number;
}>;
export {};
//# sourceMappingURL=Popover.d.ts.map