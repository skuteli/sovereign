MapObject = function (x,y, type) {
	this.x = x || 100;
	this.y = y || 100;
	this.radius = Math.random() * 10
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
		this.collide(objects[i])
		objects[i].highlighted=true
	}
}

MapObject.prototype.detectAdjactentCollisions = function(){
	objects = MAP.getAll(this, 1)
	if (!objects) return
	for (var i = 0; i<objects.length; i++) {
		this.collide(objects[i])
		objects[i].highlighted=true
	}
}