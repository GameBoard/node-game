var assert = require("assert");
var sinon = require('sinon');
var drawable = require('./drawable.js');

describe('Drawable', function(){

  it('should be able to have a view', function(){
    var view = {addDrawable: sinon.spy()}
    drawable.addView(view);
    assert.equal(drawable.view, view); 
  })

  it('when adding a view, view should add drawable', function(){
    var view = {addDrawable: sinon.spy()}
    drawable.addView(view);
    assert(view.addDrawable.calledWith(drawable)); 
  })

  it('should be able to update view', function(){
    var view = {render: sinon.spy(), addDrawable: sinon.spy()}
    drawable.addView(view);
    drawable.updateView(view);
    assert(view.render.calledOnce);
  })

  it('should be moveable', function(){
    drawable.changePosition({x:5,y:10});
    assert.equal(drawable.position.x, 5);
    assert.equal(drawable.position.y, 10);   
  })

  it('should update view when moved', function(){
    var spy = sinon.spy(drawable, "updateView");
    drawable.changePosition({x:5,y:10});
    assert(spy.calledOnce);
  })
})