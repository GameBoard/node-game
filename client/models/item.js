var lib = require('../lib');
var plotable = require('../modules/plotable');

var Item = function(position){
  this.position = position || {x:0, y:0}
  this.imageType = 'square';
  this.weight = 3;
}

Item.prototype = {
}

lib.extend(Item.prototype, plotable)

module.exports = Item