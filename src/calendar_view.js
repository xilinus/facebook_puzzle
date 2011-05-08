CalendarView = (function() {
  var MARGIN_LEFT = 10,
      BORDER = {left: 4, right: 1, top: 1, bottom: 1},
      PADDING_LEFT = 5,
      canvas = document.getElementById("canvas");

  /**
  Private method
  Creates an event element to be added in a calendar canvas.
 
  @param object event
    event with top/left/width/height computed attributes

  @return DOMElement
    <div class="event" style="top: TOP; left: LEFT; width: WIDTH; height: HEIGTH;" title="Event ID #EVENT_ID">
      <p>Event ID #EVENT_ID</p>
    </div>
  **/ 
  function _createCalendarElement(event) {
    var element = document.createElement("div"),
        style = element.style;

    element.className = "event";
    style.top = event.top + "px";
    style.left = MARGIN_LEFT + event.left + "px";
    style.width = event.width  - BORDER.left - BORDER.right - PADDING_LEFT + "px";
    style.height = event.height - BORDER.top - BORDER.bottom + "px";

    element.innerHTML = "<p>Event ID #" + event.id + "</p>";
    element.title = element.innerHTML;
    return element;
  }

  /**
  Private method
  Displays a list of events inside a calendar day canvas.
 
  @param array events  
    An array of event objects. Each event object consists of a start time, end
    Time (measured in minutes) from 9am, as well as a unique id. The
    Start and end time of each event will be [0, 720]. The start time will
    Be less than the end time.  The array is not sorted.
 
  **/ 
  function displayEvents(events) {
    // Clear canvas
    canvas.innerHTML = '';
    // Add each event to canvas
    _.forEach(layOutDay(events), function(event) {
      canvas.appendChild(_createCalendarElement(event));
    });
  }

  return {displayEvents: displayEvents}
})();