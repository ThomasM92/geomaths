"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxisAngle = void 0;
const constants_1 = require("./constants");
const Vec3_1 = require("./Vec3");
class AxisAngle {
    /**
     * @constructor
     * @param axis normalized vector3 that defines the rotation axis
     * @param angle rotation angle in radian
     */
    constructor(axis, angle) {
        this.axis = axis;
        this.angle = angle;
    }
    clone() {
        return new AxisAngle(this.axis, this.angle);
    }
    _copy(axisAngle) {
        this.axis = axisAngle.axis;
        this.angle = axisAngle.angle;
        return this;
    }
    /**
     * @see https://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
     * @param quat
     * @returns
     */
    static fromQuat(quat, precision = constants_1.EPSILON) {
        const q = quat.w > 1 // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised
            ? quat.normalize()
            : quat;
        const angle = 2 * Math.acos(q.w);
        const s = Math.sqrt(1 - q.w * q.w); // assuming quaternion normalised then w is less than 1, so term always positive.
        const axis = s > precision ? new Vec3_1.Vec3(q.x / s, q.y / s, q.z / s) : new Vec3_1.Vec3(1, 0, 0); // if s close to zero then direction of axis not important
        return new AxisAngle(axis, angle);
    }
}
exports.AxisAngle = AxisAngle;
//# sourceMappingURL=AxisAngle.js.map