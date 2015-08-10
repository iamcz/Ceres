(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var RADIUS = 15;
  var ANGLES = [-Math.PI / 2, 2 * Math.PI / 6, 4 * Math.PI / 6];
  var D_ANGLE = Math.PI / 18;

  var Ship = Ceres.Ship = function (game) {
    var bounds = game.size();
    var center = bounds.map(function (bound) { return  bound / 2; });
    var xC = center[0], yC = center[1]

    var points = ANGLES.map(function (angle) {
      return [
        xC + RADIUS * Math.cos(angle),
        yC + RADIUS * Math.sin(angle)
      ];
    });
    var vel = [0, 0];

    Ceres.Obj.call(this, center, points, vel, game);
  };

  Ship.MAX_SPEED = 5;
  Ship.FILL = "#000";
  Ship.STROKE = "#000";

  Ship.inheritsFrom(Ceres.Obj);
  Ship.prototype.fill = Ship.FILL;
  // Ship.prototype.stroke = Ship.STROKE;
  
  Ship.prototype.type = "ship";

  Ship.prototype.rotateRight = function () {

  };

  Ship.prototype.rotateLeft = function () {

  };
})();
