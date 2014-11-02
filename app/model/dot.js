define(["app/model/mapObject", "configuration/colors"], function (MapObject, colors) {

Dot = function Dot (x,y, intent) {
	this.isDead=false;
	this.isFarming=false;
	MapObject.call(this, x, y)
	// this.radius = Math.random() * 10
	this.power = (Math.random() * 10).toFixed()
	this.vassals = []
	Object.defineProperty(this, 'isMoving', {
		get: function() {
			return !!this.movement
		}
	})
	this.live();
}



Dot.prototype = Object.create(MapObject.prototype, {
	constructor: {
		value:Dot
	}
})



Dot.prototype.live = function live () {
    if(this.isSelected || this.isDead)
    {
    	console.warn("Attempting to live on dead or selected dot. Returning.")
    	return
    }
	else 
	{
		console.log("Dot is alive! Will think.")
		this.think()
	    this.life = QUEUE.add(live, this, this.thinkSpeed)
	}
}


Dot.prototype.goTo = function goTo(target) {
	console.log("Going to move from x:"+ this.x + ", y:" + this.y +" towards "+ target)
	if (this.movement)
	{
		QUEUE.clear(this.movement.timer)
	}
	this.movement = {}
	this.movement.distance = Math.sqrt(Math.pow(target.x-this.x,2)+Math.pow(target.y-this.y,2));
	this.movement.startX = this.x;
	this.movement.startY = this.y;
	this.movement.directionX = (target.x-this.x) / this.movement.distance;
	this.movement.directionY = (target.y-this.y) / this.movement.distance;
	if (this.movement.distance) this.moveTowards(target.x, target.y)
};


Dot.prototype.moveTowards = function moveTowards(x, y) {

	MAP.pop(this) //remove from X map before moving

    this.x += this.movement.directionX * this.moveSpeed * this.loopSpeed
    this.y += this.movement.directionY * this.moveSpeed * this.loopSpeed

	// this.detectCollisions()

    MAP.push(this) // add to map with new position.

    if(Math.sqrt(Math.pow(this.x-this.movement.startX,2)+Math.pow(this.y-this.movement.startY,2)) >= this.movement.distance) // snap if finished
    {
    	MAP.pop(this)
        this.x = x;
        this.y = y;
        MAP.push(this)
        delete this.movement
    }
	else 
	{
	    this.movement.timer = QUEUE.add(moveTowards, this, this.loopSpeed, x, y)
	}
};


Dot.prototype.move = function(x, y) {
	this.x = x;
	this.y = y;
}

Dot.prototype.getColor = function() {
	if (this == elementSelected) return colors.dots.active
	else if (this.isFarming) return colors.dots.farming
	else if (this.highlighted)  return colors.dots.highlighted
    else if (this.highlighted2)  return colors.dots.highlighted2
	else return colors.dots.default
}

Dot.prototype.collide = function(e) {
	if (e instanceof Dot) {
		console.log('collided with dot!')
		if (this.vassals.length<this.maxVassals && e.power<this.power) {
			this.dominate(e)
		}
		else if (this.vassals.length>=this.maxVassals) {
			console.log('max vassals reached')
		}
		else if (e.power>=this.power) {
			console.log('to powerfull!')
		}
	}
	if (e instanceof Farm) {
		console.log("collided with farm.")
		this.isFarming = true
	}
}

Dot.prototype.dominate = function(e) {
	if (!containsObject(e, this.vassals)) {
		e.lord=this
		this.vassals.push(e)
		console.log('dominated!')
	}
}

Dot.prototype.wander = function(e) {
	MAP.pop(this)
	switch (~~(Math.random() * 4)) {
		case 0:
			this.x += 1
			break
		case 1:
			this.x -= 1
			break
		case 2:
			this.y += 1
			break
		case 3:
			this.y -= 1
			break
	}
	MAP.isInMap(this)? MAP.push(this) : this.die()
}

Dot.prototype.think = function() {
	console.log("Dot is thinking.")
	this.detectAdjactentCollisions()
	// this.wander()
	if (!this.isFarming && !this.isMoving) {
		console.log("going to Farm")
		this.goToNearest(Farm)
	} 
}




Dot.prototype.goToNearest= function(klass, limit) {
	limit?void(0):limit=100
    object = MAP.getFirst(this, limit, klass)
	if (object) {
		console.log(klass.name + " found. Distance:" + Math.sqrt(Math.pow(this.x-object.x, 2) + Math.pow(this.y-object.y, 2)))
		this.goTo(object)
	}
	else {console.log("Nothing found...")}


}


Dot.prototype.die = function() {
	console.log("Dot is dying. Goodbye:(")
	this.isDead = true; 
	QUEUE.clear(this.life)
	that = this;
	DOTS.forEach(function(e, i){
		if (e == that) {
			DOTS.splice(i, 1)
			console.log('im dead!')
		}
		VIEWMODEL.stats.counters.dots(DOTS.length)
	})
}


Dot.prototype.maxVassals = 5;
Dot.prototype.scope = 10;
Dot.prototype.radius = 5;
Dot.prototype.thinkSpeed = 5000;
Dot.prototype.loopSpeed = 10;
Dot.prototype.moveSpeed = 0.2;

});