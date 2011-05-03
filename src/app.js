var events =  [{id : 1, start : 60, end : 120},  // an event from 10am to 11am 
               {id : 2, start : 100, end : 240}, // an event from 10:40am to 1pm 
               {id : 3, start : 700, end : 720}  // an event from 8:40pm to 9pm 
              ];
              
var displayedEvents = layOutDay(events);
var canvas = document.getElementById("canvas");

for (var i = displayedEvents.length - 1; i >= 0; i--) {
  var event = displayedEvents[i];
  var element = document.createElement("div"),
      style = element.style;

  element.className = "event";
  style.top = event.top + "px";
  style.left = event.left + "px";
  style.width = event.width + "px";
  style.height = event.height + "px";
  
  element.innerHTML = event.id;
  canvas.appendChild(element);
  break;
}

