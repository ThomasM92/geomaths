import { AxisAngle } from './AxisAngle';
import { Euler } from './Euler';
import { Mat3 } from './Mat3';
import { Vec3 } from './Vec3';
/** A 4 by 4 matrix */
export declare class Mat4 {
    m11: number;
    m12: number;
    m13: number;
    m14: number;
    m21: number;
    m22: number;
    m23: number;
    m24: number;
    m31: number;
    m32: number;
    m33: number;
    m34: number;
    m41: number;
    m42: number;
    m43: number;
    m44: number;
    constructor(m11?: number, m12?: number, m13?: number, m14?: number, m21?: number, m22?: number, m23?: number, m24?: number, m31?: number, m32?: number, m33?: number, m34?: number, m41?: number, m42?: number, m43?: number, m44?: number);
    [Symbol.iterator](): Generator<number, void, unknown>;
    /**
     *
     * @param mat4
     * @returns this: this[i,j] <- mat4[i,j]
     */
    _copy(mat4: Mat4): Mat4;
    /**
     *
     * @returns mat4: mat4[i,j] <- this[i,j]
     */
    clone(): Mat4;
    /**
     * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/fourD/index.htm
     * @returns
     */
    det(): number;
    /**
     * There is no equivalent .invertMutate() method to force handling non-inversible matrices
     * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
     * @returns
     */
    inv(): Mat4 | void;
    /**
     *
     * @param mat4 the matrix to compare to
     * @param precision [precision=EPSILON]
     * @returns
     */
    equals(mat4: Mat4, precision?: number): boolean;
    map(fn: (element: number) => number): Mat4;
    _map(fn: (element: number) => number): Mat4;
    /**
     *
     * @param mat4
     * @returns mat4 * this
     */
    mul(mat4: Mat4): Mat4;
    /**
     *
     * @param matrix4
     * @returns this <- mat4 * this
     */
    _mul(matrix4: Mat4): Mat4;
    /**
     *
     * @param mat4
     * @returns mat4 * this
     */
    permul(mat4: Mat4): Mat4;
    /**
     *
     * @param mat4
     * @returns this <- this * mat4
     */
    _permul(mat4: Mat4): Mat4;
    /**
     *
     * @param vec3
     * @returns vector3 * this
     */
    permulVec3(vec3: Vec3): Vec3;
    /**
     *
     * @param vec3
     * @returns this * vector3
     */
    mulVec3(vec3: Vec3): Vec3;
    /**
     *
     * @param scalar
     * @returns mat4 <- this[i,j] * scalar
     */
    mulScalar(scalar: number): Mat4;
    /**
     *
     * @param scalar
     * @returns this <- this[i,j] * scalar
     */
    _mulScalar(scalar: number): Mat4;
    _set(m11: number, m12: number, m13: number, m14: number, m21: number, m22: number, m23: number, m24: number, m31: number, m32: number, m33: number, m34: number, m41: number, m42: number, m43: number, m44: number): Mat4;
    _rotation(mat3: Mat3): Mat4;
    _scale(vec3: Vec3): Mat4;
    _translation(vec3: Vec3): Mat4;
    /**
     *
     * @returns [...mij] row by row
     */
    toArray(): number[];
    /**
     *
     * @returns mat4: mat4[i,j] <- this[j,i]
     */
    transpose(): Mat4;
    /**
     *
     * @returns this: this[i,j] <- this[j,i]
     */
    _transpose(): Mat4;
    static Identity(): Mat4;
    static fromAxisAngle(axisAngle: AxisAngle): Mat4;
    static fromEuler(euler: Euler): Mat4;
}
