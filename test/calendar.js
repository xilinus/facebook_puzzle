$(document).ready(function() {

  module("Calendar");
  
  // Test event position (top/left) and width
  function assertEvent(event, top, left, width) {
    equals(event.top, top);
    equals(event.left, left);
    equals(event.width, width);
  } 
  
  // |------------------------------|
  // | #1                           |
  // |------------------------------|  
  test("should add one event: left:0 full width (600px)", function() {
    var events = layOutDay([{start: 100, end: 200, id: 1}]);
    
    equals(events.length, 1);    
    assertEvent(events[0], 100, 0, 600);
  });
  
  // |------------------------------|
  // | #1                           |
  // |------------------------------|  
  // |
  // |------------------------------|
  // | #2                           |
  // |------------------------------|  
  test("should add two events without overlap: both are left:0 full width (600px)", function() {
    var events = layOutDay([{start: 100, end: 200, id: 1}, 
                            {start: 300, end: 400, id: 2}]);
    equals(events.length, 2);
    assertEvent(events[0], 100, 0, 600);
    assertEvent(events[1], 300, 0, 600);
  });
  
  // |--------------|---------------|
  // | #1           | #2            |
  // |--------------|---------------|  
  test("should add two events with overlap: same top position, half width (300px)", function() {
    var events = layOutDay([{start: 100, end: 200, id: 1}, 
                            {start: 100, end: 200, id: 2}]);
    equals(events.length, 2);
    assertEvent(events[0], 100, 0, 300);
    assertEvent(events[1], 100, 300, 300);
  });
  
  // |--------------|---------------|
  // | #1           | #2            |
  // |--------------|---------------|  
  // |
  // |------------------------------|
  // | #3                           |
  // |------------------------------|  
  test("should add two events with overlap and a third without", function() {
    var events = layOutDay([{start: 100, end: 200, id: 1}, 
                            {start: 100, end: 200, id: 2}, 
                            {start: 500, end: 600, id: 3}]);
    equals(events.length, 3);
    assertEvent(events[0], 100, 0, 300);
    assertEvent(events[1], 100, 300, 300);
    assertEvent(events[2], 500, 0, 600);
  });
  
  // |---------|---------|----------|
  // | #1      | #2      | #3       |
  // |---------|         |----------|  
  //           |         |
  // |---------|         |
  // | #4      |         |
  // |---------|---------|
  test("should add 3 overlapped events (same row) and one in first available spot", function() {
    var events = layOutDay([{start: 100, end: 200, id: 1}, 
                            {start: 100, end: 800, id: 2}, 
                            {start: 100, end: 200, id: 3},
                            {start: 400, end: 500, id: 4}]);
    equals(events.length, 4);
    assertEvent(events[0], 100, 0, 200);
    assertEvent(events[1], 100, 200, 200);
    assertEvent(events[2], 100, 400, 200);
    assertEvent(events[3], 400, 0, 200);
  });
  
  // |---------|---------|----------|
  // | #1      | #2      | #3       |
  // |         |         |----------|  
  // |         |         |
  // |         |         |----------|
  // |---------|         | #4       |
  //           |---------|----------|
  test("should add 3 overlapped events (same row) and one in first available spot", function() {
    var events = layOutDay([{start: 100, end: 700, id: 1}, 
                            {start: 100, end: 800, id: 2}, 
                            {start: 100, end: 200, id: 3},
                            {start: 400, end: 500, id: 4}]);
    equals(events.length, 4);
    assertEvent(events[0], 100, 0, 200);
    assertEvent(events[1], 100, 200, 200);
    assertEvent(events[2], 100, 400, 200);
    assertEvent(events[3], 400, 400, 200);
  });
});