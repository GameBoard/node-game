(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
var Board = function(){
  this.plotables = [];
  this.controllables = [];
  this.width = 800 // todo find nice way to only put this one place
  this.height = 400
}

Board.prototype = {
  setView: function(view, viewName){
    nameOfView = viewName || 'view'
    this[nameOfView] = view
    view.setBoard(this);
  },

  updateView: function(viewName){
    nameOfView = viewName || 'view'
    if (this[nameOfView]) {
      this[nameOfView].render();
    }
  },

  addPlotable: function(plotable){
    this.plotables.push(plotable);
    if (plotable.controllable){
      this.controllables.push(plotable);
    }
  },

  focusOn: function(controllable){
    this.focusedControllable = controllable;
    this.updateView('focusedView');
  },

  findFocusedControllable:function(){
    return this.focusedControllable || this.controllables[0]
  },

  moveFocused:function(positionChange){
    this.findFocusedControllable().movePosition(positionChange);
  },

  focusOnNext:function(){
    if (this.controllables.length > 1){
      var index = this.controllables.indexOf(this.findFocusedControllable());
      if (index === this.controllables.length -1){
        this.focusOn(this.controllables[0]);
      }
      else{
        this.focusOn(this.controllables[index+1]);
      }
    }
  }
}

module.exports = Board
},{}],3:[function(require,module,exports){
var lib = require('../lib')
var plotable = require('../modules/plotable')

var Door = function(options){
  var options = options || {};
  this.position = options.position || {x:0,y:0};
  this.imageType = 'rec';
  this.unliftable = true;

}

lib.extend(Door.prototype, plotable)

module.exports = Door;
},{"../lib":1,"../modules/plotable":7}],4:[function(require,module,exports){
var lib = require('../lib');
var plotable = require('../modules/plotable');

var Item = function(position){
  this.position = position || {x:0, y:0}
  this.imageType = 'square';
  this.weight = 3;
}

Item.prototype = {
}

lib.extend(Item.prototype, plotable)

module.exports = Item
},{"../lib":1,"../modules/plotable":7}],5:[function(require,module,exports){
var lib = require('../lib');
var plotable = require('../modules/plotable');

var Person = function(options){
  var options = options || {}
  this.name = options.name || "default";
  this.position = options.position || {x:20, y:20};
  this.imageType = 'circle';
  this.speed = options.speed || 10;
  this.controllable = true;
  this.reach = options.reach || 20;
  this.weight = options.weight || 4;
}

var proto = {
  //person should be a learner only thing inherit to all people
  learnSkills: function(skillModule){
    var skills = this.skills || {}
    lib.extend(this, skillModule)
    this.skills = lib.extend(skills, skillModule.skills)
  },
}

lib.extend(Person.prototype, proto)
lib.extend(Person.prototype, plotable)

module.exports = Person
},{"../lib":1,"../modules/plotable":7}],6:[function(require,module,exports){
var lib = require('../lib')

var lifter = {
  distanceFromSelf:function(item){
    var distance = lib.distance(this.position,item.position);
    return distance;
  },

  itemInReach:function(item){
    return this.distanceFromSelf(item) <= this.reach;
  },

  itemLiftable:function(item){
    return !item.unliftable;
  },

  findItemsInReach: function(items){
    var inReach = [];
    items.forEach(function(item){
      if(item !== this  && this.itemInReach(item)){
        inReach.push(item)
      }
    }, this);
    return inReach;
  },

  pickUpItem: function(item){
    if(this.itemInReach(item) && this.itemLiftable(item)){
      this.item = item;
    }
  },

  totalWeight: function(){
    sumWeight = this.weight;
    if (this.item) {
      sumWeight += this.item.weight
    }
    return (sumWeight);
  },

  dropAll: function(){
    this.item = null;
  },

  pickUpFirstCloseItem:function(){
    var firstCloseItem = this.findItemsInReach(this.board.plotables)[0];
    firstCloseItem && this.pickUpItem(firstCloseItem);
  },

  skills: {
    "PickUp": "pickUpFirstCloseItem",
    "Drop": "dropAll",
  },
}

module.exports = lifter
},{"../lib":1}],7:[function(require,module,exports){
var plotable = {
  //Library to speak to the board when position has changed

  updateBoard: function(){
    if(this.board){
      this.board.updateView();
    }
  },
  joinBoard: function(board){
    this.board = board;
    board.addPlotable(this);
  },
  changePosition: function(newPosition){
    if (this.onBoard(newPosition)){
      this.position = newPosition;
      if(this.item){
        this.item.position = newPosition;
      }
      this.updateBoard();
    }
  },
  movePosition: function(positionChange){
    var x = this.position.x + positionChange.x
    var y = this.position.y + positionChange.y
    this.changePosition({x:x, y:y})
  },

  onBoard: function(position){
    onBoard = position.x > 5 && position.x < (this.board.width - 5) && position.y > 5 && position.y < (this.board.height -5);
    return onBoard;
  }
}

module.exports = plotable
},{}],8:[function(require,module,exports){
walker = {
  walk: function(options){
    var options = options || {}
    stride = this.strideDistance();
    var change = {}
    switch (options.direction){
      case 'up': //38://up
        change = {x:0,y: -stride}
        break;
      case 'down'://40://down
        change = {x:0,y: stride}
        break;
      case 'left'://37://left
        change = {x:-stride,y: 0}
        break;
      case 'right'://39://right
        change = {x:stride,y: 0} 
    }
    this.movePosition(change);
  },

  strideDistance: function(){
    var speed = this.speed || 1
    var weight = (this.totalWeight && this.totalWeight()) || this.weight || 0
    var moveAmount = Math.max(speed - weight, 0);
    return moveAmount;
  }


}

module.exports = walker;
},{}],9:[function(require,module,exports){
var Person = require("./models/person.js");
var Item = require("./models/item.js");
var Door = require("./models/door.js");
var BoardView = require("./views/board_view.js");
var Board = require("./models/board.js");
var FocusedObjectView = require("./views/focused_object_view.js");

var lifter = require('./modules/lifter');
var walker = require('./modules/walker');


window.onload = function(){

  var canvas = document.getElementById('playground');
  var focusedDiv = document.getElementById('focused_object');

  var board = new Board();
  var boardView = new BoardView(canvas);

  board.setView(boardView)
  var focusedView = new FocusedObjectView(focusedDiv);
  board.setView(focusedView, 'focusedView')
  
  var box = new Item();
  var person = new Person({name: "dodo"});
  person.learnSkills(lifter)
  person.learnSkills(walker)

  var person2 = new Person({name: "lala", position:{x:30,y:30}});
  person2.learnSkills(walker);

  var door = new Door({position:{x:50,y:50}});
  
  person.joinBoard(board);
  person2.joinBoard(board);
  box.joinBoard(board);
  door.joinBoard(board);

  board.updateView();
  board.updateView('focusedView');

  window.person = person;
  window.box = box; 
}
},{"./models/board.js":2,"./models/door.js":3,"./models/item.js":4,"./models/person.js":5,"./modules/lifter":6,"./modules/walker":8,"./views/board_view.js":10,"./views/focused_object_view.js":11}],10:[function(require,module,exports){
var BoardView = function(canvas){
  this.canvas = canvas;
  this.keyPress = this.keyPress.bind(this);
  window.addEventListener('keydown',this.keyPress,false);
  this.boundary = 5;
}

BoardView.prototype = {

  setBoard: function(board){
    this.board = board;
  },

  render: function(){
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgb(200,0,0)";
    numPlotables = this.board.plotables.length;
    for(var i=0; i<numPlotables; i++){
      var item = this.board.plotables[i];
      switch (item.imageType){
        case 'square':
          ctx.fillRect(item.position.x, item.position.y, 10, 10);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(item.position.x,item.position.y,5,0,2*Math.PI);
          ctx.fill();
          break;
        case 'rec':
          ctx.fillRect(item.position.x, item.position.y, 20, 4);
          break;
      }
    }   
  },

  keyPress: function(ev){
    var target = this.board.findFocusedControllable();
    switch (ev.keyCode){
      case 17://cttl
        this.board.focusOnNext()
        break;
      case 87: //38://up
        target.walk && target.walk({direction:'up'})
        break;
      case 83://40://down
        target.walk && target.walk({direction:'down'})
        break;
      case 65://37://left
        target.walk && target.walk({direction:'left'})
        break;
      case 68://39://right
        target.walk && target.walk({direction:'right'})
        break;     
    }
  }
}

module.exports = BoardView;
},{}],11:[function(require,module,exports){
var FocusedObjectView = function(el){
  this.mainEl = el;
  this.headerEl = el.querySelector("#header");
  this.skillsEl = el.querySelector("#skills");
  this.skillClicked = this.skillClicked.bind(this);
}

FocusedObjectView.prototype = {
  setBoard: function(board){
    this.board = board;
  },
  render: function(){
    var focused =  this.board.findFocusedControllable();
    this.headerEl.innerHTML = focused.name;
    this.skillsEl.innerHTML = "";
    for (skill in focused.skills){
      var skillItem = window.document.createElement('li');
      var skillButton = window.document.createElement('a');
      skillButton.addEventListener('click',this.skillClicked,false);
      skillButton.innerHTML = skill;
      console.log('this', this);
      skillItem.appendChild(skillButton);
      this.skillsEl.appendChild(skillItem);
    }
  },

  skillClicked: function(el){
    console.log('skill was clicked this', this);
    console.log('element', el);
    var focused =  this.board.findFocusedControllable();
    var methodName = focused.skills[el.target.innerHTML];
    console.log('methodName', methodName);
    focused[methodName]();
  }
}
module.exports = FocusedObjectView
},{}]},{},[9]);
