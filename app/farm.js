Farm = function (x,y, intent) {
	this.x = x || 100
	this.y = y || 100
	MAP.push(this)
	// this.radius = Math.random() * 10
	this.power = Math.random() * 10
	//this.live();
}