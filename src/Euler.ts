import { AxisAngle } from './AxisAngle';
import { EPSILON } from './constants';
import { Mat3 } from './Mat3';
import { Quat } from './Quat';
import { clamp } from './utils';
import { Vec3 } from './Vec3';

export enum EulerOrder {
	XYZ,
	XZY,
	YXZ,
	YZX,
	ZXY,
	ZYX,
}

export class Euler {
	constructor(
		public x: number = 0,
		public y: number = 0,
		public z: number = 0,
		public order: EulerOrder = EulerOrder.XYZ
	) {}

	public clone(): Euler {
		return new Euler(this.x, this.y, this.z, this.order);
	}

	public _copy(euler: Euler): Euler {
		return this._set(euler.x, euler.y, euler.z, euler.order);
	}

	public equals(euler: Euler, precision: number = EPSILON): boolean {
		return (
			Math.abs(this.x - euler.x) < precision &&
			Math.abs(this.y - euler.y) < precision &&
			Math.abs(this.z - euler.z) < precision &&
			this.order === euler.order
		);
	}

	public _set(x: number, y: number, z: number, order: EulerOrder): Euler {
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
	public static fromAxisAngle(axisAngle: AxisAngle): Euler {
		const matrix3 = Mat3.fromAxisAngle(axisAngle);

		return Euler.fromMat3(matrix3);
	}

	/**
	 *
	 * @param mat3 assumes matrix3 is an unscaled rotation matrix
	 * @param order
	 * @param precision
	 * @returns
	 */
	public static fromMat3(
		mat3: Mat3,
		order: EulerOrder = EulerOrder.XYZ,
		precision: number = 1e-15
	): Euler {
		let x, y, z;

		switch (order) {
			case EulerOrder.XYZ:
				y = Math.asin(clamp(mat3.m13, -1, 1));
				if (Math.abs(mat3.m13) - precision < 1) {
					x = Math.atan2(-mat3.m23, mat3.m33);
					z = Math.atan2(-mat3.m12, mat3.m11);
				} else {
					x = Math.atan2(mat3.m32, mat3.m22);
					z = 0;
				}
				break;

			case EulerOrder.YXZ:
				x = Math.asin(-clamp(mat3.m23, -1, 1));
				if (Math.abs(mat3.m23) - precision < 1) {
					y = Math.atan2(mat3.m13, mat3.m33);
					z = Math.atan2(mat3.m21, mat3.m22);
				} else {
					y = Math.atan2(-mat3.m31, mat3.m11);
					z = 0;
				}
				break;

			case EulerOrder.ZXY:
				x = Math.asin(clamp(mat3.m32, -1, 1));
				if (Math.abs(mat3.m32) - precision < 1) {
					y = Math.atan2(-mat3.m31, mat3.m33);
					z = Math.atan2(-mat3.m12, mat3.m22);
				} else {
					y = 0;
					z = Math.atan2(mat3.m21, mat3.m11);
				}
				break;

			case EulerOrder.ZYX:
				y = Math.asin(-clamp(mat3.m31, -1, 1));
				if (Math.abs(mat3.m31) - precision < 1) {
					x = Math.atan2(mat3.m32, mat3.m33);
					z = Math.atan2(mat3.m21, mat3.m11);
				} else {
					x = 0;
					z = Math.atan2(-mat3.m12, mat3.m22);
				}
				break;

			case EulerOrder.YZX:
				z = Math.asin(clamp(mat3.m21, -1, 1));
				if (Math.abs(mat3.m21) - precision < 1) {
					x = Math.atan2(-mat3.m23, mat3.m22);
					y = Math.atan2(-mat3.m31, mat3.m11);
				} else {
					x = 0;
					y = Math.atan2(mat3.m13, mat3.m33);
				}
				break;

			case EulerOrder.XZY:
				z = Math.asin(-clamp(mat3.m12, -1, 1));
				if (Math.abs(mat3.m12) - precision < 1) {
					x = Math.atan2(mat3.m32, mat3.m22);
					y = Math.atan2(mat3.m13, mat3.m11);
				} else {
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
	public static fromQuat(quat: Quat): Euler {
		const mat3 = Mat3.fromQuat(quat);
		return Euler.fromMat3(mat3);
	}

	/**
	 *
	 * @param vec3
	 * @param order
	 * @returns
	 */
	public static fromVec3(vec3: Vec3, order: EulerOrder = EulerOrder.XYZ): Euler {
		return new Euler(vec3.x, vec3.y, vec3.z, order);
	}

	// For easy acces from API
	public static Orders = EulerOrder;
}
