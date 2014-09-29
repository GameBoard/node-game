var Person = function(name){
  this.name = name || "default";
}

Person.prototype = {
  talk: function(message){
    console.log('hello my name is', this.name);
  },
}

module.exports = Person