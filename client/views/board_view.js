var BoardView = function(options){
  var options = options || {};
  this.canvas = options.canvas;
  this.board = options.board;
  // Here set canvas size based on board model

  this.keyPress = this.keyPress.bind(this);
  this.render = this.render.bind(this);
  window.addEventListener('keydown',this.keyPress,false);
  this.boundary = 5;
 
  this.image = new Image();
  this.image.src = 'dudenew.png';
  this.image.onload = this.render;
  this.x = 0;
  this.y = 0;
  this.count = 0;
}

BoardView.prototype = {

  render: function(){
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgb(200,0,0)";
    numPlotables = this.board.plotables.length;
    for(var i=0; i<numPlotables; i++){
      var item = this.board.plotables[i];
      switch (item.imageType){
        case 'square':
          ctx.fillRect(item.position.x, item.position.y, 10, 10);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(item.position.x,item.position.y,5,0,2*Math.PI);
          ctx.fill();
          break;
        case 'rec':
          ctx.fillRect(item.position.x, item.position.y, 20, 4);
          break;
      }
    }
    this.count++;
    if (this.count % 10 === 0){
      this.x++;
      if (this.x===4){
        this.x=0;
        this.y++;   
        if(this.y===4){
          this.y=0;
        }
      }
    }

    ctx.drawImage(this.image,(50*this.x),(50*this.y),50,50,0,0,50,50);
    window.requestAnimationFrame(this.render);   
  },

  keyPress: function(ev){
    var target = this.board.findFocusedControllable();
    switch (ev.keyCode){
      case 17://cttl
        this.board.focusOnNext()
        break;
      case 87: //38://up
        target.walk && target.walk({direction:'up'})
        break;
      case 83://40://down
        target.walk && target.walk({direction:'down'})
        break;
      case 65://37://left
        target.walk && target.walk({direction:'left'})
        break;
      case 68://39://right
        target.walk && target.walk({direction:'right'})
        break;     
    }
  }
}

module.exports = BoardView;