import { Mat2 } from './Mat2';
import { Mat3 } from './Mat3';
import { Vec3 } from './Vec3';
/** A 2-dimensional euclidian vector */
export declare class Vec2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    get length(): number;
    get lengthSq(): number;
    [Symbol.iterator](): Generator<number, void, unknown>;
    /**
     * Gets a new Vec2, result of the addition of
     * the given vector to the current Vec2
     * @param vector the Vec2 to add
     * @returns the resulting Vec2
     */
    add(vector: Vec2): Vec2;
    /**
     * Adds the given vector to the current Vec2
     * @param vector the Vec2 to add
     * @returns the current updated Vec2
     */
    _add(vector: Vec2): Vec2;
    /**
     * Gets a new Vec2, result of the component-wise addition
     * of the given saclar to the current Vec2
     * @param scalar the Number to add
     * @returns the resulting Vec2
     */
    addScalar(scalar: number): Vec2;
    /**
     * Adds the given scalar componentwise to the current Vec2
     * @param scalar the Number to add
     * @returns the current updated Vec2
     */
    _addScalar(scalar: number): Vec2;
    /**
     * Gets the angle between the current vector and the given vector
     * @param vector the second operand
     * @returns the resulting angle
     */
    angleTo(vector: Vec2): number;
    /**
     * Creates a new Vec2 copied from the current Vec2
     * @returns {Vec2}
     */
    clone(): Vec2;
    /**
     * @param vector
     * @returns the current updated Vec2
     */
    _copy(vector: Vec2): Vec2;
    /**
     *
     * @param vector
     * @returns
     */
    distanceTo(vector: Vec2): number;
    /**
     *
     * @param position
     * @param direction
     * @returns
     */
    distanceToLine(position: Vec2, direction: Vec2): number;
    /**
     *
     * @param vec2
     * @returns
     */
    distanceSqTo(vec2: Vec2): number;
    /**
     * @param vec2
     * @returns
     */
    dot(vec2: Vec2): number;
    /**
     * @param vec2
     * @param [precision]
     * @returns
     */
    colinearTo(vec2: Vec2, precision?: number): boolean;
    /**
     *
     * @param vec2
     * @param [precision]
     * @returns
     */
    orthogonalTo(vec2: Vec2, precision?: number): boolean;
    /**
     * @param {Vec2} vec2
     * @param {Number} precision [optional]
     * @returns {Boolean}
     */
    equals(vec2: Vec2, precision?: number): boolean;
    /**
     *
     * @param vec2
     * @param scalar
     * @returns
     */
    lerp(vec2: Vec2, scalar: number): Vec2;
    /**
     *
     * @param vec2
     * @param scalar
     * @returns
     */
    _lerp(vec2: Vec2, scalar: number): Vec2;
    map(fn: (component: number) => number): Vec2;
    _map(fn: (component: number) => number): Vec2;
    /**
     * Componant-wise multiplication
     * @param vec2
     * @returns the resulting Vec2
     */
    mul(vec2: Vec2): Vec2;
    /**
     * Componant-wise multiplication
     * @param vec2
     * @returns the current updated Vec2
     */
    _mul(vec2: Vec2): Vec2;
    /**
     * V * M multiplication
     * @param mat2
     * @returns the resulting Vec2
     */
    mulMat2(mat2: Mat2): Vec2;
    /**
     * V * M multiplication
     * @param mat2
     * @returns the current updated Vec2
     */
    _mulMat2(mat2: Mat2): Vec2;
    /**
     * M * V multiplication
     * @param mat2
     * @returns the resulting Vec2
     */
    permulMat2(mat2: Mat2): Vec2;
    /**
     * M * V multiplication
     * @param mat2
     * @returns the current updated Vec2
     */
    _permulMat2(mat2: Mat2): Vec2;
    /**
     * Perform M * V multiplication.
     * @param mat3
     * @returns
     */
    permulMat3(mat3: Mat3): Vec2;
    /**
     * Perform M4 * V3 multiplication.
     * @param mat3
     * @returns
     */
    _permulMat3(mat3: Mat3): Vec2;
    /**
     *
     * @returns
     */
    normalize(): Vec2;
    /**
     *
     * @returns
     */
    _normalize(): Vec2;
    /**
     *
     * @returns
     */
    negate(): Vec2;
    /**
     *
     * @returns
     */
    _negate(): Vec2;
    /**
     * Get orthogonal unit vector to this
     * @returns
     */
    orthogonalDirection(): Vec2;
    /**
     *
     * @param position line position
     * @param direction line direction
     * @returns
     */
    projectOnLine(position: Vec2, direction: Vec2): Vec2;
    /**
     *
     * @param scalar
     * @returns
     */
    scale(scalar: number): Vec2;
    /**
     *
     * @param scalar
     * @returns
     */
    _scale(scalar: number): Vec2;
    /**
     *
     * @param x
     * @param y
     * @returns the current updated Vec2
     */
    _set(x: number, y: number): Vec2;
    /**
     *
     * @param vector
     * @returns
     */
    sub(vector: Vec2): Vec2;
    /**
     *
     * @param vector
     * @returns
     */
    _sub(vector: Vec2): Vec2;
    /**
     *
     * @param scalar
     * @returns
     */
    subScalar(scalar: number): Vec2;
    /**
     *
     * @param scalar
     * @returns
     */
    _subScalar(scalar: number): Vec2;
    /**
     *
     * @returns
     */
    toArray(): [number, number];
    /**
     *
     * @returns
     */
    toJSON(): string;
    /**
     *
     * @returns
     */
    toVec3(): Vec3;
    static make(vector: number[] | {
        [coord: string]: number;
    }): Vec2 | void;
    /**
     * Generate a random valid Vec2 instance with v.?C[0, 1]
     * @returns
     */
    static random(): Vec2;
    /**
     * Pick a random point on a unit sphere (uniformly distributed)
     * @see https://mathworld.wolfram.com/SpherePointPicking.html
     * @returns
     */
    static randomDirection(): Vec2;
    static fromVec3(vec3: Vec3): Vec2;
}
