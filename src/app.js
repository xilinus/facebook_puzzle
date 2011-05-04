App = (function() {
  var MARGIN_LEFT = 10,
      BORDER_LEFT = 5,
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

var set1 = [ {id : 1, start : 60, end : 120},  // an event from 10am to 11am 
             {id : 2, start : 100, end : 240}, // an event from 10:40am to 1pm 
             {id : 3, start : 700, end : 720}  // an event from 8:40pm to 9pm 
           ];              
var set2 = [ {id: 1, start: 30, end: 150},   // an event from 9:30am to 11:30am 
             {id: 2, start: 540, end: 600},  // an event from 6:00pm to 7:00pm 
             {id: 3, start: 560, end: 620},  // an event from 6:20pm to 7:20pm 
             {id: 4, start: 615, end: 675}  // an event from 7:15pm to 8:15pm 
           ];
var set3 = [ {id: "A", start: 60, end: 120},  // an event from 10:00am to 11:00am
             {id: "B", start: 90, end: 165},  // an event from 10:30am to 11:45pm
             {id: "C", start: 105, end: 240}, // an event from 10:45am to 13:00pm
             {id: "D", start: 135, end: 195}, // an event from 11:15am to 12:15pm
             {id: "E", start: 180, end: 270}, // an event from 12:00pm to 13:30pm
             {id: "F", start: 210, end: 300}, // an event from 12:30pm to 14:00pm
             {id: "G", start: 480, end: 540}  // an event from 17:00pm to 18:00pm

           ];
App.displayEvents(set3);
              
