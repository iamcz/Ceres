(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var QuadTree = Ceres.QuadTree = function (xMin, yMin, xMax, yMax) {
    this.objects = [];
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
  };

  QuadTree.prototype.split = function () {
    this.branches = [];
    var xMid = (this.xMin + this.xMax) / 2, yMid = (this.xMin + this.yMax) / 2;

    this.branches.push(new QuadTree(this.xMin, this.yMin, xMid, yMid));
    this.branches.push(new QuadTree(xMid, this.yMin, this.xMax, yMid));
    this.branches.push(new QuadTree(this.xMin, yMid, xMid, this.yMax));
    this.branches.push(new QuadTree(xMid, yMid, this.xMax, this.yMax));
  };

  QuadTree.prototype.add = function (obj) {
    if (typeof this.branches === "undefined") this.split();
    
    var i, branch, branches = this.branches;
    for (i = 0; i < branches.length; i += 1) {
      branch = branches[i];
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
    var neighbors = this.objects.filter(function (thisObj) {
      return obj !== thisObj;
    });

    if (typeof this.branches === "undefined") return neighbors;

    this.branches.forEach( function (branch) {
      if (branch.canContain(obj)) {
        neighbors = neighbors.concat(branch.findNeighbors(obj));
      }
    });

    return neighbors;
  };
})();
