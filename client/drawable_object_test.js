var assert = require("assert");
var sinon = require('sinon');
var Drawable = require('./drawable.js');

describe('Drawable', function(){

  it('shoud have a position', function(){
    var i = new Drawable();
    assert.equal(i.position.x, 0)
    assert.equal(i.position.y, 0)
  })

  it('should be moveable', function(){
    var i = new Drawable();
    i.changePosition({x:5,y:10});
    assert.equal(i.position.x, 5);
    assert.equal(i.position.y, 10);   
  })

  it('should be able to have a view', function(){
    var i = new Drawable();
    var view = {render: sinon.spy()}
    i.addView(view);
    assert.equal(i.view, view); 
  })

  it('should update view when change in position', function(){
    var i = new Drawable();
    var view = {render: sinon.spy()}
    i.addView(view);
    i.changePosition({x:5,y:10});
    assert(view.render.calledOnce);
  })

})