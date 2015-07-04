(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var Obj = Ceres.Obj = function (points) {
    this.points = points;
  };

  Obj.Random = function (xCenter, yCenter, r, n) {
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

      minTheta += dTheta;
    }

    return new Obj(points);
  };
})();