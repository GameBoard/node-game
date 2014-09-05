var Person = function(name){
  this.name = name || "default";
  
  this.socket = io.connect('http://192.168.105.248:8080');

  this.listen = this.listen.bind(this);

  this.socket.on('talk', function(data){
    this.listen(data);
  }.bind(this));
}

Person.prototype = {
  talk: function(message){
    this.socket.emit('talk', { name:this.name, chat: message });
  },
  listen: function(data){
    console.log("Yo, guess what? I " + this.name + " just heard " + 
                 data.name + " say " + data.chat);   
  }
}




module.exports = Person