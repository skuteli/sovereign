var rhytm = 100;
var elementSelected = false;


var canvas, context, toggle;
window.onload = function (){
init();
MAP = new Map();
initDots();
animate();
}

function init() {
    canvas = document.querySelectorAll( 'canvas' )[0];
    context = canvas.getContext( '2d' );
}

function animate() {
    requestAnimFrame( animate );
    draw();
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(
      drawDot
      )
    animations.forEach(
        drawAnimation
      )
}


initDots = function initDots () {
  dots = new Array;
  var i = 0
  while (i < 1000) {
      dots.push(new Dot(Math.floor((Math.random() * 1000) + 1), Math.floor((Math.random() * 1000) + 1)));
      i++;
  }
}

drawDot = function (dot) {
    context.beginPath();
    context.fillStyle = dot.getColor();
    context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
    if (true) {
      //draw lines to vassals
      
      context.strokeStyle = COLORS.lines.vassal;
      dot.vassals.forEach(function(vassal){
        context.beginPath();
        context.moveTo(dot.x, dot.y);
        context.lineTo(vassal.x, vassal.y);
        context.stroke();     
        context.closePath();
      })
      //draw line to lord
      if (dot.lord) {
        context.beginPath();
        context.strokeStyle = COLORS.lines.lord;
        context.moveTo(dot.x, dot.y);
        context.lineTo(dot.lord.x, dot.lord.y);
        context.stroke();  
        context.closePath();
      }
    }
}


