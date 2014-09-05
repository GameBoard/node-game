var assert = require("assert");
var sinon = require('sinon');
var Person = require('./person.js');


//Stub the socket.iot object that is expected
var onCallback = sinon.spy();
var emitCallback = sinon.spy();
io = {
  connect:function(){return {on: onCallback, emit: emitCallback};}
};


describe('Person', function(){
  it('should create a person and connect to socket', function(){
    var p = new Person();
    assert(onCallback.calledOnce);
  });

  it('should be called default by default', function(){
    var p = new Person();
    assert.equal(p.name, "default");
  });

  it('should be nameable', function(){
    var p = new Person("dude");
    assert.equal(p.name, "dude");
  });

  it("should speak and communicate via socket", function(){
    var p = new Person();
    p.talk();
    assert(emitCallback.calledOnce);    
  });
})
