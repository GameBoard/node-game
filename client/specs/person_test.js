var assert = require("assert");
var sinon = require('sinon');
var Person = require('../models/person.js');
var lifter = require('../modules/lifter.js');

describe('Person', function(){
  it('should be called default by default', function(){
    var p = new Person();
    assert.equal(p.name, "default");
  });

  it('should be nameable', function(){
    var p = new Person({name:"dude"});
    assert.equal(p.name, "dude");
  });

  it('shoud be a plotable', function(){
    var p = new Person();
    assert('joinBoard' in p);
  })

  it("should be controllable", function(){
    var p = new Person();
    assert.equal(!!p.controllable, true);
  })

  it("should be able to learn skills", function(){
    var p = new Person();
    p.learnSkills(lifter);
    assert("PickUp" in p.skills)
    assert("Drop" in p.skills)
  })

 

})
