var Item = function(weight, position){
  this.weight = weight || 0,
  this.position = position || {x:0, y:0}
}

Item.prototype = {
  changePosition: function(newPosition){
    this.position = newPosition;
    this.updateView();
  },
  updateView: function(){
    if(this.view){
      this.view.render();
    }
  },
  addView: function(view){
    this.view = view;
  }
}

module.exports  = Item