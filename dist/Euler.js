"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Euler = exports.EulerOrder = void 0;
const constants_1 = require("./constants");
const Mat3_1 = require("./Mat3");
const utils_1 = require("./utils");
var EulerOrder;
(function (EulerOrder) {
    EulerOrder[EulerOrder["XYZ"] = 0] = "XYZ";
    EulerOrder[EulerOrder["XZY"] = 1] = "XZY";
    EulerOrder[EulerOrder["YXZ"] = 2] = "YXZ";
    EulerOrder[EulerOrder["YZX"] = 3] = "YZX";
    EulerOrder[EulerOrder["ZXY"] = 4] = "ZXY";
    EulerOrder[EulerOrder["ZYX"] = 5] = "ZYX";
})(EulerOrder = exports.EulerOrder || (exports.EulerOrder = {}));
class Euler {
    constructor(x = 0, y = 0, z = 0, order = EulerOrder.XYZ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;
    }
    clone() {
        return new Euler(this.x, this.y, this.z, this.order);
    }
    _copy(euler) {
        return this._set(euler.x, euler.y, euler.z, euler.order);
    }
    equals(euler, precision = constants_1.EPSILON) {
        return (Math.abs(this.x - euler.x) < precision &&
            Math.abs(this.y - euler.y) < precision &&
            Math.abs(this.z - euler.z) < precision &&
            this.order === euler.order);
    }
    _set(x, y, z, order) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;
        return this;
    }
    /**
     *
     * @param axisAngle
     * @returns
     */
    static fromAxisAngle(axisAngle) {
        const matrix3 = Mat3_1.Mat3.fromAxisAngle(axisAngle);
        return Euler.fromMat3(matrix3);
    }
    /**
     *
     * @param mat3 assumes matrix3 is an unscaled rotation matrix
     * @param order
     * @param precision
     * @returns
     */
    static fromMat3(mat3, order = EulerOrder.XYZ, precision = 1e-15) {
        let x, y, z;
        switch (order) {
            case EulerOrder.XYZ:
                y = Math.asin((0, utils_1.clamp)(mat3.m13, -1, 1));
                if (Math.abs(mat3.m13) - precision < 1) {
                    x = Math.atan2(-mat3.m23, mat3.m33);
                    z = Math.atan2(-mat3.m12, mat3.m11);
                }
                else {
                    x = Math.atan2(mat3.m32, mat3.m22);
                    z = 0;
                }
                break;
            case EulerOrder.YXZ:
                x = Math.asin(-(0, utils_1.clamp)(mat3.m23, -1, 1));
                if (Math.abs(mat3.m23) - precision < 1) {
                    y = Math.atan2(mat3.m13, mat3.m33);
                    z = Math.atan2(mat3.m21, mat3.m22);
                }
                else {
                    y = Math.atan2(-mat3.m31, mat3.m11);
                    z = 0;
                }
                break;
            case EulerOrder.ZXY:
                x = Math.asin((0, utils_1.clamp)(mat3.m32, -1, 1));
                if (Math.abs(mat3.m32) - precision < 1) {
                    y = Math.atan2(-mat3.m31, mat3.m33);
                    z = Math.atan2(-mat3.m12, mat3.m22);
                }
                else {
                    y = 0;
                    z = Math.atan2(mat3.m21, mat3.m11);
                }
                break;
            case EulerOrder.ZYX:
                y = Math.asin(-(0, utils_1.clamp)(mat3.m31, -1, 1));
                if (Math.abs(mat3.m31) - precision < 1) {
                    x = Math.atan2(mat3.m32, mat3.m33);
                    z = Math.atan2(mat3.m21, mat3.m11);
                }
                else {
                    x = 0;
                    z = Math.atan2(-mat3.m12, mat3.m22);
                }
                break;
            case EulerOrder.YZX:
                z = Math.asin((0, utils_1.clamp)(mat3.m21, -1, 1));
                if (Math.abs(mat3.m21) - precision < 1) {
                    x = Math.atan2(-mat3.m23, mat3.m22);
                    y = Math.atan2(-mat3.m31, mat3.m11);
                }
                else {
                    x = 0;
                    y = Math.atan2(mat3.m13, mat3.m33);
                }
                break;
            case EulerOrder.XZY:
                z = Math.asin(-(0, utils_1.clamp)(mat3.m12, -1, 1));
                if (Math.abs(mat3.m12) - precision < 1) {
                    x = Math.atan2(mat3.m32, mat3.m22);
                    y = Math.atan2(mat3.m13, mat3.m11);
                }
                else {
                    x = Math.atan2(-mat3.m23, mat3.m33);
                    y = 0;
                }
                break;
            default:
                throw new Error(`Unknown Euler order ${order}.`);
        }
        return new Euler(x, y, z, order);
    }
    /**
     * @see http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToEuler/index.htm
     * @param quat
     * @returns
     */
    static fromQuat(quat) {
        const mat3 = Mat3_1.Mat3.fromQuat(quat);
        return Euler.fromMat3(mat3);
    }
    /**
     *
     * @param vec3
     * @param order
     * @returns
     */
    static fromVec3(vec3, order = EulerOrder.XYZ) {
        return new Euler(vec3.x, vec3.y, vec3.z, order);
    }
}
exports.Euler = Euler;
// For easy acces from API
Euler.Orders = EulerOrder;
//# sourceMappingURL=Euler.js.map