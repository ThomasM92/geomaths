import { AxisAngle } from './AxisAngle';
import { Mat3 } from './Mat3';
import { Quat } from './Quat';
import { Vec3 } from './Vec3';
export declare enum EulerOrder {
    XYZ = 0,
    XZY = 1,
    YXZ = 2,
    YZX = 3,
    ZXY = 4,
    ZYX = 5
}
export declare class Euler {
    x: number;
    y: number;
    z: number;
    order: EulerOrder;
    constructor(x?: number, y?: number, z?: number, order?: EulerOrder);
    clone(): Euler;
    _copy(euler: Euler): Euler;
    equals(euler: Euler, precision?: number): boolean;
    _set(x: number, y: number, z: number, order: EulerOrder): Euler;
    /**
     *
     * @param axisAngle
     * @returns
     */
    static fromAxisAngle(axisAngle: AxisAngle): Euler;
    /**
     *
     * @param mat3 assumes matrix3 is an unscaled rotation matrix
     * @param order
     * @param precision
     * @returns
     */
    static fromMat3(mat3: Mat3, order?: EulerOrder, precision?: number): Euler;
    /**
     * @see http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToEuler/index.htm
     * @param quat
     * @returns
     */
    static fromQuat(quat: Quat): Euler;
    /**
     *
     * @param vec3
     * @param order
     * @returns
     */
    static fromVec3(vec3: Vec3, order?: EulerOrder): Euler;
    static Orders: typeof EulerOrder;
}
