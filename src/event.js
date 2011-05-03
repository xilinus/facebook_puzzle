// Event constructor
function Event(start, end, id){
  this.start = start;
  this.end = end;
  this.id = id;
}

// Instance methods
Event.prototype = {
  isOverlap: function(event) {
    return (event.start < this.end && event.end > this.start);
  }
}

// Class methods
Event.fromParams = function(params) {
  return new Event(params.start, params.end, params.id);
}