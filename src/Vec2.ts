import { EPSILON } from './constants';
import { Mat3 } from './Mat3';
import { Mat4 } from './Mat4';
import { clamp } from './utils';
import { Quat } from './Quat';
import { Vec4 } from './Vec4';
import { Vec3 } from './Vec3';

/**
 * @param x
 * @param y
 * @returns {Vec2}
 */

/**
 * A 2-dimensional euclidian vector
 * @todo check equality error proportions (exemple .dot might need sqrt(EPSILON))
 * @class
 */
export class Vec2 {
	/**
	 * @constructor
	 * @param x
	 * @param y
	 */
	constructor(public x: number = 0, public y: number = 0) {}

	// * Getters & Setters *

	get isValid(): boolean {
		if (!Number.isFinite(this.x)) return false;
		return Number.isFinite(this.y);
	}

	get length(): number {
		return Math.sqrt(this.lengthSq);
	}

	get lengthSq(): number {
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
	public add(vector: Vec2): Vec2 {
		return this.clone()._add(vector);
	}

	/**
	 * Adds the given vector to the current Vec2
	 * @param vector the Vec2 to add
	 * @returns the current updated Vec2
	 */
	public _add(vector: Vec2): Vec2 {
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
	public addScalar(scalar: number): Vec2 {
		return this.clone()._addScalar(scalar);
	}

	/**
	 * Adds the given scalar componentwise to the current Vec2
	 * @param scalar the Number to add
	 * @returns the current updated Vec2
	 */
	public _addScalar(scalar: number): Vec2 {
		this.x += scalar;
		this.y += scalar;

		return this;
	}

	/**
	 * Gets the angle between the current vector and the given vector
	 * @param vector the second operand
	 * @returns the resulting angle
	 */
	public angleTo(vector: Vec2): number {
		const denominator = this.lengthSq * vector.lengthSq;

		if (denominator === 0) return Math.PI / 2;

		const theta = this.dot(vector) / Math.sqrt(denominator);

		// clamp, to handle numerical problems
		return Math.acos(clamp(theta, -1, 1));
	}

	public apply(fn: (component: number) => number): Vec2 {
		return this.clone()._apply(fn);
	}

	public _apply(fn: (component: number) => number): Vec2 {
		this.x = fn(this.x);
		this.y = fn(this.y);

		return this;
	}

	/**
	 * Creates a new Vec2 copied from the current Vec2
	 * @returns {Vec2}
	 */
	public clone(): Vec2 {
		return new Vec2(this.x, this.y);
	}

	/**
	 * @param vector
	 * @returns the current updated Vec2
	 */
	public copy(vector: Vec2): Vec2 {
		this.x = vector.x;
		this.y = vector.y;

		return this;
	}

	/**
	 *
	 * @param vector
	 * @returns
	 */
	public distanceTo(vector: Vec2): number {
		return this.sub(vector).length;
	}

	/**
	 *
	 * @param position
	 * @param direction
	 * @returns
	 */
	public distanceToLine(position: Vec2, direction: Vec2): number {
		const projection = this.projectOnLine(position, direction);

		return this.distanceTo(projection);
	}

	/**
	 *
	 * @param vec2
	 * @returns
	 */
	public distanceSqTo(vec2: Vec2): number {
		return this.sub(vec2).lengthSq;
	}

	/**
	 * @param vec2
	 * @returns
	 */
	public dot(vec2: Vec2): number {
		return this.x * vec2.x + this.y * vec2.y;
	}

	/**
	 * @param vec2
	 * @param [precision]
	 * @returns
	 */
	public isColinearTo(vec2: Vec2, precision: number = EPSILON): boolean {
		// return this.cross(vector).length < precision ** 0.5;
	}

	/**
	 *
	 * @param vec2
	 * @param [precision]
	 * @returns
	 */
	public isOrthogonalTo(vec2: Vec2, precision: number = EPSILON): boolean {
		return Math.abs(this.dot(vec2)) < precision;
	}

	/**
	 * @param {Vec2} vec2
	 * @param {Number} precision [optional]
	 * @returns {Boolean}
	 */
	public isEqualTo(vec2: Vec2, precision: number = EPSILON): boolean {
		return this.distanceTo(vec2) < precision;
	}

	/**
	 *
	 * @param vec2
	 * @param scalar
	 * @returns
	 */
	public lerp(vec2: Vec2, scalar: number): Vec2 {
		return this.clone()._lerp(vec2, scalar);
	}

	/**
	 *
	 * @param vec2
	 * @param scalar
	 * @returns
	 */
	public _lerp(vec2: Vec2, scalar: number): Vec2 {
		this.x += (vec2.x - this.x) * scalar;
		this.y += (vec2.y - this.y) * scalar;

		return this;
	}

	/**
	 * Componant-wise multiplication
	 * @param vec2
	 * @returns the resulting Vec2
	 */
	public multiply(vec2: Vec2): Vec2 {
		return this.clone()._multiply(vec2);
	}

	/**
	 * Componant-wise multiplication
	 * @param vec2
	 * @returns the current updated Vec2
	 */
	public _multiply(vec2: Vec2): Vec2 {
		this.x *= vec2.x;
		this.y *= vec2.y;

		return this;
	}

	/**
	 * V * M multiplication
	 * @param mat2
	 * @returns the resulting Vec2
	 */
	public multiplyMat2(mat2: Mat2): Vec2 {
		return this.clone()._multiplyMat2(mat2);
	}

	/**
	 * V * M multiplication
	 * @param mat2
	 * @returns the current updated Vec2
	 */
	public _multiplyMat2(mat2: Mat2): Vec2 {
		return this.set(this.x * mat2.m11 + this.y * mat2.m21, this.x * mat2.m12 + this.y * mat2.m22);
	}

	/**
	 * M * V multiplication
	 * @param mat2
	 * @returns the resulting Vec2
	 */
	public permultiplyMat2(mat2: Mat2): Vec2 {
		return this.clone()._permultiplyMat2(mat2);
	}

	/**
	 * M * V multiplication
	 * @param mat2
	 * @returns the current updated Vec2
	 */
	public _permultiplyMat2(mat2: Mat2): Vec2 {
		return this.set(mat2.m11 * this.x + mat2.m12 * this.y, mat2.m21 * this.x + mat2.m22 * this.y);
	}

	/**
	 * Perform M * V multiplication.
	 * @param mat3
	 * @returns
	 */
	public permultiplyMat3(mat3: Mat3): Vec2 {
		return this.clone()._permultiplyMat3(mat3);
	}

	/**
	 * Perform M4 * V3 multiplication.
	 * @param mat3
	 * @returns
	 */
	public _permultiplyMat3(mat3: Mat3): Vec2 {
		const w = 1 / (mat3.m31 * this.x + mat3.m32 * this.y + mat3.m33);

		return this.set(
			(mat3.m11 * this.x + mat3.m12 * this.y + mat3.m13) * w,
			(mat3.m21 * this.x + mat3.m22 * this.y + mat3.m23) * w
		);
	}

	/**
	 *
	 * @returns
	 */
	public normalize(): Vec2 {
		return this.clone()._normalize();
	}

	/**
	 *
	 * @returns
	 */
	public _normalize(): Vec2 {
		const length = this.length;

		if (length === 0) return this;

		const denominator = 1 / length;

		this.x *= denominator;
		this.y *= denominator;

		return this;
	}

	/**
	 *
	 * @returns
	 */
	public negate(): Vec2 {
		return this.clone()._negate();
	}

	/**
	 *
	 * @returns
	 */
	public _negate(): Vec2 {
		this.x = -this.x;
		this.y = -this.y;

		return this;
	}

	/**
	 * Get orthogonal unit vector to this
	 * @returns
	 */
	public orthogonalDirection(): Vec2 {
		return new Vec2(-this.y, this.x);
	}

	/**
	 *
	 * @param position line position
	 * @param direction line direction
	 * @returns
	 */
	public projectOnLine(position: Vec2, direction: Vec2): Vec2 {
		const vector = this.sub(position);
		const magnitude = direction.dot(vector);

		return direction.scale(magnitude)._add(position);
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public scale(scalar: number): Vec2 {
		return this.clone()._scale(scalar);
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public _scale(scalar: number): Vec2 {
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
	public set(x: number, y: number): Vec2 {
		this.x = x;
		this.y = y;

		return this;
	}

	/**
	 *
	 * @param x
	 * @returns the current updated Vec2
	 */
	public setX(x: number): Vec2 {
		this.x = x;

		return this;
	}

	/**
	 *
	 * @param y
	 * @returns the current updated Vec2
	 */
	public setY(y: number): Vec2 {
		this.y = y;

		return this;
	}

	/**
	 *
	 * @param vector
	 * @returns
	 */
	public sub(vector: Vec2): Vec2 {
		return this.clone()._sub(vector);
	}

	/**
	 *
	 * @param vector
	 * @returns
	 */
	public _sub(vector: Vec2): Vec2 {
		this.x -= vector.x;
		this.y -= vector.y;

		return this;
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public subScalar(scalar: number): Vec2 {
		return this.clone()._subScalar(scalar);
	}

	/**
	 *
	 * @param scalar
	 * @returns
	 */
	public _subScalar(scalar: number): Vec2 {
		this.x -= scalar;
		this.y -= scalar;

		return this;
	}

	/**
	 *
	 * @returns
	 */
	public toArray(): [number, number] {
		return [this.x, this.y];
	}

	/**
	 *
	 * @returns
	 */
	public toJSON(): string {
		return `{x:${this.x},y:${this.y}}`;
	}

	/**
	 *
	 * @returns
	 */
	public toVec3(): Vec3 {
		return new Vec3(this.x, this.y, 1);
	}

	// * Static Methods *

	static make(vector: number[] | { [coord: string]: number }): Vec2 | void {
		if (vector instanceof Vec2) return vector;

		if (Array.isArray(vector) && Number.isFinite(vector[0]) && Number.isFinite(vector[1]))
			return new Vec2(...vector);
	}

	/**
	 * Generate a random valid Vec2 instance with v.?C[0, 1]
	 * @returns
	 */
	static random(): Vec2 {
		return new Vec2(Math.random(), Math.random());
	}

	/**
	 * Pick a random point on a unit sphere (uniformly distributed)
	 * @see https://mathworld.wolfram.com/SpherePointPicking.html
	 * @returns
	 */
	static randomDirection(): Vec2 {
		const u = (Math.random() - 0.5) * 2;
		const t = Math.random() * Math.PI * 2;
		const f = Math.sqrt(1 - u ** 2);

		return new Vec2(f * Math.cos(t), f * Math.sin(t));
	}

	static fromVec3(vec3: Vec3): Vec2 {
		return new Vec2(vec3.x, vec3.y);
	}

	static isValid(vec2: Vec2): boolean {
		if (!(vec2 instanceof Vec2)) return false;
		if (!Number.isFinite(vec2?.x)) return false;
		return Number.isFinite(vec2?.y);
	}
}
