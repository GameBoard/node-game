var lib = require('../lib')

var lifter = {
  distanceFromSelf:function(item){
    var distance = lib.distance(this.position,item.position);
    return distance;
  },

  itemInReach:function(item){
    return this.distanceFromSelf(item) <= this.reach;
  },

  findItemsInReach: function(items){
    var inReach = [];
    console.log('looking through items', items)
    items.forEach(function(item){
      if(item !== this && this.itemInReach(item)){
        inReach.push(item)
      }
    }, this);
    console.log('itesm in reach returning', inReach)
    return inReach;
  },

  pickUpItem: function(item){
    if(this.itemInReach(item)){
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