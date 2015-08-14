(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  } 
  
  Array.prototype.plus = function (otherArr) {
    return this.map( function (el, idx) {
      return el + otherArr[idx];
    });
  };

  Array.prototype.minus = function (otherArr) {
    return this.map(function (el, idx) {
      return el - otherArr[idx];
    });
  };

  Array.prototype.norm = function () {
    return Math.sqrt(this.dot(this));
  };

  Array.prototype.theta = function () {
    return Math.atan2(this[1], this[0]);
  };

  Array.prototype.dot = function (otherArr) {
    var i, sum = 0;
    for (i = 0; i < this.length; i += 1) {
      sum += this[i] * otherArr[i];
    };

    return sum;
  };

  Array.prototype.proj = function (otherArr) {
    return this.dot(otherArr) / (otherArr.norm())
  };

  Array.prototype.overlaps = function(interval) {
    return this.contains(interval[0]) || 
           this.contains(interval[1]) ||
           interval.contains(this[0]) ||
           interval.contains(this[1]);
  };

  Array.prototype.overlap = function(interval) {
    if (this.overlaps(interval)) {
      return [
        Math.max(this[0], interval[0]),
        Math.min(this[1], interval[1])
      ]
    };
  };

  Array.prototype.contains = function (point) {
    return (this[0] <= point && point <= this[1]);
  };

  Array.prototype.min = function () {
    return Math.min.apply(null, this);
  };

  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  Array.prototype.sampleWithinBounds = function () {
    var diff;

    return this[0].map(function (min, idx) {
      diff = this[1][idx] - min;

      return min + Math.random() * diff;
    }.bind(this));
  };

  Array.prototype.remove = function (el) {
    var idx = this.indexOf(el);
    if (idx === -1) return;

    this.splice(idx, 1);
  };

  Array.prototype.clone = function () {
    return this.slice(0);
  };

  Object.prototype.inheritsFrom = function (parentObject) {
    var Surrogate = function () {};
    Surrogate.prototype = parentObject.prototype;
    this.prototype = new Surrogate();
  };
})();
