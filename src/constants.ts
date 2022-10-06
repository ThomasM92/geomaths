/**
 * The default euclidean distance that identifies whether two points are coincident
 * @constant
 * @type {Number}
 */
export const TOLERANCE = 1e-6;

/**
 * The minimum value to determine whether two floating point numbers are the same
 * @constant
 * @type {Number}
 */
export const EPSILON = 1e-10;

/**
 * Converts angle value av to radian value rv = av * AGL2RAD
 * @constant
 * @type {Number}
 */
export const AGL2RAD = Math.PI / 180;

/**
 * Converts radian value rv to angle value av = rv * RAD2AGL
 * @constant
 * @type {Number}
 */
export const RAD2AGL = 180 / Math.PI;

/**
 * Half of the number PI
 * @constant
 * @type {Number}
 */
export const HALFPI = Math.PI / 2;

/**
 * Two times the number PI
 * @constant
 * @type {Number}
 */
export const TWOPI = 2 * Math.PI;

/**
 * The number PI
 * @constant
 * @type {Number}
 */
export const PI = Math.PI;
