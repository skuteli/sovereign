// this will manage all actions as a queue; initially will just allow to stop/start 
define([], function() {
// subclassing array here. http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_direct_property_injection
// https://github.com/jokeyrhyme/js-sub-array-tests
Queue = function Queue() {
	Object.defineProperty(this, "_isRunning", {
			value: true
	  		,writable : true
	  		,enumerable : false
	})
	Object.defineProperty(this, "isRunning", {
			set : function(v) {
	  			VIEWMODEL.isRunning(v)
	  			this._isRunning = v
	  		}
	  		,get : function() {
	  			return this._isRunning
	  		}
	})
}
  

Object.defineProperties(Queue.prototype, {
  add : {
    value: function(callback, hostObject, delay, args) {
		    if (args) args = Array.prototype.slice.call(arguments, 3);
		        timer = (function (that) {
		        var timer = setTimeout(function(){
		          callback.apply(hostObject, args)
		          delete that[timer]
		        }, delay)
		        return timer
		    })(this);
		    this[timer] = {callback:callback, hostObject: hostObject, arguments: arguments}
		    this[timer].scheduled = performance.now() + delay
		    return timer
    }
    ,enumerable:false
  }

  ,resume : {
	value: function() {
	      for (key in this) {
	        if (!this[key].callback) {
	        debugger;
	      }
	      console.log("resumed")

	      this.add(this[key].callback, this[key].hostObject, this[key].scheduled)
	      delete this[key]
	    }
	    console.log(performance.now())
	    this.isRunning = true
    }
    ,enumerable:false
  }

  ,pause : {
  	value: function() {
	    for (key in this) {
	      if (this[key]) {
	        console.log("paused")
	        
	        this[key].scheduled-=performance.now()
	        clearTimeout(key)
	      }
	    }
	    console.log(performance.now())
	    this.isRunning = false
	  }
	,enumerable:false
  }

  ,toggle : {
  	value: function() {
  		this.isRunning ? this.pause() : this.resume()
    }
    ,enumerable:false
  }

  ,clear : {
  	value: function(timer) {
      this[timer]=undefined
    clearTimeout(timer)
    }
    ,enumerable:false
  }
})

return Queue

});