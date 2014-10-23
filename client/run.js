var Person = require("./models/person.js");
var Item = require("./models/item.js");
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
  // person2.learnSkills(lifter)
  person2.learnSkills(walker)
  
  person.joinBoard(board);
  person2.joinBoard(board);
  box.joinBoard(board);

  board.updateView();
  board.updateView('focusedView');

  window.person = person;
  window.box = box; 
}