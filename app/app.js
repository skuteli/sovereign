var rhytm = 100;
var elementSelected = false;


var canvas, context, toggle;
window.onload = function (){
init()
startTimer('mapCreate')
MAP = new Map()
stopTimer('mapCreate')
startTimer('dotsCreate')
initDots()
stopTimer('dotsCreate')
animate()
}

function init() {
    canvas = document.querySelectorAll( 'canvas' )[0];
    context = canvas.getContext( '2d' );
}

function animate() {
    requestAnimFrame( animate );
    startTimer('draw')
    draw();
    stopTimer('draw')
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
    DOTS.forEach(
      drawDot
      )
    animations.forEach(
        drawAnimation
      )
}


initDots = function initDots () {
  var i = 0
  window.DOTS = new Array
  while (i < CONFIG.dotsCount) {
      DOTS.push(new Dot(Math.floor((Math.random() * canvas.width)), Math.floor((Math.random() * canvas.height))));
      i++
  }
  i=0
  window.FARMS = new Array
  while (i < CONFIG.farmsCount) {
      FARMS.push(new Farm(Math.floor((Math.random() * canvas.width)), Math.floor((Math.random() * canvas.height))));
      i++
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


