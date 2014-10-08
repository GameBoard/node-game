var lib = require('./lib');
var drawable = require('./drawable');

var Person = function(options){
  var options = options || {}
  this.name = options.name || "default";
  this.position = options.position || {x:20, y:20};
  this.imageType = 'circle';
  this.speed = options.speed || 5;
  this.controllable = true;
}

var proto = {
  moveAmount: function(){
    var moveAmount = this.speed;
    if(this.item && this.item.weight){
      moveAmount = moveAmount - this.item.weight
    }
    return moveAmount;
  },

  talk: function(message){
    console.log('hello my name is', this.name);
  },

  pickUpItem: function(item){
    if(this.itemInReach(item)){
      this.item = item;
    }
  },

  changePosition: function(newPosition){
    this.position = newPosition;
    if(this.item){
      this.item.position = newPosition;
    }
    this.updateView();
  },

  distanceFromSelf:function(item){
    var distance = lib.distance(this.position,item.position);
    return distance;
  },

  itemInReach:function(item){
    return this.distanceFromSelf(item) <= 20;
  },

  findItemsInReach: function(items){
    var inReach = [];
    items.forEach(function(item){
      if(item !== this && this.itemInReach(item)){
        inReach.push(item)
      }
    }, this);
    return inReach;
  },

  dropAll: function(){
    this.item = null;
  }
}

lib.extend(Person.prototype, drawable)
lib.extend(Person.prototype, proto)

module.exports = Person