var assert = require("assert");
var Board = require('../models/board.js');
var sinon = require('sinon');


describe('Board', function(){


  it('should be created a list of plotables', function(){
    var board = new Board();
    assert.equal(board.plotables.length, 0);
  })

  it('should be able to add plotable', function(){ 
    var board = new Board;
    var plotableObject = {};
    board.addPlotable(plotableObject)
    assert.equal(board.plotables.length, 1);
  })

  it('should be able to add controllable and set as controllable', function(){ 
    var board = new Board();
    var controllableObject = {controllable: true};
    board.addPlotable(controllableObject)
    assert.equal(board.plotables.length, 1);
    assert.equal(board.controllables.length, 1);
  })

  it('should be able focus on controllable', function(){ 
    var board = new Board();
    var controllable = {controllable: true};
    board.focusOn(controllable)
    assert.equal(board.focusedControllable, controllable);
  })


  it('should find first controllable focused if focused not set ', function(){ 
    var board = new Board();
    var controllable = {controllable: true};
    board.addPlotable(controllable)
    assert.equal(board.findFocusedControllable(), controllable);
  })

  it('should be able to move focused object ', function(){ 
    var board = new Board();
    var controllable = {controllable: true, movePosition: sinon.spy()};
    board.addPlotable(controllable)
    var positionChange = {x:10,y:10}
    board.moveFocused(positionChange)
    assert(controllable.movePosition.called);
  })

  it('should be able shift focus through controllables', function(){
    var board = new Board();
    var controllable = {controllable: true, movePosition: sinon.spy()};
    var controllable2 = {controllable: true, movePosition: sinon.spy()};
    board.addPlotable(controllable);
    board.addPlotable(controllable2);
    assert.equal(board.findFocusedControllable(), controllable);
    board.focusOnNext();
    assert.equal(board.findFocusedControllable(), controllable2);
  })



})