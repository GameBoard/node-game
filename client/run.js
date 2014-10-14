var Person = require("./person.js");
var Item = require("./item.js");
var BoardView = require("./board_view.js");
var Board = require("./board.js");
var FocusedObjectView = require("./focused_object_view.js");


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
  var person2 = new Person({name: "lala", position:{x:30,y:30}});

  person.joinBoard(board);
  person2.joinBoard(board);
  box.joinBoard(board);

  board.updateView();
  board.updateView('focusedView');

  window.person = person;
  window.box = box; 
}