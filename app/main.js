"use strict";

require([
      "knockout"
    , "configuration/config"
    , "configuration/colors"
    , "app/canvas"
    , "app/helpers"
    , "app/statistics"
    , "app/map"
    , "app/queue"
    , "app/events"
    , "app/model/dot"
    , "app/model/farm"
    ],
function (ko, config, colors, canvas, helpers, ViewModel, Map, Queue, events, Dot, Farm) {

var rhytm = 100;
window.elementSelected = false;


var initDots = function initDots () {
  var i = 0
  window.FARMS = new Array
  while (i < CONFIG.farmsCount) {
      FARMS.push(new Farm(Math.floor((Math.random() * CANVAS.width)), Math.floor((Math.random() * CANVAS.height))));
      i++
  }
  i=0
  window.DOTS = new Array
  while (i < CONFIG.dotsCount) {
      DOTS.push(new Dot(Math.floor((Math.random() * CANVAS.width)), Math.floor((Math.random() * CANVAS.height))));
      i++
  }
}

window.VIEWMODEL = new ViewModel()


helpers.startTimer('mapCreate')
window.MAP = new Map(CANVAS)
window.QUEUE = new Queue
helpers.stopTimer('mapCreate')

helpers.startTimer('dotsCreate')
initDots()
helpers.stopTimer('dotsCreate')

canvas.animate(canvas)


$(document).ready(
    function(){
        ko.applyBindings(VIEWMODEL, document.getElementById('stats'));

        events()
    }
)


});


// require(["app/events.js"],
// function () {});


if (true) require(["app/tests/queueTest"], 
    function (queueTest) {
        window.TESTS = {}
        TESTS.queueTest = queueTest
        console.log("tests loaded. run with TESTS.testName()")});