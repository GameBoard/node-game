var CanvasView = function(canvas){
  this.canvas = canvas;
  this.drawables = [];
  this.controllables = [];
  canvas.onclick = this.click;
  // canvas.onkeydown = this.keyPress;
  this.keyPress = this.keyPress.bind(this);
  window.addEventListener('keydown',this.keyPress,false);
  
}

CanvasView.prototype = {
  addDrawable: function(drawable){
    this.drawables.push(drawable);
    if (drawable.controllable){
      this.controllables.push(drawable);
    }
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
        ctx.beginPath();
        ctx.arc(item.position.x,item.position.y,5,0,2*Math.PI);
        ctx.fill();
        // ctx.fillRect(item.position.x, item.position.y, 20, 20);
      }
    }   
  },

  findFocusedControllable:function(){
    return this.focusedControllable || this.controllables[0]
  },


  focusOn: function(controllable){
    this.focusedControllable = controllable;
  },

  click: function(ev){
    console.log('clicked')
  },

  keyPress: function(ev){
    var target = this.findFocusedControllable();
    var moveAmount = target.moveAmount();
    if (target){
      var adjust = {x:0,y:0}
      switch (ev.keyCode){
        case 38://up
          adjust = {x:0,y: -moveAmount}
          break;
        case 40://down
          adjust = {x:0,y: moveAmount}
          break;
        case 37://left
          adjust = {x:-moveAmount,y: 0}
          break;
        case 39://right
          adjust = {x:moveAmount,y: 0}
          break;
        case 13:
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
        case 17:
          if (this.controllables.length > 1){
            console.log('have more than one')
            var index = this.controllables.indexOf(this.focusedControllable);
            console.log('index', index)
            if (index === this.controllables.length -1){
              this.focusedControllable = this.controllables[0];
            }
            else{
              this.focusedControllable = this.controllables[index+1];
            }
          }
          break;
      }
      // if( adjust.x != 0 && adjust.y != 0 ){
        var x = target.position.x + adjust.x;
        var y = target.position.y + adjust.y;
        target.changePosition({x:x,y:y});
      // }
    }
  }
}

module.exports = CanvasView;