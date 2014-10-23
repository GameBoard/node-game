var assert = require("assert");
var walker = require('../modules/walker.js');
var sinon = require('sinon');
var lib = require('../lib')

describe('Walker', function(){
  it("should have a speed", function(){
    var target = {speed:10};
    lib.extend(target, walker);
    assert('speed' in target);
  })

  it("should have a stride", function(){
    var target = {speed:10};
    lib.extend(target, walker);
    assert.equal(target.strideDistance(), 10);
  })

  it("should be able to move up", function(){
    var target = {speed:10, movePosition:sinon.spy()};
    lib.extend(target, walker);
    target.walk({direction:'up'})
    assert(target.movePosition.calledWith({x:0,y: -10}));
  })

  it("should be able to move down", function(){
    var target = {speed:10, movePosition:sinon.spy()};
    lib.extend(target, walker);
    target.walk({direction:'down'})
    assert(target.movePosition.calledWith({x:0,y: 10}));
  })

  it("should be able to move left", function(){
    var target = {speed:10, movePosition:sinon.spy()};
    lib.extend(target, walker);
    target.walk({direction:'left'})
    assert(target.movePosition.calledWith({x:-10,y: 0}));
  })

  it("should be able to move right", function(){
    var target = {speed:10, movePosition:sinon.spy()};
    lib.extend(target, walker);
    target.walk({direction:'right'})
    assert(target.movePosition.calledWith({x:10,y: 0}));
  })


});