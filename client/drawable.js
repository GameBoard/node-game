var drawable = {

  updateView: function(){
    if(this.view){
      this.view.render();
    }
  },
  addView: function(view){
    this.view = view;
  }
}

module.exports = drawable