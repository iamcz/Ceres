(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var Game = Ceres.Game = function (canvas) {
    this.view = new Ceres.View(canvas);
    this.asteroids = [];

    this.setupAsteroids();
    this.spawnShip();
    this.start();
  };

  Game.prototype.addListeners = function () {
    this.keys = {
      "32": false,
      "37": false,
      "38": false,
      "39": false
    };

    document.addEventListener("keydown", function (e) {
      if (this.keys[e.keyCode] !== undefined) {
        e.preventDefault();
        this.keys[e.keyCode] = true;
      }
    });

    document.addEventListener("keyup", function (e) {
      if (this.keys[e.keyCode] !== undefined) {
        e.preventDefault();
        this.keys[e.keyCode] = false;
      }
    });
  };

  Game.prototype.size = function () {
    return this.view.getSize();
  };

  Game.prototype.setupAsteroids = function () {
    var i;
    var bounds = this.view.getSize();

    for (i = 0; i < 15; i += 1) {
      this.asteroids.push(Ceres.Asteroid.Random(bounds, 25, this));
    }
  };

  Game.prototype.spawnShip = function () {
    this.ship = new Ceres.Ship(this);
  };

  Game.prototype.start = function () {
    setInterval( function () {
      this.view.updateSize();
      this.renderAll();
      this.checkCollisions();
      this.moveAll();
    }.bind(this), 1000 / 60);
  };

  Game.prototype.renderAll = function () {
    this.view.clear();
    this.doToAll(this.view.render.bind(this.view));
  };

  Game.prototype.moveAll = function () {
    this.doToAll(function (obj) { obj.move(); })
  };

  Game.prototype.doToAll = function (callback) {
    this.allObjects().forEach( function (obj) {
      callback(obj);
    });
  };

  Game.prototype.checkCollisions = function () {
    var size = this.size();
    var game = this;
    var quadTree = new Ceres.QuadTree(0, 0, size[0], size[1]);
    this.doToAll(quadTree.add.bind(quadTree));
    this.doToAll( function (obj) {
      var neighbors = quadTree.findNeighbors(obj);

      neighbors.forEach( function (neighbor) {
        if (obj !== neighbor && obj.collidesWith(neighbor)) {
          game.handleCollision(obj, neighbor);
        }
      });
    });
  };

  Game.prototype.handleCollision = function (obj, otherObj) {
    console.log("handleCollision");
    if (obj.type === "ship" && otherObj.type === "asteroid" || 
        obj.type === "asteroid" && otherObj.type === "ship") {
      this.shipHitByAsteroid();
    } 
  };

  Game.prototype.shipHitByAsteroid = function () {
    this.spawnShip();
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship);
  };
})();
