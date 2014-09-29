var Person = require("./person.js");
var Item = require("./item.js");

window.onload = function(){
  // var name = prompt("What do you wanna call me?");
  // var p = new Person(name);
  // console.log('I am alive', p)
  // var server = io.connect('http://192.168.105.248:8080');
  window.canvas = document.getElementById('playground')
  var ctx = canvas.getContext("2d")
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect (10, 10, 55, 50);
  window.Item = Item
  window.Person = Person
}