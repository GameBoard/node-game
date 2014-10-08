var lib = require('./lib');
var drawable = require('./drawable');

var Item = function(position){
  this.position = position || {x:0, y:0}
  this.imageType = 'square';
  this.weight = 3;
}

Item.prototype = {
}

lib.extend(Item.prototype, drawable)

module.exports = Item