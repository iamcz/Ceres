(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var RADIUS = 5;
  var ANGLES = [0, 5 * Math.PI / 6, 7 * Math.PI];

  var Ship = Ceres.Ship = function (game) {
    var center = this.game.size();
    var xC = center[0], yC = center[1]
    var points = ANGLES.map(function (angle) {
      return [
        xC + RADIUS * Math.cos(angle),
        yC + RADIUS * Math.sin(angle)
      ];
    });
    var vel = [0, 0];

    Ceres.Obj.call(this, points, vel, game);
  } 
})
