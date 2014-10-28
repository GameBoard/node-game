var lib = require('../lib')
var plotable = require('../modules/plotable')

var Door = function(options){
  var options = options || {};
  this.position = options.position || {x:0,y:0};
  this.imageType = 'rec';
  this.unliftable = true;

}

lib.extend(Door.prototype, plotable)

module.exports = Door;