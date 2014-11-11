define(['jquery', 'knockout'], function($, ko) {

    chart = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            if (element.nodeType==1) {
                c = document.createElement('canvas')
                c.style.width='200px'
                c.style.height='40px'
                c.start = Date.now()
                c.scale = function(axis, v) {
                    // w = this.width
                    // h = this.height
                    return v
                }

                c.drawLine = function(newX,newY,lastX,lastY) {
                    var ctx=this.getContext("2d")
                    ctx.strokeStyle = 'rgba(100,100,100, 1)'
                    ctx.beginPath()
                    ctx.moveTo(this.scale('X', lastX),this.scale('Y', lastY))
                    ctx.lineTo(newX,newY)
                    ctx.stroke()
                    c.lastX = newX
                    c.lastY = newY
                }
                c.addPoint = function(value) {
                    this.drawLine((Date.now()-this.start)/200, value*20, this.lastX, this.lastY)
                }

                element.appendChild(c)

            }
            else {
                console.error("chart binding doesnt work with virtual elements")
            }
        }

        , update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            c = element.firstElementChild

            c.addPoint(valueAccessor()())
        }
    }

ko.bindingHandlers.chart = chart

});