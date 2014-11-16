"use strict";

define(["app/helpers", "app/animations", "configuration/colors"], function(helpers, animations, colors) {

window.CANVAS= document.querySelector( 'canvas' )
window.CONTEXT = CANVAS.getContext( '2d' )

let exports={}

exports.animate = function animate(canvas) {
    helpers.startTimer('draw')
    draw();
    helpers.stopTimer('draw')
    // setTimeout(animate, 200)
    requestAnimFrame( animate );
}

function draw() {

    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    for (var i = 0; i<DOTS.length; i++) {
    	drawDot(DOTS[i])
        drawFarm(FARMS[i])
    }
    animations.animations.forEach(
        animations.drawAnimation
      )
}

let drawFarm = function (farm) {
    CONTEXT.beginPath();
    CONTEXT.fillStyle = farm.getColor();
    CONTEXT.arc(farm.x, farm.y, 2, 0, Math.PI * 2, true);
    CONTEXT.fill();
    CONTEXT.closePath();    
}


let drawDot = function (dot) {
    CONTEXT.beginPath();
    CONTEXT.fillStyle = dot.getColor();
    CONTEXT.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, true);
    CONTEXT.fill();
    CONTEXT.closePath();
    if (true) {
      //draw lines to vassals
      CONTEXT.strokeStyle = colors.lines.vassal;
      dot.vassals.forEach(function(vassal){
        CONTEXT.beginPath();
        CONTEXT.moveTo(dot.x, dot.y);
        CONTEXT.lineTo(vassal.x, vassal.y);
        CONTEXT.stroke();     
        CONTEXT.closePath();
      })
      //draw line to lord
      if (dot.lord) {
        CONTEXT.beginPath();
        CONTEXT.strokeStyle = colors.lines.lord;
        CONTEXT.moveTo(dot.x, dot.y);
        CONTEXT.lineTo(dot.lord.x, dot.lord.y);
        CONTEXT.stroke();  
        CONTEXT.closePath();
      }
    }
}

return exports

});