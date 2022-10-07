"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec3 = void 0;
const constants_1 = require("./constants");
const Quat_1 = require("./Quat");
const utils_1 = require("./utils");
const Vec2_1 = require("./Vec2");
/** A 3-dimensional euclidian vector */
class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // * Getters & Setters *
    get length() {
        return Math.sqrt(this.lengthSq);
    }
    get lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    // Makes a Vector3 instance iterable (for...of)
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
    // * Public Methods *
    /**
     * Gets a new Vector3, result of the addition of
     * the given vector to the current Vector3
     * @param vector the Vector3 to add
     * @returns the resulting Vector3
     */
    add(vector) {
        return this.clone()._add(vector);
    }
    /**
     * Adds the given vector to the current Vector3
     * @param vector the Vector3 to add
     * @returns the current updated Vector3
     */
    _add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    }
    /**
     * Gets a new Vector3, result of the component-wise addition
     * of the given saclar to the current Vector3
     * @param scalar the Number to add
     * @returns the resulting Vector3
     */
    addScalar(scalar) {
        return this.clone()._addScalar(scalar);
    }
    /**
     * Adds the given scalar componentwise to the current Vector3
     * @param scalar the Number to add
     * @returns the current updated Vector3
     */
    _addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        return this;
    }
    /**
     * Gets the angle between the current vector and the given vector
     * @param vector the second operand
     * @returns the resulting angle
     */
    angleTo(vector) {
        const denominator = this.lengthSq * vector.lengthSq;
        if (denominator === 0)
            return Math.PI / 2;
        const theta = this.dot(vector) / Math.sqrt(denominator);
        // clamp, to handle numerical problems
        return Math.acos((0, utils_1.clamp)(theta, -1, 1));
    }
    /**
     * Creates a new Vector3 copied from the current Vector3
     * @returns {Vec3}
     */
    clone() {
        return new Vec3(this.x, this.y, this.z);
    }
    /**
     * @param vector
     * @returns the current updated Vector3
     */
    _copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        return this;
    }
    /**
     *
     * @param vector
     * @returns
     */
    cross(vector) {
        return this.clone()._cross(vector);
    }
    /**
     *
     * @param vector
     * @returns
     */
    _cross(vector) {
        const x = this.y * vector.z - this.z * vector.y;
        const y = this.z * vector.x - this.x * vector.z;
        const z = this.x * vector.y - this.y * vector.x;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    /**
     *
     * @param vector
     * @returns
     */
    distanceTo(vector) {
        return this.sub(vector).length;
    }
    /**
     *
     * @param vector
     * @returns
     */
    distanceSqTo(vector) {
        return this.sub(vector).lengthSq;
    }
    /**
     * @param vector
     * @returns
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }
    /**
     * @param vector
     * @param [precision]
     * @returns
     */
    colinearTo(vector, precision = constants_1.EPSILON) {
        return this.cross(vector).length < precision ** 0.5;
    }
    /**
     *
     * @param vector
     * @param [precision]
     * @returns
     */
    orthogonalTo(vector, precision = constants_1.EPSILON) {
        return Math.abs(this.dot(vector)) < precision;
    }
    /**
     * @param {Vec3} vector
     * @param {Number} precision [optional]
     * @returns {Boolean}
     */
    equals(vector, precision = constants_1.EPSILON) {
        return this.distanceTo(vector) < precision;
    }
    /**
     *
     * @param vector
     * @param scalar
     * @returns
     */
    lerp(vector, scalar) {
        return this.clone()._lerp(vector, scalar);
    }
    /**
     *
     * @param vector
     * @param scalar
     * @returns
     */
    _lerp(vector, scalar) {
        this.x += (vector.x - this.x) * scalar;
        this.y += (vector.y - this.y) * scalar;
        this.z += (vector.z - this.z) * scalar;
        return this;
    }
    map(fn) {
        return this.clone()._map(fn);
    }
    _map(fn) {
        this.x = fn(this.x);
        this.y = fn(this.y);
        this.z = fn(this.z);
        return this;
    }
    /**
     * Componant-wise multiplication
     * @param vector
     * @returns the resulting Vector3
     */
    mul(vector) {
        return this.clone()._mul(vector);
    }
    /**
     * Componant-wise multiplication
     * @param vector
     * @returns the current updated Vector3
     */
    _mul(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
        return this;
    }
    /**
     * V * M multiplication
     * @param matrix
     * @returns the resulting Vector3
     */
    mulMat3(matrix) {
        return this.clone()._mulMat3(matrix);
    }
    /**
     * V * M multiplication
     * @param matrix
     * @returns the current updated Vector3
     */
    _mulMat3(matrix) {
        return this._set(this.x * matrix.m11 + this.y * matrix.m21 + this.z * matrix.m31, this.x * matrix.m12 + this.y * matrix.m22 + this.z * matrix.m32, this.x * matrix.m13 + this.y * matrix.m23 + this.z * matrix.m33);
    }
    /**
     * M * V multiplication
     * @param matrix
     * @returns the resulting Vector3
     */
    permulMat3(matrix) {
        return this.clone()._permulMat3(matrix);
    }
    /**
     * M * V multiplication
     * @param matrix
     * @returns the current updated Vector3
     */
    _permulMat3(matrix) {
        return this._set(matrix.m11 * this.x + matrix.m12 * this.y + matrix.m13 * this.z, matrix.m21 * this.x + matrix.m22 * this.y + matrix.m23 * this.z, matrix.m31 * this.x + matrix.m32 * this.y + matrix.m33 * this.z);
    }
    /**
     * Perform M * V multiplication.
     * @param matrix
     * @returns
     */
    permulMat4(matrix) {
        return this.clone()._permulMat4(matrix);
    }
    /**
     * Perform M4 * V3 multiplication.
     * @param matrix
     * @returns
     */
    _permulMat4(matrix) {
        const w = 1 / (matrix.m41 * this.x + matrix.m42 * this.y + matrix.m43 * this.z + matrix.m44);
        return this._set((matrix.m11 * this.x + matrix.m12 * this.y + matrix.m13 * this.z + matrix.m14) * w, (matrix.m21 * this.x + matrix.m22 * this.y + matrix.m23 * this.z + matrix.m24) * w, (matrix.m31 * this.x + matrix.m32 * this.y + matrix.m33 * this.z + matrix.m34) * w);
    }
    /**
     *
     * @returns
     */
    normalize() {
        return this.clone()._normalize();
    }
    /**
     *
     * @returns
     */
    _normalize() {
        const length = this.length;
        if (length === 0)
            return this;
        const denominator = 1 / length;
        this.x *= denominator;
        this.y *= denominator;
        this.z *= denominator;
        return this;
    }
    /**
     *
     * @returns
     */
    negate() {
        return this.clone()._negate();
    }
    /**
     *
     * @returns
     */
    _negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    /**
     * Get orthogonal unit vector to this
     * @returns
     */
    orthogonalDirection() {
        let vector = Vec3.randomDirection();
        while (this.colinearTo(vector)) {
            vector = Vec3.randomDirection();
        }
        return this.cross(vector)._normalize();
    }
    /**
     *
     * @param scalar
     * @returns
     */
    scale(scalar) {
        return this.clone()._scale(scalar);
    }
    /**
     *
     * @param scalar
     * @returns
     */
    _scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    /**
     *
     * @param x
     * @param y
     * @param z
     * @returns the current updated Vector3
     */
    _set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    /**
     *
     * @param vector
     * @returns
     */
    sub(vector) {
        return this.clone()._sub(vector);
    }
    /**
     *
     * @param vector
     * @returns
     */
    _sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
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
        return this;
    }
    /**
     *
     * @returns
     */
    toArray() {
        return [this.x, this.y, this.z];
    }
    /**
     *
     * @returns
     */
    toJSON() {
        return `{x:${this.x},y:${this.y},z:${this.z}}`;
    }
    /**
     *
     * @returns
     */
    toQuat() {
        return new Quat_1.Quat(this.x, this.y, this.z, 1);
    }
    /**
     *
     * @returns
     */
    toVec2() {
        return new Vec2_1.Vec2(this.x, this.y);
    }
    // * Static Methods *
    static make(vec3) {
        if (vec3 instanceof Vec3)
            return vec3;
        if (Array.isArray(vec3) &&
            Number.isFinite(vec3[0]) &&
            Number.isFinite(vec3[1]) &&
            Number.isFinite(vec3[2]))
            return new Vec3(...vec3);
    }
    /**
     * Generate a random valid Vector3 instance with v.?C[0, 1]
     * @returns
     */
    static random() {
        return new Vec3(Math.random(), Math.random(), Math.random());
    }
    /**
     * Pick a random point on a unit sphere (uniformly distributed)
     * @see https://mathworld.wolfram.com/SpherePointPicking.html
     * @returns
     */
    static randomDirection() {
        const u = (Math.random() - 0.5) * 2;
        const t = Math.random() * Math.PI * 2;
        const f = Math.sqrt(1 - u ** 2);
        return new Vec3(f * Math.cos(t), f * Math.sin(t), u);
    }
    static fromVec2(vector) {
        return new Vec3(vector.x, vector.y, 0);
    }
    static fromVec4(vector) {
        return new Vec3(vector.x, vector.y, vector.z);
    }
}
exports.Vec3 = Vec3;
//# sourceMappingURL=Vec3.js.map