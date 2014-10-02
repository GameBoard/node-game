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
      if (item.imageType === 'square'){
        ctx.fillRect(item.position.x, item.position.y, 10, 10);
      }
      else if(item.imageType === 'circle'){
        console.log('trying to draw circle');
        ctx.beginPath();
        ctx.arc(item.position.x,item.position.y,5,0,2*Math.PI);
        ctx.fill();
        // ctx.fillRect(item.position.x, item.position.y, 20, 20);
      }
    }   
  }
}

module.exports = CanvasView;
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
var lib = require('./lib');
var drawable = require('./drawable');

var Item = function(position){
  this.position = position || {x:0, y:0}
  this.imageType = 'square';
}

Item.prototype = {
}

lib.extend(Item.prototype, drawable)

module.exports = Item
},{"./drawable":2,"./lib":4}],4:[function(require,module,exports){
var lib = {
  extend: function(destination, source) {
    for (var k in source) {
      if (source.hasOwnProperty(k)) {
        destination[k] = source[k];
      }
    }
    return destination; 
  }
}

module.exports = lib;
},{}],5:[function(require,module,exports){
var lib = require('./lib');
var drawable = require('./drawable');

var Person = function(name){
  this.name = name || "default";
  this.position = {x:20, y:20};
  this.imageType = 'circle';
}

Person.prototype = {
  talk: function(message){
    console.log('hello my name is', this.name);
  },

  moveItem: function(item, newPosition){
    item.changePosition(newPosition);
  }
}

lib.extend(Person.prototype, drawable)

module.exports = Person
},{"./drawable":2,"./lib":4}],6:[function(require,module,exports){
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

  canvasView.render();//inital drawing

  window.person = person;
  window.box = box;
  
}
},{"./canvas_view.js":1,"./item.js":3,"./person.js":5}]},{},[6]);
