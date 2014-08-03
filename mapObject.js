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

MapObject.prototype.detectCollisions = function(){
	that=this
    for (var i = -this.scope; i<this.scope; i++) {
	    if (MAP[Math.round(this.x)+i].length) {  
	    	MAP[Math.round(this.x)+i].forEach(function(e){
	    		if (Math.abs(that.y - e.y) < that.scope) {
	    		  e.highlighted=true
	    		}
	    	})
	    }
	}
}
