define([], function () {

testObjects= {}

testObjects.RandomNearbyLocation = function (rootLocation) {
	x=rootLocation.x+(Math.random()-0.5)*50
	y=rootLocation.y+(Math.random()-0.5)*50
	if (MAP.isInMap({x:x,y:y})) {
		this.x=x
		this.y=y
	}
	else {
		this.x = rootLocation.x
		this.y = rootLocation.y
	}
}

return testObjects

});