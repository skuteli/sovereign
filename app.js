var rhytm = 100;
var elementSelected = false;

// Enable the passage of the 'this' object through the JavaScript timers
 
var __nativeST__ = window.setTimeout, __nativeSI__ = window.setInterval;
 
window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
  var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeST__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};
 
window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
  var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeSI__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};



// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

var canvas, context, toggle;
window.onload = function (){
init();
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
    context.fillStyle = dot.getColor();
    context.beginPath();
    context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}


var animations = new Array;

var drawAnimation = function (animation) {
  if (animation.type=="targeting") {
      if (animation.step > 20) {
        animations.pop();
      }
      if (!animation.step) animation.step = 5;
      context.strokeStyle = 'rgba(200,100,100, 0.5)';
      context.fillStyle = 'rgba(200,100,100, 0.1)';
      context.lineWidth = 2;
      context.beginPath();
      context.arc(animation.x, animation.y, animation.step, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();      
      context.stroke();
      animation.step+=0.5;
  }
}

function setTargetingAnimation(x,y)
{
  animations.push({type:"targeting", x:x, y:y})
}