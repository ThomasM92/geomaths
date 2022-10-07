import { Quat } from './Quat';
import { Vec3 } from './Vec3';
export declare class AxisAngle {
    axis: Vec3;
    angle: number;
    /**
     * @constructor
     * @param axis normalized vector3 that defines the rotation axis
     * @param angle rotation angle in radian
     */
    constructor(axis: Vec3, angle: number);
    clone(): AxisAngle;
    _copy(axisAngle: AxisAngle): AxisAngle;
    /**
     * @see https://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
     * @param quat
     * @returns
     */
    static fromQuat(quat: Quat, precision?: number): AxisAngle;
}
