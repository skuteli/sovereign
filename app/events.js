define(['jquery', "app/animations"], function($, animations) {

    $(document).ready(function(){
        $('canvas')
            .click(function(e) //Left click
            {
                x = e.pageX - $(this).offset().left
                y = e.pageY - $(this).offset().top
                elementSelected = MAP.getFirst({x:x,y:y},10,Dot)
                console.log(elementSelected)
                // DOTS.forEach(
                //     checkIfClicked
                //     )
            })
            .mousedown(function(e) //Right click
            {
                if(e.which == 3) //1: left, 2: middle, 3: right
                {
                    x = e.pageX - $(this).offset().left
                    y = e.pageY - $(this).offset().top
                    if (elementSelected){
                        animations.setTargetingAnimation(x,y);
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
            })
            .mousemove(function(e) 
            {
            	var hoveredElement
            	x = e.pageX - $(this).offset().left
                y = e.pageY - $(this).offset().top
            	hoveredElement=MAP.getFirst({x:x,y:y},5,Dot)
            	hoveredElement ? $('#tooltip').css({left:x+20, top:y+20}).text(hoveredElement.constructor.name) : void(0)
            })
    })


    checkIfClicked = function (element) {
                if (Math.abs(x - element.x) < element.radius && Math.abs(y - element.y) < element.radius) 
                 {
                    elementSelected = element;
                 }
    }             

});