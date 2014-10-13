(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Board = function(){
  this.drawables = [];
  this.controllables = [];
}

Board.prototype = {
  setView: function(view){
    this.view = view;
    view.setBoard(this);
  },

  updateView: function(view){
    this.view.render();
  },

  addDrawable: function(drawable){
    this.drawables.push(drawable);
    if (drawable.controllable){
      this.controllables.push(drawable);
    }
  },

  focusOn: function(controllable){
    this.focusedControllable = controllable;
  },

  findFocusedControllable:function(){
    return this.focusedControllable || this.controllables[0]
  },

  moveFocused:function(positionChange){
    this.findFocusedControllable().movePosition(positionChange);
  }
}

module.exports = Board
},{}],2:[function(require,module,exports){
var BoardView = function(canvas, board){
  this.canvas = canvas;
  this.board = board;

  this.keyPress = this.keyPress.bind(this);
  window.addEventListener('keydown',this.keyPress,false);
  
}

BoardView.prototype = {

  setBoard: function(board){
    this.board = board;
  },

  render: function(){
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgb(200,0,0)";
    numDrawables = this.board.drawables.length;
    for(var i=0; i<numDrawables; i++){
      var item = this.board.drawables[i];
      if (item.imageType === 'square'){
        ctx.fillRect(item.position.x, item.position.y, 10, 10);
      }
      else if(item.imageType === 'circle'){
        ctx.beginPath();
        ctx.arc(item.position.x,item.position.y,5,0,2*Math.PI);
        ctx.fill();
      }
    }   
  },

  keyPress: function(ev){
    var target = this.board.findFocusedControllable();
    var moveAmount = target.moveAmount();
    if (target){
      switch (ev.keyCode){
        case 38://up
          target.movePosition({x:0,y: -moveAmount})
          break;
        case 40://down
          target.movePosition({x:0,y: moveAmount})
          break;
        case 37://left
          target.movePosition({x:-moveAmount,y: 0})
          break;
        case 39://right
          target.movePosition({x:moveAmount,y: 0})
          break;
        case 13://enter
          if (target.item){
            target.dropAll()
          }
          else {
            //TODO move to person
            item = target.findItemsInReach(this.board.drawables)[0]
            if(item){
              target.pickUpItem(item);
            }
          }
          break;
        case 17://shift
          //move this to board
          // this.board.changeControllable()
          if (this.board.controllables.length > 1){
            console.log('have more than one')
            var index = this.board.controllables.indexOf(this.board.focusedControllable);
            console.log('index', index)
            if (index === this.board.controllables.length -1){
              this.board.focusedControllable = this.board.controllables[0];
            }
            else{
              this.board.focusedControllable = this.board.controllables[index+1];
            }
          }
          break;
      }
    }
  }
}

module.exports = BoardView;
},{}],3:[function(require,module,exports){
var drawable = {
  // mixing this in allow to added to a board and change position
  // an image for which to be drawn TODO
  // also possibly a pattern so they can eg walk TODO 
  updateBoard: function(){
    if(this.board){
      this.board.updateView();
    }
  },
  joinBoard: function(board){
    this.board = board;
    board.addDrawable(this);
  },
  changePosition: function(newPosition){
    this.position = newPosition;
    this.updateBoard();
  },
  movePosition: function(newPosition){
    var x = this.position.x + newPosition.x
    var y = this.position.y + newPosition.y
    this.changePosition({x:x, y:y})
    this.updateBoard();
  },
}

module.exports = drawable
},{}],4:[function(require,module,exports){
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
},{"./drawable":3,"./lib":5}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
    this.updateBoard();
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
},{"./drawable":3,"./lib":5}],7:[function(require,module,exports){
var Person = require("./person.js");
var Item = require("./item.js");
var BoardView = require("./board_view.js");
var Board = require("./board.js");
// var FocusedObjectView = require("./focused_object_view.js");


window.onload = function(){

  var canvas = document.getElementById('playground');
  // var focusedDiv = document.getElementById('focused_object');
  var board = new Board();
  var boardView = new BoardView(canvas);

  board.setView(boardView)
  // var focusedView = new FocusedObjectView(focusedDiv);
  
  var box = new Item();
  var person = new Person();
  var person2 = new Person({position:{x:30,y:30}});

  person.joinBoard(board);
  person2.joinBoard(board);
  box.joinBoard(board);

  board.updateView();

  window.person = person;
  window.box = box; 
}
},{"./board.js":1,"./board_view.js":2,"./item.js":4,"./person.js":6}]},{},[7]);
