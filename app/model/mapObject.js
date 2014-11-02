define([], function () {


MapObject = function MapObject (x,y, type) {
	this.x = x || 100
	this.y = y || 100
	MAP.push(this)
	this.radius = (Math.random() * 5 + 5).toFixed()
}

MapObject.prototype.getPosition = function(){
	return {
		x:this.x,
		y:this.y
	}
}


MapObject.prototype.detectCollisions = function(){
	objects = MAP.getAll(this, this.scope)
	if (!objects.length) return
	for (var i = 0; i<objects.length; i++) {
		console.log("collision")
		this.collide(objects[i])
		objects[i].highlighted=true
	}
}

MapObject.prototype.detectAdjactentCollisions = function(){
	objects = MAP.getAll(this, 1)
	if (!objects) return
	for (var i = 0; i<objects.length; i++) {
		console.log("collision")
		this.collide(objects[i])
		objects[i].highlighted=true
	}
}

return MapObject

});