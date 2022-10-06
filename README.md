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

Geomaths aims at being a fast but safe core building block for any project. Methods are non-mutating by default, but in-place alternatives can be use. Perfomance freaks, the mighty `_` is your friend.

```typescript
import { Vec3 } from 'geomaths';

function barycenter(vertices: Vec3[]): Vec3 {
  const sum = new Vec3();

  for (let i = 0; i < vertices.length; i++)
    sum._add(vertices[i]);

  return sum._scale(1 / vertices.length);
}
```

In general, every `method` that can be preformed in-place safely has an `_method` alternative.

```typescript
...

// todo: find an exemple with Mat3 inversion that could be done in-place to show that _invert() does not exists

const mat = new Mat3(
   0,  1,  3,
  -1,  3, -2,
   3, -3,  0
);

const matInv: Mat3 | void = mat.invert();
if (matInv) return point._multiplyMat3(matInv);

...
```