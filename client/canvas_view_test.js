var assert = require("assert");
var CanvasView = require('./canvas_view.js');
var sinon = require('sinon');

// var Item = require('./item.js');

describe('CanvasView', function(){
  it('should be created with a canvas', function(){
    var canvas = {};
    var view = new CanvasView(canvas);
    assert.equal(view.canvas, canvas);
  })

  it('should be create a list of drawables', function(){
    var canvas = {};
    var view = new CanvasView(canvas);
    assert.equal(view.drawables.length, 0);
  })

  it('should be able to add drawable', function(){ 
    var canvas = {};
    var view = new CanvasView(canvas);
    var drawableObject = {};
    view.addDrawable(drawableObject)
    assert.equal(view.drawables.length, 1);
  })

  it('should be able focus on drawable', function(){ 
    var canvas = {};
    var view = new CanvasView(canvas);
    var drawableObject = {};
    view.focusOnDrawable(drawableObject)
    assert.equal(view.focusedDrawable, drawableObject);
  })
})