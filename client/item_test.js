var assert = require("assert");
var sinon = require('sinon');
var Item = require('./item.js');

var view = {render: sinon.spy()}


describe('Item', function(){
  it('should have a weight', function(){
    var i = new Item(); 
    assert.equal(i.weight, 0)
  })

  it('shoud have a position', function(){
    var i = new Item();
    assert.equal(i.position.x, 0)
    assert.equal(i.position.y, 0)
  })

  it('should be moveable', function(){
    var i = new Item();
    i.changePosition({x:5,y:10});
    assert.equal(i.position.x, 5);
    assert.equal(i.position.y, 10);   
  })

  it('should be able to have a view', function(){
    var i = new Item();
    i.addView(view);
    assert.equal(i.view, view); 
  })

  it('should update view when change in position', function(){
    var i = new Item();
    i.addView(view);
    i.changePosition({x:5,y:10});
    assert(view.render.calledOnce);
  })



})