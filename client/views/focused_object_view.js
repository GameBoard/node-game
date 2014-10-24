var FocusedObjectView = function(el){
  this.mainEl = el;
  this.headerEl = el.querySelector("#header");
  this.skillsEl = el.querySelector("#skills");
  this.skillClicked = this.skillClicked.bind(this);
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
  }
}
module.exports = FocusedObjectView