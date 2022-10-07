import { AxisAngle } from './AxisAngle';
import { Euler } from './Euler';
import { Mat3 } from './Mat3';
import { Vec3 } from './Vec3';
export declare class Quat {
    x: number;
    y: number;
    z: number;
    w: number;
    /**
     * @constructor
     * @param x imaginary component i
     * @param y imaginary component j
     * @param z imaginary component k
     * @param w real part
     * */
    constructor(x?: number, y?: number, z?: number, w?: number);
    get length(): number;
    get lengthSq(): number;
    [Symbol.iterator](): Generator<number, void, unknown>;
    /**
     *
     * @returns quaternion <- this
     */
    clone(): Quat;
    /**
     * Expects this to be normalized.
     * When used as rotation conj(q) = q' represents the reversed rotation.
     * @returns q' <- conj(this)
     */
    conj(): Quat;
    /**
     * Expects this to be normalized.
     * When used as rotation conj(q) = q' represents the reversed rotation.
     * @returns this <- conj(this)
     */
    _conj(): Quat;
    /**
     *
     * @param quat
     * @returns this <- quaternion
     */
    _copy(quat: Quat): Quat;
    dot(quat: Quat): number;
    /**
     * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
     * @param quat
     * @returns this * quaternion
     */
    mul(quat: Quat): Quat;
    /**
     * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
     * @param quat
     * @returns this <- this * quaternion
     */
    _mul(quat: Quat): Quat;
    /**
     * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
     * @param quat
     * @returns quaternion * this
     */
    permul(quat: Quat): Quat;
    /**
     * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
     * @param quat
     * @returns this <- quaternion * this
     */
    _permul(quat: Quat): Quat;
    /**
     * Will return identity if magnitude=0
     * @returns quaternion <- this / magnitude
     */
    normalize(): Quat;
    /**
     * Will return identity if magnitude=0
     * @returns this <- this / magnitude
     */
    _normalize(precision?: number): Quat;
    scale(scalar: number): Quat;
    _scale(scalar: number): Quat;
    /**
     *
     * @param x imaginary component i
     * @param y imaginary component j
     * @param z imaginary component k
     * @param w real part
     * @returns
     */
    _set(x: number, y: number, z: number, w: number): Quat;
    slerp(quat: Quat, param: number): Quat;
    /**
     * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
     * @param quat
     * @param param in [0, 1]
     * @returns
     */
    _slerp(quat: Quat, param: number): Quat;
    /**
     * Is equivalent to this.mul(vector.toQuat())._mul(this.conj()).toVec3()
     * @param vec3
     * @returns u = q * v * q'
     */
    rotateVec3(vec3: Vec3): Vec3;
    /**
     *
     * @returns [x, y, z, w]
     */
    toArray(): number[];
    /**
     *
     * @returns the imaginary part of quaternion (x, y, z)
     */
    toVec3(): Vec3;
    /**
     * Convert normalized quaternion into Euler instance (XYZ)
     * @param precision
     * @returns
     */
    toEuler(): Euler;
    /**
     * Convert normalized quaternion into rotation matrix3
     * @returns
     */
    toMat3(): Mat3;
    /**
     * real part = 1 | imaginary part = 0
     * @returns
     */
    static Indentity(): Quat;
    /**
     * Make a quaternion that stores a 3d orientation encoded into euler angles
     * @see http://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToQuaternion/index.htm
     * @param euler
     * @returns
     */
    static fromEuler(euler: Euler): Quat;
    /**
     *
     * @param axisAngle
     * @returns
     */
    static fromAxisAngle(axisAngle: AxisAngle): Quat;
    /**
     * @see https://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
     * @param mat3
     * @returns
     */
    static fromMat3(mat3: Mat3): Quat;
    /**
     *
     * @see http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors
     * @param from starting normalized vector3
     * @param to normalized vector3 of destination
     * @returns quaternion that represents the rotation to go from u to v
     */
    static fromTwoVectors(u: Vec3, v: Vec3, precision?: number): Quat;
}
