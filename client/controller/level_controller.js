var Level = require('./level');

var LevelController = function(window){
  this.window = window;
  this.currentLevel = null;
}

LevelController.prototype = {
  startLevel:function(number){
    this.currentLevel  = new Level();
    this.currentLevel.enterSetup();
  },
}


module.exports = LevelController