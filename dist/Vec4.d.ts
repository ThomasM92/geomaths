import { Mat4 } from './Mat4';
import { Quat } from './Quat';
import { Vec3 } from './Vec3';
/** A 4-dimensional vector */
export declare class Vec4 {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    get length(): number;
    get lengthSq(): number;
    /** Makes a Vector4 instance iterable (for...of) */
    [Symbol.iterator](): Generator<number, void, unknown>;
    add(vec4: Vec4): Vec4;
    _add(vec4: Vec4): Vec4;
    addScalar(scalar: number): Vec4;
    _addScalar(scalar: number): Vec4;
    angleTo(vector: Vec4): number;
    /**
     * Creates a new Vector4 copied from the current Vector4
     * @returns {Vec4}
     */
    clone(): Vec4;
    /**
     * @param vec4
     * @returns the current updated Vector4
     */
    _copy(vec4: Vec4): Vec4;
    /**
     * Performs the euclidian R3 subspace cross product. Set w = 1.
     * @param vec4
     * @returns the resulting Vector4
     */
    cross(vec4: Vec4): Vec4;
    /**
     * Performs the euclidian R3 subspace cross product. Set w = 1.
     * @param vec4
     * @returns the current updated Vector4
     */
    _cross(vec4: Vec4): Vec4;
    /**
     *
     * @param vec4
     * @returns Euclidian distance between current and given Vector4s
     */
    distanceTo(vec4: Vec4): number;
    /**
     *
     * @param vec4
     * @returns Euclidian squared distance between current and given Vector4s
     */
    distanceSqTo(vec4: Vec4): number;
    /**
     * @param vec4
     * @returns
     */
    dot(vec4: Vec4): number;
    /**
     *
     * @param {Vec4} vec4
     * @param {Number} precision [optional]
     * @returns {Boolean}
     */
    equals(vec4: Vec4, precision?: number): boolean;
    colinearTo(vec4: Vec4, precision?: number): boolean;
    /**
     * Linear interpolation between current and given Vector4s.
     * @param vec4 to interpolate towards
     * @param scalar interpolation factor, usually in [0, 1]
     * @returns the resulting Vector4
     */
    lerp(vec4: Vec4, scalar: number): Vec4;
    /**
     * Linear interpolation between current and given Vector4s.
     * @param vec4 to interpolate towards
     * @param scalar interpolation factor, usually in [0, 1]
     * @returns the current updated Vector4
     */
    _lerp(vec4: Vec4, scalar: number): Vec4;
    map(fn: (component: number) => number): Vec4;
    _map(fn: (component: number) => number): Vec4;
    /**
     * Component wise multiplication
     * @param vec4
     * @returns the resulting Vector4
     */
    mul(vec4: Vec4): Vec4;
    /**
     * Component wise multiplication
     * @param vec4
     * @returns the current updated Vector4
     */
    _mul(vec4: Vec4): Vec4;
    /**
     * V * M multiplication
     * @param mat4
     * @returns the resulting Vector4
     */
    mulMat4(mat4: Mat4): Vec4;
    /**
     * V * M multiplication
     * @param mat4
     * @returns the current updated Vector4
     */
    _mulMat4(mat4: Mat4): Vec4;
    /**
     * M * V multiplication
     * @param mat4
     * @returns the resulting Vector4
     */
    permulMat4(mat4: Mat4): Vec4;
    /**
     * M * V multiplication
     * @param mat4
     * @returns the current updated Vector4
     */
    _permulMat4(mat4: Mat4): Vec4;
    /**
     *
     * @param scalar
     * @returns
     */
    mulScalar(scalar: number): Vec4;
    /**
     *
     * @param scalar
     * @returns
     */
    _mulScalar(scalar: number): Vec4;
    normalize(precision?: number): Vec4;
    _normalize(precision?: number): Vec4;
    negate(): Vec4;
    _negate(): Vec4;
    scale(scalar: number): Vec4;
    _scale(scalar: number): Vec4;
    /**
     *
     * @param x
     * @param y
     * @param z
     * @returns the current updated Vector4
     */
    _set(x: number, y: number, z: number, w: number): Vec4;
    /**
     *
     * @param vec4
     * @returns
     */
    sub(vec4: Vec4): Vec4;
    /**
     *
     * @param vec4
     * @returns
     */
    _sub(vec4: Vec4): Vec4;
    /**
     *
     * @param scalar
     * @returns
     */
    subScalar(scalar: number): Vec4;
    /**
     *
     * @param scalar
     * @returns
     */
    _subScalar(scalar: number): Vec4;
    /**
     *
     * @returns
     */
    toArray(): number[];
    /**
     *
     * @returns
     */
    toJSON(): string;
    /**
     *
     * @returns
     */
    toQuat(): Quat;
    toVec3(): Vec3;
    static make(vec4: number[] | {
        [coord: string]: number;
    }): Vec4 | void;
    fromQuat(quat: Quat): Vec4;
    /**
     * Generate a random valid Vector4 instance with v.?C[0, 1]
     * @returns
     */
    static random: () => Vec4;
}
