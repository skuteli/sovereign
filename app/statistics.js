$(document).ready(
	function(){
		ko.applyBindings(VIEWMODEL, document.getElementById('stats'));
	}
)

function ViewModel() {
	this.stats={}
    this.stats.timers = {}
    this.stats.timers.mapCreate=new ko.observable()
    this.stats.timers.dotsCreate=new ko.observable()
    this.stats.timers.draw=new ko.observable()
    this.stats.counters = {}
    this.stats.counters.dots=new ko.observable()
}

VIEWMODEL = new ViewModel()

