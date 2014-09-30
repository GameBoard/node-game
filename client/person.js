var Person = function(name){
  this.name = name || "default";
  this.position = {x:0, y:0};
}

Person.prototype = {
  talk: function(message){
    console.log('hello my name is', this.name);
  },

  moveItem: function(item, newPosition){
    item.changePosition(newPosition);
  }
}

module.exports = Person