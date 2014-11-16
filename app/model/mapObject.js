"use strict";

define(["app/model/cartesian"], function (Cartesian) {


let MapObject = function MapObject (x,y) {
	if (typeof x != 'number' || typeof y != 'number') {throw 'MapObject constructor called without x or y'}
    Cartesian.call(this, {x:x, y:y})
	MAP.push(this)
	this.radius = (Math.random() * 5 + 5).toFixed()
}

MapObject.prototype = Object.create(Cartesian.prototype, {
    constructor: {
        value:MapObject
    }
})


MapObject.prototype.setLocation = function(location) {
		MAP.pop(this)
		Cartesian.prototype.setLocation.call(this, location)
		MAP.push(this)
	}

MapObject.prototype.getPosition = function(){
	return {
		x:this.x,
		y:this.y
	}
}


MapObject.prototype.detectCollisions = function(){
	let objects = MAP.getAll(this, this.scope)
	if (!objects.length) return
	for (var i = 0; i<objects.length; i++) {
		// console.log("collision")
		this.collide(objects[i])
		objects[i].highlighted=true
	}
}

MapObject.prototype.detectAdjactentCollisions = function(){
	let objects = MAP.getAll(this, 1)
	if (!objects) return
	for (var i = 0; i<objects.length; i++) {
		// console.log("collision")
		this.collide(objects[i])
		objects[i].highlighted=true
	}
}

return MapObject

});