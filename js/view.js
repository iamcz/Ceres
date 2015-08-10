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

  View.prototype.getSize = function () {
    return [
      this.canvas.width,
      this.canvas.height
    ];
  };

  View.prototype.clear = function () {
    var bounds = this.getSize(), ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, bounds[0], bounds[1]);
  };

  View.prototype.render = function (obj) {
    this.draw(obj)
    var prewrap = obj.prewrap();
    if (prewrap) {
      prewrap.fill = obj.fill;
      prewrap.stroke = obj.stroke;
      this.draw(prewrap);
    }
  };

  View.prototype.draw = function (obj) {
    if (obj.fill === undefined) {
      debugger;
    }
    var ctx = this.canvas.getContext('2d'),
        firstPoint = obj.points[0];

    ctx.fillStyle = obj.fill;
    ctx.strokeStyle = obj.stroke;
    ctx.beginPath();

    ctx.moveTo.apply(ctx, firstPoint);
    obj.points.slice(1).forEach(function (point) {
      ctx.lineTo.apply(ctx, point);
    });
    ctx.closePath();
    
    if (obj.fill) ctx.fill();
    if (obj.stroke) ctx.stroke();
  }


})();
