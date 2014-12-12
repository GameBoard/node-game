var assert = require("assert");
var Board = require('../models/board.js');
var sinon = require('sinon');


describe('Board', function(){

  it('should be created a list of plotables', function(){
    var window = {dispatchEvent: sinon.spy(), Event: sinon.spy()};
    var board = new Board(window);
    assert.equal(board.plotables.length, 0);
  })

  it('should be able to add plotable', function(){
    var window = {dispatchEvent: sinon.spy(), Event: sinon.spy()};
    var board = new Board(window);
    var plotableObject = {};
    board.addPlotable(plotableObject)
    assert.equal(board.plotables.length, 1);
  })

  it('should be able to add controllable and set as controllable', function(){
    var window = {dispatchEvent: sinon.spy(), Event: sinon.spy()};
    var board = new Board(window);
    var controllableObject = {controllable: true};
    board.addPlotable(controllableObject)
    assert.equal(board.plotables.length, 1);
    assert.equal(board.controllables.length, 1);
  })

  it('should be able focus on controllable', function(){ 
    var window = {dispatchEvent: sinon.spy(), Event: sinon.spy()};
    var board = new Board(window);
    var controllable = {controllable: true};
    board.focusOn(controllable)
    assert.equal(board.focusedControllable, controllable);
  })


  it('should find first controllable focused if focused not set ', function(){
    var window = {dispatchEvent: sinon.spy(), Event: sinon.spy()};
    var board = new Board(window);
    var controllable = {controllable: true};
    board.addPlotable(controllable)
    assert.equal(board.findFocusedControllable(), controllable);
  })

  it('should be able to move focused object ', function(){
    var window = {dispatchEvent: sinon.spy(), Event: sinon.spy()};
    var board = new Board(window);
    var controllable = {controllable: true, movePosition: sinon.spy()};
    board.addPlotable(controllable)
    var positionChange = {x:10,y:10}
    board.moveFocused(positionChange)
    assert(controllable.movePosition.called);
  })

  it('should be able shift focus through controllables', function(){
    var window = {dispatchEvent: sinon.spy(), Event: sinon.spy()};
    var board = new Board(window);
    var controllable = {controllable: true, movePosition: sinon.spy()};
    var controllable2 = {controllable: true, movePosition: sinon.spy()};
    board.addPlotable(controllable);
    board.addPlotable(controllable2);
    assert.equal(board.findFocusedControllable(), controllable);
    board.focusOnNext();
    assert.equal(board.findFocusedControllable(), controllable2);
  })



})