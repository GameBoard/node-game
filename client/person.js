var lib = require('./lib');
var drawable = require('./drawable');

var Person = function(options){
  var options = options || {}
  this.name = options.name || "default";
  this.position = options.position || {x:20, y:20};
  this.imageType = 'circle';
}

var proto = {
  talk: function(message){
    console.log('hello my name is', this.name);
  },

  pickUpItem: function(item){
    var distance = lib.distance(this.position,item.position);
    if(distance <= 20){
      this.item = item;
    }
  },

  changePosition: function(newPosition){
    this.position = newPosition;
    if(this.item){
      this.item.position = newPosition;
    }
    this.updateView();
  }
}

lib.extend(Person.prototype, drawable)
lib.extend(Person.prototype, proto)

module.exports = Person