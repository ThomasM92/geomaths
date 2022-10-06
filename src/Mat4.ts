import { EPSILON } from './constants';
import { Euler } from './Euler';
import { Mat3 } from './Mat3';
import { Vec3 } from './Vec3';

export class Mat4 {
	/** @constructor */
	constructor(
		public m11: number = 0,
		public m12: number = 0,
		public m13: number = 0,
		public m14: number = 0,
		public m21: number = 0,
		public m22: number = 0,
		public m23: number = 0,
		public m24: number = 0,
		public m31: number = 0,
		public m32: number = 0,
		public m33: number = 0,
		public m34: number = 0,
		public m41: number = 0,
		public m42: number = 0,
		public m43: number = 0,
		public m44: number = 0
	) {}

	// * Getters & Setters *

	get isValid(): boolean {
		if (
			Number.isFinite(this.m11) &&
			Number.isFinite(this.m12) &&
			Number.isFinite(this.m13) &&
			Number.isFinite(this.m14) &&
			Number.isFinite(this.m21) &&
			Number.isFinite(this.m22) &&
			Number.isFinite(this.m23) &&
			Number.isFinite(this.m24) &&
			Number.isFinite(this.m31) &&
			Number.isFinite(this.m32) &&
			Number.isFinite(this.m33) &&
			Number.isFinite(this.m34) &&
			Number.isFinite(this.m41) &&
			Number.isFinite(this.m42) &&
			Number.isFinite(this.m43) &&
			Number.isFinite(this.m44)
		)
			return true;

		return false;
	}

	// Makes a Mat4 instance iterable (for...of)
	*[Symbol.iterator]() {
		yield this.m11;
		yield this.m12;
		yield this.m13;
		yield this.m14;
		yield this.m21;
		yield this.m22;
		yield this.m23;
		yield this.m24;
		yield this.m31;
		yield this.m32;
		yield this.m33;
		yield this.m34;
		yield this.m41;
		yield this.m42;
		yield this.m43;
		yield this.m44;
	}

	// * Public Methods *

	public apply(fn: (element: number) => number): Mat4 {
		return this.clone()._apply(fn);
	}

	public _apply(fn: (element: number) => number): Mat4 {
		this.m11 = fn(this.m11);
		this.m12 = fn(this.m12);
		this.m13 = fn(this.m13);
		this.m14 = fn(this.m14);
		this.m21 = fn(this.m21);
		this.m22 = fn(this.m22);
		this.m23 = fn(this.m23);
		this.m24 = fn(this.m24);
		this.m31 = fn(this.m31);
		this.m32 = fn(this.m32);
		this.m33 = fn(this.m33);
		this.m34 = fn(this.m34);
		this.m41 = fn(this.m41);
		this.m42 = fn(this.m42);
		this.m43 = fn(this.m43);
		this.m44 = fn(this.m44);

		return this;
	}

	/**
	 *
	 * @param mat4
	 * @returns this: this[i,j] <- mat4[i,j]
	 */
	public copy(mat4: Mat4): Mat4 {
		return this.set(
			mat4.m11,
			mat4.m12,
			mat4.m13,
			mat4.m14,
			mat4.m21,
			mat4.m22,
			mat4.m23,
			mat4.m24,
			mat4.m31,
			mat4.m32,
			mat4.m33,
			mat4.m34,
			mat4.m41,
			mat4.m42,
			mat4.m43,
			mat4.m44
		);
	}

	/**
	 *
	 * @returns mat4: mat4[i,j] <- this[i,j]
	 */
	public clone(): Mat4 {
		return new Mat4(
			this.m11,
			this.m12,
			this.m13,
			this.m14,
			this.m21,
			this.m22,
			this.m23,
			this.m24,
			this.m31,
			this.m32,
			this.m33,
			this.m34,
			this.m41,
			this.m42,
			this.m43,
			this.m44
		);
	}

	/**
	 * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/fourD/index.htm
	 * @returns
	 */
	public det(): number {
		return (
			this.m14 * this.m23 * this.m32 * this.m41 -
			this.m13 * this.m24 * this.m32 * this.m41 -
			this.m14 * this.m22 * this.m33 * this.m41 +
			this.m12 * this.m24 * this.m33 * this.m41 +
			this.m13 * this.m22 * this.m34 * this.m41 -
			this.m12 * this.m23 * this.m34 * this.m41 -
			this.m14 * this.m23 * this.m31 * this.m42 +
			this.m13 * this.m24 * this.m31 * this.m42 +
			this.m14 * this.m21 * this.m33 * this.m42 -
			this.m11 * this.m24 * this.m33 * this.m42 -
			this.m13 * this.m21 * this.m34 * this.m42 +
			this.m11 * this.m23 * this.m34 * this.m42 +
			this.m14 * this.m22 * this.m31 * this.m43 -
			this.m12 * this.m24 * this.m31 * this.m43 -
			this.m14 * this.m21 * this.m32 * this.m43 +
			this.m11 * this.m24 * this.m32 * this.m43 +
			this.m12 * this.m21 * this.m34 * this.m43 -
			this.m11 * this.m22 * this.m34 * this.m43 -
			this.m13 * this.m22 * this.m31 * this.m44 +
			this.m12 * this.m23 * this.m31 * this.m44 +
			this.m13 * this.m21 * this.m32 * this.m44 -
			this.m11 * this.m23 * this.m32 * this.m44 -
			this.m12 * this.m21 * this.m33 * this.m44 +
			this.m11 * this.m22 * this.m33 * this.m44
		);
	}

	/**
	 * There is no equivalent .invertMutate() method to force handling non-inversible matrices
	 * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
	 * @returns
	 */
	public invert(): Mat4 | void {
		const A2323 = this.m33 * this.m44 - this.m34 * this.m43;
		const A1323 = this.m32 * this.m44 - this.m34 * this.m42;
		const A1223 = this.m32 * this.m43 - this.m33 * this.m42;
		const A0323 = this.m31 * this.m44 - this.m34 * this.m41;
		const A0223 = this.m31 * this.m43 - this.m33 * this.m41;
		const A0123 = this.m31 * this.m42 - this.m32 * this.m41;
		const A2313 = this.m23 * this.m44 - this.m24 * this.m43;
		const A1313 = this.m22 * this.m44 - this.m24 * this.m42;
		const A1213 = this.m22 * this.m43 - this.m23 * this.m42;
		const A2312 = this.m23 * this.m34 - this.m24 * this.m33;
		const A1312 = this.m22 * this.m34 - this.m24 * this.m32;
		const A1212 = this.m22 * this.m33 - this.m23 * this.m32;
		const A0313 = this.m21 * this.m44 - this.m24 * this.m41;
		const A0213 = this.m21 * this.m43 - this.m23 * this.m41;
		const A0312 = this.m21 * this.m34 - this.m24 * this.m31;
		const A0212 = this.m21 * this.m33 - this.m23 * this.m31;
		const A0113 = this.m21 * this.m42 - this.m22 * this.m41;
		const A0112 = this.m21 * this.m32 - this.m22 * this.m31;

		const det =
			this.m11 * (this.m22 * A2323 - this.m23 * A1323 + this.m24 * A1223) -
			this.m12 * (this.m21 * A2323 - this.m23 * A0323 + this.m24 * A0223) +
			this.m13 * (this.m21 * A1323 - this.m22 * A0323 + this.m24 * A0123) -
			this.m14 * (this.m21 * A1223 - this.m22 * A0223 + this.m23 * A0123);

		if (det === 0) return;

		const detInv = 1 / det;

		return new Mat4(
			detInv * (this.m22 * A2323 - this.m23 * A1323 + this.m24 * A1223),
			detInv * -(this.m12 * A2323 - this.m13 * A1323 + this.m14 * A1223),
			detInv * (this.m12 * A2313 - this.m13 * A1313 + this.m14 * A1213),
			detInv * -(this.m12 * A2312 - this.m13 * A1312 + this.m14 * A1212),
			detInv * -(this.m21 * A2323 - this.m23 * A0323 + this.m24 * A0223),
			detInv * (this.m11 * A2323 - this.m13 * A0323 + this.m14 * A0223),
			detInv * -(this.m11 * A2313 - this.m13 * A0313 + this.m14 * A0213),
			detInv * (this.m11 * A2312 - this.m13 * A0312 + this.m14 * A0212),
			detInv * (this.m21 * A1323 - this.m22 * A0323 + this.m24 * A0123),
			detInv * -(this.m11 * A1323 - this.m12 * A0323 + this.m14 * A0123),
			detInv * (this.m11 * A1313 - this.m12 * A0313 + this.m14 * A0113),
			detInv * -(this.m11 * A1312 - this.m12 * A0312 + this.m14 * A0112),
			detInv * -(this.m21 * A1223 - this.m22 * A0223 + this.m23 * A0123),
			detInv * (this.m11 * A1223 - this.m12 * A0223 + this.m13 * A0123),
			detInv * -(this.m11 * A1213 - this.m12 * A0213 + this.m13 * A0113),
			detInv * (this.m11 * A1212 - this.m12 * A0212 + this.m13 * A0112)
		);
	}

	/**
	 *
	 * @param mat4 the matrix to compare to
	 * @param precision [precision=EPSILON]
	 * @returns
	 */
	public isEqualTo(mat4: Mat4, precision: number = EPSILON): boolean {
		return (
			Math.abs(this.m11 - mat4.m11) < precision &&
			Math.abs(this.m12 - mat4.m12) < precision &&
			Math.abs(this.m13 - mat4.m13) < precision &&
			Math.abs(this.m14 - mat4.m14) < precision &&
			Math.abs(this.m21 - mat4.m21) < precision &&
			Math.abs(this.m22 - mat4.m22) < precision &&
			Math.abs(this.m23 - mat4.m23) < precision &&
			Math.abs(this.m24 - mat4.m24) < precision &&
			Math.abs(this.m31 - mat4.m31) < precision &&
			Math.abs(this.m32 - mat4.m32) < precision &&
			Math.abs(this.m33 - mat4.m33) < precision &&
			Math.abs(this.m34 - mat4.m34) < precision &&
			Math.abs(this.m41 - mat4.m41) < precision &&
			Math.abs(this.m42 - mat4.m42) < precision &&
			Math.abs(this.m43 - mat4.m43) < precision &&
			Math.abs(this.m44 - mat4.m44) < precision
		);
	}

	/**
	 *
	 * @param mat4
	 * @returns mat4 * this
	 */
	public multiplyMat4(mat4: Mat4): Mat4 {
		return this.clone()._multiplyMat4(mat4);
	}

	/**
	 *
	 * @param matrix4
	 * @returns this <- mat4 * this
	 */
	public _multiplyMat4(matrix4: Mat4): Mat4 {
		return this.set(
			matrix4.m11 * this.m11 +
				matrix4.m12 * this.m21 +
				matrix4.m13 * this.m31 +
				matrix4.m14 * this.m41,
			matrix4.m11 * this.m12 +
				matrix4.m12 * this.m22 +
				matrix4.m13 * this.m32 +
				matrix4.m14 * this.m42,
			matrix4.m11 * this.m13 +
				matrix4.m12 * this.m23 +
				matrix4.m13 * this.m33 +
				matrix4.m14 * this.m43,
			matrix4.m11 * this.m14 +
				matrix4.m12 * this.m24 +
				matrix4.m13 * this.m34 +
				matrix4.m14 * this.m44,
			matrix4.m21 * this.m11 +
				matrix4.m22 * this.m21 +
				matrix4.m23 * this.m31 +
				matrix4.m24 * this.m41,
			matrix4.m21 * this.m12 +
				matrix4.m22 * this.m22 +
				matrix4.m23 * this.m32 +
				matrix4.m24 * this.m42,
			matrix4.m21 * this.m13 +
				matrix4.m22 * this.m23 +
				matrix4.m23 * this.m33 +
				matrix4.m24 * this.m43,
			matrix4.m21 * this.m14 +
				matrix4.m22 * this.m24 +
				matrix4.m23 * this.m34 +
				matrix4.m24 * this.m44,
			matrix4.m31 * this.m11 +
				matrix4.m32 * this.m21 +
				matrix4.m33 * this.m31 +
				matrix4.m34 * this.m41,
			matrix4.m31 * this.m12 +
				matrix4.m32 * this.m22 +
				matrix4.m33 * this.m32 +
				matrix4.m34 * this.m42,
			matrix4.m31 * this.m13 +
				matrix4.m32 * this.m23 +
				matrix4.m33 * this.m33 +
				matrix4.m34 * this.m43,
			matrix4.m31 * this.m14 +
				matrix4.m32 * this.m24 +
				matrix4.m33 * this.m34 +
				matrix4.m34 * this.m44,
			matrix4.m41 * this.m11 +
				matrix4.m42 * this.m21 +
				matrix4.m43 * this.m31 +
				matrix4.m44 * this.m41,
			matrix4.m41 * this.m12 +
				matrix4.m42 * this.m22 +
				matrix4.m43 * this.m32 +
				matrix4.m44 * this.m42,
			matrix4.m41 * this.m13 +
				matrix4.m42 * this.m23 +
				matrix4.m43 * this.m33 +
				matrix4.m44 * this.m43,
			matrix4.m41 * this.m14 +
				matrix4.m42 * this.m24 +
				matrix4.m43 * this.m34 +
				matrix4.m44 * this.m44
		);
	}

	/**
	 *
	 * @param mat4
	 * @returns mat4 * this
	 */
	public permultiplyMat4(mat4: Mat4): Mat4 {
		return this.clone()._permultiplyMat4(mat4);
	}

	/**
	 *
	 * @param mat4
	 * @returns this <- this * mat4
	 */
	public _permultiplyMat4(mat4: Mat4): Mat4 {
		return this.set(
			this.m11 * mat4.m11 + this.m12 * mat4.m21 + this.m13 * mat4.m31 + this.m14 * mat4.m41,
			this.m11 * mat4.m12 + this.m12 * mat4.m22 + this.m13 * mat4.m32 + this.m14 * mat4.m42,
			this.m11 * mat4.m13 + this.m12 * mat4.m23 + this.m13 * mat4.m33 + this.m14 * mat4.m43,
			this.m11 * mat4.m14 + this.m12 * mat4.m24 + this.m13 * mat4.m34 + this.m14 * mat4.m44,
			this.m21 * mat4.m11 + this.m22 * mat4.m21 + this.m23 * mat4.m31 + this.m24 * mat4.m41,
			this.m21 * mat4.m12 + this.m22 * mat4.m22 + this.m23 * mat4.m32 + this.m24 * mat4.m42,
			this.m21 * mat4.m13 + this.m22 * mat4.m23 + this.m23 * mat4.m33 + this.m24 * mat4.m43,
			this.m21 * mat4.m14 + this.m22 * mat4.m24 + this.m23 * mat4.m34 + this.m24 * mat4.m44,
			this.m31 * mat4.m11 + this.m32 * mat4.m21 + this.m33 * mat4.m31 + this.m34 * mat4.m41,
			this.m31 * mat4.m12 + this.m32 * mat4.m22 + this.m33 * mat4.m32 + this.m34 * mat4.m42,
			this.m31 * mat4.m13 + this.m32 * mat4.m23 + this.m33 * mat4.m33 + this.m34 * mat4.m43,
			this.m31 * mat4.m14 + this.m32 * mat4.m24 + this.m33 * mat4.m34 + this.m34 * mat4.m44,
			this.m41 * mat4.m11 + this.m42 * mat4.m21 + this.m43 * mat4.m31 + this.m44 * mat4.m41,
			this.m41 * mat4.m12 + this.m42 * mat4.m22 + this.m43 * mat4.m32 + this.m44 * mat4.m42,
			this.m41 * mat4.m13 + this.m42 * mat4.m23 + this.m43 * mat4.m33 + this.m44 * mat4.m43,
			this.m41 * mat4.m14 + this.m42 * mat4.m24 + this.m43 * mat4.m34 + this.m44 * mat4.m44
		);
	}

	/**
	 *
	 * @param vec3
	 * @returns vector3 * this
	 */
	public permultiplyVec3(vec3: Vec3): Vec3 {
		const w = 1 / (vec3.x * this.m14 + vec3.y * this.m24 + vec3.z * this.m34 + this.m44);

		return new Vec3(
			w * (vec3.x * this.m11 + vec3.y * this.m21 + vec3.z * this.m31 + this.m41),
			w * (vec3.x * this.m12 + vec3.y * this.m22 + vec3.z * this.m32 + this.m42),
			w * (vec3.x * this.m13 + vec3.y * this.m23 + vec3.z * this.m33 + this.m43)
		);
	}

	/**
	 *
	 * @param vec3
	 * @returns this * vector3
	 */
	public multiplyVec3(vec3: Vec3): Vec3 {
		const w = 1 / (this.m41 * vec3.x + this.m42 * vec3.y + this.m43 * vec3.z + this.m44);

		return new Vec3(
			w * (this.m11 * vec3.x + this.m12 * vec3.y + this.m13 * vec3.z + this.m14),
			w * (this.m21 * vec3.x + this.m22 * vec3.y + this.m23 * vec3.z + this.m24),
			w * (this.m31 * vec3.x + this.m32 * vec3.y + this.m33 * vec3.z + this.m34)
		);
	}

	/**
	 *
	 * @param scalar
	 * @returns mat4 <- this[i,j] * scalar
	 */
	public mutliplyScalar(scalar: number): Mat4 {
		return this.clone()._mutliplyScalar(scalar);
	}

	/**
	 *
	 * @param scalar
	 * @returns this <- this[i,j] * scalar
	 */
	public _mutliplyScalar(scalar: number): Mat4 {
		this.m11 *= scalar;
		this.m12 *= scalar;
		this.m13 *= scalar;
		this.m14 *= scalar;
		this.m21 *= scalar;
		this.m22 *= scalar;
		this.m23 *= scalar;
		this.m24 *= scalar;
		this.m31 *= scalar;
		this.m32 *= scalar;
		this.m33 *= scalar;
		this.m34 *= scalar;
		this.m41 *= scalar;
		this.m42 *= scalar;
		this.m43 *= scalar;
		this.m44 *= scalar;

		return this;
	}

	public set(
		m11: number,
		m12: number,
		m13: number,
		m14: number,
		m21: number,
		m22: number,
		m23: number,
		m24: number,
		m31: number,
		m32: number,
		m33: number,
		m34: number,
		m41: number,
		m42: number,
		m43: number,
		m44: number
	): Mat4 {
		this.m11 = m11;
		this.m12 = m12;
		this.m13 = m13;
		this.m14 = m14;
		this.m21 = m21;
		this.m22 = m22;
		this.m23 = m23;
		this.m24 = m24;
		this.m31 = m31;
		this.m32 = m32;
		this.m33 = m33;
		this.m34 = m34;
		this.m41 = m41;
		this.m42 = m42;
		this.m43 = m43;
		this.m44 = m44;

		return this;
	}

	public setRotation(mat3: Mat3): Mat4 {
		this.m11 = mat3.m11;
		this.m12 = mat3.m12;
		this.m13 = mat3.m13;
		this.m21 = mat3.m21;
		this.m22 = mat3.m22;
		this.m23 = mat3.m23;
		this.m31 = mat3.m31;
		this.m32 = mat3.m32;
		this.m33 = mat3.m33;

		return this;
	}

	public setScale(vec3: Vec3): Mat4 {
		this.m11 = vec3.x;
		this.m22 = vec3.y;
		this.m33 = vec3.z;

		return this;
	}

	public setTranslation(vec3: Vec3): Mat4 {
		this.m14 = vec3.x;
		this.m24 = vec3.y;
		this.m34 = vec3.z;

		return this;
	}

	/**
	 *
	 * @returns [...mij] row by row
	 */
	public toArray(): number[] {
		return [
			this.m11,
			this.m12,
			this.m13,
			this.m14,
			this.m21,
			this.m22,
			this.m23,
			this.m24,
			this.m31,
			this.m32,
			this.m33,
			this.m34,
			this.m41,
			this.m42,
			this.m43,
			this.m44,
		];
	}

	/**
	 *
	 * @returns mat4: mat4[i,j] <- this[j,i]
	 */
	public transpose(): Mat4 {
		return this.clone()._transpose();
	}

	/**
	 *
	 * @returns this: this[i,j] <- this[j,i]
	 */
	public _transpose(): Mat4 {
		const m11 = this.m11,
			m12 = this.m21,
			m13 = this.m31,
			m14 = this.m41;
		const m21 = this.m12,
			m22 = this.m22,
			m23 = this.m32,
			m24 = this.m42;
		const m31 = this.m13,
			m32 = this.m23,
			m33 = this.m33,
			m34 = this.m43;
		const m41 = this.m14,
			m42 = this.m24,
			m43 = this.m34,
			m44 = this.m44;

		return new Mat4(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44);
	}

	public static identity(): Mat4 {
		return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
	}

	public static makeRotationAroundAxis(axis: Vec3, angle: number): Mat4 {
		const { x, y, z } = axis,
			c = Math.cos(angle),
			s = Math.sin(angle),
			cc = 1 - c,
			xy = x * y,
			xz = x * z,
			yz = y * z,
			xs = x * s,
			ys = y * s,
			zs = z * s;

		return new Mat4(
			x * x * cc + c,
			xy * cc - zs,
			xz * cc + ys,
			0,
			xy * cc + zs,
			y * y * cc + c,
			yz * cc - xs,
			0,
			xz * cc - ys,
			yz * cc + xs,
			z * z * cc + c,
			0,
			0,
			0,
			0,
			1
		);
	}

	public static fromEuler(euler: Euler): Mat4 {
		const mat3 = Mat3.fromEuler(euler);
		return new Mat4().setRotation(mat3);
	}

	/**
	 *
	 * @param {Vec3} directionX
	 * @param {Vec3} directionY
	 * @param {Vec3} directionZ
	 * @param {Vec3} position
	 * @returns {Mat4}
	 */
	public static rotationMatrixFromAxes(
		directionX: Vec3,
		directionY: Vec3,
		directionZ: Vec3,
		position: Vec3
	): Mat4 {
		return new Mat4(
			directionX.x,
			directionY.x,
			directionZ.x,
			position.x,
			directionX.y,
			directionY.y,
			directionZ.y,
			position.y,
			directionX.z,
			directionY.z,
			directionZ.z,
			position.z,
			0,
			0,
			0,
			1
		);
	}
}
