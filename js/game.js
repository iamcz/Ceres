(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var Game = Ceres.Game = function (canvas) {
    this.view = new Ceres.View(canvas);
    this.asteroids = [];
    this.lasers = [];

    this.numAsteroids = 3;
    this.livesLeft = 3;
    this.score = 0;
    this.addListeners();
    this.setupAsteroids();
    this.spawnShip();
    this.start();
  };

  Game.prototype.addListeners = function () {
    this.keys = {
      "32": false, // Space
      "37": false, // Left
      "38": false, // Up
      "39": false  // Right
    };

    document.addEventListener("keydown", function (e) {
      if (typeof this.keys[e.keyCode] !== "undefined") {
        e.preventDefault();
        this.keys[e.keyCode] = true;
      }
    }.bind(this));

    document.addEventListener("keyup", function (e) {
      if (typeof this.keys[e.keyCode] !== "undefined") {
        e.preventDefault();
        this.keys[e.keyCode] = false;
      }
    }.bind(this));
  };

  Game.prototype.size = function () {
    return this.view.getSize();
  };

  Game.prototype.setupAsteroids = function () {
    var i;
    var bounds = this.view.getSize();

    for (i = 0; i < this.numAsteroids; i += 1) {
      this.asteroids.push(
        Ceres.Asteroid.Random(bounds, 25, this)
      );
    }
  };

  Game.prototype.spawnShip = function () {
    this.ship = new Ceres.Ship(this);
  };

  Game.prototype.start = function () {
    setInterval( this.step.bind(this), 1000 / 60);
  };

  Game.prototype.step = function () {
    this.view.updateSize();
    this.renderAll();

    this.checkCollisions();

    this.moveAll();
    this.filterOutOfRange();
    this.renderHUD();
    
    this.getInput();
    
    if (this.levelComplete()) this.levelUp();
  };

  Game.prototype.levelComplete = function () {
    return (this.asteroids.length === 0);
  };

  Game.prototype.levelUp = function () {
    this.numAsteroids += 1;
    this.setupAsteroids();
  };

  Game.prototype.over = function () {
    return this.livesLeft <= 0;
  };

  Game.prototype.getInput = function () {
    for (var key in this.keys) {
      if (this.keys[key] && !(key in {})) { 
        switch (key) {
          case "32": 
            this.ship.shoot();
            continue;
          case "37":
            this.ship.rotateClockwise();
            continue;
          case "38":
            this.ship.propel();
            continue;
          case "39":
            this.ship.rotateCounterClockwise();
            continue;
          default:
            console.log("Something went wrong!");
        }
      }
    }
  };

  Game.prototype.renderAll = function () {
    this.view.clear();
    this.doToAll(this.view.render.bind(this.view));
  };

  Game.prototype.renderHUD = function () {
    this.view.renderHUD(this.livesLeft, this.score);
  };

  Game.prototype.moveAll = function () {
    this.doToAll(function (obj) { obj.move(); })
  };

  Game.prototype.doToAll = function (callback) {
    this.allObjects().clone().forEach( function (obj) {
      callback(obj);
    });
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    var ship = this.ship;
    var asteroidTree = this.asteroidTree();
    
    var shipNeighbors = asteroidTree.findNeighbors(this.ship);

    if (!ship.invincible) {
      shipNeighbors.forEach(function (asteroid) {
        if (ship.collidesWith(asteroid)) game.handleCollision(asteroid, ship);
      });
    }

    var laserNeighbors;
    this.lasers.forEach(function (laser) {
      laserNeighbors = asteroidTree.findNeighbors(laser);

      laserNeighbors.forEach(function (asteroid) {
        if (laser.collidesWith(asteroid)) game.handleCollision(asteroid, laser);
      });
    });
  };

  Game.prototype.asteroidTree = function () {
    var bounds = this.size();
    var quadTree = new Ceres.QuadTree(0, 0, bounds[0], bounds[1]);

    this.asteroids.forEach(function (asteroid) {
      quadTree.add(asteroid);
    });

    return quadTree;
  }

  Game.prototype.handleCollision = function (obj, otherObj) {
    if (obj.type === "asteroid" && otherObj.type === "ship") {
      this.shipHitByAsteroid();
    } else if (obj.type === "asteroid" && otherObj.type === "laser") {
      this.laserHitsAsteroid(otherObj, obj);
    } else {
    }
  };

  Game.prototype.shipHitByAsteroid = function () {
    this.livesLeft -= 1;
    this.spawnShip();
  };

  Game.prototype.laserHitsAsteroid = function (laser, asteroid) {
    this.score += asteroid.radius;
    this.lasers.remove(laser);
    this.asteroids.remove(asteroid);
    var childAsteroids = Ceres.Asteroid.Children(asteroid);

    childAsteroids.forEach(function (child) {
      this.asteroids.push(child);
    }.bind(this));
  };

  Game.prototype.allObjects = function () {
    return this.asteroids
      .concat(this.ship)
      .concat(this.lasers);
  };

  Game.prototype.filterOutOfRange = function () {
    this.lasers = this.lasers.filter(function (laser) {
      return !laser.outOfRange();
    });
  };
})();
