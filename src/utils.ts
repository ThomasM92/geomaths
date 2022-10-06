import { Vec3 } from './Vec3';

export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}

export function randInt(low: number, high: number): number {
	return low + Math.floor(Math.random() * (high - low + 1));
}

export function randFloat(low: number, high: number): number {
	return low + Math.random() * (high - low);
}

/**
 * Get the ellipse angle between two vector3d
 * @param {Vec3} u The first vector3d
 * @param {Vec3} v The second vector3d
 * @param {Vec3} w The vector3d orthogonal to u & v (gives resulting angle sign)
 * @param {boolean} twopi Angle belong to [0, 2Pi] if true, [-Pi, Pi] if false
 * @param {number} a The Ox axis radius
 * @param {number} b The Oy axis radius
 * @return {number} The angle beetween u & v in radians
 */
export function agl3(u: Vec3, v: Vec3, w: Vec3, twopi = false, a = 1, b = 1): number {
	const norm = u.length * v.length;
	const cross = u.cross(v);

	const sin = cross.length / norm;
	const cos = u.dot(v) / norm;

	let angle = Math.atan2(a * sin, b * cos);
	angle = Math.abs(angle) < 1e-15 ? 0 : angle;

	const sign = w.dot(cross);

	return sign < 0 ? (twopi ? 2 * Math.PI - angle : -angle) : angle;
}
