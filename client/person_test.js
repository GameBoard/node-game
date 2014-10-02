var assert = require("assert");
var sinon = require('sinon');
var Person = require('./person.js');

describe('Person', function(){
  it('should be called default by default', function(){
    var p = new Person();
    assert.equal(p.name, "default");
  });

  it('should be nameable', function(){
    var p = new Person({name:"dude"});
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

  it('shoud be a drawable', function(){
    var p = new Person();
    assert('updateView' in p);
    assert('addView' in p);
  })

  it("should be able to pick up an item", function(){
    var p = new Person({position:{x:10,y:10}});
    var i = {position:{x:10,y:10}};
    p.pickUpItem(i);
    assert.equal(p.item, i);
  })

  it("should only be able to pick up an item if distance less than 20", function(){
    var p = new Person({position:{x:30,y:30}});
    var i = {position:{x:10,y:10}};
    p.pickUpItem(i);
    assert.equal(p.item, null);
  })

  it("should move items it is carrying", function(){
    var p = new Person({position:{x:10,y:10}});
    var i = {position:{x:10,y:10}};
    p.pickUpItem(i);
    p.changePosition({x:20,y:20});
    assert.equal(i.position.x, 20);
    assert.equal(i.position.y, 20);
  })



})
