import { VecLike } from '../../../../primitives/Vec2d';
import { TLArrowInfo } from './arrow-types';
type TLArrowPointsInfo = {
    point: VecLike;
    int: VecLike;
};
export declare function getArrowhead({ point, int }: TLArrowPointsInfo): string;
export declare function getTriangleHead({ point, int }: TLArrowPointsInfo): string;
export declare function getInvertedTriangleHead({ point, int }: TLArrowPointsInfo): string;
export declare function getDotHead({ point, int }: TLArrowPointsInfo): string;
export declare function getDiamondHead({ point, int }: TLArrowPointsInfo): string;
export declare function getSquareHead({ int, point }: TLArrowPointsInfo): string;
export declare function getBarHead({ int, point }: TLArrowPointsInfo): string;
export declare function getPipeHead(): string;
/** @public */
export declare function getArrowheadPathForType(info: TLArrowInfo, side: 'end' | 'start', strokeWidth: number): string | undefined;
export {};
//# sourceMappingURL=arrowheads.d.ts.map