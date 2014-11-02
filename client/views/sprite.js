function Sprite(options){
  var options = options || {};
  this.src = options.src;

  this.image = new Image();
  this.image.src = 'dudenew.png';
  this.image.onload = options.onImageLoad;
  this.ctx = options.ctx;
  this.xSections = options.xSections;
  this.ySections = options.ySections;
  this.xSize = options.xSize;
  this.ySize = options.ySize;
  this.refreshRate = options.refreshRate;
  this.model = options.model;
  this.x = 0;
  this.y = 0;
}

Sprite.prototype = {

  draw: function(cycle){
    if (cycle % this.refreshRate  === 0){
      this.x++;
      if (this.x===this.xSections){
        this.x=0;
        this.y++;   
        if(this.y===this.ySections){
          this.y=0;
        }
      }
    }

    console.log('drawing this', this);

    this.ctx.drawImage(this.image,(this.xSize*this.x),(this.ySize*this.y),
                       this.xSize,this.ySize,this.model.position.x,this.model.position.y,this.xSize,this.ySize);
  }


}

module.exports = Sprite;