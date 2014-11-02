define(["app/model/mapObject", "configuration/colors"], function (MapObject, colors) {


Farm = function Farm (x,y, intent) {
	MapObject.call(this, x, y)
	// this.radius = Math.random() * 10
	this.power = Math.random() * 10
	//this.live();
}

Farm.prototype.getColor = function() {
    return colors.farms.default
}

});