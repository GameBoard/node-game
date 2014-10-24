var assert = require("assert");
var sinon = require('sinon');
var plotable = require('../modules/plotable.js');
var lib = require('../lib')

describe('plotable', function(){

  it('should be able to join a Board', function(){
    var target = {position:{x:5,y:5}}
    lib.extend(target, plotable)
    var board = {addPlotable: sinon.spy()}
    target.joinBoard(board);
    assert.equal(target.board, board); 
  })

  it('when adding a board, board should add plotable', function(){
    var target = {position:{x:5,y:5}}
    lib.extend(target, plotable)
    var board = {addPlotable: sinon.spy()}
    target.joinBoard(board);
    assert(board.addPlotable.calledWith(target)); 
  })

  it('should be able to update board', function(){
    var target = {position:{x:5,y:5}}
    lib.extend(target, plotable)
    var board = {updateView: sinon.spy(), addPlotable: sinon.spy()}
    target.joinBoard(board);
    target.updateBoard();
    assert(board.updateView.calledOnce);
  })

  it('should be moveable', function(){
    var target = {position:{x:10,y:10}}
    lib.extend(target, plotable)
    var board = {width:100,height:100, addPlotable: sinon.spy(), updateView: sinon.spy()};
    target.joinBoard(board);
    target.changePosition({x:20,y:15});
    assert.equal(target.position.x, 20);
    assert.equal(target.position.y, 15);
  })

  it('should be limited to border board', function(){
    var target = {position:{x:10,y:10}}
    lib.extend(target, plotable)
    var board = {width:100,height:100, addPlotable: sinon.spy(), updateView: sinon.spy()};
    target.joinBoard(board);
    target.changePosition({x:0,y:0});
    assert.equal(target.position.x, 10);
    assert.equal(target.position.y, 10);
  })

  it('should be moveable relatively', function(){
    var target = {position:{x:10,y:10}}
    lib.extend(target, plotable)
    var board = {width:100,height:100, addPlotable: sinon.spy(), updateView: sinon.spy()};
    target.joinBoard(board);
    target.movePosition({x:5,y:5});
    assert.equal(target.position.x, 15);
    assert.equal(target.position.y, 15);
  })

  it('should update board when moved', function(){
    var target = {position:{x:10,y:10}}
    lib.extend(target, plotable)
    var spy = sinon.spy(target, "updateBoard");
    var board = {width:100,height:100, addPlotable: sinon.spy(), updateView: sinon.spy()};
    target.joinBoard(board);
    target.changePosition({x:20,y:15});
    assert(spy.calledOnce);
  })
})