var drawable = {
  // mixing this in allow to added to a board and change position
  // an image for which to be drawn TODO
  // also possibly a pattern so they can eg walk TODO 
  updateBoard: function(){
    if(this.board){
      this.board.updateView();
    }
  },
  joinBoard: function(board){
    this.board = board;
    board.addDrawable(this);
  },
  changePosition: function(newPosition){
    this.position = newPosition;
    this.updateBoard();
  },
  movePosition: function(newPosition){
    var x = this.position.x + newPosition.x
    var y = this.position.y + newPosition.y
    this.changePosition({x:x, y:y})
    this.updateBoard();
  },
}

module.exports = drawable