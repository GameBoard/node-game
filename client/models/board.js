var Board = function(){
  this.drawables = [];
  this.controllables = [];
}

Board.prototype = {
  setView: function(view, viewName){
    nameOfView = viewName || 'view'
    this[nameOfView] = view
    view.setBoard(this);
  },

  updateView: function(viewName){
    nameOfView = viewName || 'view'
    if (this[nameOfView]) {
      this[nameOfView].render();
    }
  },

  addDrawable: function(drawable){
    this.drawables.push(drawable);
    if (drawable.controllable){
      this.controllables.push(drawable);
    }
  },

  focusOn: function(controllable){
    this.focusedControllable = controllable;
    this.updateView('focusedView');
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
        this.focusOn(this.controllables[0]);
      }
      else{
        this.focusOn(this.controllables[index+1]);
      }
    }
  }
}

module.exports = Board