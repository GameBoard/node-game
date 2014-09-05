var assert = require("assert");
var Person = require('./person.js');

describe('Person', function(){
  it('should create a person', function(){
    var p = new Person();
  });

  it('should be called default by default', function(){
    var p = new Person();
    assert.equal(p.name, "default");
  });

  it('should be nameable', function(){
    var p = new Person("dude");
    assert.equal(p.name, "dude");
  });
})
