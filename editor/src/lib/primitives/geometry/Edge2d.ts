import { Vec2d } from '../Vec2d'
import { linesIntersect } from '../intersect'
import { Geometry2d } from './Geometry2d'

/** @public */
export class Edge2d extends Geometry2d {
	start: Vec2d
	end: Vec2d
	d: Vec2d
	u: Vec2d
	length: number

	constructor(config: { start: Vec2d; end: Vec2d; isSnappable?: boolean }) {
		super({ ...config, isClosed: false, isFilled: false })
		const { start, end } = config

		this.start = start
		this.end = end

		this.d = start.clone().sub(end)
		this.u = this.d.clone().uni()
		this.length = this.d.len()
	}

	midPoint(): Vec2d {
		return this.start.lrp(this.end, 0.5)
	}

	override getVertices(): Vec2d[] {
		return [this.start, this.end]
	}

	override nearestPoint(point: Vec2d): Vec2d {
		const { start, end, u } = this
		if (start.equals(end)) return start.clone()
		const C = start.clone().add(u.clone().mul(point.clone().sub(start).pry(u)))
		if (C.x < Math.min(start.x, end.x)) return start.x < end.x ? start : end
		if (C.x > Math.max(start.x, end.x)) return start.x > end.x ? start : end
		if (C.y < Math.min(start.y, end.y)) return start.y < end.y ? start : end
		if (C.y > Math.max(start.y, end.y)) return start.y > end.y ? start : end
		return C
	}

	override hitTestLineSegment(A: Vec2d, B: Vec2d, _zoom: number): boolean {
		return linesIntersect(A, B, this.start, this.end)
	}
}
