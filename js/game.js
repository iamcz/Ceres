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

  Game.prototype.size = function () {
    return this.view.getSize();
  };

  Game.prototype.setup = function () {
    var i;
    var bounds = this.view.getSize();

    for (i = 0; i < 25; i += 1) {
      this.asteroids.push(Ceres.Asteroid.Random(bounds, 25, this));
    }
  };

  Game.prototype.start = function () {
    setInterval( function () {
      this.view.updateSize();
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
