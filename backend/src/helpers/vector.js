// vector2d
module.exports.vector2D = function (_x, _y) {
  this.x = null;
  this.y = null;

  if (typeof x == 'number' && typeof y == 'number') {
    this.x = x;
    this.y = y;
  }
};

// vector3d
module.exports.vector3D = function (_x, _y, _z) {
  this.x = null;
  this.y = null;
  this.z = null;

  if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
    this.x = x;
    this.y = y;
    this.z = z;
  }
};
