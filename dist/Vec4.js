"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec4 = void 0;
const constants_1 = require("./constants");
const Quat_1 = require("./Quat");
const utils_1 = require("./utils");
const Vec3_1 = require("./Vec3");
/** A 4-dimensional vector */
class Vec4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    // * Getters & Setters *
    get length() {
        return Math.sqrt(this.lengthSq);
    }
    get lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    /** Makes a Vector4 instance iterable (for...of) */
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
    // * Public Methods *
    add(vec4) {
        return this.clone()._add(vec4);
    }
    _add(vec4) {
        this.x += vec4.x;
        this.y += vec4.y;
        this.z += vec4.z;
        this.w += vec4.w;
        return this;
    }
    addScalar(scalar) {
        return this.clone()._addScalar(scalar);
    }
    _addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        this.w += scalar;
        return this;
    }
    angleTo(vector) {
        const denominator = this.lengthSq * vector.lengthSq;
        if (denominator === 0)
            return Math.PI / 2;
        const theta = this.dot(vector) / Math.sqrt(denominator);
        // clamp, to handle numerical problems
        return Math.acos((0, utils_1.clamp)(theta, -1, 1));
    }
    /**
     * Creates a new Vector4 copied from the current Vector4
     * @returns {Vec4}
     */
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
    /**
     * @param vec4
     * @returns the current updated Vector4
     */
    _copy(vec4) {
        this.x = vec4.x;
        this.y = vec4.y;
        this.z = vec4.z;
        this.w = vec4.w;
        return this;
    }
    /**
     * Performs the euclidian R3 subspace cross product. Set w = 1.
     * @param vec4
     * @returns the resulting Vector4
     */
    cross(vec4) {
        return this.clone()._cross(vec4);
    }
    /**
     * Performs the euclidian R3 subspace cross product. Set w = 1.
     * @param vec4
     * @returns the current updated Vector4
     */
    _cross(vec4) {
        const x = this.y * vec4.z - this.z * vec4.y;
        const y = this.z * vec4.x - this.x * vec4.z;
        const z = this.x * vec4.y - this.y * vec4.x;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 1;
        return this;
    }
    /**
     *
     * @param vec4
     * @returns Euclidian distance between current and given Vector4s
     */
    distanceTo(vec4) {
        return this.sub(vec4).length;
    }
    /**
     *
     * @param vec4
     * @returns Euclidian squared distance between current and given Vector4s
     */
    distanceSqTo(vec4) {
        return this.sub(vec4).lengthSq;
    }
    /**
     * @param vec4
     * @returns
     */
    dot(vec4) {
        return this.x * vec4.x + this.y * vec4.y + this.z * vec4.z + this.w * vec4.w;
    }
    /**
     *
     * @param {Vec4} vec4
     * @param {Number} precision [optional]
     * @returns {Boolean}
     */
    equals(vec4, precision = constants_1.EPSILON) {
        return this.distanceTo(vec4) < precision;
    }
    colinearTo(vec4, precision = constants_1.EPSILON) {
        return Math.abs(this.dot(vec4)) < precision;
    }
    /**
     * Linear interpolation between current and given Vector4s.
     * @param vec4 to interpolate towards
     * @param scalar interpolation factor, usually in [0, 1]
     * @returns the resulting Vector4
     */
    lerp(vec4, scalar) {
        return this.clone()._lerp(vec4, scalar);
    }
    /**
     * Linear interpolation between current and given Vector4s.
     * @param vec4 to interpolate towards
     * @param scalar interpolation factor, usually in [0, 1]
     * @returns the current updated Vector4
     */
    _lerp(vec4, scalar) {
        this.x += (vec4.x - this.x) * scalar;
        this.y += (vec4.y - this.y) * scalar;
        this.z += (vec4.z - this.z) * scalar;
        this.w += (vec4.w - this.w) * scalar;
        return this;
    }
    map(fn) {
        return this.clone()._map(fn);
    }
    _map(fn) {
        this.x = fn(this.x);
        this.y = fn(this.y);
        this.z = fn(this.z);
        this.w = fn(this.w);
        return this;
    }
    /**
     * Component wise multiplication
     * @param vec4
     * @returns the resulting Vector4
     */
    mul(vec4) {
        return this.clone()._mul(vec4);
    }
    /**
     * Component wise multiplication
     * @param vec4
     * @returns the current updated Vector4
     */
    _mul(vec4) {
        this.x *= vec4.x;
        this.y *= vec4.y;
        this.z *= vec4.z;
        this.w *= vec4.w;
        return this;
    }
    /**
     * V * M multiplication
     * @param mat4
     * @returns the resulting Vector4
     */
    mulMat4(mat4) {
        return this.clone()._mulMat4(mat4);
    }
    /**
     * V * M multiplication
     * @param mat4
     * @returns the current updated Vector4
     */
    _mulMat4(mat4) {
        return this._set(this.x * mat4.m11 + this.y * mat4.m21 + this.z * mat4.m31 + this.w * mat4.m41, this.x * mat4.m12 + this.y * mat4.m22 + this.z * mat4.m32 + this.w * mat4.m42, this.x * mat4.m13 + this.y * mat4.m23 + this.z * mat4.m33 + this.w * mat4.m43, this.x * mat4.m14 + this.y * mat4.m24 + this.z * mat4.m34 + this.w * mat4.m44);
    }
    /**
     * M * V multiplication
     * @param mat4
     * @returns the resulting Vector4
     */
    permulMat4(mat4) {
        return this.clone()._permulMat4(mat4);
    }
    /**
     * M * V multiplication
     * @param mat4
     * @returns the current updated Vector4
     */
    _permulMat4(mat4) {
        return this._set(mat4.m11 * this.x + mat4.m12 * this.y + mat4.m13 * this.z + mat4.m14 * this.w, mat4.m21 * this.x + mat4.m22 * this.y + mat4.m23 * this.z + mat4.m24 * this.w, mat4.m31 * this.x + mat4.m32 * this.y + mat4.m33 * this.z + mat4.m34 * this.w, mat4.m41 * this.x + mat4.m42 * this.y + mat4.m43 * this.z + mat4.m44 * this.w);
    }
    /**
     *
     * @param scalar
     * @returns
     */
    mulScalar(scalar) {
        return this.clone()._mulScalar(scalar);
    }
    /**
     *
     * @param scalar
     * @returns
     */
    _mulScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    normalize(precision = constants_1.EPSILON) {
        return this.clone()._normalize(precision);
    }
    _normalize(precision = constants_1.EPSILON) {
        const magnitude = this.length;
        if (magnitude < precision) {
            return this;
        }
        const denominator = 1 / magnitude;
        this.x *= denominator;
        this.y *= denominator;
        this.z *= denominator;
        this.w *= denominator;
        return this;
    }
    negate() {
        return this.clone()._negate();
    }
    _negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }
    scale(scalar) {
        return this.clone()._scale(scalar);
    }
    _scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    /**
     *
     * @param x
     * @param y
     * @param z
     * @returns the current updated Vector4
     */
    _set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }
    /**
     *
     * @param vec4
     * @returns
     */
    sub(vec4) {
        return this.clone()._sub(vec4);
    }
    /**
     *
     * @param vec4
     * @returns
     */
    _sub(vec4) {
        this.x -= vec4.x;
        this.y -= vec4.y;
        this.z -= vec4.z;
        this.w -= vec4.w;
        return this;
    }
    /**
     *
     * @param scalar
     * @returns
     */
    subScalar(scalar) {
        return this.clone()._subScalar(scalar);
    }
    /**
     *
     * @param scalar
     * @returns
     */
    _subScalar(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        this.w -= scalar;
        return this;
    }
    /**
     *
     * @returns
     */
    toArray() {
        return [this.x, this.y, this.z, this.w];
    }
    /**
     *
     * @returns
     */
    toJSON() {
        return `{x:${this.x},y:${this.y},z:${this.z},w:${this.w}}`;
    }
    /**
     *
     * @returns
     */
    toQuat() {
        return new Quat_1.Quat(this.x, this.y, this.z, this.w);
    }
    toVec3() {
        return new Vec3_1.Vec3(this.x, this.y, this.z);
    }
    // * Static Methods *
    static make(vec4) {
        if (vec4 instanceof Vec4)
            return vec4;
        if (Array.isArray(vec4) &&
            Number.isFinite(vec4[0]) &&
            Number.isFinite(vec4[1]) &&
            Number.isFinite(vec4[2]) &&
            Number.isFinite(vec4[3]))
            return new Vec4(...vec4);
    }
    fromQuat(quat) {
        return new Vec4(quat.x, quat.y, quat.z, quat.w);
    }
}
exports.Vec4 = Vec4;
/**
 * Generate a random valid Vector4 instance with v.?C[0, 1]
 * @returns
 */
Vec4.random = function () {
    return new Vec4(Math.random(), Math.random(), Math.random(), Math.random());
};
//# sourceMappingURL=Vec4.js.map