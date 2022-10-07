import { Mat3 } from './Mat3';
import { Mat4 } from './Mat4';
import { Quat } from './Quat';
import { Vec2 } from './Vec2';
import { Vec4 } from './Vec4';
/** A 3-dimensional euclidian vector */
export declare class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    get length(): number;
    get lengthSq(): number;
    [Symbol.iterator](): Generator<number, void, unknown>;
    /**
     * Gets a new Vector3, result of the addition of
     * the given vector to the current Vector3
     * @param vector the Vector3 to add
     * @returns the resulting Vector3
     */
    add(vector: Vec3): Vec3;
    /**
     * Adds the given vector to the current Vector3
     * @param vector the Vector3 to add
     * @returns the current updated Vector3
     */
    _add(vector: Vec3): Vec3;
    /**
     * Gets a new Vector3, result of the component-wise addition
     * of the given saclar to the current Vector3
     * @param scalar the Number to add
     * @returns the resulting Vector3
     */
    addScalar(scalar: number): Vec3;
    /**
     * Adds the given scalar componentwise to the current Vector3
     * @param scalar the Number to add
     * @returns the current updated Vector3
     */
    _addScalar(scalar: number): Vec3;
    /**
     * Gets the angle between the current vector and the given vector
     * @param vector the second operand
     * @returns the resulting angle
     */
    angleTo(vector: Vec3): number;
    /**
     * Creates a new Vector3 copied from the current Vector3
     * @returns {Vec3}
     */
    clone(): Vec3;
    /**
     * @param vector
     * @returns the current updated Vector3
     */
    _copy(vector: Vec3): Vec3;
    /**
     *
     * @param vector
     * @returns
     */
    cross(vector: Vec3): Vec3;
    /**
     *
     * @param vector
     * @returns
     */
    _cross(vector: Vec3): Vec3;
    /**
     *
     * @param vector
     * @returns
     */
    distanceTo(vector: Vec3): number;
    /**
     *
     * @param vector
     * @returns
     */
    distanceSqTo(vector: Vec3): number;
    /**
     * @param vector
     * @returns
     */
    dot(vector: Vec3): number;
    /**
     * @param vector
     * @param [precision]
     * @returns
     */
    colinearTo(vector: Vec3, precision?: number): boolean;
    /**
     *
     * @param vector
     * @param [precision]
     * @returns
     */
    orthogonalTo(vector: Vec3, precision?: number): boolean;
    /**
     * @param {Vec3} vector
     * @param {Number} precision [optional]
     * @returns {Boolean}
     */
    equals(vector: Vec3, precision?: number): boolean;
    /**
     *
     * @param vector
     * @param scalar
     * @returns
     */
    lerp(vector: Vec3, scalar: number): Vec3;
    /**
     *
     * @param vector
     * @param scalar
     * @returns
     */
    _lerp(vector: Vec3, scalar: number): Vec3;
    map(fn: (component: number) => number): Vec3;
    _map(fn: (component: number) => number): Vec3;
    /**
     * Componant-wise multiplication
     * @param vector
     * @returns the resulting Vector3
     */
    mul(vector: Vec3): Vec3;
    /**
     * Componant-wise multiplication
     * @param vector
     * @returns the current updated Vector3
     */
    _mul(vector: Vec3): Vec3;
    /**
     * V * M multiplication
     * @param matrix
     * @returns the resulting Vector3
     */
    mulMat3(matrix: Mat3): Vec3;
    /**
     * V * M multiplication
     * @param matrix
     * @returns the current updated Vector3
     */
    _mulMat3(matrix: Mat3): Vec3;
    /**
     * M * V multiplication
     * @param matrix
     * @returns the resulting Vector3
     */
    permulMat3(matrix: Mat3): Vec3;
    /**
     * M * V multiplication
     * @param matrix
     * @returns the current updated Vector3
     */
    _permulMat3(matrix: Mat3): Vec3;
    /**
     * Perform M * V multiplication.
     * @param matrix
     * @returns
     */
    permulMat4(matrix: Mat4): Vec3;
    /**
     * Perform M4 * V3 multiplication.
     * @param matrix
     * @returns
     */
    _permulMat4(matrix: Mat4): Vec3;
    /**
     *
     * @returns
     */
    normalize(): Vec3;
    /**
     *
     * @returns
     */
    _normalize(): Vec3;
    /**
     *
     * @returns
     */
    negate(): Vec3;
    /**
     *
     * @returns
     */
    _negate(): Vec3;
    /**
     * Get orthogonal unit vector to this
     * @returns
     */
    orthogonalDirection(): Vec3;
    /**
     *
     * @param scalar
     * @returns
     */
    scale(scalar: number): Vec3;
    /**
     *
     * @param scalar
     * @returns
     */
    _scale(scalar: number): Vec3;
    /**
     *
     * @param x
     * @param y
     * @param z
     * @returns the current updated Vector3
     */
    _set(x: number, y: number, z: number): Vec3;
    /**
     *
     * @param vector
     * @returns
     */
    sub(vector: Vec3): Vec3;
    /**
     *
     * @param vector
     * @returns
     */
    _sub(vector: Vec3): Vec3;
    /**
     *
     * @param scalar
     * @returns
     */
    subScalar(scalar: number): Vec3;
    /**
     *
     * @param scalar
     * @returns
     */
    _subScalar(scalar: number): Vec3;
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
    /**
     *
     * @returns
     */
    toVec2(): Vec2;
    static make(vec3: number[] | {
        [coord: string]: number;
    }): Vec3 | void;
    /**
     * Generate a random valid Vector3 instance with v.?C[0, 1]
     * @returns
     */
    static random(): Vec3;
    /**
     * Pick a random point on a unit sphere (uniformly distributed)
     * @see https://mathworld.wolfram.com/SpherePointPicking.html
     * @returns
     */
    static randomDirection(): Vec3;
    static fromVec2(vector: Vec2): Vec3;
    static fromVec4(vector: Vec4): Vec3;
}
