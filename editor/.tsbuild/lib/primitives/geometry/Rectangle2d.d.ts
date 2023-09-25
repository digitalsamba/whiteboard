import { Box2d } from '../Box2d';
import { Geometry2dOptions } from './Geometry2d';
import { Polygon2d } from './Polygon2d';
/** @public */
export declare class Rectangle2d extends Polygon2d {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(config: Omit<Geometry2dOptions, 'isClosed'> & {
        x?: number;
        y?: number;
        width: number;
        height: number;
    });
    getBounds(): Box2d;
}
//# sourceMappingURL=Rectangle2d.d.ts.map