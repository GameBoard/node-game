var BoardView = function(canvas){
  this.canvas = canvas;
  this.keyPress = this.keyPress.bind(this);
  window.addEventListener('keydown',this.keyPress,false);
  
  
}

BoardView.prototype = {

  setBoard: function(board){
    this.board = board;
  },

  render: function(){
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgb(200,0,0)";
    numDrawables = this.board.drawables.length;
    for(var i=0; i<numDrawables; i++){
      var item = this.board.drawables[i];
      if (item.imageType === 'square'){
        ctx.fillRect(item.position.x, item.position.y, 10, 10);
      }
      else if(item.imageType === 'circle'){
        ctx.beginPath();
        ctx.arc(item.position.x,item.position.y,5,0,2*Math.PI);
        ctx.fill();
      }
    }   
  },

  keyPress: function(ev){
    switch (ev.keyCode){
      case 17://cttl
        this.board.focusOnNext()
        break;
    }
  }
}

module.exports = BoardView;