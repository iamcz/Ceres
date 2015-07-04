(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  View = Ceres.View = function (canvas) {
    this.canvas = canvas;
    this.updateSize();
  }

  View.prototype.updateSize = function () {
    var parentContainer = this.canvas.parentNode;

    this.canvas.height = parentContainer.clientHeight;
    this.canvas.width = parentContainer.clientWidth;
  };
})();
