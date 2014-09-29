(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Person = function(name){
  this.name = name || "default";
}

Person.prototype = {
  talk: function(message){
    console.log('hello my name is', this.name);
  },

  moveItem: function(item, newPosition){
    item.position = newPosition;
  }
}

module.exports = Person
},{}],2:[function(require,module,exports){
var Person = require("./person.js");

window.onload = function(){
  // var name = prompt("What do you wanna call me?");
  // var p = new Person(name);
  // console.log('I am alive', p)
  // var server = io.connect('http://192.168.105.248:8080');
  window.canvas = document.getElementById('playground')
  var ctx = canvas.getContext("2d")
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect (10, 10, 55, 50);

  window.Person = Person
}
},{"./person.js":1}]},{},[2]);
