"use strict";

define(["app/model/mapObject"], function (MapObject) {
let MovingObject = function (x,y) {

    MapObject.call(this, x, y)
}

MovingObject.prototype = Object.create(MapObject.prototype, {
    constructor: {
        value:MovingObject
    }
})

MovingObject.prototype.goTo = function goTo(target) {
    // console.log("Going to move from x:"+ this.x + ", y:" + this.y +" towards "+ target)
    if (!MAP.isInMap(target)) {throw new Error('trying to go beyond map' + target.constructor.name + 'located at x: '+target.x+', y: '+target.y)}
    if (this.movement)
    {
        QUEUE.clear(this.movement.timer)
    }
    this.movement = {}
    this.movement.distance = Math.hypot(target.x-this.x,target.y-this.y);
    // this.movement.distance = Math.sqrt(Math.pow(target.x-this.x,2)+Math.pow(target.y-this.y,2));
    this.movement.startX = this.x;
    this.movement.startY = this.y;
    this.movement.directionX = (target.x-this.x) / this.movement.distance;
    this.movement.directionY = (target.y-this.y) / this.movement.distance;
    if (this.movement.distance) this.moveTowards(target)
};

MovingObject.prototype.reachedOrPassedDestination = () => Math.hypot(this.x-this.movement.startX, this.y-this.movement.startY) >= this.movement.distance



MovingObject.prototype.moveTowards = function moveTowards(target) {

    MAP.pop(this)

    this.x += this.movement.directionX * this.moveSpeed * this.loopSpeed
    this.y += this.movement.directionY * this.moveSpeed * this.loopSpeed


    if(this.reachedOrPassedDestination()) // snap if finished
    {
        this.x = target.x;
        this.y = target.y;
        MAP.push(this)
        delete this.movement
    }
    else 
    {
        MAP.push(this)
        this.movement.timer = QUEUE.add(moveTowards, this, this.loopSpeed, target)
    }
};


MovingObject.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
}


MovingObject.prototype.goToNearest= function(klass, limit) {
    limit?void(0):limit=100
    let object = MAP.getFirst(this, limit, klass)
    if (object) {
        console.log(klass.name + " found. Distance:" + Math.hypot(this.x-object.x,this.y-object.y))
        this.goTo(object)
    }
    else {console.log("Nothing found...")}
}


return MovingObject
});