import { AxisAngle } from './AxisAngle';
import { EPSILON } from './constants';
import { Euler, EulerOrder } from './Euler';
import { Mat3 } from './Mat3';
import { Vec3 } from './Vec3';

export class Quat {
	/**
	 * @constructor
	 * @param x imaginary component i
	 * @param y imaginary component j
	 * @param z imaginary component k
	 * @param w real part
	 * */
	constructor(
		public x: number = 0,
		public y: number = 0,
		public z: number = 0,
		public w: number = 1
	) {}

	// * Getters & Setters *

	get length(): number {
		return Math.sqrt(this.lengthSq);
	}

	get lengthSq(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}

	// Makes a Vector3 instance iterable (for...of)
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		yield this.z;
		yield this.w;
	}

	// * Public Methods *

	/**
	 *
	 * @returns quaternion <- this
	 */
	public clone(): Quat {
		return new Quat(this.x, this.y, this.z, this.w);
	}

	/**
	 * Expects this to be normalized.
	 * When used as rotation conj(q) = q' represents the reversed rotation.
	 * @returns q' <- conj(this)
	 */
	public conj(): Quat {
		return this.clone()._conj();
	}

	/**
	 * Expects this to be normalized.
	 * When used as rotation conj(q) = q' represents the reversed rotation.
	 * @returns this <- conj(this)
	 */
	public _conj(): Quat {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;

		return this;
	}

	/**
	 *
	 * @param quat
	 * @returns this <- quaternion
	 */
	public _copy(quat: Quat): Quat {
		this.x = quat.x;
		this.y = quat.y;
		this.z = quat.z;
		this.w = quat.w;

		return this;
	}

	public dot(quat: Quat): number {
		return this.x * quat.x + this.y * quat.y + this.z * quat.z + this.w * quat.w;
	}

	/**
	 * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
	 * @param quat
	 * @returns this * quaternion
	 */
	public mul(quat: Quat): Quat {
		return this.clone()._mul(quat);
	}

	/**
	 * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
	 * @param quat
	 * @returns this <- this * quaternion
	 */
	public _mul(quat: Quat): Quat {
		return this._set(
			this.x * quat.w + this.y * quat.z - this.z * quat.y + this.w * quat.x,
			-this.x * quat.z + this.y * quat.w + this.z * quat.x + this.w * quat.y,
			this.x * quat.y - this.y * quat.x + this.z * quat.w + this.w * quat.z,
			-this.x * quat.x - this.y * quat.y - this.z * quat.z + this.w * quat.w
		);
	}

	/**
	 * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
	 * @param quat
	 * @returns quaternion * this
	 */
	public permul(quat: Quat): Quat {
		return this.clone()._permul(quat);
	}

	/**
	 * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
	 * @param quat
	 * @returns this <- quaternion * this
	 */
	public _permul(quat: Quat): Quat {
		return this._set(
			quat.x * this.w + quat.y * this.z - quat.z * this.y + quat.w * this.x,
			-quat.x * this.z + quat.y * this.w + quat.z * this.x + quat.w * this.y,
			quat.x * this.y - quat.y * this.x + quat.z * this.w + quat.w * this.z,
			-quat.x * this.x - quat.y * this.y - quat.z * this.z + quat.w * this.w
		);
	}

	/**
	 * Will return identity if magnitude=0
	 * @returns quaternion <- this / magnitude
	 */
	public normalize(): Quat {
		return this.clone()._normalize();
	}

	/**
	 * Will return identity if magnitude=0
	 * @returns this <- this / magnitude
	 */
	public _normalize(precision: number = EPSILON): Quat {
		const l = this.length;

		if (l < precision) return this._set(0, 0, 0, 1);

		return this._scale(1 / l);
	}

	public scale(scalar: number): Quat {
		return this.clone()._scale(scalar);
	}

	public _scale(scalar: number): Quat {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;
	}

	/**
	 *
	 * @param x imaginary component i
	 * @param y imaginary component j
	 * @param z imaginary component k
	 * @param w real part
	 * @returns
	 */
	public _set(x: number, y: number, z: number, w: number): Quat {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;
	}

	public slerp(quat: Quat, param: number): Quat {
		return this.clone()._slerp(quat, param);
	}

	/**
	 * @see http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
	 * @param quat
	 * @param param in [0, 1]
	 * @returns
	 */
	public _slerp(quat: Quat, param: number): Quat {
		if (param === 0) return this;
		if (param === 1) return this._copy(quat);

		const x = this.x,
			y = this.y,
			z = this.z,
			w = this.w;

		let cosHalfTheta = w * quat.w + x * quat.x + y * quat.y + z * quat.z;

		if (cosHalfTheta < 0) {
			this.w = -quat.w;
			this.x = -quat.x;
			this.y = -quat.y;
			this.z = -quat.z;

			cosHalfTheta = -cosHalfTheta;
		} else {
			this._copy(quat);
		}

		if (cosHalfTheta >= 1.0) {
			this.w = w;
			this.x = x;
			this.y = y;
			this.z = z;

			return this;
		}

		const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

		if (sqrSinHalfTheta <= Number.EPSILON) {
			const s = 1 - param;
			this.w = s * w + param * this.w;
			this.x = s * x + param * this.x;
			this.y = s * y + param * this.y;
			this.z = s * z + param * this.z;

			this._normalize();

			return this;
		}

		const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
		const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
		const ratioA = Math.sin((1 - param) * halfTheta) / sinHalfTheta;
		const ratioB = Math.sin(param * halfTheta) / sinHalfTheta;

		this.w = w * ratioA + this.w * ratioB;
		this.x = x * ratioA + this.x * ratioB;
		this.y = y * ratioA + this.y * ratioB;
		this.z = z * ratioA + this.z * ratioB;

		return this;
	}

	/**
	 * Is equivalent to this.mul(vector.toQuat())._mul(this.conj()).toVec3()
	 * @param vec3
	 * @returns u = q * v * q'
	 */
	public rotateVec3(vec3: Vec3): Vec3 {
		// calculate quat * vector
		const ix = this.w * vec3.x + this.y * vec3.z - this.z * vec3.y;
		const iy = this.w * vec3.y + this.z * vec3.x - this.x * vec3.z;
		const iz = this.w * vec3.z + this.x * vec3.y - this.y * vec3.x;
		const iw = this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;

		// calculate result * inverse quat
		return new Vec3(
			ix * this.w + iw * this.x - iy * this.z + iz * this.y,
			iy * this.w + iw * this.y - iz * this.x + ix * this.z,
			iz * this.w + iw * this.z - ix * this.y + iy * this.x
		);
	}

	/**
	 *
	 * @returns [x, y, z, w]
	 */
	public toArray(): number[] {
		return [this.x, this.y, this.z, this.w];
	}

	/**
	 *
	 * @returns the imaginary part of quaternion (x, y, z)
	 */
	public toVec3(): Vec3 {
		return new Vec3(this.x, this.y, this.z);
	}

	/**
	 * Convert normalized quaternion into Euler instance (XYZ)
	 * @param precision
	 * @returns
	 */
	public toEuler(): Euler {
		return Euler.fromQuat(this);
	}

	/**
	 * Convert normalized quaternion into rotation matrix3
	 * @returns
	 */
	public toMat3(): Mat3 {
		return Mat3.fromQuat(this);
	}

	/**
	 * real part = 1 | imaginary part = 0
	 * @returns
	 */
	public static Indentity(): Quat {
		return new Quat(0, 0, 0, 1);
	}

	/**
	 * Make a quaternion that stores a 3d orientation encoded into euler angles
	 * @see http://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToQuaternion/index.htm
	 * @param euler
	 * @returns
	 */
	public static fromEuler(euler: Euler): Quat {
		const cx = Math.cos(euler.x / 2);
		const cy = Math.cos(euler.y / 2);
		const cz = Math.cos(euler.z / 2);
		const sx = Math.sin(euler.x / 2);
		const sy = Math.sin(euler.y / 2);
		const sz = Math.sin(euler.z / 2);

		let x, y, z, w;

		switch (euler.order) {
			case EulerOrder.XYZ:
				x = sx * cy * cz + cx * sy * sz;
				y = cx * sy * cz - sx * cy * sz;
				z = cx * cy * sz + sx * sy * cz;
				w = cx * cy * cz - sx * sy * sz;
				break;

			case EulerOrder.YXZ:
				x = sx * cy * cz + cx * sy * sz;
				y = cx * sy * cz - sx * cy * sz;
				z = cx * cy * sz - sx * sy * cz;
				w = cx * cy * cz + sx * sy * sz;
				break;

			case EulerOrder.ZXY:
				x = sx * cy * cz - cx * sy * sz;
				y = cx * sy * cz + sx * cy * sz;
				z = cx * cy * sz + sx * sy * cz;
				w = cx * cy * cz - sx * sy * sz;
				break;

			case EulerOrder.ZYX:
				x = sx * cy * cz - cx * sy * sz;
				y = cx * sy * cz + sx * cy * sz;
				z = cx * cy * sz - sx * sy * cz;
				w = cx * cy * cz + sx * sy * sz;
				break;

			case EulerOrder.YZX:
				x = sx * cy * cz + cx * sy * sz;
				y = cx * sy * cz + sx * cy * sz;
				z = cx * cy * sz - sx * sy * cz;
				w = cx * cy * cz - sx * sy * sz;
				break;

			case EulerOrder.XZY:
				x = sx * cy * cz - cx * sy * sz;
				y = cx * sy * cz - sx * cy * sz;
				z = cx * cy * sz + sx * sy * cz;
				w = cx * cy * cz + sx * sy * sz;
				break;

			default:
				throw new Error(`Quaternion.fromEuler() unknown order ${euler.order}`);
		}

		return new Quat(x, y, z, w);
	}

	/**
	 *
	 * @param axisAngle
	 * @returns
	 */
	public static fromAxisAngle(axisAngle: AxisAngle): Quat {
		const halfAngle = axisAngle.angle / 2;
		const sin = Math.sin(halfAngle);

		return new Quat(
			axisAngle.axis.x * sin,
			axisAngle.axis.y * sin,
			axisAngle.axis.z * sin,
			Math.cos(halfAngle)
		);
	}

	/**
	 * @see https://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
	 * @param mat3
	 * @returns
	 */
	public static fromMat3(mat3: Mat3): Quat {
		const t = mat3.trace();
		let x, y, z, w;

		if (t > 0) {
			const s = 0.5 / Math.sqrt(t + 1);

			x = (mat3.m32 - mat3.m23) * s;
			y = (mat3.m13 - mat3.m31) * s;
			z = (mat3.m21 - mat3.m12) * s;
			w = 0.25 / s;
		} else if (mat3.m11 > mat3.m22 && mat3.m11 > mat3.m33) {
			const s = 2 * Math.sqrt(1 + mat3.m11 - mat3.m22 - mat3.m33);

			x = 0.25 * s;
			y = (mat3.m12 + mat3.m21) / s;
			z = (mat3.m13 + mat3.m31) / s;
			w = (mat3.m32 - mat3.m23) / s;
		} else if (mat3.m22 > mat3.m33) {
			const s = 2.0 * Math.sqrt(1.0 + mat3.m22 - mat3.m11 - mat3.m33);

			x = (mat3.m12 + mat3.m21) / s;
			y = 0.25 * s;
			z = (mat3.m23 + mat3.m32) / s;
			w = (mat3.m13 - mat3.m31) / s;
		} else {
			const s = 2.0 * Math.sqrt(1.0 + mat3.m33 - mat3.m11 - mat3.m22);

			x = (mat3.m13 + mat3.m31) / s;
			y = (mat3.m23 + mat3.m32) / s;
			z = 0.25 * s;
			w = (mat3.m21 - mat3.m12) / s;
		}

		return new Quat(x, y, z, w);
	}

	/**
	 *
	 * @see http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors
	 * @param from starting normalized vector3
	 * @param to normalized vector3 of destination
	 * @returns quaternion that represents the rotation to go from u to v
	 */
	public static fromTwoVectors(u: Vec3, v: Vec3, precision: number = EPSILON /* ANGULAR */): Quat {
		let x,
			y,
			z,
			w = u.dot(v) + 1;

		if (w < precision) {
			// u = -v
			w = 0;
			if (Math.abs(u.x) > Math.abs(u.z)) {
				x = -u.y;
				y = u.x;
				z = 0;
			} else {
				x = 0;
				y = -u.z;
				z = u.y;
			}
		} else {
			const c = u.cross(v);
			x = c.x;
			y = c.y;
			z = c.z;
		}

		return new Quat(x, y, z, w)._normalize();
	}
}
