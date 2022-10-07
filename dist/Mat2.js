"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mat2 = void 0;
const constants_1 = require("./constants");
const Vec2_1 = require("./Vec2");
/** A 2 by 2 matrix */
class Mat2 {
    constructor(m11 = 0, m12 = 0, m21 = 0, m22 = 0) {
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
    }
    // * Getters & Setters *
    // Makes a Mat2 instance iterable (for...of)
    *[Symbol.iterator]() {
        yield this.m11;
        yield this.m12;
        yield this.m21;
        yield this.m22;
    }
    // * Public Methods *
    /**
     *
     * @param mat2
     * @returns this: this[i,j] <- mat2[i,j]
     */
    _copy(mat2) {
        return this._set(mat2.m11, mat2.m12, mat2.m21, mat2.m22);
    }
    /**
     *
     * @returns mat2: mat2[i,j] <- this[i,j]
     */
    clone() {
        return new Mat2(this.m11, this.m12, this.m21, this.m22);
    }
    /**
     * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/threeD/index.htm
     * @returns
     */
    det() {
        return this.m11 * this.m22 - this.m21 * this.m12;
    }
    /**
     * There is no inplace equivalent ._invert() method to ensure handling of non-inversible matrices
     * @returns
     */
    inv() {
        const det = this.det();
        if (det === 0)
            return;
        const detInv = 1 / det;
        return new Mat2(detInv * this.m22, -detInv * this.m12, -detInv * this.m21, detInv * this.m11);
    }
    /**
     *
     * @param mat2 the matrix to compare to
     * @param [precision=EPSILON] the comparison precision
     * @returns
     */
    equals(mat2, precision = constants_1.EPSILON) {
        return (Math.abs(this.m11 - mat2.m11) < precision &&
            Math.abs(this.m12 - mat2.m12) < precision &&
            Math.abs(this.m21 - mat2.m21) < precision &&
            Math.abs(this.m22 - mat2.m22) < precision);
    }
    col(column) {
        if (column === 0)
            return new Vec2_1.Vec2(this.m11, this.m21);
        else if (column === 1)
            return new Vec2_1.Vec2(this.m12, this.m22);
        else
            throw new RangeError('Expecting 0 <= column <= 1');
    }
    row(row) {
        if (row === 0)
            return new Vec2_1.Vec2(this.m11, this.m12);
        else if (row === 1)
            return new Vec2_1.Vec2(this.m21, this.m22);
        else
            throw new RangeError('Expecting 0 <= row <= 1');
    }
    map(fn) {
        return this.clone()._map(fn);
    }
    _map(fn) {
        this.m11 = fn(this.m11);
        this.m12 = fn(this.m12);
        this.m21 = fn(this.m21);
        this.m22 = fn(this.m22);
        return this;
    }
    /**
     *
     * @param mat2
     * @returns this * mat2
     */
    mul(mat2) {
        return this.clone()._mul(mat2);
    }
    /**
     *
     * @param mat2
     * @returns this <- this * mat2
     */
    _mul(mat2) {
        return this._set(this.m11 * mat2.m11 + this.m12 * mat2.m21, this.m11 * mat2.m12 + this.m12 * mat2.m22, this.m21 * mat2.m11 + this.m22 * mat2.m21, this.m21 * mat2.m12 + this.m22 * mat2.m22);
    }
    /**
     *
     * @param vec2
     * @returns this * vec2
     */
    mulVec2(vec2) {
        return new Vec2_1.Vec2(this.m11 * vec2.x + this.m12 * vec2.y, this.m21 * vec2.x + this.m22 * vec2.y);
    }
    /**
     *
     * @param mat2
     * @returns mat2 * this
     */
    permul(mat2) {
        return this.clone()._permul(mat2);
    }
    /**
     *
     * @param mat2
     * @returns this <- mat2 * this
     */
    _permul(mat2) {
        return this._set(mat2.m11 * this.m11 + mat2.m12 * this.m21, mat2.m11 * this.m12 + mat2.m12 * this.m22, mat2.m21 * this.m11 + mat2.m22 * this.m21, mat2.m21 * this.m12 + mat2.m22 * this.m22);
    }
    /**
     *
     * @param vec2
     * @returns vec2 * this
     */
    permulVec2(vec2) {
        return new Vec2_1.Vec2(vec2.x * this.m11 + vec2.y * this.m21, vec2.x * this.m12 + vec2.y * this.m22);
    }
    /**
     *
     * @returns [...mij] row by row
     */
    toArray() {
        return [this.m11, this.m12, this.m21, this.m22];
    }
    /**
     *
     * @returns sum(mij) | i=j
     */
    trace() {
        return this.m11 + this.m22;
    }
    /**
     *
     * @returns mat2: mat2[i,j] <- this[j,i]
     */
    transpose() {
        return this.clone()._transpose();
    }
    /**
     *
     * @returns this: this[i,j] <- this[j,i]
     */
    _transpose() {
        return this._set(this.m11, this.m21, this.m12, this.m22);
    }
    _set(m11, m12, m21, m22) {
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
        return this;
    }
    /**
     * @param column
     * @param vec2
     * @returns this: this[_,column] <- vec2
     */
    _col(column, vec2) {
        if (column === 0) {
            this.m11 = vec2.x;
            this.m21 = vec2.y;
            return this;
        }
        else if (column === 1) {
            this.m12 = vec2.x;
            this.m22 = vec2.y;
            return this;
        }
        else
            throw new RangeError('Expecting 0 <= column <= 1');
    }
    /**
     * @param row
     * @param vector
     * @returns this: this[row,_] <- vec2
     */
    _row(row, vector) {
        if (row === 0) {
            this.m11 = vector.x;
            this.m12 = vector.y;
            return this;
        }
        else if (row === 1) {
            this.m21 = vector.x;
            this.m22 = vector.y;
            return this;
        }
        else
            throw new RangeError('Expecting 0 <= row <= 1');
    }
    // * Static Methods *
    /**
     *
     * @returns
     */
    static Indentity() {
        return new Mat2(1, 0, 0, 1);
    }
}
exports.Mat2 = Mat2;
//# sourceMappingURL=Mat2.js.map