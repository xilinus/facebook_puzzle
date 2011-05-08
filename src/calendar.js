Calendar = (function() {
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
    // First pass: processed events list, create Event object, set left to column position
    var results = _.inject(eventParams, function(processedEvents, params) {
      // Create an Event object from params
      var event = Event.fromParams(params);
      
      // Compute event position
      _computeEventPosition(event, _getOverlapEvents(event, processedEvents));
      
      // Add current event to processed events list
      processedEvents.push(event);
      return processedEvents;
    }, []);
    
    // Second pass: compute left and width
    _computeLeftAndWidth(results);
    return results;
  }
  
  function _getOverlapEvents(event, events, options) {
    options = options || {};
    
    // Get overlaping events for a specific event
    var overlapEvents = _.inject(events, function(array, item) {
      if (item.isOverlap(event)) {
        array.push(item);
      }
      return array;
    }, []);
    // If recusrive option is true, process all 
    if (options.recusrive) {
      options.processedEvents  = (options.processedEvents || []);
      options.processedEvents.push(event);
      
      _.each(overlapEvents, function(e) {
        if (!_.include(options.processedEvents, e)) {
          overlapEvents = overlapEvents.concat(_getOverlapEvents(e, events, options));
        }
      });
    }
    return _.uniq(overlapEvents);
  }
    
  function _computeColumnPosition(newEvent, events) {
    var columns = [];
    for (var i = 0; i <= events.length; i++) {
      columns.push({left:i, free:true});
    }
    _.each(events, function(event) {
      var item = _.detect(columns, function(i) {return i.left == event.left});
      if (item) {
        item.free = false;
      }
    });
    var pos = _.detect(columns, function(i) {return i.free});
    return pos ? pos.left : events.length;
  }
    
  function _computeEventPosition(newEvent, events) {  
    // Set top/height to new event
    newEvent.top = newEvent.start;
    newEvent.height = newEvent.end - newEvent.start;
    
    var left = _computeColumnPosition(newEvent, events);
    newEvent.left = left;
    newEvent.width = null; // Will be computed in second pass
  }
  
  function _computeLeftAndWidth(events) {
    _.each(events, function(event) {
      if (_.isNull(event.width)) {
        var overlapEvents = _getOverlapEvents(event, events, {recusrive: true}),
            nbColumns = _.max(overlapEvents, function(e) {return e.left}).left + 1,
            width = MAX_WIDTH / nbColumns;
        _.each(overlapEvents, function(e) {
          e.left *= width;
          e.width = width;
        });
      }
    });
  }
  return {layOutDay: layOutDay}
})();

// Add layOutDay in global window context to fit requirements
window.layOutDay = Calendar.layOutDay;