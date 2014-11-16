"use strict";

define(["app/model/cartesian", "app/model/mapObject"], function (Cartesian, MapObject) {

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
    if (!MAP.isInMap(target)) {
        throw new Error('trying to go beyond map ' + target.constructor.name + ' located at x: '+target.x+', y: '+target.y)
    }
    
    if (this.movement) QUEUE.clear(this.movement.timer)

    let distance = this.distanceTo(target)
    this.movement = {
         distance : distance
        ,start : new Cartesian(this)
        ,direction : new Cartesian({
             x: (target.x-this.x) / distance
            ,y: (target.y-this.y) / distance            
        })
        ,target : new Cartesian(target)
    }
    
    if (this.movement.distance) this.moveTowards(target)
};

MovingObject.prototype.moveTowards = function moveTowards() {

    let newLocation = new Cartesian({
        x:this.x+this.movement.direction.x * this.moveSpeed * this.loopSpeed
       ,y:this.y+this.movement.direction.y * this.moveSpeed * this.loopSpeed
    })

    if (newLocation.distanceTo(this.movement.start) >= this.movement.distance) // snap if finished
    {
        this.setLocation(this.movement.target)
        delete this.movement
    }
    else {
        this.setLocation(newLocation)
        this.movement.timer = QUEUE.add(moveTowards, this, this.loopSpeed)
    }
}

MovingObject.prototype.goToNearest= function(klass, limit) {
    limit ? void(0):limit=100

    let foundObject = MAP.getFirst(this, limit, klass)
    if (foundObject) {
        // console.log(klass.name + " found. Distance:" + Math.hypot(this.x-object.x,this.y-object.y))
        this.goTo(foundObject)
    }
    else {
        // console.log("Nothing found...")
    }
}

return MovingObject

});