import { EPSILON } from './constants';
import { Vec2 } from './Vec2';

/** A 2 by 2 matrix */
export class Mat2 {
	constructor(
		public m11: number = 0,
		public m12: number = 0,
		public m21: number = 0,
		public m22: number = 0
	) {}

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
	public _copy(mat2: Mat2): Mat2 {
		return this._set(mat2.m11, mat2.m12, mat2.m21, mat2.m22);
	}

	/**
	 *
	 * @returns mat2: mat2[i,j] <- this[i,j]
	 */
	public clone(): Mat2 {
		return new Mat2(this.m11, this.m12, this.m21, this.m22);
	}

	/**
	 * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/threeD/index.htm
	 * @returns
	 */
	public det(): number {
		return this.m11 * this.m22 - this.m21 * this.m12;
	}

	/**
	 * There is no inplace equivalent ._invert() method to ensure handling of non-inversible matrices
	 * @returns
	 */
	public inv(): Mat2 | void {
		const det = this.det();

		if (det === 0) return;

		const detInv = 1 / det;

		return new Mat2(detInv * this.m22, -detInv * this.m12, -detInv * this.m21, detInv * this.m11);
	}

	/**
	 *
	 * @param mat2 the matrix to compare to
	 * @param [precision=EPSILON] the comparison precision
	 * @returns
	 */
	public equals(mat2: Mat2, precision: number = EPSILON): boolean {
		return (
			Math.abs(this.m11 - mat2.m11) < precision &&
			Math.abs(this.m12 - mat2.m12) < precision &&
			Math.abs(this.m21 - mat2.m21) < precision &&
			Math.abs(this.m22 - mat2.m22) < precision
		);
	}

	public col(column: number): Vec2 {
		if (column === 0) return new Vec2(this.m11, this.m21);
		else if (column === 1) return new Vec2(this.m12, this.m22);
		else throw new RangeError('Expecting 0 <= column <= 1');
	}

	public row(row: number): Vec2 {
		if (row === 0) return new Vec2(this.m11, this.m12);
		else if (row === 1) return new Vec2(this.m21, this.m22);
		else throw new RangeError('Expecting 0 <= row <= 1');
	}

	public map(fn: (element: number) => number): Mat2 {
		return this.clone()._map(fn);
	}

	public _map(fn: (element: number) => number): Mat2 {
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
	public mul(mat2: Mat2): Mat2 {
		return this.clone()._mul(mat2);
	}

	/**
	 *
	 * @param mat2
	 * @returns this <- this * mat2
	 */
	public _mul(mat2: Mat2): Mat2 {
		return this._set(
			this.m11 * mat2.m11 + this.m12 * mat2.m21,
			this.m11 * mat2.m12 + this.m12 * mat2.m22,
			this.m21 * mat2.m11 + this.m22 * mat2.m21,
			this.m21 * mat2.m12 + this.m22 * mat2.m22
		);
	}

	/**
	 *
	 * @param vec2
	 * @returns this * vec2
	 */
	public mulVec2(vec2: Vec2): Vec2 {
		return new Vec2(this.m11 * vec2.x + this.m12 * vec2.y, this.m21 * vec2.x + this.m22 * vec2.y);
	}

	/**
	 *
	 * @param mat2
	 * @returns mat2 * this
	 */
	public permul(mat2: Mat2): Mat2 {
		return this.clone()._permul(mat2);
	}

	/**
	 *
	 * @param mat2
	 * @returns this <- mat2 * this
	 */
	public _permul(mat2: Mat2): Mat2 {
		return this._set(
			mat2.m11 * this.m11 + mat2.m12 * this.m21,
			mat2.m11 * this.m12 + mat2.m12 * this.m22,
			mat2.m21 * this.m11 + mat2.m22 * this.m21,
			mat2.m21 * this.m12 + mat2.m22 * this.m22
		);
	}

	/**
	 *
	 * @param vec2
	 * @returns vec2 * this
	 */
	public permulVec2(vec2: Vec2): Vec2 {
		return new Vec2(vec2.x * this.m11 + vec2.y * this.m21, vec2.x * this.m12 + vec2.y * this.m22);
	}

	/**
	 *
	 * @returns [...mij] row by row
	 */
	public toArray(): number[] {
		return [this.m11, this.m12, this.m21, this.m22];
	}

	/**
	 *
	 * @returns sum(mij) | i=j
	 */
	public trace(): number {
		return this.m11 + this.m22;
	}

	/**
	 *
	 * @returns mat2: mat2[i,j] <- this[j,i]
	 */
	public transpose(): Mat2 {
		return this.clone()._transpose();
	}

	/**
	 *
	 * @returns this: this[i,j] <- this[j,i]
	 */
	public _transpose(): Mat2 {
		return this._set(this.m11, this.m21, this.m12, this.m22);
	}

	public _set(m11: number, m12: number, m21: number, m22: number): Mat2 {
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
	public _col(column: number, vec2: Vec2): Mat2 {
		if (column === 0) {
			this.m11 = vec2.x;
			this.m21 = vec2.y;
			return this;
		} else if (column === 1) {
			this.m12 = vec2.x;
			this.m22 = vec2.y;
			return this;
		} else throw new RangeError('Expecting 0 <= column <= 1');
	}

	/**
	 * @param row
	 * @param vector
	 * @returns this: this[row,_] <- vec2
	 */
	public _row(row: number, vector: Vec2): Mat2 {
		if (row === 0) {
			this.m11 = vector.x;
			this.m12 = vector.y;
			return this;
		} else if (row === 1) {
			this.m21 = vector.x;
			this.m22 = vector.y;
			return this;
		} else throw new RangeError('Expecting 0 <= row <= 1');
	}

	// * Static Methods *

	/**
	 *
	 * @returns
	 */
	public static Indentity(): Mat2 {
		return new Mat2(1, 0, 0, 1);
	}
}
