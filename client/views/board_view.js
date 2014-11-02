var Sprite = require('./sprite')

var BoardView = function(options){
  var options = options || {};
  this.canvas = options.canvas;
  this.board = options.board;
  this.ctx = this.canvas.getContext("2d");
  // Here set canvas size based on board model

  this.keyPress = this.keyPress.bind(this);
  this.render = this.render.bind(this);
  window.addEventListener('keydown',this.keyPress,false);
  this.boundary = 5;

  this.sprites = [];

  console.log('')

  this.sprites.push(new Sprite({
    src:'dudenew.png', 
    onImageLoad: this.render, 
    ctx: this.ctx,
    xSections: 4,
    ySections: 4,
    xSize: 50,
    ySize: 50,
    refreshRate: 10,
    model: this.board.plotables[0]
  })
  );
 
  this.count = 0;
}

BoardView.prototype = {

  render: function(){
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgb(200,0,0)";
    this.sprites.forEach(
      function(sprite){
        sprite.draw(this.count)
      }, this
    );
    numPlotables = this.board.plotables.length;
    // for(var i=0; i<numPlotables; i++){
    //   var item = this.board.plotables[i];
    //   switch (item.imageType){
    //     case 'square':
    //       this.ctx.fillRect(item.position.x, item.position.y, 10, 10);
    //       break;
    //     case 'circle':
    //       this.ctx.beginPath();
    //       this.ctx.arc(item.position.x,item.position.y,5,0,2*Math.PI);
    //       this.ctx.fill();
    //       break;
    //     case 'rec':
    //       this.ctx.fillRect(item.position.x, item.position.y, 20, 4);
    //       break;
    //   }
    // }
    this.count++;


    // personSprite.draw(this.count);

    
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