(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CanvasView = function(canvas){
  this.canvas = canvas;
  this.drawables = [];
  this.controllables = [];
  canvas.onclick = this.click;
  // canvas.onkeydown = this.keyPress;
  this.keyPress = this.keyPress.bind(this);
  window.addEventListener('keydown',this.keyPress,false);
  
}

CanvasView.prototype = {
  addDrawable: function(drawable){
    this.drawables.push(drawable);
    if (drawable.controllable){
      this.controllables.push(drawable);
    }
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
        ctx.beginPath();
        ctx.arc(item.position.x,item.position.y,5,0,2*Math.PI);
        ctx.fill();
        // ctx.fillRect(item.position.x, item.position.y, 20, 20);
      }
    }   
  },

  findFocusedControllable:function(){
    return this.focusedControllable || this.controllables[0]
  },


  focusOn: function(controllable){
    this.focusedControllable = controllable;
  },

  click: function(ev){
    console.log('clicked')
  },

  keyPress: function(ev){
    var target = this.findFocusedControllable();
    var moveAmount = target.moveAmount();
    if (target){
      var adjust = {x:0,y:0}
      switch (ev.keyCode){
        case 38://up
          adjust = {x:0,y: -moveAmount}
          break;
        case 40://down
          adjust = {x:0,y: moveAmount}
          break;
        case 37://left
          adjust = {x:-moveAmount,y: 0}
          break;
        case 39://right
          adjust = {x:moveAmount,y: 0}
          break;
        case 13:
          if (target.item){
            target.dropAll()
          }
          else {
            item = target.findItemsInReach(this.drawables)[0]
            if(item){
              target.pickUpItem(item);
            }
          }
          break;
        case 17:
          if (this.controllables.length > 1){
            console.log('have more than one')
            var index = this.controllables.indexOf(this.focusedControllable);
            console.log('index', index)
            if (index === this.controllables.length -1){
              this.focusedControllable = this.controllables[0];
            }
            else{
              this.focusedControllable = this.controllables[index+1];
            }
          }
          break;
      }
      // if( adjust.x != 0 && adjust.y != 0 ){
        var x = target.position.x + adjust.x;
        var y = target.position.y + adjust.y;
        target.changePosition({x:x,y:y});
      // }
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
  this.weight = 3;
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
  },

  distance: function(position1, position2){
    // todo test this
    var diffX = Math.abs(position2.x - position1.x)
    var diffY = Math.abs(position2.y - position1.y)

    return Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2))
  }
}

module.exports = lib;
},{}],5:[function(require,module,exports){
var lib = require('./lib');
var drawable = require('./drawable');

var Person = function(options){
  var options = options || {}
  this.name = options.name || "default";
  this.position = options.position || {x:20, y:20};
  this.imageType = 'circle';
  this.speed = options.speed || 5;
  this.controllable = true;
}

var proto = {
  moveAmount: function(){
    var moveAmount = this.speed;
    if(this.item && this.item.weight){
      moveAmount = moveAmount - this.item.weight
    }
    return moveAmount;
  },

  talk: function(message){
    console.log('hello my name is', this.name);
  },

  pickUpItem: function(item){
    if(this.itemInReach(item)){
      this.item = item;
    }
  },

  changePosition: function(newPosition){
    this.position = newPosition;
    if(this.item){
      this.item.position = newPosition;
    }
    this.updateView();
  },

  distanceFromSelf:function(item){
    var distance = lib.distance(this.position,item.position);
    return distance;
  },

  itemInReach:function(item){
    return this.distanceFromSelf(item) <= 20;
  },

  findItemsInReach: function(items){
    var inReach = [];
    items.forEach(function(item){
      if(item !== this && this.itemInReach(item)){
        inReach.push(item)
      }
    }, this);
    return inReach;
  },

  dropAll: function(){
    this.item = null;
  }
}

lib.extend(Person.prototype, drawable)
lib.extend(Person.prototype, proto)

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
  var person2 = new Person({position:{x:30,y:30}});
  person.addView(canvasView);
  person2.addView(canvasView);
  box.addView(canvasView);
  canvasView.render();//inital drawing


  window.person = person;
  window.box = box;
  window.canvasView = canvasView;
  
}
},{"./canvas_view.js":1,"./item.js":3,"./person.js":5}]},{},[6]);
