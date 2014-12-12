var Person = require("../models/person.js");
var Item = require("../models/item.js");
var Door = require("../models/door.js");
var BoardView = require("../views/board_view.js");
var Board = require("../models/board.js");
var FocusedObjectView = require("../views/focused_object_view.js");

var lifter = require('../modules/lifter');
var walker = require('../modules/walker');


var LevelController = function(window){
  this.window = window;
  this.levelNumber = 1;
}

LevelController.prototype = {
  startLevel:function(number){
    this.levelNumber = number;
    this.activateLevel();
  },
  
  activateLevel:function(){
    var canvas = window.document.getElementById('playground');
    var focusedDiv = window.document.getElementById('focused_object');
    var board = new Board(this.window);
    var box = new Item();

    var person = new Person({name: "dodo"});
    person.learnSkills(lifter);
    person.learnSkills(walker);
    // var person2 = new Person({name: "lala", position:{x:30,y:30}});
    // person2.learnSkills(walker)
    
    person.joinBoard(board);
    // person2.joinBoard(board);
    box.joinBoard(board);

    var boardView = new BoardView({canvas:canvas, board:board});
    var focusedView = new FocusedObjectView({el:focusedDiv, board:board});

    focusedView.render(); 
    boardView.render();    
  } 
}


module.exports = LevelController