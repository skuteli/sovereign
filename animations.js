
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