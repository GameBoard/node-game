var assert = require("assert");
// var sinon = require('sinon');
var Person = require('./person.js');
var Item = require('./item.js');


var canvas = {}


describe('Person', function(){
  it('should be called default by default', function(){
    var p = new Person();
    assert.equal(p.name, "default");
  });

  it('should be nameable', function(){
    var p = new Person("dude");
    assert.equal(p.name, "dude");
  });

  it("should speak", function(){
    var p = new Person();
    p.talk();  
  });

  it("should be able to move an item", function(){
    var p = new Person();
    var i = new Item();
    p.moveItem(i, {x:5,y:10});
    assert.equal(i.position.x, 5);
    assert.equal(i.position.y, 10);
  })
})
