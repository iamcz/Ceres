(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var Obj = Ceres.Obj = function (center, points, vel, game) {
    this.center = center;
    this.points = points;
    this.vel = vel || [0, 0];
    this.game = game;
    this.wrappable = true;
  };

  Obj.prototype.move = function () {
    this.shift(this.vel);
    if (this.wrappable) this.wrap();
  };

  Obj.prototype.xVals = function () {
    return this.points.map(function (point) { return point[0]; });
  };

  Obj.prototype.yVals = function () {
    return this.points.map (function (point) { return point[1]; });
  };

  Obj.prototype.right = function () {
    return this.xVals().max();
  };

  Obj.prototype.left = function () {
    return this.xVals().min();
  };

  Obj.prototype.top = function () {
    return this.yVals().max();
  };

  Obj.prototype.bottom = function () {
    return this.yVals().min();
  };

  Obj.prototype.shift = function (diff) {
    this.center = this.center.plus(diff);

    this.points = this.points.map( function (point) {
      return point.plus(diff);
    }.bind(this));
  };

  Obj.prototype.rotate = function (angle) {
    this.dir += angle;
    this.points = this.points.map(function (point) {
      var diff = point.minus(this.center);
      var rad = diff.norm();

      var prevAngle = diff.theta();
      var nextAngle = prevAngle + angle;

      return [
        this.center[0] + rad * Math.cos(nextAngle),
        this.center[1] + rad * Math.sin(nextAngle)
      ];
    }.bind(this));
  };

  Obj.prototype.wrap = function () {
    var bounds = this.game.size();
    
    if (this.right() < 0) {
      this.shift([bounds[0], 0]);
    } else if (this.left() > bounds[0]) {
      this.shift([-bounds[0], 0]);
    } else if (this.top() < 0) {
      this.shift([0, bounds[1]]);
    } else if (this.bottom() > bounds[1]) {
      this.shift([0, -bounds[1]]);
    }
  };

  Obj.prototype.prewrap = function () {
    var bounds = this.game.size();
    var newObj = new Obj(this.center, this.points, this.vel, this.game);

    if (this.left() < 0) {
      newObj.shift([bounds[0], 0]);
    } else if (this.right() > bounds[0]) {
      newObj.shift([-bounds[0], 0]);
    } else if (this.bottom() < 0) {
      newObj.shift([0, bounds[1]]);
    } else if (this.top() > bounds[1]) {
      newObj.shift([0, -bounds[1]]);
    } else {
      return;
    }

    return newObj;
  };

  Obj.prototype.outOfRange = function () {
    var bounds = this.game.size();

    if (this.right() < 0) {
      return true;
    } else if (this.left() > bounds[0]) {
      return true;
    } else if (this.top() < 0) {
      return true;
    } else if (this.bottom() > bounds[1]) {
      return true;
    }

    return false;
  }

  Obj.prototype.axes = function (otherObj) {
    var points = this.points;
    var pointIdx, fromPoint, toPoint, dx, dy;
    var axes = [];

    for (pointIdx = 0; pointIdx < points.length; pointIdx += 1) {
      fromPoint = points[pointIdx];
      toPoint = points[(pointIdx + 1) % points.length];
      dx = toPoint[0] - fromPoint[0];
      dy = toPoint[1] - fromPoint[1];
      axes.push([-dy, dx]);
    }

    return axes;
  };

  Obj.prototype.proj = function (vec) {
    var projPoints = this.points.map(function (point) { 
      return point.proj(vec); 
    });

    return [projPoints.min(), projPoints.max()];
  };

  Obj.prototype.collidesWith = function (otherObj) {
    if (otherObj === this) return false;

    var axes = this.axes().concat(otherObj.axes()), i;
    for (i = 0; i < axes.length; i += 1) {
      if (!this.proj(axes[i]).overlaps(otherObj.proj(axes[i]))) {
        return false; 
      }
    }

    return true;
  };

})();
