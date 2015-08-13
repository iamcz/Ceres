(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var PI = Math.PI;
  var D_ANG = PI / 2;
  var POINTS = [ [5, 1], [-5, 1], [-5, -1], [5, -1] ];
  var RAD = 5;
  var MAX_VEL = 6;

  var Laser = Ceres.Laser = function (ship) {
    var dir = ship.dir, center, points, vel;

    center = Laser.calculateCenter(ship);
    points = Laser.calculatePoints(center);
    vel = [MAX_VEL * Math.cos(dir), MAX_VEL * Math.sin(dir)];

    Ceres.Obj.call(this, center, points, vel, ship.game);
  
    this.wrappable = false;
    this.rotate(dir); // Render laser in correct direction
  };

  Laser.calculateCenter = function (ship) {
    return ship.center.plus([
      ship.radius * Math.cos(ship.dir), 
      ship.radius * Math.sin(ship.dir)
    ]);
  };

  Laser.calculatePoints = function (center) {
    return POINTS.map(function (point) {
      return center.plus(point);
    });
  };

  Laser.FILL = "#F00";
  Laser.STROKE = "#F00";

  Laser.inheritsFrom(Ceres.Obj);
  Laser.prototype.fill = Laser.FILL;
  Laser.prototype.stroke = Laser.STROKE;
  
  Laser.prototype.type = "laser";
})();
