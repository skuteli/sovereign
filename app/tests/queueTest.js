define(["app/queue"], function(queue) {
	"use strict";
	var testObject = {name:"proper this"}
	testObject.method1 = function () {
		TESTS.queueTest.time1 = performance.now()
		console.count("method1")
		console.assert(TESTS.queueTest.time2 && TESTS.queueTest.time2<TESTS.queueTest.time1, "wrong execution order!")
	}
	testObject.method2 = function () {
		TESTS.queueTest.time2 = performance.now()
		console.info("method2. should execute before method1.")
	}

	var queueTest = function test (){
		var queue = new Queue
		var start = performance.now()
		test.time1 = false
		test.time2 = false
		var i = 0
		while (i < 5) {
		      queue.add(testObject.method1, testObject, 500)
		      i++
		} 

		queue.add(testObject.method2, testObject, 10)

		setTimeout(function(){
			console.assert(TESTS.queueTest.time1&&TESTS.queueTest.time2, "callbacks not executed (1000ms).")
		}, 2000)
	}

	return queueTest
});