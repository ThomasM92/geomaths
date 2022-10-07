import { AxisAngle } from './AxisAngle';
import { EPSILON } from './constants';
import { Euler, EulerOrder } from './Euler';
import { Quat } from './Quat';
import { Vec3 } from './Vec3';

/** A 3 by 3 matrix */
export class Mat3 {
	constructor(
		public m11: number = 0,
		public m12: number = 0,
		public m13: number = 0,
		public m21: number = 0,
		public m22: number = 0,
		public m23: number = 0,
		public m31: number = 0,
		public m32: number = 0,
		public m33: number = 0
	) {}

	// * Getters & Setters *

	// Makes a Matrix3 instance iterable (for...of)
	*[Symbol.iterator]() {
		yield this.m11;
		yield this.m12;
		yield this.m13;
		yield this.m21;
		yield this.m22;
		yield this.m23;
		yield this.m31;
		yield this.m32;
		yield this.m33;
	}

	// * Public Methods *

	/**
	 *
	 * @param mat3
	 * @returns this: this[i,j] <- matrix3[i,j]
	 */
	public _copy(mat3: Mat3): Mat3 {
		return this._set(
			mat3.m11,
			mat3.m12,
			mat3.m13,
			mat3.m21,
			mat3.m22,
			mat3.m23,
			mat3.m31,
			mat3.m32,
			mat3.m33
		);
	}

	/**
	 *
	 * @returns matrix3: matrix3[i,j] <- this[i,j]
	 */
	public clone(): Mat3 {
		return new Mat3(
			this.m11,
			this.m12,
			this.m13,
			this.m21,
			this.m22,
			this.m23,
			this.m31,
			this.m32,
			this.m33
		);
	}

	/**
	 * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/threeD/index.htm
	 * @returns
	 */
	public det(): number {
		return (
			this.m11 * this.m22 * this.m33 +
			this.m12 * this.m23 * this.m31 +
			this.m13 * this.m21 * this.m32 -
			this.m11 * this.m23 * this.m32 -
			this.m12 * this.m21 * this.m33 -
			this.m13 * this.m22 * this.m31
		);
	}

	/**
	 * There is no equivalent ._inverte() method to force handling non-inversible matrices
	 * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/threeD/index.htm
	 * @returns
	 */
	public inv(): Mat3 | void {
		const det = this.det();

		if (det === 0) return;

		const detInv = 1 / det;

		return new Mat3(
			detInv * (this.m22 * this.m33 - this.m23 * this.m32),
			detInv * (this.m13 * this.m32 - this.m12 * this.m33),
			detInv * (this.m12 * this.m23 - this.m13 * this.m22),
			detInv * (this.m23 * this.m31 - this.m21 * this.m33),
			detInv * (this.m11 * this.m33 - this.m13 * this.m31),
			detInv * (this.m13 * this.m21 - this.m11 * this.m23),
			detInv * (this.m21 * this.m32 - this.m22 * this.m31),
			detInv * (this.m12 * this.m31 - this.m11 * this.m32),
			detInv * (this.m11 * this.m22 - this.m12 * this.m21)
		);
	}

	/**
	 *
	 * @param mat3 the matrix to compare to
	 * @param [precision=EPSILON] the comparison precision
	 * @returns
	 */
	public equals(mat3: Mat3, precision: number = EPSILON): boolean {
		return (
			Math.abs(this.m11 - mat3.m11) < precision &&
			Math.abs(this.m12 - mat3.m12) < precision &&
			Math.abs(this.m13 - mat3.m13) < precision &&
			Math.abs(this.m21 - mat3.m21) < precision &&
			Math.abs(this.m22 - mat3.m22) < precision &&
			Math.abs(this.m23 - mat3.m23) < precision &&
			Math.abs(this.m31 - mat3.m31) < precision &&
			Math.abs(this.m32 - mat3.m32) < precision &&
			Math.abs(this.m33 - mat3.m33) < precision
		);
	}

	public col(column: number): Vec3 {
		if (column === 0) return new Vec3(this.m11, this.m21, this.m31);
		else if (column === 1) return new Vec3(this.m12, this.m22, this.m32);
		else if (column === 2) return new Vec3(this.m13, this.m23, this.m33);
		else throw new RangeError('Expecting 0 <= column <= 2');
	}

	public row(row: number): Vec3 {
		if (row === 0) return new Vec3(this.m11, this.m12, this.m13);
		else if (row === 1) return new Vec3(this.m21, this.m22, this.m23);
		else if (row === 2) return new Vec3(this.m31, this.m32, this.m33);
		else throw new RangeError('Expecting 0 <= row <= 2');
	}

	public map(fn: (element: number) => number): Mat3 {
		return this.clone()._map(fn);
	}

	public _map(fn: (element: number) => number): Mat3 {
		this.m11 = fn(this.m11);
		this.m12 = fn(this.m12);
		this.m13 = fn(this.m13);
		this.m21 = fn(this.m21);
		this.m22 = fn(this.m22);
		this.m23 = fn(this.m23);
		this.m31 = fn(this.m31);
		this.m32 = fn(this.m32);
		this.m33 = fn(this.m33);

		return this;
	}

	/**
	 *
	 * @param mat3
	 * @returns this * matrix3
	 */
	public mul(mat3: Mat3): Mat3 {
		return this.clone()._mul(mat3);
	}

	/**
	 *
	 * @param mat3
	 * @returns this <- this * matrix3
	 */
	public _mul(mat3: Mat3): Mat3 {
		return this._set(
			this.m11 * mat3.m11 + this.m12 * mat3.m21 + this.m13 * mat3.m31,
			this.m11 * mat3.m12 + this.m12 * mat3.m22 + this.m13 * mat3.m32,
			this.m11 * mat3.m13 + this.m12 * mat3.m23 + this.m13 * mat3.m33,
			this.m21 * mat3.m11 + this.m22 * mat3.m21 + this.m23 * mat3.m31,
			this.m21 * mat3.m12 + this.m22 * mat3.m22 + this.m23 * mat3.m32,
			this.m21 * mat3.m13 + this.m22 * mat3.m23 + this.m23 * mat3.m33,
			this.m31 * mat3.m11 + this.m32 * mat3.m21 + this.m33 * mat3.m31,
			this.m31 * mat3.m12 + this.m32 * mat3.m22 + this.m33 * mat3.m32,
			this.m31 * mat3.m13 + this.m32 * mat3.m23 + this.m33 * mat3.m33
		);
	}

	/**
	 *
	 * @param vec3
	 * @returns this * vector3
	 */
	public mulVec3(vec3: Vec3): Vec3 {
		return new Vec3(
			this.m11 * vec3.x + this.m12 * vec3.y + this.m13 * vec3.z,
			this.m21 * vec3.x + this.m22 * vec3.y + this.m23 * vec3.z,
			this.m31 * vec3.x + this.m32 * vec3.y + this.m33 * vec3.z
		);
	}

	/**
	 *
	 * @param mat3
	 * @returns matrix3 * this
	 */
	public permul(mat3: Mat3): Mat3 {
		return this.clone()._permul(mat3);
	}

	/**
	 *
	 * @param mat3
	 * @returns this <- matrix3 * this
	 */
	public _permul(mat3: Mat3): Mat3 {
		return this._set(
			mat3.m11 * this.m11 + mat3.m12 * this.m21 + mat3.m13 * this.m31,
			mat3.m11 * this.m12 + mat3.m12 * this.m22 + mat3.m13 * this.m32,
			mat3.m11 * this.m13 + mat3.m12 * this.m23 + mat3.m13 * this.m33,
			mat3.m21 * this.m11 + mat3.m22 * this.m21 + mat3.m23 * this.m31,
			mat3.m21 * this.m12 + mat3.m22 * this.m22 + mat3.m23 * this.m32,
			mat3.m21 * this.m13 + mat3.m22 * this.m23 + mat3.m23 * this.m33,
			mat3.m31 * this.m11 + mat3.m32 * this.m21 + mat3.m33 * this.m31,
			mat3.m31 * this.m12 + mat3.m32 * this.m22 + mat3.m33 * this.m32,
			mat3.m31 * this.m13 + mat3.m32 * this.m23 + mat3.m33 * this.m33
		);
	}

	/**
	 *
	 * @param vec3
	 * @returns vector3 * this
	 */
	public permulVec3(vec3: Vec3): Vec3 {
		return new Vec3(
			vec3.x * this.m11 + vec3.y * this.m21 + vec3.z * this.m31,
			vec3.x * this.m12 + vec3.y * this.m22 + vec3.z * this.m32,
			vec3.x * this.m13 + vec3.y * this.m23 + vec3.z * this.m33
		);
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
			this.m21,
			this.m22,
			this.m23,
			this.m31,
			this.m32,
			this.m33,
		];
	}

	/**
	 *
	 * @param [order=Euler.Orders.XYZ]
	 * @param [precision=EPSILON]
	 * @returns
	 */
	public toEuler(order?: EulerOrder, precision: number = EPSILON): Euler {
		return Euler.fromMat3(this, order, precision);
	}

	/**
	 *
	 * @returns sum(mij) | i=j
	 */
	public trace(): number {
		return this.m11 + this.m22 + this.m33;
	}

	/**
	 *
	 * @returns matrix3: matrix3[i,j] <- this[j,i]
	 */
	public transpose(): Mat3 {
		return this.clone()._transpose();
	}

	/**
	 *
	 * @returns this: this[i,j] <- this[j,i]
	 */
	public _transpose(): Mat3 {
		return this._set(
			this.m11,
			this.m21,
			this.m31,
			this.m12,
			this.m22,
			this.m32,
			this.m13,
			this.m23,
			this.m33
		);
	}

	public _set(
		m11: number,
		m12: number,
		m13: number,
		m21: number,
		m22: number,
		m23: number,
		m31: number,
		m32: number,
		m33: number
	): Mat3 {
		this.m11 = m11;
		this.m12 = m12;
		this.m13 = m13;
		this.m21 = m21;
		this.m22 = m22;
		this.m23 = m23;
		this.m31 = m31;
		this.m32 = m32;
		this.m33 = m33;

		return this;
	}

	/**
	 * @todo swap vector and column for more intuitive writing
	 * @param vector
	 * @param column
	 * @returns this: this[_,column] <- vector3
	 */
	public _col(vector: Vec3, column: number): Mat3 {
		if (column === 0) {
			this.m11 = vector.x;
			this.m21 = vector.y;
			this.m31 = vector.z;
			return this;
		} else if (column === 1) {
			this.m12 = vector.x;
			this.m22 = vector.y;
			this.m32 = vector.z;
			return this;
		} else if (column === 2) {
			this.m13 = vector.x;
			this.m23 = vector.y;
			this.m33 = vector.z;
			return this;
		} else throw new RangeError('Expecting 0 <= column <= 2');
	}

	/**
	 * @todo swap vector and row for more intuitive writing
	 * @param vector
	 * @param row
	 * @returns this: this[row,_] <- vector3
	 */
	public _row(vector: Vec3, row: number): Mat3 {
		if (row === 0) {
			this.m11 = vector.x;
			this.m12 = vector.y;
			this.m13 = vector.z;
			return this;
		} else if (row === 1) {
			this.m21 = vector.x;
			this.m22 = vector.y;
			this.m23 = vector.z;
			return this;
		} else if (row === 2) {
			this.m31 = vector.x;
			this.m32 = vector.y;
			this.m33 = vector.z;
			return this;
		} else throw new RangeError('Expecting 0 <= row <= 2');
	}

	// * Static Methods *

	/**
	 *
	 * @returns
	 */
	public static Indentity(): Mat3 {
		return new Mat3(1, 0, 0, 0, 1, 0, 0, 0, 1);
	}

	/**
	 *
	 * @param axisAngle
	 * @returns
	 */
	public static fromAxisAngle(axisAngle: AxisAngle): Mat3 {
		const { x, y, z } = axisAngle.axis.normalize(),
			c = Math.cos(axisAngle.angle),
			s = Math.sin(axisAngle.angle),
			cc = 1 - c,
			xy = x * y,
			xz = x * z,
			yz = y * z,
			xs = x * s,
			ys = y * s,
			zs = z * s;

		return new Mat3(
			x * x * cc + c,
			xy * cc - zs,
			xz * cc + ys,
			xy * cc + zs,
			y * y * cc + c,
			yz * cc - xs,
			xz * cc - ys,
			yz * cc + xs,
			z * z * cc + c
		);
	}

	/**
	 *
	 * @param euler
	 * @returns
	 */
	public static fromEuler(euler: Euler): Mat3 {
		const cx = Math.cos(euler.x),
			sx = Math.sin(euler.x);
		const cy = Math.cos(euler.y),
			sy = Math.sin(euler.y);
		const cz = Math.cos(euler.z),
			sz = Math.sin(euler.z);

		let m11, m12, m13, m21, m22, m23, m31, m32, m33;

		if (euler.order === EulerOrder.XYZ) {
			const cxcz = cx * cz;
			const cxsz = cx * sz;
			const sxcz = sx * cz;
			const sxsz = sx * sz;

			m11 = cy * cz;
			m12 = -cy * sz;
			m13 = sy;
			m21 = cxsz + sxcz * sy;
			m22 = cxcz - sxsz * sy;
			m23 = -sx * cy;
			m31 = sxsz - cxcz * sy;
			m32 = sxcz + cxsz * sy;
			m33 = cx * cy;
		} else if (euler.order === EulerOrder.YXZ) {
			const cycz = cy * cz;
			const cysz = cy * sz;
			const sycz = sy * cz;
			const sysz = sy * sz;

			m11 = cycz + sysz * sx;
			m12 = sycz * sx - cysz;
			m13 = cx * sy;
			m21 = cx * sz;
			m22 = cx * cz;
			m23 = -sx;
			m31 = cysz * sx - sycz;
			m32 = sysz + cycz * sx;
			m33 = cx * cy;
		} else if (euler.order === EulerOrder.ZXY) {
			const cycz = cy * cz;
			const cysz = cy * sz;
			const sycz = sy * cz;
			const sysz = sy * sz;

			m11 = cycz - sysz * sx;
			m12 = -cx * sz;
			m13 = sycz + cysz * sx;
			m21 = cysz + sycz * sx;
			m22 = cx * cz;
			m23 = sysz - cycz * sx;
			m31 = -cx * sy;
			m32 = sx;
			m33 = cx * cy;
		} else if (euler.order === EulerOrder.ZYX) {
			const cxcz = cx * cz;
			const cxsz = cx * sz;
			const sxcz = sx * cz;
			const sxsz = sx * sz;

			m11 = cy * cz;
			m12 = sxcz * sy - cxsz;
			m13 = cxcz * sy + sxsz;
			m21 = cy * sz;
			m22 = sxsz * sy + cxcz;
			m23 = cxsz * sy - sxcz;
			m31 = -sy;
			m32 = sx * cy;
			m33 = cx * cy;
		} else if (euler.order === EulerOrder.YZX) {
			const cxcy = cx * cy;
			const cxsy = cx * sy;
			const sxcy = sx * cy;
			const sxsy = sx * sy;

			m11 = cy * cz;
			m12 = sxsy - cxcy * sz;
			m13 = sxcy * sz + cxsy;
			m21 = sz;
			m22 = cx * cz;
			m23 = -sx * cz;
			m31 = -sy * cz;
			m32 = cxsy * sz + sxcy;
			m33 = cxcy - sxsy * sz;
		} else if (euler.order === EulerOrder.XZY) {
			const cxcy = cx * cy;
			const cxsy = cx * sy;
			const sxcy = sx * cy;
			const sxsy = sx * sy;

			m11 = cy * cz;
			m12 = -sz;
			m13 = sy * cz;
			m21 = cxcy * sz + sxsy;
			m22 = cx * cz;
			m23 = cxsy * sz - sxcy;
			m31 = sxcy * sz - cxsy;
			m32 = sx * cz;
			m33 = sxsy * sz + cxcy;
		}

		return new Mat3(m11, m12, m13, m21, m22, m23, m31, m32, m33);
	}

	/**
	 *
	 * @param quat normalized
	 * @returns
	 */
	public static fromQuat(quat: Quat): Mat3 {
		const x2 = quat.x + quat.x;
		const y2 = quat.y + quat.y;
		const z2 = quat.z + quat.z;

		const xx = quat.x * x2,
			xy = quat.x * y2,
			xz = quat.x * z2;
		const yy = quat.y * y2,
			yz = quat.y * z2,
			zz = quat.z * z2;
		const wx = quat.w * x2,
			wy = quat.w * y2,
			wz = quat.w * z2;

		return new Mat3(
			1 - (yy + zz),
			xy - wz,
			xz + wy,
			xy + wz,
			1 - (xx + zz),
			yz - wx,
			xz - wy,
			yz + wx,
			1 - (xx + yy)
		);
	}
}
