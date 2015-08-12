(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var RADIUS = 15;
  var ANGLES = [-Math.PI / 2, 2 * Math.PI / 6, 4 * Math.PI / 6];
  var D_ANGLE = Math.PI / 90;
  var D_VEL = 0.1;

  var Ship = Ceres.Ship = function (game) {
    var bounds = game.size();
    var center = bounds.map(function (bound) { return  bound / 2; });
    var xC = center[0], yC = center[1];

    this.radius = RADIUS;
    var points = ANGLES.map(function (angle) {
      return [
        xC + RADIUS * Math.cos(angle),
        yC + RADIUS * Math.sin(angle)
      ];
    });
    var vel = [0, 0];

    this.dir = -Math.PI / 2;
    this.canShoot = true;
    Ceres.Obj.call(this, center, points, vel, game);
  };

  Ship.MAX_SPEED = 5;
  Ship.FILL = "#000";
  Ship.STROKE = "#000";

  Ship.inheritsFrom(Ceres.Obj);
  Ship.prototype.fill = Ship.FILL;
  
  Ship.prototype.type = "ship";

  Ship.prototype.rotateClockwise = function () {
    this.rotate(-D_ANGLE);
  };

  Ship.prototype.rotateCounterClockwise = function () {
    this.rotate(D_ANGLE);
  };

  Ship.prototype.propel = function () {
    this.vel = this.vel.plus([D_VEL * Math.cos(this.dir), D_VEL * Math.sin(this.dir)]);
  };

  Ship.prototype.shoot = function () {
    if (this.canShoot) {
      this.game.lasers.push(new Ceres.Laser(this));
      this.canShoot = false;
      setTimeout(function () {
        this.canShoot = true;
      }.bind(this), 200);
    }
  };
})();
