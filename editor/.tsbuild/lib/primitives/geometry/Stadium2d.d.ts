import { Vec2d } from '../Vec2d';
import { Ellipse2d } from './Ellipse2d';
import { Geometry2dOptions } from './Geometry2d';
/** @public */
export declare class Stadium2d extends Ellipse2d {
    config: Omit<Geometry2dOptions, 'isClosed'> & {
        width: number;
        height: number;
    };
    constructor(config: Omit<Geometry2dOptions, 'isClosed'> & {
        width: number;
        height: number;
    });
    getVertices(): Vec2d[];
}
//# sourceMappingURL=Stadium2d.d.ts.map