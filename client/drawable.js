var Drawable = function(position){
  this.position = position || {x:0, y:0}
}

Drawable.prototype = {

  updateView: function(){
    if(this.view){
      this.view.render();
    }
  },
  addView: function(view){
    this.view = view;
  }
}

module.exports  = Drawable