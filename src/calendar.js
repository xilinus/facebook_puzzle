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
      _computeEventsPosition(event, overlapEvents);
      overlapEvents.push(event)
      
      // Add current event to processed events list
      results.push(event);
    });
    
    return results;
  }
    
  function _computeEventsPosition(newEvent, events) {
    // Check if there is an empty space
    var hasEmptySlot = (events.length > 0 && events[0].width * events.length < MAX_WIDTH),    
        width = MAX_WIDTH / (events.length + 1);
  
    // Set top/height to new event
    newEvent.top = newEvent.start;
    newEvent.height = newEvent.end - newEvent.start;
    
    
    if (hasEmptySlot) {
      var leftPositions = [];
      for (var i = 0; i <= events.length; i++) {
        leftPositions.push({left:i * width, free:true});
      }
      _.each(events, function(event) {
        var item = _.detect(leftPositions, function(i) {return i.left == event.left});
        if (item) {
          item.free = false;
        }
      });
      var pos = _.detect(leftPositions, function(i) {return i.free});
      newEvent.left = pos.left;
      newEvent.width = events[0].width;      
    } else {
      newEvent.width = width;
      // Recompute width of existing events
      _.each(events, function(event) {
        event.width = width;
      });

      // Recompute existing events left position
      var index = 0;
      _.each(events, function(event) {
        event.left = index * width;
        index++;
      });

      // add new event 
      newEvent.left = events.length * width;
    }
  }
  
  /// Add layOutDay in global window context to fit requirements
  (context || window).layOutDay = layOutDay;
})();
