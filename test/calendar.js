$(document).ready(function() {

  module("Calendar");

  test("should add one event to first column, full width", function() {
    var events = layOutDay([{start: 100, end: 200, id: 1}])
    equals(events.length, 1)
    
    var event = events[0]
    equals(event.top, 100);
    equals(event.left, 0);
    equals(event.width, );
    
  });
});