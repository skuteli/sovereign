"use strict";

define([], function () {
	let Cartesian = function (location) {
		if (location) {
			this._x=location.x
			this._y=location.y
		}
		else {
		}
	}

	Cartesian.prototype.setLocation = function(location) {
		this._x = location.x
		this._y = location.y
	}

	Cartesian.prototype.distanceTo = function(location) {
		return Math.hypot(this.x-location.x, this.y-location.y)
	}

    Object.defineProperties(Cartesian.prototype, {
    	'x' : {
	        get: function () {
	            return this._x
	        },
	        set: function (value) {
	            throw new Error("Please don't try to set x directly. Use cartesian methods like setLocation")
	        }
	    }

	    ,'y' : {
	        get: function () {
	            return this._y
	        },
	        set: function (value) {
	            throw new Error("Please don't try to set y directly. Use cartesian methods like setLocation")
	        }
	    }
    })

	return Cartesian
});
