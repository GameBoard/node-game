var lib = require('../lib');
var plotable = require('../modules/plotable');

var Item = function(position){
  this.position = position || {x:30, y:30}
  this.imageType = 'square';
  this.weight = 1;
}

Item.prototype = {
}

lib.extend(Item.prototype, plotable)

module.exports = Item