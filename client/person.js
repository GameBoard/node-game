var lib = require('./lib');
var drawable = require('./drawable');

var Person = function(name){
  this.name = name || "default";
  this.position = {x:20, y:20};
  this.imageType = 'circle';
}

Person.prototype = {
  talk: function(message){
    console.log('hello my name is', this.name);
  },

  moveItem: function(item, newPosition){
    item.changePosition(newPosition);
  }
}

lib.extend(Person.prototype, drawable)

module.exports = Person