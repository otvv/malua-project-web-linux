module.exports = {
  normalizeClamp: function normalizeClamp(_angles) {
    if (_angles.x > 89) {
      _angles.x = 89;
    }

    if (_angles.x < -89) {
      _angles.x = -89;
    }

    while (_angles.y > 180) {
      _angles.y = _angles.y - 360;
    }

    while (_angles.y < -180) {
      _angles.y = _angles.y + 360;
    }

    if (_angles.y > 180) {
      _angles.y = 180;
    }

    if (_angles.y < -180) {
      _angles.y = -180;
    }

    if (typeof _angles.x != "number" || Number.isNaN(angles.x)) {
      _angles.x = 0;
    }

    if (typeof _angles.y != "number" || Number.isNaN(angles.y)) {
      _angles.y = 0;
    }

    if (_angles.z != 0) {
      _angles.z = 0;
    }

    return _angles;
  },

  // TODO: add more stuff here if needed
};
