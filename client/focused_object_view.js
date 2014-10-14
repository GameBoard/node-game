var FocusedObjectView = function(el){
  this.mainEl = el;
  console.log('el', el)
  this.headerEl = el.querySelector("#header");
  this.skillsEl = el.querySelector("#skills");
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
}
module.exports = FocusedObjectView