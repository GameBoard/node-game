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
  var boardView = new BoardView({canvas:canvas, board:board});

  // board.setView(boardView)
  var focusedView = new FocusedObjectView({el:focusedDiv, board:board});
  // board.setView(focusedView, 'focusedView')
  
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

  focusedView.render(); 
  boardView.render();

  window.person = person;
  window.box = box; 
}