var assert = require('assert');
var sinon = require('sinon');
var Door = require('../models/door.js')

describe('Door', function(){
  it('should be a plotable', function(){
    d = new Door();
    assert('updateBoard' in d);
    assert('joinBoard' in d);
  })

  it('shoud not be controllable', function(){
    d = new Door();
    assert.equal(!!d.controllable, false);
  })  

  it('shoud have a position', function(){
    d = new Door();
    assert.equal(d.position.x, 0);
    assert.equal(d.position.y, 0);
  })

  it('shoud have a position', function(){
    d = new Door();
    assert.equal(d.position.x, 0);
    assert.equal(d.position.y, 0);
  })

  it('shoud not be liftable', function(){
    d = new Door();
    assert.equal(d.unliftable, true);
  }) 

})