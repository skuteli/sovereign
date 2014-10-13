define(["app/helpers", "app/animations", "configuration/colors"], function(helpers, animations, colors) {

window.CANVAS= document.querySelector( 'canvas' )
window.CONTEXT = CANVAS.getContext( '2d' )

exports.animate = function animate(canvas) {
    helpers.startTimer('draw')
    draw();
    helpers.stopTimer('draw')
    requestAnimFrame( animate );
}

function draw() {

    // var time = new Date().getTime() * 0.002;
    // var x = Math.sin( time ) * 192 + 256;
    // var y = Math.cos( time * 0.9 ) * 192 + 256;
    // toggle = !toggle;

    // context.fillStyle = toggle ? 'rgb(200,200,20)' :  'rgb(20,20,200)';
    // context.beginPath();
    // context.arc( x, y, 10, 0, Math.PI * 2, true );
    // context.closePath();
    // context.fill();
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    for (var i = 0; i<DOTS.length; i++) {
    	drawDot(DOTS[i])
    }
    animations.animations.forEach(
        animations.drawAnimation
      )
}

drawDot = function (dot) {
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