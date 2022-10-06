import { EPSILON } from './constants';
import { Mat4 } from './Mat4';
import { Quat } from './Quat';
import { clamp } from './utils';
import { Vec3 } from './Vec3';

/** A 4-dimensional vector */
export class Vec4 {
	/**
	 * @constructor
	 * @param x
	 * @param y
	 * @param z
	 * @param w
	 */
	constructor(
		public x: number = 0,
		public y: number = 0,
		public z: number = 0,
		public w: number = 0
	) {}

	// * Getters & Setters *

	get length(): number {
		return Math.sqrt(this.lengthSq);
	}

	get lengthSq(): number {
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

	public add(vec4: Vec4): Vec4 {
		return this.clone()._add(vec4);
	}

	public _add(vec4: Vec4): Vec4 {
		this.x += vec4.x;
		this.y += vec4.y;
		this.z += vec4.z;
		this.w += vec4.w;

		return this;
	}

	public addScalar(scalar: number): Vec4 {
		return this.clone()._addScalar(scalar);
	}

	public _addScalar(scalar: number): Vec4 {
		this.x += scalar;
		this.y += scalar;
		this.z += scalar;
		this.w += scalar;

		return this;
	}

	public angleTo(vector: Vec4): number {
		const denominator = this.lengthSq * vector.lengthSq;

		if (denominator === 0) return Math.PI / 2;

		const theta = this.dot(vector) / Math.sqrt(denominator);

		// clamp, to handle numerical problems
		return Math.acos(clamp(theta, -1, 1));
	}

	public apply(fn: (component: number) => number): Vec4 {
		return this.clone()._apply(fn);
	}

	public _apply(fn: (component: number) => number): Vec4 {
		this.x = fn(this.x);
		this.y = fn(this.y);
		this.z = fn(this.z);
		this.w = fn(this.w);

		return this;
	}

	/**
	 * Creates a new Vector4 copied from the current Vector4
	 * @returns {Vec4}
	 */
	public clone(): Vec4 {
		return new Vec4(this.x, this.y, this.z, this.w);
	}

	/**
	 * @param vec4
	 * @returns the current updated Vector4
	 */
	public copy(vec4: Vec4): Vec4 {
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
	public cross(vec4: Vec4): Vec4 {
		return this.clone()._cross(vec4);
	}

	/**
	 * Performs the euclidian R3 subspace cross product. Set w = 1.
	 * @param vec4
	 * @returns the current updated Vector4
	 */
	public _cross(vec4: Vec4): Vec4 {
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
	public distanceTo(vec4: Vec4): number {
		return this.sub(vec4).length;
	}

	/**
	 *
	 * @param vec4
	 * @returns Euclidian squared distance between current and given Vector4s
	 */
	public distanceSqTo(vec4: Vec4): number {
		return this.sub(vec4).lengthSq;
	}

	/**
	 * @param vec4
	 * @returns
	 */
	public dot(vec4: Vec4): number {
		return this.x * vec4.x + this.y * vec4.y + this.z * vec4.z + this.w * vec4.w;
	}

	/**
	 *
	 * @param {Vec4} vec4
	 * @param {Number} precision [optional]
	 * @returns {Boolean}
	 */
	public isEqualTo(vec4: Vec4, precision: number = EPSILON): boolean {
		return this.distanceTo(vec4) < precision;
	}

	/**
	 * Linear interpolation between current and given Vector4s.
	 * @param vec4 to interpolate towards
	 * @param scalar interpolation factor, usually in [0, 1]
	 * @returns the resulting Vector4
	 */
	public lerp(vec4: Vec4, scalar: number): Vec4 {
		return this.clone()._lerpMutate(vec4, scalar);
	}

	/**
	 * Linear interpolation between current and given Vector4s.
	 * @param vec4 to interpolate towards
	 * @param scalar interpolation factor, usually in [0, 1]
	 * @returns the current updated Vector4
	 */
	public _lerpMutate(vec4: Vec4, scalar: number): Vec4 {
		this.x += (vec4.x - this.x) * scalar;
		this.y += (vec4.y - this.y) * scalar;
		this.z += (vec4.z - this.z) * scalar;
		this.w += (vec4.w - this.w) * scalar;

		return this;
	}

	/**
	 * Component wise multiplication
	 * @param vec4
	 * @returns the resulting Vector4
	 */
	public multiplyVec4(vec4: Vec4): Vec4 {
		return this.clone()._multiplyVec4(vec4);
	}

	/**
	 * Component wise multiplication
	 * @param vec4
	 * @returns the current updated Vector4
	 */
	public _multiplyVec4(vec4: Vec4): Vec4 {
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
	public multiplyMat4(mat4: Mat4): Vec4 {
		return this.clone()._multiplyMat4(mat4);
	}

	/**
	 * V * M multiplication
	 * @param mat4
	 * @returns the current updated Vector4
	 */
	public _multiplyMat4(mat4: Mat4): Vec4 {
		return this.set(
			this.x * mat4.m11 + this.y * mat4.m21 + this.z * mat4.m31 + this.w * mat4.m41,
			this.x * mat4.m12 + this.y * mat4.m22 + this.z * mat4.m32 + this.w * mat4.m42,
			this.x * mat4.m13 + this.y * mat4.m23 + this.z * mat4.m33 + this.w * mat4.m43,
			this.x * mat4.m14 + this.y * mat4.m24 + this.z * mat4.m34 + this.w * mat4.m44
		);
	}

	/**
	 * M * V multiplication
	 * @param mat4
	 * @returns the resulting Vector4
	 */
	public permultiplyMat4(mat4: Mat4): Vec4 {
		return this.clone()._permultiplyMat4(mat4);
	}

	/**
	 * M * V multiplication
	 * @param mat4
	 * @returns the current updated Vector4
	 */
	public _permultiplyMat4(mat4: Mat4): Vec4 {
		return this.set(
			mat4.m11 * this.x + mat4.m12 * this.y + mat4.m13 * this.z + mat4.m14 * this.w,
			mat4.m21 * this.x + mat4.m22 * this.y + mat4.m23 * this.z + mat4.m24 * this.w,
			mat4.m31 * this.x + mat4.m32 * this.y + mat4.m33 * this.z + mat4.m34 * this.w,
			mat4.m41 * this.x + mat4.m42 * this.y + mat4.m43 * this.z + mat4.m44 * this.w
		);
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public multiplyScalar(scalar: number): Vec4 {
		return this.clone()._multiplyScalar(scalar);
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public _multiplyScalar(scalar: number): Vec4 {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;
	}

	public normalize(precision: number = EPSILON): Vec4 {
		return this.clone()._normalize(precision);
	}

	public _normalize(precision: number = EPSILON): Vec4 {
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

	public negate(): Vec4 {
		return this.clone()._negate();
	}

	public _negate(): Vec4 {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;

		return this;
	}

	public scale(scalar: number): Vec4 {
		return this.clone()._scale(scalar);
	}

	public _scale(scalar: number): Vec4 {
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
	public set(x: number, y: number, z: number, w: number): Vec4 {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;
	}

	/**
	 *
	 * @param x
	 * @returns the current updated Vector4
	 */
	public setX(x: number): Vec4 {
		this.x = x;

		return this;
	}

	/**
	 *
	 * @param y
	 * @returns the current updated Vector4
	 */
	public setY(y: number): Vec4 {
		this.y = y;

		return this;
	}

	/**
	 *
	 * @param z
	 * @returns the current updated Vector4
	 */
	public setZ(z: number): Vec4 {
		this.z = z;

		return this;
	}

	/**
	 *
	 * @param w
	 * @returns the current updated Vector4
	 */
	public setW(w: number): Vec4 {
		this.w = w;

		return this;
	}

	/**
	 *
	 * @param vec4
	 * @returns
	 */
	public sub(vec4: Vec4): Vec4 {
		return this.clone()._sub(vec4);
	}

	/**
	 *
	 * @param vec4
	 * @returns
	 */
	public _sub(vec4: Vec4): Vec4 {
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
	public subScalar(scalar: number): Vec4 {
		return this.clone()._subScalar(scalar);
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public _subScalar(scalar: number): Vec4 {
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
	public toArray(): number[] {
		return [this.x, this.y, this.z, this.w];
	}

	/**
	 *
	 * @returns
	 */
	public toJSON(): string {
		return `{x:${this.x},y:${this.y},z:${this.z},w:${this.w}}`;
	}

	/**
	 *
	 * @returns
	 */
	public toQuat(): Quat {
		return new Quat(this.x, this.y, this.z, this.w);
	}

	public toVec3(): Vec3 {
		return new Vec3(this.x, this.y, this.z);
	}

	// * Static Methods *

	static make(vec4: number[] | { [coord: string]: number }): Vec4 | void {
		if (vec4 instanceof Vec4) return vec4;

		if (
			Array.isArray(vec4) &&
			Number.isFinite(vec4[0]) &&
			Number.isFinite(vec4[1]) &&
			Number.isFinite(vec4[2]) &&
			Number.isFinite(vec4[3])
		)
			return new Vec4(...vec4);
	}

	public fromQuat(quat: Quat): Vec4 {
		return new Vec4(quat.x, quat.y, quat.z, quat.w);
	}

	/**
	 * Generate a random valid Vector4 instance with v.?C[0, 1]
	 * @returns
	 */
	static random = function (): Vec4 {
		return new Vec4(Math.random(), Math.random(), Math.random(), Math.random());
	};
}
