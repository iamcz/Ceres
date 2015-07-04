(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  } 
  
  Array.prototype.plus = function (otherArr) {
    return this.map( function (el, idx) {
      return el + otherArr[idx];
    });
  };

  Object.prototype.inheritsFrom = function (parentObject) {
    var Surrogate = function () {};
    Surrogate.prototype = parentObject.prototype;
    this.prototype = new Surrogate();
  };
})();
