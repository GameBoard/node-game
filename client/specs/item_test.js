var assert = require("assert");
var sinon = require('sinon');
var Item = require('../models/item.js');

describe('Item', function(){

  it('should be a plotable', function(){
    i = new Item();
    assert('updateBoard' in i);
    assert('joinBoard' in i);
  })

  it('shoud not be controllable', function(){
    i = new Item();
    assert.equal(!!i.controllable, false);
  })  

  it('shoud have a position', function(){
    i = new Item();
    assert.equal(i.position.x, 0)
    assert.equal(i.position.y, 0)
  })

  it('shoud have a weigth', function(){
    i = new Item();
    assert('weight' in i)

  })

})