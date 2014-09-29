var Person = function(name){
  this.name = name || "default";
}

Person.prototype = {
  talk: function(message){
    console.log('hello my name is', this.name);
  },

  moveItem: function(item, newPosition){
    item.position = newPosition;
  }
}

module.exports = Person