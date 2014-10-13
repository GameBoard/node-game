var assert = require("assert");
var sinon = require('sinon');
var drawable = require('./drawable.js');

describe('Drawable', function(){

  it('should be able to join a Board', function(){
    var board = {addDrawable: sinon.spy()}
    drawable.joinBoard(board);
    assert.equal(drawable.board, board); 
  })

  it('when adding a board, board should add drawable', function(){
    var board = {addDrawable: sinon.spy()}
    drawable.joinBoard(board);
    assert(board.addDrawable.calledWith(drawable)); 
  })

  it('should be able to update board', function(){
    var board = {updateView: sinon.spy(), addDrawable: sinon.spy()}
    drawable.joinBoard(board);
    drawable.updateBoard();
    assert(board.updateView.calledOnce);
  })

  it('should be moveable', function(){
    drawable.changePosition({x:5,y:10});
    assert.equal(drawable.position.x, 5);
    assert.equal(drawable.position.y, 10);
  })

  it('should be moveable relatively', function(){
    drawable.changePosition({x:10,y:10});
    drawable.movePosition({x:5,y:10});
    assert.equal(drawable.position.x, 15);
    assert.equal(drawable.position.y, 20);
  })

  it('should update board when moved', function(){
    var spy = sinon.spy(drawable, "updateBoard");
    drawable.changePosition({x:5,y:10});
    assert(spy.calledOnce);
  })
})