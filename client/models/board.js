var Board = function(){
  this.plotables = [];
  this.controllables = [];
  this.width = 800 // make board view set canvas sizing based on this
  this.height = 400
}

Board.prototype = {
  addPlotable: function(plotable){
    this.plotables.push(plotable);
    if (plotable.controllable){
      this.controllables.push(plotable);
    }
  },

  focusOn: function(controllable){
    this.focusedControllable = controllable;
    var event = new Event('focused-changed');
    window.dispatchEvent(event);
    //trigger event that controllable changed
  },

  findFocusedControllable:function(){
    return this.focusedControllable || this.controllables[0]
  },

  moveFocused:function(positionChange){
    this.findFocusedControllable().movePosition(positionChange);
  },

  focusOnNext:function(){
    if (this.controllables.length > 1){
      var index = this.controllables.indexOf(this.findFocusedControllable());
      if (index === this.controllables.length -1){
        this.focusOn(this.controllables[0]);
      }
      else{
        this.focusOn(this.controllables[index+1]);
      }
    }
  }
}

module.exports = Board