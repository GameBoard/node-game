var CanvasView = function(canvas){
  this.canvas = canvas;
  this.drawables = [];
  canvas.onclick = this.click;
  // canvas.onkeydown = this.keyPress;
  this.keyPress = this.keyPress.bind(this);
  window.addEventListener('keydown',this.keyPress,false);
  
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
      if (item.imageType === 'square'){
        ctx.fillRect(item.position.x, item.position.y, 10, 10);
      }
      else if(item.imageType === 'circle'){
        console.log('trying to draw circle');
        ctx.beginPath();
        ctx.arc(item.position.x,item.position.y,5,0,2*Math.PI);
        ctx.fill();
        // ctx.fillRect(item.position.x, item.position.y, 20, 20);
      }
    }   
  },

  focusOnDrawable: function(drawable){
    this.focusedDrawable = drawable;
  },

  click: function(ev){
    console.log('clicked')
  },

  keyPress: function(ev){
    var target = this.focusedDrawable
    if (target){
      var adjust = {x:0,y:0}
      console.log('key pressed', ev.keyCode)
      switch (ev.keyCode){
        case 38://up
          console.log('up');
          adjust = {x:0,y: -5}
          break;
        case 40://down
          console.log('down');
          adjust = {x:0,y: 5}
          break;
        case 37://left
          console.log('left');
          adjust = {x:-5,y: 0}
          break;
        case 39://right
          console.log('right');
          adjust = {x:5,y: 0}
          break;
        case 13:
          console.log('enter')
          if (target.item){
            target.dropAll()
          }
          else {
            item = target.findItemsInReach(this.drawables)[0]
            if(item){
              target.pickUpItem(item);
            }
          }
          break;
      }
      var x = target.position.x + adjust.x;
      var y = target.position.y + adjust.y;
      target.changePosition({x:x,y:y});
    }
  }
}

module.exports = CanvasView;