(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var Game = Ceres.Game = function (canvas) {
    this.view = new Ceres.View(canvas);
    this.asteroids = [];

    this.setup();
    this.start();
  };

  Game.prototype.setup = function () {
    var i;
    var bounds = this.view.getSize();

    for (i = 0; i < 3; i += 1) {
      this.asteroids.push(new Ceres.Asteroid.Random(bounds, 25));
    }
  };

  Game.prototype.start = function () {
    setInterval( function () {
      this.renderAll();
      this.moveAll();
    }.bind(this), 1000 / 60);
  }

  Game.prototype.renderAll = function () {
    this.view.clear();
    this.allObjects().forEach( function (obj) {
      this.view.render(obj);
    }.bind(this));
  };

  Game.prototype.moveAll = function () {
    this.allObjects().forEach( function (obj) {
      obj.move();
    });
  }

  Game.prototype.allObjects = function () {
    return this.asteroids;
  };
})();
