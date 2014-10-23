var lib = require('../lib');
var drawable = require('../modules/drawable');

var Person = function(options){
  var options = options || {}
  this.name = options.name || "default";
  this.position = options.position || {x:20, y:20};
  this.imageType = 'circle';
  this.speed = options.speed || 5;
  this.controllable = true;
}

var proto = {
  //person should be a learner only thing inherit to all people

  learnSkills: function(skillModule){
    lib.extend(this, skillModule)
    this.skills.concat(skillModule.skills)
  },

  skills: {
    "PickUp": "pickUpFirstCloseItem",
    "drop": "dropAll",
  },


  //lifter
  moveAmount: function(){
    var moveAmount = this.speed;
    if(this.item && this.item.weight){
      moveAmount = moveAmount - this.item.weight
    }
    return moveAmount;
  },





}

lib.extend(Person.prototype, drawable)
lib.extend(Person.prototype, proto)

module.exports = Person