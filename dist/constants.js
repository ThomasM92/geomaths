"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PI = exports.TWOPI = exports.HALFPI = exports.RAD2AGL = exports.AGL2RAD = exports.EPSILON = exports.TOLERANCE = void 0;
/**
 * The default euclidean distance that identifies whether two points are coincident
 * @constant
 * @type {Number}
 */
exports.TOLERANCE = 1e-6;
/**
 * The minimum value to determine whether two floating point numbers are the same
 * @constant
 * @type {Number}
 */
exports.EPSILON = 1e-10;
/**
 * Converts angle value av to radian value rv = av * AGL2RAD
 * @constant
 * @type {Number}
 */
exports.AGL2RAD = Math.PI / 180;
/**
 * Converts radian value rv to angle value av = rv * RAD2AGL
 * @constant
 * @type {Number}
 */
exports.RAD2AGL = 180 / Math.PI;
/**
 * Half of the number PI
 * @constant
 * @type {Number}
 */
exports.HALFPI = Math.PI / 2;
/**
 * Two times the number PI
 * @constant
 * @type {Number}
 */
exports.TWOPI = 2 * Math.PI;
/**
 * The number PI
 * @constant
 * @type {Number}
 */
exports.PI = Math.PI;
//# sourceMappingURL=constants.js.map