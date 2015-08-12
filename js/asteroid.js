(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var RADII = [25, 20, 10];

  var Asteroid = Ceres.Asteroid = function (center, radius, points, vel, game) {
    Ceres.Obj.call(this, center, points, vel, game);
    this.radius = radius;
  };

  Asteroid.MAX_SPEED = 5;
  Asteroid.FILL = "#AAA";
  Asteroid.STROKE = "#000";

  Asteroid.inheritsFrom(Ceres.Obj);
  Asteroid.prototype.fill = Asteroid.FILL;
  Asteroid.prototype.stroke = Asteroid.STROKE;

  Asteroid.prototype.type = "asteroid";

  Asteroid.Random = function (bounds, radius, game) {
    var center = [
      Math.random() * bounds[0],
      Math.random() * bounds[1]
    ];

    return new Asteroid(
      center,
      radius,
      Ceres.Obj.randomPoints(
        center[0],
        center[1],
        radius, 
        Asteroid.numPointsFor(radius)
      ),
      Asteroid.velFor(radius),
      game
    );
  };

  Asteroid.numPointsFor = function (rad) {
    // return 3 + Math.floor(Math.random() * rad / 2);
    return 10;
  };

  Asteroid.velFor = function (rad) {
    var speed = Math.random() * Asteroid.MAX_SPEED;
    var theta = Math.random() * 2 * Math.PI;

    return [
      speed * Math.cos(theta),
      speed * Math.sin(theta)
    ];
  }

  Asteroid.prototype.split = function () {
    if (this.radius < 10) return;
    
    var newRadius = RADII[RADII.indexOf(this.radius) + 1];
    
    return [
      Asteroid.Random(this.game.size(), newRadius, this.game),
      Asteroid.Random(this.game.size(), newRadius, this.game)
    ];
  }
})();
