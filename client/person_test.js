var assert = require("assert");
var sinon = require('sinon');
var Person = require('./person.js');

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

  it("should have a position", function(){
    var p = new Person();
    assert('position' in p);
  });

  it("should be able to move an item", function(){
    var p = new Person();
    var i = {changePosition: sinon.spy()}
    p.moveItem(i, {x:5,y:10});
    assert(i.changePosition.calledWith({x:5,y:10}))
  })
})
