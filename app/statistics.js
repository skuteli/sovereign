define(['jquery', 'knockout'], function($, ko) {

function ViewModel() {
    this.stats={}
    this.stats.timers = {}
    this.stats.timers.mapCreate=new ko.observable()
    this.stats.timers.dotsCreate=new ko.observable()
    this.stats.timers.draw=new ko.observable()
    this.stats.counters = {}
    this.stats.counters.dots=new ko.observable()
}

return ViewModel

});