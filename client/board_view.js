var BoardView = function(canvas, board){
  this.canvas = canvas;
  this.board = board;

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
    var target = this.board.findFocusedControllable();
    var moveAmount = target.moveAmount();
    if (target){
      switch (ev.keyCode){
        case 38://up
          target.movePosition({x:0,y: -moveAmount})
          break;
        case 40://down
          target.movePosition({x:0,y: moveAmount})
          break;
        case 37://left
          target.movePosition({x:-moveAmount,y: 0})
          break;
        case 39://right
          target.movePosition({x:moveAmount,y: 0})
          break;
        case 13://enter
          if (target.item){
            target.dropAll()
          }
          else {
            //TODO move to person
            item = target.findItemsInReach(this.board.drawables)[0]
            if(item){
              target.pickUpItem(item);
            }
          }
          break;
        case 17://shift
          //move this to board
          // this.board.changeControllable()
          if (this.board.controllables.length > 1){
            console.log('have more than one')
            var index = this.board.controllables.indexOf(this.board.focusedControllable);
            console.log('index', index)
            if (index === this.board.controllables.length -1){
              this.board.focusedControllable = this.board.controllables[0];
            }
            else{
              this.board.focusedControllable = this.board.controllables[index+1];
            }
          }
          break;
      }
    }
  }
}

module.exports = BoardView;