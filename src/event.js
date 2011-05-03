function Event(start, end, id){
  this.start = start;
  this.end = end;
  this.id = id;
}

Event.prototype = {
  isOverlap: function(event) {
    return (event.start < this.end && event.end > this.start);
  }
}