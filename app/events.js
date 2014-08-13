$(document).ready(function(){


	$('canvas')
	    .click(function(e) //Left click
	    {
			x = e.pageX - $(this).offset().left
			y = e.pageY - $(this).offset().top
			elementSelected = MAP.getFirst({x:x,y:y},50,Dot)
			console.log(elementSelected)
			// DOTS.forEach(
			// 	checkIfClicked
			// 	)
	    })
	    .mousedown(function(e) //Right click
	    {
	        if(e.which == 3) //1: left, 2: middle, 3: right
	        {
	        	x = e.pageX - $(this).offset().left
				y = e.pageY - $(this).offset().top
	            if (elementSelected){
	            	setTargetingAnimation(x,y);
	            	elementSelected.goTo({x:Math.round(x), y:Math.round(y)})	
	            }  
	            else {
	            	console.log('no element selected.')
	            }
	        }
	    })
	    .dblclick(function(e) //Double click
	    {
	        //Do something
	    });

});


checkIfClicked = function (element) {
			if (Math.abs(x - element.x) < element.radius && Math.abs(y - element.y) < element.radius) 
			 {
		        elementSelected = element;
		     }
}		     