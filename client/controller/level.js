var Person = require("../models/person.js");
var Item = require("../models/item.js");
var Door = require("../models/door.js");
var BoardView = require("../views/board_view.js");
var Board = require("../models/board.js");
var FocusedObjectView = require("../views/focused_object_view.js");

var lifter = require('../modules/lifter');
var walker = require('../modules/walker');


var Level = function(window){
  this.window = window;
}

Level.prototype = {

  enterSetup:function(){
    var canvas = window.document.getElementById('playground');
    var focusedDiv = window.document.getElementById('focused_object');
    var board = new Board(this.window);

    this.person = new Person({name: "dodo"});   
    this.person.learnSkills(walker);
    
    this.person.joinBoard(board);

    var boardView = new BoardView({canvas:canvas, board:board});
    var focusedView = new FocusedObjectView({el:focusedDiv, board:board});
    focusedView.render();
    boardView.render();
  },

  enterTest:function(){
    // var box = new Item();
    
  }


}


module.exports = Level