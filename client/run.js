var Person = require("./person.js");
var Item = require("./item.js");
var ItemView = require("./item_view.js");

window.onload = function(){
  // var name = prompt("What do you wanna call me?");
  // var p = new Person(name);
  // console.log('I am alive', p)
  // var server = io.connect('http://192.168.105.248:8080');
  

  var canvas = document.getElementById('playground')
  var box = new Item();
  var boxView = new ItemView(box, canvas);
  boxView.render();//inital drawing

  window.box = box;
  window.dude = new Person();
  
}