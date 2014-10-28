var lib = require('../lib')

var lifter = {
  distanceFromSelf:function(item){
    var distance = lib.distance(this.position,item.position);
    return distance;
  },

  itemInReach:function(item){
    return this.distanceFromSelf(item) <= this.reach;
  },

  itemLiftable:function(item){
    return !item.unliftable;
  },

  findItemsInReach: function(items){
    var inReach = [];
    items.forEach(function(item){
      if(item !== this  && this.itemInReach(item)){
        inReach.push(item)
      }
    }, this);
    return inReach;
  },

  pickUpItem: function(item){
    if(this.itemInReach(item) && this.itemLiftable(item)){
      this.item = item;
    }
  },

  totalWeight: function(){
    sumWeight = this.weight;
    if (this.item) {
      sumWeight += this.item.weight
    }
    return (sumWeight);
  },

  dropAll: function(){
    this.item = null;
  },

  pickUpFirstCloseItem:function(){
    var firstCloseItem = this.findItemsInReach(this.board.plotables)[0];
    firstCloseItem && this.pickUpItem(firstCloseItem);
  },

  skills: {
    "PickUp": "pickUpFirstCloseItem",
    "Drop": "dropAll",
  },
}

module.exports = lifter