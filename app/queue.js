// this will manage all actions as a queue; initially will just allow to stop/start 
define([], function() {
// subclassing array here. http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_direct_property_injection
// https://github.com/jokeyrhyme/js-sub-array-tests
Queue = function Queue() {
  var arr = [ ];
  arr.add = function(callback, hostObject, delay, args) {
  	if (args) args = Array.prototype.slice.call(arguments, 3);
  	timer = (function (that) {
	  var timer = setTimeout(function(){
  		callback.apply(hostObject, args)
  		that[timer] = undefined
	  }, delay)
	  return timer
	})(this);
	this[timer] = {callback:callback, hostObject: hostObject, arguments: arguments}
	this[timer].scheduled = performance.now() + delay
	return timer
  };

  arr.resume = function() {
	this.forEach(function(v,k){
		this[k] = undefined
		this.add(v.callback, v.hostObject, this.scheduled+performance.now())
	})
  };
  arr.pause = function() {
	this.forEach(function(v, k){
		if (v) {
			console.log("paused")
			v.scheduled-=performance.now()
			clearTimeout(k)
		}
	})
  };
  arr.clear = function(timer) {
  	this[timer]=undefined
	clearTimeout(timer)
  };
  return arr;
}

return Queue

});