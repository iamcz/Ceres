(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var Asteroid = Ceres.Asteroid = function (points, vel, game) {
    Ceres.Obj.call(this, points, vel, game);
  };

  Asteroid.MAX_SPEED = 5;
  Asteroid.FILL = "#AAA";
  Asteroid.STROKE = "#000";

  Asteroid.inheritsFrom(Ceres.Obj);
  Asteroid.prototype.fill = Asteroid.FILL;
  Asteroid.prototype.stroke = Asteroid.STROKE;

  Asteroid.Random = function (bounds, radius, game) {
    return new Asteroid(
      Ceres.Obj.randomPoints(
        Math.random() * bounds[0], 
        Math.random() * bounds[1], 
        radius, 
        Asteroid.numPointsFor(radius)
      ),
      Asteroid.velFor(radius),
      game
    );
  };

  Asteroid.numPointsFor = function (rad) {
    return 3 + Math.floor(Math.random() * rad / 2);
  };

  Asteroid.velFor = function (rad) {
    var speed = Math.random() * Asteroid.MAX_SPEED;
    var theta = Math.random() * 2 * Math.PI;

    return [
      speed * Math.cos(theta),
      speed * Math.sin(theta)
    ];
  }
})();
