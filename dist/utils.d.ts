import { Vec3 } from './Vec3';
export declare function clamp(value: number, min: number, max: number): number;
export declare function randInt(low: number, high: number): number;
export declare function randFloat(low: number, high: number): number;
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
export declare function agl3(u: Vec3, v: Vec3, w: Vec3, twopi?: boolean, a?: number, b?: number): number;
