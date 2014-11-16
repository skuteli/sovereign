"use strict";

// this will manage all actions as a queue; initially will just allow to stop/start 
define([], function() {
// subclassing array here. http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_direct_property_injection
// https://github.com/jokeyrhyme/js-sub-array-tests
let Queue = function Queue() {
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
    value: function(callback, hostObject, delay, callbackArguments) {
            if (!callback||!hostObject||!delay) {
              debugger;
            }

            let applyAction = (function () {
                  callback.apply(hostObject, callbackArguments)
                  delete this[timer]          
            }).bind(this)

            let timer = setTimeout(applyAction, delay)
            this[timer] = {callback:callback, hostObject: hostObject, arguments: callbackArguments}
            this[timer].scheduled = performance.now() + delay
            return timer
    }
    ,enumerable:false
  }

  ,resume : {
    value: function() {
          for (let key in this) {
            if (!this[key] || !this[key].callback) {
            debugger;
          }
          console.log("resumed")

          this.add(this[key].callback, this[key].hostObject, this[key].scheduled, this[key].arguments)
          delete this[key]
        }
        this.isRunning = true
    }
    ,enumerable:false
  }

  ,pause : {
      value: function() {
        for (let key in this) {
          if (this[key]) {
            console.log("paused")
            
            this[key].scheduled-=performance.now()
            clearTimeout(key)
          }
        }
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