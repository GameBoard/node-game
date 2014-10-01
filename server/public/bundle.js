(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CanvasView = function(canvas){
  this.canvas = canvas;
  this.drawables = [];
}

CanvasView.prototype = {
  addDrawable: function(drawable){
    this.drawables.push(drawable);
  },

  render: function(){
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgb(200,0,0)";
    numDrawables = this.drawables.length;
    for(var i=0; i<numDrawables; i++){
      var item = this.drawables[i];
      ctx.fillRect(item.position.x, item.position.y, 10, 10);
    }
    
  }
}

module.exports = CanvasView;
},{}],2:[function(require,module,exports){
var Item = function(weight, position){
  this.weight = weight || 0,
  this.position = position || {x:0, y:0}
}

Item.prototype = {
  changePosition: function(newPosition){
    this.position = newPosition;
    this.updateView();
  },
  updateView: function(){
    if(this.view){
      this.view.render();
    }
  },
  addView: function(view){
    this.view = view;
  }
}

module.exports  = Item
},{}],3:[function(require,module,exports){
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
},{"./canvas_view.js":1,"./drawable.js":2}]},{},[3]);
