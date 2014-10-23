var assert = require("assert");
var lifter = require('../modules/lifter.js');
var sinon = require('sinon');
var lib = require('../lib')

describe('Lifter', function(){
  it("should be able to find out how far an object is", function(){
    var target = {position:{x:0,y:0}};
    lib.extend(target, lifter)
    var item = {position:{x:1,y:2}};
    assert.equal(target.distanceFromSelf(item), Math.sqrt(5))
  })

  it("should be able to find items in reach", function(){
    var target = {position:{x:0,y:0}, reach:20};
    lib.extend(target, lifter)
    var item1 = {position:{x:5,y:5}};
    var item2 = {position:{x:20,y:20}};
    var item3 = {position:{x:30,y:30}};
    var items = [item1, item2, item3];
    assert.equal(target.findItemsInReach(items).length,1);
    assert.equal(target.findItemsInReach(items)[0], item1);
  })

  it("should not include itself nearby items", function(){
    var target = {position:{x:10,y:10}, reach:20};
    lib.extend(target, lifter)
    var item1 = {position:{x:10,y:10}};
    var item2 = {position:{x:20,y:20}};
    var item3 = {position:{x:30,y:30}};
    var items = [item1, item2, item3, target];
    assert.equal(target.findItemsInReach(items)[0], item1);
    assert.equal(target.findItemsInReach(items).length, 2);
  })

  it("should be able to pick up an item in reach", function(){
    var target = {position:{x:0,y:0}, reach:20};
    lib.extend(target, lifter)
    var i = {position:{x:5,y:5}};
    target.pickUpItem(i);
    assert.equal(target.item, i);
  })

  it("shouldn't be able to pick up an item out of reach", function(){
    var target = {position:{x:0,y:0}, reach:20};
    lib.extend(target, lifter)
    var i = {position:{x:20,y:20}};
    target.pickUpItem(i);
    assert.equal(target.item, null);
  })

  it("should be able to drop item", function(){
    var target = {position:{x:0,y:0}, reach:20};
    lib.extend(target, lifter)
    var i = {position:{x:10,y:10}};
    target.pickUpItem(i);
    assert.equal(target.item, i);
    target.dropAll();
    assert.equal(target.item, null);
  })
});