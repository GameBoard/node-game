walker = {
  walk: function(options){
    var options = options || {};
    stride = this.strideDistance();
    var change = {};
    switch (options.direction){
      case 'up': //38://up
        change = {x:0,y: -stride};
        break;
      case 'down'://40://down
        change = {x:0,y: stride};
        break;
      case 'left'://37://left
        change = {x:-stride,y: 0};
        break;
      case 'right'://39://right
        change = {x:stride,y: 0} ;
    }
    this.movePosition(change);
  },

  strideDistance: function(){
    var speed = this.speed || 1;
    var weight = (this.totalWeight && this.totalWeight()) || this.weight || 0;
    var moveAmount = Math.max(speed - weight, 0);
    return moveAmount;
  }


}

module.exports = walker;