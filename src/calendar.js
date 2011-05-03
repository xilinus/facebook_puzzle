Calendar = (function(scope) {
  var MAX_WIDTH = 600;
  
  /**
  Lays out events for a single  day
 
  @param array  events  
   An array of event objects. Each event object consists of a start time, end
   Time (measured in minutes) from 9am, as well as a unique id. The
   Start and end time of each event will be [0, 720]. The start time will
   Be less than the end time.  The array is not sorted.
 
   @return array
   An array of event objects that has the width, the left and top positions set,
   In addition to start time, end time, and id. 
  **/
 
  function layOutDay(events) {
    // Columns is an array of event's array.
    var columns = [];
    for (var i = events.length - 1; i >= 0; i--) {
      // Create an Event object from params
      var event = Event.fromParams(events[i]);

      // Set column to first column
      event.column = 0;
      
      // Find if an existing column can have enough space to display current event
      while (event.column < columns.length) {
        // If the event cannot be added to current column, try next column
        if (hasOverlap(columns[event.column], event)) {
          event.column ++;
        }
        // Else, just break the current loop
        else {
          break;
        } 
      }
      // Create a new column if need be
      if (event.column == columns.length) {
        columns.push([]);
      }
      columns[event.column].push(event);
    }
    
    return _postProcess(columns);
  }
  
  function _computeEventPosition(event, columns) {
    // Compute top/left position
    event.left = event.column * MAX_WIDTH / columns.length;
    event.top = event.start
    
    // Compute width
    event.width = MAX_WIDTH / columns.length;
    
    // Remove temporary variable
    delete event.column;

    return event;
  }
  
  function _postProcess(columns) {
    var events = [];
    for (var i = columns.length - 1; i >= 0; i--) {
      var column = columns[i];
      for (var j = column.length - 1;  j >= 0; j--) {
        events.push(_computeEventPosition(column[j], columns))
      }
    }
    return events;
  }
  if (scope) {
    scope.layOutDay = layOutDay;
  } 
})(window);
