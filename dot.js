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



Dot = function (x,y, intent) {
	this.x = x || 100;
	this.y = y || 100;
	this.radius = Math.random() * 10
}

Dot.prototype = new MapObject(); 


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
		this.moveTowards(target.x, target.y)
};


Dot.prototype.moveTowards = function moveTowards(x, y) {
    this.x += this.directionX * this.moveSpeed * this.loopSpeed;
    this.y += this.directionY * this.moveSpeed * this.loopSpeed;
    if(Math.sqrt(Math.pow(this.x-this.startX,2)+Math.pow(this.y-this.startY,2)) >= this.distance)
    {
        this.x = x;
        this.y = y;
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
};

Dot.prototype.getColor = function() {
	return  (this == elementSelected) ? 'rgba(200,0,0, 1)' : 'rgba(0,0,200,0.5)'
};



Dot.prototype.radius = 110;
Dot.prototype.loopSpeed = 10;
Dot.prototype.moveSpeed = 0.2;