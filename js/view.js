(function () {
  if (typeof Ceres === "undefined") {
    window.Ceres = {};
  }

  var View = Ceres.View = function (canvas) {
    this.canvas = canvas;
    this.updateSize();
  };

  View.prototype.updateSize = function () {
    var parentContainer = this.canvas.parentNode;

    this.canvas.height = parentContainer.clientHeight;
    this.canvas.width = parentContainer.clientWidth;
  };

  View.prototype.getHeight = function () {
    return this.canvas.height;
  };

  View.prototype.getWidth = function () {
    return this.canvas.width;
  };

  View.prototype.render = function (obj) {
    var ctx = this.canvas.getContext('2d'),
        firstPoint = obj.points[0];

    ctx.fillStyle = obj.fill;
    ctx.strokeStyle = obj.stroke;
    ctx.beginPath();

    ctx.moveTo.apply(ctx, firstPoint);
    obj.points.slice(1).forEach(function (point) {
      ctx.lineTo.apply(ctx, point);
    })
    ctx.lineTo.apply(ctx, firstPoint);
    
    if (obj.fill) ctx.fill();
    if (obj.stroke) ctx.stroke();
    ctx.closePath();
  };
})();
