CalendarView = (function() {
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
    element.title = element.innerHTML;
    return element;
  }

  function displayEvents(events) {
    // Clear canvas
    canvas.innerHTML = '';
    // Add each event to canvas
    _.each(layOutDay(events), function(event) {
      canvas.appendChild(createCalendarElement(event));
    });
  }

  return {displayEvents: displayEvents}
})();