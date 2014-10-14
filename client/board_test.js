var assert = require("assert");
var Board = require('./board.js');
var sinon = require('sinon');


describe('Board', function(){
  it('should be able set view', function(){
    view = {setBoard:sinon.spy()}
    var b = new Board()
    b.setView(view);
    assert.equal(b.view, view);     
  })

  it('should be able set view with name', function(){  
    var b = new Board()
    view = {setBoard:sinon.spy()}
    b.setView(view, 'namedView');
    assert.equal(b.namedView, view);     
  })

  it('should set itself on view when setting view ', function(){
    view = {setBoard: sinon.spy()}
    var b = new Board()
    b.setView(view);
    assert(view.setBoard.called);     
  })

  it('should be able to update view', function(){
    var board = new Board();
    var view = {render: sinon.spy(),setBoard: sinon.spy()}
    board.setView(view)
    board.updateView();
    assert(view.render.calledOnce);
  })

  it('should be created a list of drawables', function(){
    var board = new Board();
    assert.equal(board.drawables.length, 0);
  })

  it('should be able to add drawable', function(){ 
    var board = new Board;
    var drawableObject = {};
    board.addDrawable(drawableObject)
    assert.equal(board.drawables.length, 1);
  })

  it('should be able to add controllable and set as controllable', function(){ 
    var board = new Board();
    var controllableObject = {controllable: true};
    board.addDrawable(controllableObject)
    assert.equal(board.drawables.length, 1);
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
    board.addDrawable(controllable)
    assert.equal(board.findFocusedControllable(), controllable);
  })

  it('should be able to move focused object ', function(){ 
    var board = new Board();
    var controllable = {controllable: true, movePosition: sinon.spy()};
    board.addDrawable(controllable)
    var positionChange = {x:10,y:10}
    board.moveFocused(positionChange)
    assert(controllable.movePosition.called);
  })

  it('should be able shift focus through controllables', function(){
    var board = new Board();
    var controllable = {controllable: true, movePosition: sinon.spy()};
    var controllable2 = {controllable: true, movePosition: sinon.spy()};
    board.addDrawable(controllable);
    board.addDrawable(controllable2);
    assert.equal(board.findFocusedControllable(), controllable);
    board.focusOnNext();
    assert.equal(board.findFocusedControllable(), controllable2);
  })

  it('should update focused view when focus on controlllable', function(){ 
    var board = new Board();
    view = {setBoard:sinon.spy(), render:sinon.spy(), }
    board.setView(view, 'focusedView');
    var controllable = {controllable: true};
    var spy = sinon.spy(board, "updateView"); // TODO test named passed in
    board.focusOn(controllable)
    assert(spy.calledOnce);
  })

})