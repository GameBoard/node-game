// var Person = require("./person.js");
var Drawable= require("./drawable.js");
var CanvasView = require("./canvas_view.js");




window.onload = function(){

  var canvas = document.getElementById('playground');
  var canvasView = new CanvasView(canvas);
  var box = new Drawable();
  box.addView(canvasView);
  canvasView.addDrawable(box);
  canvasView.render();//inital drawing

  window.box = box;
  
}