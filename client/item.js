var lib = require('./lib');
var Drawable = require('./drawable');

var Item = function(){

}

Item.prototype = {
  changePosition: function(newPosition){
    this.position = newPosition;
    this.updateView();
  },
}

lib.extend(Item.prototype, Drawable.prototype)

module.exports = Item