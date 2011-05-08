Playground = (function() {
  var events = [],
      lastId = 0;
      
  // Formats time from 0-720 to 9:00AM to 9:00PM
  function formatTime(time) {
    var formattedTime = time + 9*60,
        hour = parseInt(formattedTime / 60),
        minute = formattedTime - hour * 60;
    
    // Format minute with 2 digits
    if (minute < 10) {
      minute = "0" + minute;
    }
    
    // AM/PM
    var amPm = hour < 12 ? " AM" : " PM";
    if (hour > 12) {
      hour -= 12;
    }
    return hour + ":" + minute + amPm;
  }
  
  // Creates event controls (start, duration and add button)
  // !! old-school style, write HTML code in the DOM and use onclick event handler
  // !! This functional wasn't part of the exercise :)
  function createForm() {
    document.writeln('<select id="time">');
    for (var time = 0; time < 720; time += 15) {
      document.writeln("<option value='" + time + "'>" + formatTime(time) + "</option>");
    }
    document.writeln('</select>');
    document.writeln('<select id="duration">');
    for (var duration = 10; duration <= 240; duration += 10) {
      document.writeln("<option value='" + duration + "'>" + duration + " minutes</option>");
    }
    document.writeln('</select>');    
    
    document.writeln('<input type="button" value="Add" onclick="Playground.addEvent(); return false"/>')
  }
  
  // Returns selected integer value of a select HTML tag
  function selectedIntValue(select) {
    return parseInt(select.options[select.selectedIndex].value);
  }
  
  // Adds a new event and display it on the calendar
  function addEvent() {
    var start = selectedIntValue(document.getElementById('time')),
        end = selectedIntValue(document.getElementById('duration'));
    
    end = Math.min(start + end, 720);
    events.push({start: start, end: end, id: lastId++});

    CalendarView.displayEvents(events);
  }
  
  return {createForm: createForm,
          addEvent:   addEvent}
})();