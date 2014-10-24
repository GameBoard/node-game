var lib = require('../lib');
var plotable = require('../modules/plotable');

var Person = function(options){
  var options = options || {}
  this.name = options.name || "default";
  this.position = options.position || {x:20, y:20};
  this.imageType = 'circle';
  this.speed = options.speed || 10;
  this.controllable = true;
  this.reach = options.reach || 20;
  this.weight = options.weight || 4;
}

var proto = {
  //person should be a learner only thing inherit to all people
  learnSkills: function(skillModule){
    var skills = this.skills || {}
    lib.extend(this, skillModule)
    this.skills = lib.extend(skills, skillModule.skills)
  },
}

lib.extend(Person.prototype, proto)
lib.extend(Person.prototype, plotable)

module.exports = Person