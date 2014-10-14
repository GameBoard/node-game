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
  },

  focusOnNext:function(){
    if (this.controllables.length > 1){
      var index = this.controllables.indexOf(this.findFocusedControllable());
      if (index === this.controllables.length -1){
        this.focusedControllable = this.controllables[0];
      }
      else{
        this.focusedControllable = this.controllables[index+1];
      }
    }
  }
}

module.exports = Board