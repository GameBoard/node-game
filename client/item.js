var lib = require('./lib');
var drawable = require('./drawable');

var Item = function(position){
  this.position = position || {x:0, y:0}
}

Item.prototype = {
  changePosition: function(newPosition){
    this.position = newPosition;
    this.updateView();
  },
}

lib.extend(Item.prototype, drawable)

module.exports = Item