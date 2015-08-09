(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var Obj = Ceres.Obj = function (points, vel, game) {
    this.points = points;
    // this.center = center;
    this.vel = vel || [0, 0];
    this.game = game;
    this.wrappable = true;
  };

  Obj.randomPoints = function (xCenter, yCenter, r, n) {
    var dTheta = 2 * Math.PI / n, 
        minTheta = 0,
        dRad = 0.1,
        rad, theta, x, y,
        points = [];

    while (points.length < n) {
      theta = minTheta + Math.random() * dTheta;
      rad = r * (1 - dRad) + Math.random() * r * dRad * 2;
      x = xCenter + rad * Math.cos(theta);
      y = yCenter + rad * Math.sin(theta);

      points.push([x, y]);

      minTheta = points.length * 2 * Math.PI / n;
    }

    return points;
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
    this.points = this.points.map( function (point) {
      return point.plus(diff);
    }.bind(this));
  };

  Obj.prototype.rotate = function (angle) {

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
    var newObj = new Obj(this.points, this.vel, this.game);

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

  Obj.prototype.axes = function (otherObj) {
    var points = this.points;
    var pointIdx, fromPoint, toPoint, slope;
    var axes = [];

    for (pointIdx = 0; pointIdx < points.length; pointIdx += 1) {
      fromPoint = points[pointIdx];
      toPoint = points[(pointIdx + 1) % points.length];
      slope = (toPoint[1] - fromPoint[1]) / (toPoint[0] - fromPoint[0]);
      axes.push([-slope, 1]);
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

    var axes = this.axes().concat(otherObj.axes());
    var i, axis, thisProj, otherProj;

    for (i = 0; i < axes.length; i += 1) {
      axis = axes[i];
      thisProj = this.proj(axis);
      otherProj = otherObj.proj(axis);

      if (!thisProj.overlaps(otherProj)) {
        return false; 
      } else {
        
      }
    }
    return true;
  };
})();
