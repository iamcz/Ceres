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
    points = randomPointsForAsteroid(center, radius, NUM_POINTS);
    vel = Asteroid.velFor(radius);

    return new Asteroid(center, radius, points, vel, game);
  };

  var NUM_CHILDREN = 2;

  Asteroid.Children = function (parent) {
    var points, center, vel;
    var radius = RADII[RADII.indexOf(parent.radius) + 1];
    if (typeof radius === "undefined") return [];

    var bounds = [
      [parent.left(), parent.bottom()],
      [parent.right(), parent.top()]
    ];

    var children = [];
    for (var i = 0; i < NUM_CHILDREN; i += 1) {
      center = bounds.sampleWithinBounds();
      points = randomPointsForAsteroid(center, radius, NUM_POINTS);
      vel = Asteroid.velFor(radius);

      children.push(new Asteroid(center, radius, points, vel, parent.game));
    }

    return children;
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
    
  };

  randomPointsForAsteroid = function (center, r, n) {
    var dTheta = 2 * Math.PI / n, 
        xCenter = center[0], yCenter = center[1],
        minTheta = 0,
        dRad = 0.2,
        rad, theta, x, y,
        points = [];

    while (points.length < n) {
      theta = minTheta + Math.random() * dTheta;
      // rad = r * (1 - dRad) + Math.random() * r * dRad * 2;
      rad = r;
      x = xCenter + rad * Math.cos(theta);
      y = yCenter + rad * Math.sin(theta);

      points.push([x, y]);

      minTheta = points.length * 2 * Math.PI / n;
    }

    return points;
  };
})();
