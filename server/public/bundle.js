(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Person = function(name){
  this.name = name || "default";
  this.socket = io.connect('http://192.168.105.248:8080');

  // var listen = function(data){
  //   console.log('this', this)
  //   console.log("Yo, guess what? I " + this.name + " just heard " + 
  //                data.name + " say " + data.chat);
  // };

  this.listen = this.listen.bind(this);

  // var boundedListen = this.listen.bind(this);

  this.socket.on('talk', function(data){
    // boundedListen(data);
    this.listen(data);
  }.bind(this));
}

Person.prototype = {
  talk: function(message){
    this.socket.emit('talk', { name:this.name, chat: message });
  },
  listen: function(data){
    console.log('this', this)
    console.log("Yo, guess what? I " + this.name + " just heard " + 
                 data.name + " say " + data.chat);   
  }
  // connect: function(){
  //   socket.on('news', function (data) {
  //     console.log(data);
  //     socket.emit('my other event', { my: 'data' });
  //   });    
  // }
}


module.exports = Person
},{}],2:[function(require,module,exports){
var Person = require("./person.js");

window.onload = function(){
  // var name = prompt("What do you wanna call me?");
  // var p = new Person(name);
  // console.log('I am alive', p)
  // var server = io.connect('http://192.168.105.248:8080');
  window.Person = Person
}
},{"./person.js":1}]},{},[2]);
