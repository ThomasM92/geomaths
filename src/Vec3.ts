import { EPSILON } from './constants';
import { Mat3 } from './Mat3';
import { Mat4 } from './Mat4';
import { Vec2 } from './Vec2';
import { clamp } from './utils';
import { Quat } from './Quat';
import { Vec4 } from './Vec4';

/**
 * @param x
 * @param y
 * @param z
 * @returns {Vec3}
 */

/**
 * A 3-dimensional euclidian vector
 * @todo check equality error proportions (exemple .dot might need sqrt(EPSILON))
 * @class
 */
export class Vec3 {
	/**
	 * @constructor
	 * @param x
	 * @param y
	 * @param z
	 */
	constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

	// * Getters & Setters *

	get isValid(): boolean {
		if (!Number.isFinite(this.x)) return false;
		if (!Number.isFinite(this.y)) return false;
		return Number.isFinite(this.z);
	}

	get length(): number {
		return Math.sqrt(this.lengthSq);
	}

	get lengthSq(): number {
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
	public add(vector: Vec3): Vec3 {
		return this.clone()._add(vector);
	}

	/**
	 * Adds the given vector to the current Vector3
	 * @param vector the Vector3 to add
	 * @returns the current updated Vector3
	 */
	public _add(vector: Vec3): Vec3 {
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
	public addScalar(scalar: number): Vec3 {
		return this.clone()._addScalar(scalar);
	}

	/**
	 * Adds the given scalar componentwise to the current Vector3
	 * @param scalar the Number to add
	 * @returns the current updated Vector3
	 */
	public _addScalar(scalar: number): Vec3 {
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
	public angleTo(vector: Vec3): number {
		const denominator = this.lengthSq * vector.lengthSq;

		if (denominator === 0) return Math.PI / 2;

		const theta = this.dot(vector) / Math.sqrt(denominator);

		// clamp, to handle numerical problems
		return Math.acos(clamp(theta, -1, 1));
	}

	public apply(fn: (component: number) => number): Vec3 {
		return this.clone()._apply(fn);
	}

	public _apply(fn: (component: number) => number): Vec3 {
		this.x = fn(this.x);
		this.y = fn(this.y);
		this.z = fn(this.z);

		return this;
	}

	/**
	 * Creates a new Vector3 copied from the current Vector3
	 * @returns {Vec3}
	 */
	public clone(): Vec3 {
		return new Vec3(this.x, this.y, this.z);
	}

	/**
	 * @param vector
	 * @returns the current updated Vector3
	 */
	public copy(vector: Vec3): Vec3 {
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
	public cross(vector: Vec3): Vec3 {
		return this.clone()._cross(vector);
	}

	/**
	 *
	 * @param vector
	 * @returns
	 */
	public _cross(vector: Vec3): Vec3 {
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
	public distanceTo(vector: Vec3): number {
		return this.sub(vector).length;
	}

	/**
	 *
	 * @param position
	 * @param direction
	 * @returns
	 */
	public distanceToLine(position: Vec3, direction: Vec3): number {
		const projection = this.projectOnLine(position, direction);

		return this.distanceTo(projection);
	}

	/**
	 * @param position plane position
	 * @param normal plane normal
	 * @returns
	 */
	public distanceToPlane(position: Vec3, normal: Vec3): number;
	/**
	 * @param position plane position
	 * @param normal plane normal
	 * @param [direction] projection direction (default=normal)
	 * @param [precision] floating point precision (default=1e-10)
	 * @returns
	 */
	public distanceToPlane(
		position: Vec3,
		normal: Vec3,
		direction?: Vec3,
		precision?: number
	): number | void;
	public distanceToPlane(
		position: Vec3,
		normal: Vec3,
		direction: Vec3 = normal,
		precision: number = EPSILON
	): number | void {
		const projection = this.projectOnPlane(position, normal, direction, precision);

		if (!projection) return;

		return this.distanceTo(projection);
	}

	/**
	 *
	 * @param vector
	 * @returns
	 */
	public distanceSqTo(vector: Vec3): number {
		return this.sub(vector).lengthSq;
	}

	/**
	 * @param vector
	 * @returns
	 */
	public dot(vector: Vec3): number {
		return this.x * vector.x + this.y * vector.y + this.z * vector.z;
	}

	/**
	 * @param vector
	 * @param [precision]
	 * @returns
	 */
	public isColinearTo(vector: Vec3, precision: number = EPSILON): boolean {
		return this.cross(vector).length < precision ** 0.5;
	}

	/**
	 *
	 * @param vector
	 * @param [precision]
	 * @returns
	 */
	public isOrthogonalTo(vector: Vec3, precision: number = EPSILON): boolean {
		return Math.abs(this.dot(vector)) < precision;
	}

	/**
	 * @param {Vec3} vector
	 * @param {Number} precision [optional]
	 * @returns {Boolean}
	 */
	public isEqualTo(vector: Vec3, precision: number = EPSILON): boolean {
		return this.distanceTo(vector) < precision;
	}

	/**
	 *
	 * @param vector
	 * @param scalar
	 * @returns
	 */
	public lerp(vector: Vec3, scalar: number): Vec3 {
		return this.clone()._lerp(vector, scalar);
	}

	/**
	 *
	 * @param vector
	 * @param scalar
	 * @returns
	 */
	public _lerp(vector: Vec3, scalar: number): Vec3 {
		this.x += (vector.x - this.x) * scalar;
		this.y += (vector.y - this.y) * scalar;
		this.z += (vector.z - this.z) * scalar;

		return this;
	}

	/**
	 * Componant-wise multiplication
	 * @param vector
	 * @returns the resulting Vector3
	 */
	public multiply(vector: Vec3): Vec3 {
		return this.clone()._multiply(vector);
	}

	/**
	 * Componant-wise multiplication
	 * @param vector
	 * @returns the current updated Vector3
	 */
	public _multiply(vector: Vec3): Vec3 {
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
	public multiplyMat3(matrix: Mat3): Vec3 {
		return this.clone()._multiplyMat3(matrix);
	}

	/**
	 * V * M multiplication
	 * @param matrix
	 * @returns the current updated Vector3
	 */
	public _multiplyMat3(matrix: Mat3): Vec3 {
		return this.set(
			this.x * matrix.m11 + this.y * matrix.m21 + this.z * matrix.m31,
			this.x * matrix.m12 + this.y * matrix.m22 + this.z * matrix.m32,
			this.x * matrix.m13 + this.y * matrix.m23 + this.z * matrix.m33
		);
	}

	/**
	 * M * V multiplication
	 * @param matrix
	 * @returns the resulting Vector3
	 */
	public permultiplyMat3(matrix: Mat3): Vec3 {
		return this.clone()._permultiplyMat3(matrix);
	}

	/**
	 * M * V multiplication
	 * @param matrix
	 * @returns the current updated Vector3
	 */
	public _permultiplyMat3(matrix: Mat3): Vec3 {
		return this.set(
			matrix.m11 * this.x + matrix.m12 * this.y + matrix.m13 * this.z,
			matrix.m21 * this.x + matrix.m22 * this.y + matrix.m23 * this.z,
			matrix.m31 * this.x + matrix.m32 * this.y + matrix.m33 * this.z
		);
	}

	/**
	 * Perform M * V multiplication.
	 * @param matrix
	 * @returns
	 */
	public permultiplyMat4(matrix: Mat4): Vec3 {
		return this.clone()._permultiplyMat4(matrix);
	}

	/**
	 * Perform M4 * V3 multiplication.
	 * @param matrix
	 * @returns
	 */
	public _permultiplyMat4(matrix: Mat4): Vec3 {
		const w = 1 / (matrix.m41 * this.x + matrix.m42 * this.y + matrix.m43 * this.z + matrix.m44);

		return this.set(
			(matrix.m11 * this.x + matrix.m12 * this.y + matrix.m13 * this.z + matrix.m14) * w,
			(matrix.m21 * this.x + matrix.m22 * this.y + matrix.m23 * this.z + matrix.m24) * w,
			(matrix.m31 * this.x + matrix.m32 * this.y + matrix.m33 * this.z + matrix.m34) * w
		);
	}

	/**
	 *
	 * @returns
	 */
	public normalize(): Vec3 {
		return this.clone()._normalize();
	}

	/**
	 *
	 * @returns
	 */
	public _normalize(): Vec3 {
		const length = this.length;

		if (length === 0) return this;

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
	public negate(): Vec3 {
		return this.clone()._negate();
	}

	/**
	 *
	 * @returns
	 */
	public _negate(): Vec3 {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;

		return this;
	}

	/**
	 * Get orthogonal unit vector to this
	 * @returns
	 */
	public orthogonalDirection(): Vec3 {
		let vector = Vec3.randomDirection();

		while (this.isColinearTo(vector)) {
			vector = Vec3.randomDirection();
		}

		return this.cross(vector)._normalize();
	}

	/**
	 *
	 * @param position line position
	 * @param direction line direction
	 * @returns
	 */
	public projectOnLine(position: Vec3, direction: Vec3): Vec3 {
		const vector = this.sub(position);
		const magnitude = direction.dot(vector);

		return direction.scale(magnitude)._add(position);
	}

	/**
	 * Calculate projection onto a plane (orthogonal projection by default)
	 * @param position plane position
	 * @param normal plane normal
	 * @returns The projected point or null if given projection direction is orthogonal to plane normal
	 */
	public projectOnPlane(position: Vec3, normal: Vec3): Vec3;
	/**
	 * Calculate projection onto a plane (orthogonal projection by default)
	 * @param position plane position
	 * @param normal plane normal
	 * @param [direction=normal] projection direction (default=normal)
	 * @param [precision=EPSILON] floating point precision (default=1e-10)
	 * @returns The projected point or null if given projection direction is orthogonal to plane normal
	 */
	public projectOnPlane(
		position: Vec3,
		normal: Vec3,
		direction?: Vec3,
		precision?: number
	): Vec3 | void;
	public projectOnPlane(
		position: Vec3,
		normal: Vec3,
		direction: Vec3 = normal,
		precision: number = EPSILON
	): Vec3 | void {
		return this.clone()._projectOnPlane(position, normal, direction, precision);
	}

	/**
	 * Calculate projection onto a plane (orthogonal projection by default)
	 * @param position plane position
	 * @param normal plane normal
	 * @returns The projected point or null if given projection direction is orthogonal to plane normal
	 */
	public _projectOnPlane(position: Vec3, normal: Vec3): Vec3;
	/**
	 * Calculate projection onto a plane (orthogonal projection by default)
	 * @param position plane position
	 * @param normal plane normal
	 * @param [direction=normal] projection direction (default=normal)
	 * @param [precision=EPSILON] floating point precision (default=1e-10)
	 * @returns The projected point or null if given projection direction is orthogonal to plane normal
	 */
	public _projectOnPlane(
		position: Vec3,
		normal: Vec3,
		direction?: Vec3,
		precision?: number
	): Vec3 | void;
	public _projectOnPlane(
		position: Vec3,
		normal: Vec3,
		direction: Vec3 = normal,
		precision: number = EPSILON
	): Vec3 | void {
		const nd = normal.dot(direction);
		const cn = position.dot(normal);

		if (Math.abs(nd) < precision) return;

		const np = this.dot(normal);
		const k = (cn - np) / nd;

		return this.copy(direction.scale(k)._add(this));
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public scale(scalar: number): Vec3 {
		return this.clone()._scale(scalar);
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public _scale(scalar: number): Vec3 {
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
	public set(x: number, y: number, z: number): Vec3 {
		this.x = x;
		this.y = y;
		this.z = z;

		return this;
	}

	/**
	 *
	 * @param x
	 * @returns the current updated Vector3
	 */
	public setX(x: number): Vec3 {
		this.x = x;

		return this;
	}

	/**
	 *
	 * @param y
	 * @returns the current updated Vector3
	 */
	public setY(y: number): Vec3 {
		this.y = y;

		return this;
	}

	/**
	 *
	 * @param z
	 * @returns the current updated Vector3
	 */
	public setZ(z: number): Vec3 {
		this.z = z;

		return this;
	}

	/**
	 *
	 * @param vector
	 * @returns
	 */
	public sub(vector: Vec3): Vec3 {
		return this.clone()._sub(vector);
	}

	/**
	 *
	 * @param vector
	 * @returns
	 */
	public _sub(vector: Vec3): Vec3 {
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
	public subScalar(scalar: number): Vec3 {
		return this.clone()._subScalar(scalar);
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public _subScalar(scalar: number): Vec3 {
		this.x -= scalar;
		this.y -= scalar;
		this.z -= scalar;

		return this;
	}

	/**
	 *
	 * @returns
	 */
	public toArray(): number[] {
		return [this.x, this.y, this.z];
	}

	/**
	 *
	 * @returns
	 */
	public toJSON(): string {
		return `{x:${this.x},y:${this.y},z:${this.z}}`;
	}

	/**
	 *
	 * @returns
	 */
	public toQuat(): Quat {
		return new Quat(this.x, this.y, this.z, 1);
	}

	/**
	 *
	 * @returns
	 */
	public toVec2(): Vec2 {
		return new Vec2(this.x, this.y);
	}

	// * Static Methods *

	static make(vec3: number[] | { [coord: string]: number }): Vec3 | void {
		if (vec3 instanceof Vec3) return vec3;

		if (
			Array.isArray(vec3) &&
			Number.isFinite(vec3[0]) &&
			Number.isFinite(vec3[1]) &&
			Number.isFinite(vec3[2])
		)
			return new Vec3(...vec3);
	}

	/**
	 * Generate a random valid Vector3 instance with v.?C[0, 1]
	 * @returns
	 */
	static random(): Vec3 {
		return new Vec3(Math.random(), Math.random(), Math.random());
	}

	/**
	 * Pick a random point on a unit sphere (uniformly distributed)
	 * @see https://mathworld.wolfram.com/SpherePointPicking.html
	 * @returns
	 */
	static randomDirection(): Vec3 {
		const u = (Math.random() - 0.5) * 2;
		const t = Math.random() * Math.PI * 2;
		const f = Math.sqrt(1 - u ** 2);

		return new Vec3(f * Math.cos(t), f * Math.sin(t), u);
	}

	static fromVec2(vector: Vec2): Vec3 {
		return new Vec3(vector.x, vector.y, 0);
	}

	static fromVec4(vector: Vec4): Vec3 {
		return new Vec3(vector.x, vector.y, vector.z);
	}

	static isValid(vector: Vec3): boolean {
		if (!(vector instanceof Vec3)) return false;
		if (!Number.isFinite(vector?.x)) return false;
		if (!Number.isFinite(vector?.y)) return false;
		return Number.isFinite(vector?.z);
	}
}
