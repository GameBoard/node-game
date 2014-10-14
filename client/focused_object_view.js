var FocusedObjectView = function(el){
  this.mainEl = el;
  console.log('el', el)
  this.headerEl = el.querySelector("#header");
  this.skillsEl = el.querySelector("#skills");
  this.keyPress = this.keyPress.bind(this);
  window.addEventListener('keydown',this.keyPress,false);

}

FocusedObjectView.prototype = {
  setBoard: function(board){
    this.board = board;
  },
  render: function(){
    var focused =  this.board.findFocusedControllable()
    this.headerEl.innerHTML = focused.name
    var skills = []
    for (skill in focused.skills){
      skills.push(skill);
    }
    this.skillsEl.innerHTML = skills.join();
  },

  keyPress: function(ev){
    var target = this.board.findFocusedControllable();
    var moveAmount = target.moveAmount();
    if (target){
      switch (ev.keyCode){
        case 38://up
          target.movePosition({x:0,y: -moveAmount})
          break;
        case 40://down
          target.movePosition({x:0,y: moveAmount})
          break;
        case 37://left
          target.movePosition({x:-moveAmount,y: 0})
          break;
        case 39://right
          target.movePosition({x:moveAmount,y: 0})
          break;
        case 13://enter
          if (target.item){
            target.dropAll()
          }
          else {
            target.pickUpFirstCloseItem()
          }
          break;
        // case 17://cttl
        //   this.board.focusOnNext()
        //   break;
      }
    }
  }
}
module.exports = FocusedObjectView