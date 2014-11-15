"use strict";

define(["app/model/movingObject", "app/model/farm", "configuration/colors"], function (MovingObject, Farm, colors) {

let Dot = function (x,y, intent) {
    this.isDead=false;
    this.isFarming=false;
    MovingObject.call(this, x, y)
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



Dot.prototype = Object.create(MovingObject.prototype, {
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
    // console.log("Dot is thinking.")
    this.detectAdjactentCollisions()
    // this.wander()
    if (!this.isFarming && !this.isMoving) {
        console.log("going to Farm")
        this.goToNearest(Farm)
    }

    else if (this.isFarming && !this.isMoving) {
    	if (Date.now()%3==0) {
    		this.isFarming=false
    		this.goToNearest(Dot)
    	}
    	else if (Date.now()%3==1) {
    		this.isFarming=false
    		this.goTo({x:this.x+(Math.random()-0.5)*50, y:this.y+(Math.random()-0.5)*50})
    	}
    }
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
Dot.prototype.thinkSpeed = 1000;
Dot.prototype.loopSpeed = 10;
Dot.prototype.moveSpeed = 0.2;

return Dot

});