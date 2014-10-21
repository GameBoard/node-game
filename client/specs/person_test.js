var assert = require("assert");
var sinon = require('sinon');
var Person = require('../person.js');

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
    assert('updateBoard' in p);
    assert('joinBoard' in p);
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
  it("should be able to find nearby items", function(){
    var p = new Person({position:{x:10,y:10}});
    var item1 = {position:{x:10,y:10}};
    var item2 = {position:{x:20,y:20}};
    var item3 = {position:{x:30,y:30}};
    var items = [item1, item2, item3];
    assert.equal(p.findItemsInReach(items)[0], item1);
  })
  it("should not include itself nearby items", function(){
    var p = new Person({position:{x:10,y:10}});
    var item1 = {position:{x:10,y:10}};
    var item2 = {position:{x:20,y:20}};
    var item3 = {position:{x:30,y:30}};
    var items = [item1, item2, item3, p];
    assert.equal(p.findItemsInReach(items)[0], item1);
    assert.equal(p.findItemsInReach(items).length, 2);
  })

  it("should be able to drop item", function(){
    var p = new Person({position:{x:10,y:10}});
    var i = {position:{x:10,y:10}};
    p.pickUpItem(i);
    assert.equal(p.item, i);
    p.dropAll();
    assert.equal(p.item, null);
  })

  it("should have a moveAmount", function(){
    var p = new Person();
    assert('moveAmount' in p);
  })

  it("should be controllable", function(){
    var p = new Person();
    assert.equal(!!p.controllable, true);
  })

 

})
