
require([
	  "knockout"
	, "app/canvas.js"
	, "app/helpers.js"
	, "app/statistics.js"
	, "app/map.js"
	, "configuration/config.js"
	, "configuration/colors.js"
	, "app/animations.js"
	, "app/model/mapObject.js"
	, "app/model/dot.js"
	, "app/model/farm.js"
	],
function (ko, canvas, helpers, ViewModel, Map) {

var rhytm = 100;
window.elementSelected = false;


initDots = function initDots () {
  var i = 0
  window.DOTS = new Array
  while (i < CONFIG.dotsCount) {
      DOTS.push(new Dot(Math.floor((Math.random() * CANVAS.width)), Math.floor((Math.random() * CANVAS.height))));
      i++
  }
  i=0
  window.FARMS = new Array
  while (i < CONFIG.farmsCount) {
      FARMS.push(new Farm(Math.floor((Math.random() * CANVAS.width)), Math.floor((Math.random() * CANVAS.height))));
      i++
  }
}

window.VIEWMODEL = new ViewModel()


helpers.startTimer('mapCreate')
window.MAP = new Map(CANVAS)
helpers.stopTimer('mapCreate')

helpers.startTimer('dotsCreate')
initDots()
helpers.stopTimer('dotsCreate')

canvas.animate(canvas)


$(document).ready(
	function(){
		ko.applyBindings(VIEWMODEL, document.getElementById('stats'));
	}
)


});


require(["app/events.js"],
function () {});