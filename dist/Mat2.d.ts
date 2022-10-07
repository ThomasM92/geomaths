import { Vec2 } from './Vec2';
/** A 2 by 2 matrix */
export declare class Mat2 {
    m11: number;
    m12: number;
    m21: number;
    m22: number;
    constructor(m11?: number, m12?: number, m21?: number, m22?: number);
    [Symbol.iterator](): Generator<number, void, unknown>;
    /**
     *
     * @param mat2
     * @returns this: this[i,j] <- mat2[i,j]
     */
    _copy(mat2: Mat2): Mat2;
    /**
     *
     * @returns mat2: mat2[i,j] <- this[i,j]
     */
    clone(): Mat2;
    /**
     * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/threeD/index.htm
     * @returns
     */
    det(): number;
    /**
     * There is no inplace equivalent ._invert() method to ensure handling of non-inversible matrices
     * @returns
     */
    inv(): Mat2 | void;
    /**
     *
     * @param mat2 the matrix to compare to
     * @param [precision=EPSILON] the comparison precision
     * @returns
     */
    equals(mat2: Mat2, precision?: number): boolean;
    col(column: number): Vec2;
    row(row: number): Vec2;
    map(fn: (element: number) => number): Mat2;
    _map(fn: (element: number) => number): Mat2;
    /**
     *
     * @param mat2
     * @returns this * mat2
     */
    mul(mat2: Mat2): Mat2;
    /**
     *
     * @param mat2
     * @returns this <- this * mat2
     */
    _mul(mat2: Mat2): Mat2;
    /**
     *
     * @param vec2
     * @returns this * vec2
     */
    mulVec2(vec2: Vec2): Vec2;
    /**
     *
     * @param mat2
     * @returns mat2 * this
     */
    permul(mat2: Mat2): Mat2;
    /**
     *
     * @param mat2
     * @returns this <- mat2 * this
     */
    _permul(mat2: Mat2): Mat2;
    /**
     *
     * @param vec2
     * @returns vec2 * this
     */
    permulVec2(vec2: Vec2): Vec2;
    /**
     *
     * @returns [...mij] row by row
     */
    toArray(): number[];
    /**
     *
     * @returns sum(mij) | i=j
     */
    trace(): number;
    /**
     *
     * @returns mat2: mat2[i,j] <- this[j,i]
     */
    transpose(): Mat2;
    /**
     *
     * @returns this: this[i,j] <- this[j,i]
     */
    _transpose(): Mat2;
    _set(m11: number, m12: number, m21: number, m22: number): Mat2;
    /**
     * @param column
     * @param vec2
     * @returns this: this[_,column] <- vec2
     */
    _col(column: number, vec2: Vec2): Mat2;
    /**
     * @param row
     * @param vector
     * @returns this: this[row,_] <- vec2
     */
    _row(row: number, vector: Vec2): Mat2;
    /**
     *
     * @returns
     */
    static Indentity(): Mat2;
}
