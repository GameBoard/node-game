var Person = require("./person.js");

window.onload = function(){
  var name = prompt("What do you wanna call me?");
  var p = new Person(name);
  console.log('I am alive', p)
}