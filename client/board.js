var Board = function(){
  this.drawables = [];
  this.controllables = [];
}

Board.prototype = {
  setView: function(view){
    this.view = view;
    view.setBoard(this);
  },

  updateView: function(view){
    this.view.render();
  },

  addDrawable: function(drawable){
    this.drawables.push(drawable);
    if (drawable.controllable){
      this.controllables.push(drawable);
    }
  },

  focusOn: function(controllable){
    this.focusedControllable = controllable;
  },

  findFocusedControllable:function(){
    return this.focusedControllable || this.controllables[0]
  },

  moveFocused:function(positionChange){
    this.findFocusedControllable().movePosition(positionChange);
  }
}

module.exports = Board