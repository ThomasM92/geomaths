import { AxisAngle } from './AxisAngle';
import { Euler, EulerOrder } from './Euler';
import { Quat } from './Quat';
import { Vec3 } from './Vec3';
/** A 3 by 3 matrix */
export declare class Mat3 {
    m11: number;
    m12: number;
    m13: number;
    m21: number;
    m22: number;
    m23: number;
    m31: number;
    m32: number;
    m33: number;
    constructor(m11?: number, m12?: number, m13?: number, m21?: number, m22?: number, m23?: number, m31?: number, m32?: number, m33?: number);
    [Symbol.iterator](): Generator<number, void, unknown>;
    /**
     *
     * @param mat3
     * @returns this: this[i,j] <- matrix3[i,j]
     */
    _copy(mat3: Mat3): Mat3;
    /**
     *
     * @returns matrix3: matrix3[i,j] <- this[i,j]
     */
    clone(): Mat3;
    /**
     * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/threeD/index.htm
     * @returns
     */
    det(): number;
    /**
     * There is no equivalent ._inverte() method to force handling non-inversible matrices
     * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/threeD/index.htm
     * @returns
     */
    inv(): Mat3 | void;
    /**
     *
     * @param mat3 the matrix to compare to
     * @param [precision=EPSILON] the comparison precision
     * @returns
     */
    equals(mat3: Mat3, precision?: number): boolean;
    col(column: number): Vec3;
    row(row: number): Vec3;
    map(fn: (element: number) => number): Mat3;
    _map(fn: (element: number) => number): Mat3;
    /**
     *
     * @param mat3
     * @returns this * matrix3
     */
    mul(mat3: Mat3): Mat3;
    /**
     *
     * @param mat3
     * @returns this <- this * matrix3
     */
    _mul(mat3: Mat3): Mat3;
    /**
     *
     * @param vec3
     * @returns this * vector3
     */
    mulVec3(vec3: Vec3): Vec3;
    /**
     *
     * @param mat3
     * @returns matrix3 * this
     */
    permul(mat3: Mat3): Mat3;
    /**
     *
     * @param mat3
     * @returns this <- matrix3 * this
     */
    _permul(mat3: Mat3): Mat3;
    /**
     *
     * @param vec3
     * @returns vector3 * this
     */
    permulVec3(vec3: Vec3): Vec3;
    /**
     *
     * @returns [...mij] row by row
     */
    toArray(): number[];
    /**
     *
     * @param [order=Euler.Orders.XYZ]
     * @param [precision=EPSILON]
     * @returns
     */
    toEuler(order?: EulerOrder, precision?: number): Euler;
    /**
     *
     * @returns sum(mij) | i=j
     */
    trace(): number;
    /**
     *
     * @returns matrix3: matrix3[i,j] <- this[j,i]
     */
    transpose(): Mat3;
    /**
     *
     * @returns this: this[i,j] <- this[j,i]
     */
    _transpose(): Mat3;
    _set(m11: number, m12: number, m13: number, m21: number, m22: number, m23: number, m31: number, m32: number, m33: number): Mat3;
    /**
     * @todo swap vector and column for more intuitive writing
     * @param vector
     * @param column
     * @returns this: this[_,column] <- vector3
     */
    _col(vector: Vec3, column: number): Mat3;
    /**
     * @todo swap vector and row for more intuitive writing
     * @param vector
     * @param row
     * @returns this: this[row,_] <- vector3
     */
    _row(vector: Vec3, row: number): Mat3;
    /**
     *
     * @returns
     */
    static Indentity(): Mat3;
    /**
     *
     * @param axisAngle
     * @returns
     */
    static fromAxisAngle(axisAngle: AxisAngle): Mat3;
    /**
     *
     * @param euler
     * @returns
     */
    static fromEuler(euler: Euler): Mat3;
    /**
     *
     * @param quat normalized
     * @returns
     */
    static fromQuat(quat: Quat): Mat3;
}
