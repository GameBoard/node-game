var Person = function(name){
  this.name = name || "default";
}

Person.prototype = {
  talk: function(){
    console.log('Howdy my name is' + this.name);
  }
}


module.exports = Person