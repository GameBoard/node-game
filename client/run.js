var LevelController = require('./controller/level_controller');

window.onload = function(){

  var controller = new LevelController(window)
  controller.startLevel(1)

  // var canvas = document.getElementById('playground');
  // var focusedDiv = document.getElementById('focused_object');

  // var board = new Board(window);

  // var box = new Item();

  // var person = new Person({name: "dodo"});
  // person.learnSkills(lifter);
  // person.learnSkills(walker);

  // // var person2 = new Person({name: "lala", position:{x:30,y:30}});
  // // person2.learnSkills(walker);

  
  // person.joinBoard(board);
  // // person2.joinBoard(board);
  // box.joinBoard(board);


  // var boardView = new BoardView({canvas:canvas, board:board});
  // var focusedView = new FocusedObjectView({el:focusedDiv, board:board});

  // focusedView.render(); 
  // boardView.render();
  // window.box = box; 
}