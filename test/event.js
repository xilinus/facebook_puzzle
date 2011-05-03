$(document).ready(function() {

  module("Event");

  test("should create an event using constructor", function() {
    var event = new Event(100, 200, 1);
    equals(event.start, 100);
    equals(event.end, 200);
    equals(event.id, 1);
  });
  
  test("should create an event using Event#fromParams method", function() {
    var event = Event.fromParams({start: 100, end: 200, id: 1});
    equals(event.start, 100);
    equals(event.end, 200);
    equals(event.id, 1);
  });
  
  // event1 |--------|
  // event2     |--------|
  test("should overlap with an other event if second event starts during first event", function() {
    var event1 = new Event(100, 200, 1),
        event2 = new Event(150, 250, 2);
    ok(event1.isOverlap(event2))
  });
  
  // event1     |--------|
  // event2 |--------|
  test("should overlap with an other event if second event starts during first event", function() {
    var event1 = new Event(150, 250, 1),
        event2 = new Event(100, 200, 2);
    ok(event1.isOverlap(event2))
  });
  
  // event1             |--------|
  // event2 |--------|
  test("should not overlap with an other event if second event ends before first event", function() {
    var event1 = new Event(150, 250, 1),
        event2 = new Event(100, 120, 2);
    ok(!event1.isOverlap(event2))
  });
  
  // event1 |--------|
  // event2             |--------|
  test("should not overlap with an other event if second event starts after first event", function() {
    var event1 = new Event(150, 250, 1),
        event2 = new Event(300, 350, 2);
    ok(!event1.isOverlap(event2))
  });
  
  
  // event1 |--------|
  // event2          |--------|
  test("should not overlap with an other event if second event starts when first event ends", function() {
    var event1 = new Event(150, 250, 1),
        event2 = new Event(250, 350, 2);
    ok(!event1.isOverlap(event2))
  });
  
  // event1          |--------|
  // event2 |--------|
  test("should not overlap with an other event if second event ends when first event starts", function() {
    var event1 = new Event(250, 350, 1),
        event2 = new Event(150, 250, 2);
    ok(!event1.isOverlap(event2))
  });

});
