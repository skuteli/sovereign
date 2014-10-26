define(['jquery', 'knockout'], function($, ko) {

function ViewModel() {
    this.stats={}
    this.stats.timers = {}
    this.stats.timers.mapCreate= ko.observable()
    this.stats.timers.dotsCreate= ko.observable()
    this.stats.timers.draw= ko.observable()
    this.stats.counters = {}
    this.stats.counters.dots= ko.observable()
    this.isRunning = ko.observable(true)
}

return ViewModel

});