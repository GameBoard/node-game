var assert = require("assert");
var ItemView = require('./item_view.js');
var sinon = require('sinon');

var Item = require('./item.js');

describe('ItemView', function(){
  it('should be created with an item and a canvas', function(){
    var item = new Item();
    var canvas = {};
    var view = new ItemView(item, canvas);
    assert.equal(view.item, item);
    assert.equal(view.canvas, canvas);
  })

  it('should set itself as the view on the item', function(){
    var item = new Item();
    var canvas = {};
    var view = new ItemView(item, canvas);
    assert.equal(item.view, view);
  })
})