Calendar = (function(context) {
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
 
  function layOutDay(eventParams) {
    // Processed events list
    var results = [];
    _.each(eventParams, function(params) {
      // Create an Event object from params
      var event = Event.fromParams(params);
      
      // Get overlaping events from already processed events
      var overlapEvents = _.inject(results, function(array, item) {
        if (item.isOverlap(event)) {
          array.push(item);
        }
        return array;
      }, []);
      
      // Compute event position
      overlapEvents.push(event)
      _computeEventsPosition(overlapEvents);
      
      // Add current event to processed events list
      results.push(event);
    });
    
    return results;
  }
    
  function _computeEventsPosition(events) {
    // Compute position
    
    // Compute size
    var index = 0, size = MAX_WIDTH / events.length;
    _.each(events, function(event) {
      event.top = event.start;
      event.left = index * size;
      event.width = size;
      event.height = event.end - event.start;
      index++;
    });
  }
  
  /// Add layOutDay in global window context to fit requirements
  (context || window).layOutDay = layOutDay;
})();
