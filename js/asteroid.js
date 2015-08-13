(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var RADII = [25, 20, 10];
  var NUM_POINTS = 10;

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
    var center, points, radius, vel;

    radius = RADII[0];
    center = [[0, 0], game.size()].sampleWithinBounds();
    points = Ceres.Obj.randomPoints(center, radius, NUM_POINTS);
    vel = Asteroid.velFor(radius);

    return new Asteroid(center, radius, points, vel, game);
  };

  var NUM_CHILDREN = 2;

  Asteroid.Children = function (parent) {
    var points, center, vel;
    var radius = RADII[RADII.indexOf(this.radius) + 1];

    var bounds = [
      [parent.left(), parent.bottom()],
      [parent.right(), parent.top()]
    ];

    var children = [];
    for (var i = 0; i < NUM_CHILDREN; i += 1) {
      center = bounds.sampleWithinBounds();
      points = Ceres.Obj.randomPoints(center, radius, NUM_POINTS);
      vel = Asteroid.velFor(radius);

      children.push(new Asteroid(center, radius, points, vel, parent.game));
    }
    
    // return [
    //   Asteroid.Random(this.game.size(), radius, this.game),
    //   Asteroid.Random(this.game.size(), radius, this.game)
    // ];
  };

  // Asteroid.numPointsFor = function (rad) {
  //   return 10;
  // };

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
    
  }
})();
