

Dot = function (x,y, intent) {
	this.x = x || 100
	this.y = y || 100
	MAP.push(this)
	// this.radius = Math.random() * 10
	this.power = Math.random() * 10
	this.vassals = []
	this.live();
}

Dot.prototype = new MapObject(); 

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
	if (this.isMoving)
	{
		clearTimeout(this.isMoving)
		this.isMoving = false;
	}
		this.distance = Math.sqrt(Math.pow(target.x-this.x,2)+Math.pow(target.y-this.y,2));
		this.startX = this.x;
		this.startY = this.y;
		this.directionX = (target.x-this.x) / this.distance;
		this.directionY = (target.y-this.y) / this.distance;
	if (this.distance) this.moveTowards(target.x, target.y)
};


Dot.prototype.moveTowards = function moveTowards(x, y) {

	MAP.pop(this) //remove from X map before moving

    this.x += this.directionX * this.moveSpeed * this.loopSpeed
    this.y += this.directionY * this.moveSpeed * this.loopSpeed

	// this.detectCollisions()

    MAP.push(this) // add to map with new position.

    if(Math.sqrt(Math.pow(this.x-this.startX,2)+Math.pow(this.y-this.startY,2)) >= this.distance) // snap if finished
    {
    	MAP.pop(this)
        this.x = x;
        this.y = y;
        MAP.push(this)
        this.isMoving = false;
    }
	else 
	{
	    this.isMoving = setTimeout.call(this, moveTowards, this.loopSpeed, x, y)
	}
};



Dot.prototype.move = function(x, y) {
	this.x = x;
	this.y = y;
}

Dot.prototype.getColor = function() {
	if (this == elementSelected) return COLORS.dots.active
	else if (this.highlighted)  return COLORS.dots.highlighted
    else if (this.highlighted2)  return COLORS.dots.highlighted2
	else return COLORS.dots.default
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