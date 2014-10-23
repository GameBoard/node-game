var assert = require("assert");
var sinon = require('sinon');
var Person = require('../models/person.js');

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

  

  it("should have a moveAmount", function(){
    var p = new Person();
    assert('moveAmount' in p);
  })

  it("should be controllable", function(){
    var p = new Person();
    assert.equal(!!p.controllable, true);
  })

 

})
