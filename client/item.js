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
    console.log('update view');
  }
}

module.exports  = Item