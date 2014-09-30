(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
var ItemView = function(item, canvas){
  this.item = item;
  this.canvas = canvas;
  item.addView(this);
}

ItemView.prototype = {
  render: function(){
    console.log('rendering');
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (this.item.position.x, this.item.position.y, 10, 10);
  }
}

module.exports = ItemView;
},{}],3:[function(require,module,exports){
var Person = function(name){
  this.name = name || "default";
}

Person.prototype = {
  talk: function(message){
    console.log('hello my name is', this.name);
  },

  moveItem: function(item, newPosition){
    item.changePosition(newPosition);
  }
}

module.exports = Person
},{}],4:[function(require,module,exports){
var Person = require("./person.js");
var Item = require("./item.js");
var ItemView = require("./item_view.js");

window.onload = function(){
  // var name = prompt("What do you wanna call me?");
  // var p = new Person(name);
  // console.log('I am alive', p)
  // var server = io.connect('http://192.168.105.248:8080');
  

  var canvas = document.getElementById('playground')
  var box = new Item();
  var boxView = new ItemView(box, canvas);
  boxView.render();//inital drawing

  window.box = box;
  window.dude = new Person();
  
}
},{"./item.js":1,"./item_view.js":2,"./person.js":3}]},{},[4]);
