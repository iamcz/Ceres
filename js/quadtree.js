(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var QuadTree = Ceres.QuadTree = function (xMin, yMin, xMax, yMax, parent) {
    this.objects = [];
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.parent = parent;
  };

  QuadTree.prototype.split = function () {
    this.branches = [];
    var xMid = (this.xMin + this.xMax) / 2, yMid = (this.xMin + this.yMax) / 2;

    this.branches.push(new QuadTree(this.xMin, this.yMin, xMid, yMid, this));
    this.branches.push(new QuadTree(xMid, this.yMin, this.xMax, yMid, this));
    this.branches.push(new QuadTree(this.xMin, yMid, xMid, this.yMax, this));
    this.branches.push(new QuadTree(xMid, yMid, this.xMax, this.yMax, this));
  };

  QuadTree.prototype.add = function (obj) {
    if (typeof this.branches === "undefined") this.split();
    
    var i, branch, branches = this.branches;
    for (i = 0; i < this.branches.length; i += 1) {
      branch = this.branches[i];

      if (branch.canContain(obj)) {
        branch.add(obj);
        return;
      }
    }

    this.objects.push(obj);
  };

  QuadTree.prototype.canContain = function (obj) {
    return (
      obj.left() > this.xMin &&
      obj.right() < this.xMax && 
      obj.bottom() > this.yMin &&
      obj.top() < this.yMax 
    );
  };

  QuadTree.prototype.findNeighbors = function (obj) {
    var i, objects;
    if (this.hasBranches()) {
      for (i = 0; i < this.branches.length; i += 1) {
        branch = this.branches[i];
        if (branch.canContain(obj)) return branch.findNeighbors(obj);
      }
    }
    
    objects = this.allObjects();
    if (this.hasParent()) objects = objects.concat(this.parent.objects);

    return objects;
  };

  QuadTree.prototype.hasParent = function () {
    return (typeof this.parent !== "undefined");
  };

  QuadTree.prototype.allObjects = function () {
    var allObjects = this.objects.clone();

    if (this.hasBranches()) {
      this.branches.forEach(function (branch) {
        [].push.apply(allObjects, branch.allObjects());
      });
    }

    return allObjects;
  };

  QuadTree.prototype.hasBranches = function () {
    return (typeof this.branches !== "undefined");
  };
})();
