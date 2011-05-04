App = (function() {
  var MARGIN_LEFT = 10,
      BORDER_LEFT = 3,
      PADDING_LEFT = 5,
      canvas = document.getElementById("canvas");
      
  function createCalendarElement(event) {
    var element = document.createElement("div"),
        style = element.style;

    element.className = "event";
    style.top = event.top + "px";
    style.left = MARGIN_LEFT + event.left + "px";
    style.width = event.width  - BORDER_LEFT - PADDING_LEFT + "px";
    style.height = event.height + "px";

    element.innerHTML = "Event ID #" + event.id;
    return element;
  }

  function displayEvents(events) {
    // Clear canvas
    canvas.innerHTML = '';
    _.each(layOutDay(events), function(event) {
      canvas.appendChild(createCalendarElement(event));
    });
  }

  return {displayEvents: displayEvents}
})();

var events =  [{id : 1, start : 60, end : 120},  // an event from 10am to 11am 
               {id : 2, start : 100, end : 240}, // an event from 10:40am to 1pm 
               {id : 3, start : 700, end : 720}  // an event from 8:40pm to 9pm 
              ];              
App.displayEvents(events);
              
