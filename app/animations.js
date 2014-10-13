define(["app/canvas"], function(canvas) {

var exports = {}

exports.animations = new Array;

exports.drawAnimation = function (animation) {
  if (animation.type=="targeting") {
      if (animation.step > 20) {
        exports.animations.pop();
      }
      if (!animation.step) animation.step = 5;
      CONTEXT.strokeStyle = 'rgba(200,100,100, 0.5)';
      CONTEXT.fillStyle = 'rgba(200,100,100, 0.1)';
      CONTEXT.lineWidth = 2;
      CONTEXT.beginPath();
      CONTEXT.arc(animation.x, animation.y, animation.step, 0, Math.PI * 2, true);
      CONTEXT.closePath();
      CONTEXT.fill();      
      CONTEXT.stroke();
      animation.step+=0.5;
  }
}

exports.setTargetingAnimation = function setTargetingAnimation(x,y)
{
  exports.animations.push({type:"targeting", x:x, y:y})
}

return exports;

});