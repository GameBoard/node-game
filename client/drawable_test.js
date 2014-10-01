var assert = require("assert");
var sinon = require('sinon');
var drawable = require('./drawable.js');

describe('Drawable', function(){

  it('should be able to have a view', function(){
    var view = {render: sinon.spy()}
    drawable.addView(view);
    assert.equal(drawable.view, view); 
  })

  it('should be able to update view', function(){
    var view = {render: sinon.spy()}
    drawable.addView(view);
    drawable.updateView(view);
    assert(view.render.calledOnce);
  })

})