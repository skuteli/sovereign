define(["app/model/mapObject", "configuration/colors"], function (MapObject, colors) {

Dot = function Dot (x,y, intent) {
	MapObject.call(this, x, y)
	// this.radius = Math.random() * 10
	this.power = (Math.random() * 10).toFixed()
	this.vassals = []
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
    	return
    }
	else 
	{
		this.think()
	    this.life = setTimeout.call(this, live, this.thinkSpeed)
	}
}


Dot.prototype.goTo = function goTo(target) {
	if (this.movement)
	{
		clearTimeout(this.movement.timer)
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
	    this.movement.timer = setTimeout.call(this, moveTowards, this.loopSpeed, x, y)
	}
};


Dot.prototype.move = function(x, y) {
	this.x = x;
	this.y = y;
}

Dot.prototype.getColor = function() {
	if (this == elementSelected) return colors.dots.active
	else if (this.highlighted)  return colors.dots.highlighted
    else if (this.highlighted2)  return colors.dots.highlighted2
	else return colors.dots.default
}

Dot.prototype.collide = function(e) {
	if (e instanceof Dot) {
		// console.log('collided with dot!')
		if (this.vassals.length<this.maxVassals && e.power<this.power) {
			this.dominate(e)
		}
		else if (this.vassals.length>=this.maxVassals) {
			console.log('max vassals reached')
		}
		else if (e.power>=this.power) {
			// console.log('to powerfull!')
		}
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
	this.detectAdjactentCollisions()
	this.wander()
}


Dot.prototype.die = function() {
	this.isDead = true; 
	clearTimeout(this.life)
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
Dot.prototype.thinkSpeed = 200;
Dot.prototype.loopSpeed = 10;
Dot.prototype.moveSpeed = 0.2;
Dot.prototype.isDead=false;


});