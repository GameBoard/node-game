var assert = require("assert");
var sinon = require('sinon');
var Item = require('./item.js');

describe('Item', function(){

  it('shoud be a drawable', function(){
    i = new Item();
    assert('updateView' in i);
    assert('addView' in i);
  })

  it('should be moveable', function(){
    var i = new Item();
    i.changePosition({x:5,y:10});
    assert.equal(i.position.x, 5);
    assert.equal(i.position.y, 10);   
  })

})