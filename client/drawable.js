var drawable = {
  // mixing this in allow to be rendered by canvas view
  // objects should describe a position, 
  // an image for which to be drawn TODO
  // also possibly a pattern so they can eg walk TODO 
  updateView: function(){
    if(this.view){
      this.view.render();
    }
  },
  addView: function(view){
    this.view = view;
    view.addDrawable(this);
  },
  changePosition: function(newPosition){
    this.position = newPosition;
    this.updateView();
  }
}

module.exports = drawable