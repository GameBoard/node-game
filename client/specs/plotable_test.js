var assert = require("assert");
var sinon = require('sinon');
var plotable = require('../modules/plotable.js');

describe('plotable', function(){

  it('should be able to join a Board', function(){
    var board = {addPlotable: sinon.spy()}
    plotable.joinBoard(board);
    assert.equal(plotable.board, board); 
  })

  it('when adding a board, board should add plotable', function(){
    var board = {addPlotable: sinon.spy()}
    plotable.joinBoard(board);
    assert(board.addPlotable.calledWith(plotable)); 
  })

  it('should be able to update board', function(){
    var board = {updateView: sinon.spy(), addPlotable: sinon.spy()}
    plotable.joinBoard(board);
    plotable.updateBoard();
    assert(board.updateView.calledOnce);
  })

  it('should be moveable', function(){
    plotable.changePosition({x:5,y:10});
    assert.equal(plotable.position.x, 5);
    assert.equal(plotable.position.y, 10);
  })

  // it("should move items if it has them", function(){
  //   var target = {position:{x:0,y:0}, reach:20};
  //   lib.extend(target, lifter);
  //   var spy = sinon.spy(target, "updateBoard");
  //   var i = {position:{x:10,y:10}};
  //   target.pickUpItem(i);
  //   target.changePosition({x:20,y:20});
  //   assert.equal(i.position.x, 20);
  //   assert.equal(i.position.y, 20);
  // })

  it('should be moveable relatively', function(){
    plotable.changePosition({x:10,y:10});
    plotable.movePosition({x:5,y:10});
    assert.equal(plotable.position.x, 15);
    assert.equal(plotable.position.y, 20);
  })

  it('should update board when moved', function(){
    var spy = sinon.spy(plotable, "updateBoard");
    plotable.changePosition({x:5,y:10});
    assert(spy.calledOnce);
  })
})