"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec2 = void 0;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const Vec3_1 = require("./Vec3");
/** A 2-dimensional euclidian vector */
class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    // * Getters & Setters *
    get length() {
        return Math.sqrt(this.lengthSq);
    }
    get lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    // Makes a Vec2 instance iterable (for...of)
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    // * Public Methods *
    /**
     * Gets a new Vec2, result of the addition of
     * the given vector to the current Vec2
     * @param vector the Vec2 to add
     * @returns the resulting Vec2
     */
    add(vector) {
        return this.clone()._add(vector);
    }
    /**
     * Adds the given vector to the current Vec2
     * @param vector the Vec2 to add
     * @returns the current updated Vec2
     */
    _add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    /**
     * Gets a new Vec2, result of the component-wise addition
     * of the given saclar to the current Vec2
     * @param scalar the Number to add
     * @returns the resulting Vec2
     */
    addScalar(scalar) {
        return this.clone()._addScalar(scalar);
    }
    /**
     * Adds the given scalar componentwise to the current Vec2
     * @param scalar the Number to add
     * @returns the current updated Vec2
     */
    _addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
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
     * Creates a new Vec2 copied from the current Vec2
     * @returns {Vec2}
     */
    clone() {
        return new Vec2(this.x, this.y);
    }
    /**
     * @param vector
     * @returns the current updated Vec2
     */
    _copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
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
     * @param position
     * @param direction
     * @returns
     */
    distanceToLine(position, direction) {
        return this.projectOnLine(position, direction).distanceTo(this);
    }
    /**
     *
     * @param vec2
     * @returns
     */
    distanceSqTo(vec2) {
        return this.sub(vec2).lengthSq;
    }
    /**
     * @param vec2
     * @returns
     */
    dot(vec2) {
        return this.x * vec2.x + this.y * vec2.y;
    }
    /**
     * @param vec2
     * @param [precision]
     * @returns
     */
    colinearTo(vec2, precision = constants_1.EPSILON) {
        return Math.abs(this.x * vec2.y - this.y * vec2.x) < precision;
    }
    /**
     *
     * @param vec2
     * @param [precision]
     * @returns
     */
    orthogonalTo(vec2, precision = constants_1.EPSILON) {
        return Math.abs(this.dot(vec2)) < precision;
    }
    /**
     * @param {Vec2} vec2
     * @param {Number} precision [optional]
     * @returns {Boolean}
     */
    equals(vec2, precision = constants_1.EPSILON) {
        return this.distanceTo(vec2) < precision;
    }
    /**
     *
     * @param vec2
     * @param scalar
     * @returns
     */
    lerp(vec2, scalar) {
        return this.clone()._lerp(vec2, scalar);
    }
    /**
     *
     * @param vec2
     * @param scalar
     * @returns
     */
    _lerp(vec2, scalar) {
        this.x += (vec2.x - this.x) * scalar;
        this.y += (vec2.y - this.y) * scalar;
        return this;
    }
    map(fn) {
        return this.clone()._map(fn);
    }
    _map(fn) {
        this.x = fn(this.x);
        this.y = fn(this.y);
        return this;
    }
    /**
     * Componant-wise multiplication
     * @param vec2
     * @returns the resulting Vec2
     */
    mul(vec2) {
        return this.clone()._mul(vec2);
    }
    /**
     * Componant-wise multiplication
     * @param vec2
     * @returns the current updated Vec2
     */
    _mul(vec2) {
        this.x *= vec2.x;
        this.y *= vec2.y;
        return this;
    }
    /**
     * V * M multiplication
     * @param mat2
     * @returns the resulting Vec2
     */
    mulMat2(mat2) {
        return this.clone()._mulMat2(mat2);
    }
    /**
     * V * M multiplication
     * @param mat2
     * @returns the current updated Vec2
     */
    _mulMat2(mat2) {
        return this._set(this.x * mat2.m11 + this.y * mat2.m21, this.x * mat2.m12 + this.y * mat2.m22);
    }
    /**
     * M * V multiplication
     * @param mat2
     * @returns the resulting Vec2
     */
    permulMat2(mat2) {
        return this.clone()._permulMat2(mat2);
    }
    /**
     * M * V multiplication
     * @param mat2
     * @returns the current updated Vec2
     */
    _permulMat2(mat2) {
        return this._set(mat2.m11 * this.x + mat2.m12 * this.y, mat2.m21 * this.x + mat2.m22 * this.y);
    }
    /**
     * Perform M * V multiplication.
     * @param mat3
     * @returns
     */
    permulMat3(mat3) {
        return this.clone()._permulMat3(mat3);
    }
    /**
     * Perform M4 * V3 multiplication.
     * @param mat3
     * @returns
     */
    _permulMat3(mat3) {
        const w = 1 / (mat3.m31 * this.x + mat3.m32 * this.y + mat3.m33);
        return this._set((mat3.m11 * this.x + mat3.m12 * this.y + mat3.m13) * w, (mat3.m21 * this.x + mat3.m22 * this.y + mat3.m23) * w);
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
        return this;
    }
    /**
     * Get orthogonal unit vector to this
     * @returns
     */
    orthogonalDirection() {
        return new Vec2(-this.y, this.x);
    }
    /**
     *
     * @param position line position
     * @param direction line direction
     * @returns
     */
    projectOnLine(position, direction) {
        const vector = this.sub(position);
        const magnitude = direction.dot(vector);
        return direction.scale(magnitude)._add(position);
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
        return this;
    }
    /**
     *
     * @param x
     * @param y
     * @returns the current updated Vec2
     */
    _set(x, y) {
        this.x = x;
        this.y = y;
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
        return this;
    }
    /**
     *
     * @returns
     */
    toArray() {
        return [this.x, this.y];
    }
    /**
     *
     * @returns
     */
    toJSON() {
        return `{x:${this.x},y:${this.y}}`;
    }
    /**
     *
     * @returns
     */
    toVec3() {
        return new Vec3_1.Vec3(this.x, this.y, 1);
    }
    // * Static Methods *
    static make(vector) {
        if (vector instanceof Vec2)
            return vector;
        if (Array.isArray(vector) && Number.isFinite(vector[0]) && Number.isFinite(vector[1]))
            return new Vec2(...vector);
    }
    /**
     * Generate a random valid Vec2 instance with v.?C[0, 1]
     * @returns
     */
    static random() {
        return new Vec2(Math.random(), Math.random());
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
        return new Vec2(f * Math.cos(t), f * Math.sin(t));
    }
    static fromVec3(vec3) {
        return new Vec2(vec3.x, vec3.y);
    }
}
exports.Vec2 = Vec2;
//# sourceMappingURL=Vec2.js.map