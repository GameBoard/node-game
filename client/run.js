var Person = require("./person.js");
var Item = require("./item.js");
var CanvasView = require("./canvas_view.js");


window.onload = function(){

  var canvas = document.getElementById('playground');
  var canvasView = new CanvasView(canvas);
  var box = new Item();
  var person = new Person();
  person.addView(canvasView);
  box.addView(canvasView);
  canvasView.focusOnDrawable(person);
  canvasView.render();//inital drawing


  window.person = person;
  window.box = box;
  window.canvasView = canvasView;
  
}