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
  function layOutDay(events) {
    // First pass: process each event object, create an Event object and and compute column position
    var results = _.reduce(events, function(processedEvents, params) {
      // Create an Event object from params
      var event = Event.fromParams(params);
      
      // Compute event column position
      event.column = _getFreeColumnPosition(_getOverlapEvents(event, processedEvents));
      event.width = null; // Will be computed in second pass
            
      // Add current event to processed events list
      processedEvents.push(event);
      return processedEvents;
    }, []);
    
    // Second pass: compute left and width in pixels
    _computeLeftAndWidth(results);
    return results;
  }
    
  /**
  Private Method
  Compute left and width position in pixels for a list of events
  Events should have been pre-processed to affect column position
  on each event.

  @param array events  
   An array of event objects. 

  **/ 
  function _computeLeftAndWidth(events) {
    _.forEach(events, function(event) {
      if (_.isNull(event.width)) {
        var overlapEvents = _getOverlapEvents(event, events, {recusrive: true}),
            nbColumns = _.max(overlapEvents, function(e) {return e.column}).column + 1,
            width = MAX_WIDTH / nbColumns;
        _.forEach(overlapEvents, function(e) {
          e.top = e.start;
          e.left = e.column * width;
          e.width = width;
          e.height = e.end - e.start;

          // Remove temporary attribute "column"
          delete e.column;
        });
      }
    });
  }
 
  /**
  Private Method
  Gets overlapped events from an event list for a specific event

  @param object event
    Reference event
 
  @param array events  
   An array of event objects. 
 
  @param hash options (optional)
    options.recursive true/false.  If true, if an event overlap reference event, 
                                   recall _getOverlapEvents on that event unless
                                  it has already been processed.
    options.processedEvents array events: Already processed events from event list

   @return array
   An array of all events that overlap reference event 
  **/ 
  function _getOverlapEvents(event, events, options) {
    options = options || {};
    
    // Get overlaping events for a specific event
    var overlapEvents = _.reduce(events, function(array, item) {
      if (item.isOverlap(event)) {
        array.push(item);
      }
      return array;
    }, []);
    // If recusrive option is true, process all 
    if (options.recusrive) {
      options.processedEvents  = (options.processedEvents || []);
      options.processedEvents.push(event);
      
      _.forEach(overlapEvents, function(e) {
        if (!_.include(options.processedEvents, e)) {
          overlapEvents = overlapEvents.concat(_getOverlapEvents(e, events, options));
        }
      });
    }
    return _.uniq(overlapEvents);
  }
    
  /**
  Private Method
  Gets first free column position from a list of events.
  Events should have been pre-processed to affect column position
  on each event.

  @param array events  
   An array of event objects. 
 
   @return integer
   Free column index 
  **/ 
  function _getFreeColumnPosition(events) {
    // Create a list of object ({column:X, free:true})
    var columns = [];
    for (var i = 0; i <= events.length; i++) {
      columns.push({column:i, free:true});
    }
    // Set free to false for each event
    _.forEach(events, function(event) {
      var item = _.detect(columns, function(i) { return i.column == event.column});
      if (item) {
        item.free = false;
      }
    });
    
    // Get first free column
    var pos = _.detect(columns, function(i) {return i.free});
    
    // If there's free column, return its position, otherwise, return new column position
    return pos ? pos.column : events.length;
  }
      
  return {layOutDay: layOutDay};
})();

// Add layOutDay in global window context to fit requirements
window.layOutDay = Calendar.layOutDay;