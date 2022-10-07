# Geomaths

A math utils library built for euclidean geometry newbies and pros alike.
Inspired by [euclideanspace](https://www.euclideanspace.com/maths/geometry/index.html).

```typescript
import { AxisAngle, Quat, Vec3 } from 'geomaths';

interface Point { position: Vec3 }
interface Line { position: Vec3, direction: Vec3 }

function projectPointOnLine(point: Point, line: Line): Point {
  const magnitude = point.position
    .sub(line.position)
    .dot(line.direction);

  return {
    position: line.direction
      .scale(magnitude)
      ._add(line.position)
    };
}

function rotatePointAroundLine(point: Point, line: Line, angle: number): Point {
  const axisAngle = new AxisAngle(line.direction, angle);
  const quaternion = Quat.fromAxisAngle(axisAngle);
  const vector = point.position.sub(line.position);

  return {
    position: quaternion
      .rotateVec3(vector)
      ._add(line.position)
    };
}
```

Geomaths aims at being a fast but safe core building block for any project. Methods are non-mutating by default, every `method` that can be preformed in-place safely has an `_method` alternative.

```typescript
import { Vec3 } from 'geomaths';

function barycenter(vertices: Vec3[]): Vec3 {
  const sum = new Vec3();

  for (let i = 0; i < vertices.length; i++)
    sum._add(vertices[i]);

  return sum._scale(1 / vertices.length);
}

const vec = Vec3.randomDirection();
const mat = Mat3.random();

// _inv() does not exist as mat.det() = 0 can occure
const matInv: Mat3 | void = mat.inv();

// Mat3._mulVec3() does not exist as Mat3 <- Vec3 isnt possible
const rot1 = mat.mulVec3(vec);

// To store result on original vec
const rot2 = vec._permulMat3(mat);
```