var CanvasView = function(canvas){
  this.canvas = canvas;
  this.drawables = [];
}

CanvasView.prototype = {
  addDrawable: function(drawable){
    this.drawables.push(drawable);
  },

  render: function(){
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgb(200,0,0)";
    numDrawables = this.drawables.length;
    for(var i=0; i<numDrawables; i++){
      var item = this.drawables[i];
      ctx.fillRect(item.position.x, item.position.y, 10, 10);
    }
    
  }
}

module.exports = CanvasView;