var FocusedObjectView = function(el){
  this.mainEl = el;
  console.log('el', el)
  this.headerEl = el.querySelector("#header");
  this.skillsEl = el.querySelector("#skills");
  this.keyPress = this.keyPress.bind(this);
  this.skillClicked = this.skillClicked.bind(this);
  window.addEventListener('keydown',this.keyPress,false);

}

FocusedObjectView.prototype = {
  setBoard: function(board){
    this.board = board;
  },
  render: function(){
    var focused =  this.board.findFocusedControllable();
    this.headerEl.innerHTML = focused.name;
    this.skillsEl.innerHTML = "";
    for (skill in focused.skills){
      var skillItem = window.document.createElement('li');
      var skillButton = window.document.createElement('a');
      // skillButton.onClick = this.skillClicked;
      skillButton.addEventListener('click',this.skillClicked,false);
      skillButton.innerHTML = skill;
      console.log('this', this);
      skillItem.appendChild(skillButton);
      this.skillsEl.appendChild(skillItem);
    }
  },

  skillClicked: function(el){
    console.log('skill was clicked this', this);
    console.log('element', el);
    var focused =  this.board.findFocusedControllable();
    var methodName = focused.skills[el.target.innerHTML];
    console.log('methodName', methodName);
    focused[methodName]();
  },

  keyPress: function(ev){
    console.log('key press', ev.keyCode)
    var target = this.board.findFocusedControllable();
    console.log('target', target)
    if (target){
      switch (ev.keyCode){
        case 87: //38://up
          target.walk({direction:'up'})
          break;
        case 83://40://down
          target.walk({direction:'down'})
          break;
        case 65://37://left
          target.walk({direction:'left'})
          break;
        case 68://39://right
          target.walk({direction:'right'})
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