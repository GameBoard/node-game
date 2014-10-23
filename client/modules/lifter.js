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
    items.forEach(function(item){
      if(item !== this && this.itemInReach(item)){
        inReach.push(item)
      }
    }, this);
    return inReach;
  },

  pickUpItem: function(item){
    if(this.itemInReach(item)){
      this.item = item;
    }
  },

  dropAll: function(){
    this.item = null;
  },

  pickUpFirstCloseItem:function(){
    var firstCloseItem = this.findItemsInReach(this.board.drawables)[0];
    firstCloseItem && this.pickUpItem(firstCloseItem);
  },


}

module.exports = lifter