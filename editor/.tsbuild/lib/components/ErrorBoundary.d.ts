import * as React from 'react';
import { TLErrorFallbackComponent } from './default-components/DefaultErrorFallback';
/** @public */
export interface TLErrorBoundaryProps {
    children: React.ReactNode;
    onError?: ((error: unknown) => void) | null;
    fallback: TLErrorFallbackComponent;
}
type TLErrorBoundaryState = {
    error: Error | null;
};
/** @public */
export declare class ErrorBoundary extends React.Component<React.PropsWithRef<React.PropsWithChildren<TLErrorBoundaryProps>>, TLErrorBoundaryState> {
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    state: TLErrorBoundaryState;
    componentDidCatch(error: unknown): void;
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
}
/** @internal */
export declare function OptionalErrorBoundary({ children, fallback, ...props }: Omit<TLErrorBoundaryProps, 'fallback'> & {
    fallback: TLErrorFallbackComponent;
}): JSX.Element;
export {};
//# sourceMappingURL=ErrorBoundary.d.ts.map