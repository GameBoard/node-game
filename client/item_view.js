var ItemView = function(item, canvas){
  this.item = item;
  this.canvas = canvas;
  item.addView(this);
}

ItemView.prototype = {
  render: function(){
    console.log('rendering');
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (this.item.position.x, this.item.position.y, 10, 10);
  }
}

module.exports = ItemView;