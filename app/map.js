define(["app/canvas"], function (canvas) {

    Map = function(canvas) {
        this.width = canvas.width
        this.height = canvas.height
        this.data = new Array(this.width)
        for (var i = 0; i<this.width; i++) {
            this.data[i]= new Array(this.height)
            for (var j = 0; j<this.width; j++) {
                this.data[i][j]= []
            }
        }
        return this;
    }

    Map.prototype.isInMap = function(o) {
        if (o.x>0&&o.x<this.width&&o.y>0&&o.y<this.height) {
            return true;
        }    else return false
    }


    Map.prototype.push = function(o) {
        this.data[Math.round(o.x)][Math.round(o.y)].push(o)
    }


    Map.prototype.pop = function(o) {
        this.data[Math.round(o.x)][Math.round(o.y)].pop(o)
    }


    Map.prototype.getFirstBiased = function(location, radius, klass) {

        console.log("looking for nearest "+ klass.name + " from x:" +location.x+", y:"+location.y+" in square "+radius+" wide.")

        var result
          , klass = klass || Object //Class filter
          , x=Math.round(location.x)
          , y=Math.round(location.y)

        for (var i = -radius; i<=radius; i++) {
            for (var j = -radius; j<=radius; j++) {
                if (x+i>=0 &&
                    x+i<this.width &&
                    y+j>=0 &&
                    y+j<this.height) {
                    result = this.data[x+i][y+j][0]
                    if (
                        result && 
                        result instanceof klass &&
                        result.x-x<radius && 
                        result.y-y<radius &&
                        result!=location) // don't push element itself
                        {
                            console.log("Found "+ klass.name + ". Returning from map.")
                            return result
                        }
                }
            }
        }

        return false
    }


    Map.prototype.throwFirstFromPoint= function(x,y, klass, excludedElement) {
        if (this.isInMap({x:x, y:y})) {
            result=this.data[x][y].findFirst(function(el){
                    return el instanceof klass
                })
            if (result && result!=excludedElement) throw result
        }
    }



    Map.prototype.getFirst = function(location, radius, klass) {

        console.log("looking for nearest "+ klass.name + " from x:" +location.x+", y:"+location.y+" in radius "+radius+".")
        var klass = klass || Object //Class filter
          , x=Math.round(location.x)
          , y=Math.round(location.y)
        try {
            // check the point where we start
            this.throwFirstFromPoint(x, y, klass, location)
            // iterate over radiuses from 1 (0 already covered)
            for (var currentRadius = 1; currentRadius<=radius; currentRadius++) {
                // check left edge 
                this.throwFirstFromPoint(x-currentRadius, y, klass, location)
                // run from left to right
                for (var i = -currentRadius+1; i<=currentRadius-1; i++) {
                    // check the field above the x axis
                    this.throwFirstFromPoint(x+i, y+(currentRadius-Math.abs(i)), klass, location)
                    // check the field below the x axis
                    this.throwFirstFromPoint(x+i, y-(currentRadius-Math.abs(i)), klass, location)
                }
                this.throwFirstFromPoint(x+currentRadius, y, klass, location)
            }
        }

        catch (e)
        {
            if (e instanceof klass) {
                console.info("Found "+ klass.name + ". Radius:"+ currentRadius +" Returning from map.")
                return e
            }
            else {
                throw e
            }
        }
        return false
    }


    Map.prototype.getAll = function(location,radius, klass) {
        
        var result = new Array
          , klass = klass || Object //Class filter
          , l
          , m
          , x=Math.round(location.x)
          , y=Math.round(location.y)

        for (var i = -radius; i<=radius; i++) {
            for (var j = -radius; j<=radius; j++) {
                if (x+i>=0 &&
                    x+i<this.width &&
                    y+j>=0 &&
                    y+j<this.height) {
                  m=this.data[x+i][y+j]
                  l=m.length
                }
                if (m && l){
                    for (var k = 0; k<l; k++) {
                        if (m[k]!=location) result.push(m[k]) // don't push element itself
                    }
                }
            }
        }

        return result
    }

    return Map

});