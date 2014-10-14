var FocusedObjectView = function(el){
  this.el = el;
}

FocusedObjectView.prototype = {
  setBoard: function(board){
    this.board = board;
  },
  render: function(){
    this.el.innerHTML = this.board.findFocusedControllable().name;
  },
}
module.exports = FocusedObjectView