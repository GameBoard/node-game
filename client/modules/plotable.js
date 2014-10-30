var plotable = {
  joinBoard: function(board){
    this.board = board;
    board.addPlotable(this);
  },
  changePosition: function(newPosition){
    if (this.onBoard(newPosition)){
      this.position = newPosition;
      if(this.item){
        this.item.position = newPosition;
      }
    }
  },
  movePosition: function(positionChange){
    var x = this.position.x + positionChange.x
    var y = this.position.y + positionChange.y
    this.changePosition({x:x, y:y})
  },

  onBoard: function(position){
    onBoard = position.x > 5 && position.x < (this.board.width - 5) && position.y > 5 && position.y < (this.board.height -5);
    return onBoard;
  }
}

module.exports = plotable