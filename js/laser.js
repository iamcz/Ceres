(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var PI = Math.PI;
  var D_ANG = PI / 2;
  var ANGLES = [D_ANG, PI - D_ANG, PI + D_ANG, 2 * PI - D_ANG];
  var POINTS = [ [5, 1], [-5, 1], [-5, -1], [5, -1] ];
  var RAD = 5;
  var MAX_VEL = 6;

  var Laser = Ceres.Laser = function (ship) {
    var center = ship.center, dir = ship.dir, game = ship.game;

    center = center.plus([
      ship.radius * Math.cos(dir), 
      ship.radius * Math.sin(dir)
    ]);

    var points = ANGLES.map(function (angle) {
      return [
        center[0] + RAD * Math.cos(dir + angle),
        center[1] + RAD * Math.cos(dir + angle)
      ];
    });

    var points = POINTS.map(function (point) {
      return center.plus(point);
    })

    var vel = [MAX_VEL * Math.cos(dir), MAX_VEL * Math.sin(dir)]

    Ceres.Obj.call(this, center, points, vel, game);
    this.wrappable = false;
    this.rotate(dir)
  }

  Laser.FILL = "#F00";
  Laser.STROKE = "#F00";

  Laser.inheritsFrom(Ceres.Obj);
  Laser.prototype.fill = Laser.FILL;
  Laser.prototype.stroke = Laser.STROKE;
  
  Laser.prototype.type = "laser";
})();
