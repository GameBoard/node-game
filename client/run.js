var Person = require("./person.js");
var Item = require("./item.js");
var CanvasView = require("./canvas_view.js");


window.onload = function(){

  var canvas = document.getElementById('playground');
  var canvasView = new CanvasView(canvas);
  var box = new Item();
  var person = new Person();
  var person2 = new Person({position:{x:30,y:30}});
  person.addView(canvasView);
  person2.addView(canvasView);
  box.addView(canvasView);
  canvasView.render();//inital drawing


  window.person = person;
  window.box = box;
  window.canvasView = canvasView;
  
}