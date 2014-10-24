var BoardView = function(canvas){
  this.canvas = canvas;
  this.keyPress = this.keyPress.bind(this);
  window.addEventListener('keydown',this.keyPress,false);
  this.boundary = 5;
}

BoardView.prototype = {

  setBoard: function(board){
    this.board = board;
  },

  render: function(){
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgb(200,0,0)";
    numPlotables = this.board.plotables.length;
    for(var i=0; i<numPlotables; i++){
      var item = this.board.plotables[i];
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
    var target = this.board.findFocusedControllable();
    switch (ev.keyCode){
      case 17://cttl
        this.board.focusOnNext()
        break;
      case 87: //38://up
        target.walk({direction:'up'})
        break;
      case 83://40://down
        target.walk({direction:'down'})
        break;
      case 65://37://left
        target.walk({direction:'left'})
        break;
      case 68://39://right
        target.walk({direction:'right'})
        break;     
    }
  }
}

module.exports = BoardView;