function Sprite(options){
  var options = options || {};
  this.src = options.src;

  this.image = new Image();
  this.image.src = options.src;
  this.image.onload = options.onImageLoad;
  this.ctx = options.ctx;
  this.xSections = options.xSections;
  this.ySections = options.ySections;
  this.xSize = options.xSize;
  this.ySize = options.ySize;
  this.refreshRate = options.refreshRate;
  this.model = options.model;
  this.lastPosition = {x:this.model.position.x,y:this.model.position.y};
  this.x = 0;
  this.y = 0;
}

Sprite.prototype = {
  moving:function(){
    return this.model.position.x != this.lastPosition.x || this.model.position.y != this.lastPosition.y;
  },

  singleImage:function(){
    return (this.xSections == 1 && this.ySections == 1)
  },

  findImageSection: function() {
    if(this.moving()){
      this.x++;
      if (this.x===this.xSections){
        this.x=0;
        this.y++;   
        if(this.y===this.ySections){
          this.y=0;
        }
      }
    }
    else{
      this.x = 0;
      this.y = 1;
    }    
  },

  draw: function(cycle){
    if (cycle % this.refreshRate  === 0){
      console.log('drawing sprite', this)
      if (!this.singleImage()){
        this.findImageSection()
      }

      this.lastPosition.x = this.model.position.x;
      this.lastPosition.y = this.model.position.y;
      
    }
    this.ctx.save(); 
    this.ctx.translate(this.model.position.x, this.model.position.y);
    this.ctx.rotate(this.model.rotation || 0);

    this.ctx.drawImage(this.image,(this.xSize*this.x),(this.ySize*this.y),
                       this.xSize,this.ySize,-1*(this.xSize/2),
                       -1*(this.ySize/2),this.xSize,this.ySize);
    this.ctx.restore();

  }


}

module.exports = Sprite;