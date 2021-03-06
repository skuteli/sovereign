"use strict";

define(['jquery', "app/map", "app/animations", "app/model/dot"], function($, Map, animations, Dot) {

    let hookEvents = function() {

            $('canvas')
                .click(function(e) //Left click
                {
                    let x = e.pageX - $(this).offset().left
                    let y = e.pageY - $(this).offset().top
                    elementSelected = MAP.getFirst({x:x,y:y}, 10, Dot)
                    console.log("selected: ")
                    console.log(elementSelected)
                    // DOTS.forEach(
                    //     checkIfClicked
                    //     )
                })
                .mousedown(function(e) //Right click
                {
                    if(e.which == 3) //1: left, 2: middle, 3: right
                    {
                        let x = e.pageX - $(this).offset().left
                        let y = e.pageY - $(this).offset().top
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

                if (CONFIG.display.tooltipsEnabled) {
                  $('canvas')  
                    .mousemove(function(e) 
                    {
                    	var hoveredElement
                    	let x = e.pageX - $(this).offset().left
                        let y = e.pageY - $(this).offset().top
                    	hoveredElement=MAP.getFirst({x:x,y:y},5,Dot)
                    	hoveredElement ? $('#tooltip').css({left:x+20, top:y+20}).html(hoveredElement.constructor.name +"<br/>"+  JSON.stringify(hoveredElement
                            , function replacer(key, value) {
                                if (key === "vassals") 
                                    {
                                        return value.length;
                                    } 
                                if (key === "movement") return undefined
                                return value;
                            }
                            , 2).replace(/[\"\{\}]/g, "")) : void(0)
                    })
                }
        }


        let checkIfClicked = function (element) {
                    if (Math.abs(x - element.x) < element.radius && Math.abs(y - element.y) < element.radius) 
                     {
                        elementSelected = element;
                     }
        } 
         

    return hookEvents

});