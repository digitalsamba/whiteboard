/// <reference types="react" />
import { TLShapeIndicatorComponent } from '../components/ShapeIndicator';
import { TLBackgroundComponent } from '../components/default-components/DefaultBackground';
import { TLBrushComponent } from '../components/default-components/DefaultBrush';
import { TLCollaboratorHintComponent } from '../components/default-components/DefaultCollaboratorHint';
import { TLCursorComponent } from '../components/default-components/DefaultCursor';
import { TLErrorFallbackComponent } from '../components/default-components/DefaultErrorFallback';
import { TLGridComponent } from '../components/default-components/DefaultGrid';
import { TLHandleComponent } from '../components/default-components/DefaultHandle';
import { TLHandlesComponent } from '../components/default-components/DefaultHandles';
import { TLHoveredShapeIndicatorComponent } from '../components/default-components/DefaultHoveredShapeIndicator';
import { TLScribbleComponent } from '../components/default-components/DefaultScribble';
import { TLSelectionBackgroundComponent } from '../components/default-components/DefaultSelectionBackground';
import { TLSelectionForegroundComponent } from '../components/default-components/DefaultSelectionForeground';
import { TLShapeErrorFallbackComponent } from '../components/default-components/DefaultShapeErrorFallback';
import { TLShapeIndicatorErrorFallbackComponent } from '../components/default-components/DefaultShapeIndicatorErrorFallback';
import { TLSnapLineComponent } from '../components/default-components/DefaultSnapLine';
import { TLSpinnerComponent } from '../components/default-components/DefaultSpinner';
import { TLSvgDefsComponent } from '../components/default-components/DefaultSvgDefs';
interface BaseEditorComponents {
    Background: TLBackgroundComponent;
    SvgDefs: TLSvgDefsComponent;
    Brush: TLBrushComponent;
    ZoomBrush: TLBrushComponent;
    Cursor: TLCursorComponent;
    CollaboratorBrush: TLBrushComponent;
    CollaboratorCursor: TLCursorComponent;
    CollaboratorHint: TLCollaboratorHintComponent;
    CollaboratorShapeIndicator: TLShapeIndicatorComponent;
    Grid: TLGridComponent;
    Scribble: TLScribbleComponent;
    CollaboratorScribble: TLScribbleComponent;
    SnapLine: TLSnapLineComponent;
    Handles: TLHandlesComponent;
    Handle: TLHandleComponent;
    Spinner: TLSpinnerComponent;
    SelectionForeground: TLSelectionForegroundComponent;
    SelectionBackground: TLSelectionBackgroundComponent;
    HoveredShapeIndicator: TLHoveredShapeIndicatorComponent;
}
/** @public */
export type TLEditorComponents = {
    [K in keyof BaseEditorComponents]: BaseEditorComponents[K] | null;
} & {
    ErrorFallback: TLErrorFallbackComponent;
    ShapeErrorFallback: TLShapeErrorFallbackComponent;
    ShapeIndicatorErrorFallback: TLShapeIndicatorErrorFallbackComponent;
};
type ComponentsContextProviderProps = {
    overrides?: Partial<TLEditorComponents>;
    children: any;
};
export declare function EditorComponentsProvider({ overrides, children }: ComponentsContextProviderProps): JSX.Element;
/** @public */
export declare function useEditorComponents(): TLEditorComponents;
export {};
//# sourceMappingURL=useEditorComponents.d.ts.map