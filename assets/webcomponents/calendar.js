class Calendar extends HTMLElement { // (1)
    connectedCallback() {
        this.innerHTML = `<div id='calendar_render'></div>`
    }
}

function addCustomElementCalendar() {
    customElements.define("app-calendar", Calendar); // (2)
        var calendarEl = document.getElementById('calendar_render');
      
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          initialDate: '2020-12-07',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          events: [
            {
              title: 'All Day Event',
              start: '2020-12-01'
            },
            {
              title: 'Long Event',
              start: '2020-12-07',
              end: '2020-12-10'
            },
            {
              groupId: '999',
              title: 'Repeating Event',
              start: '2020-12-09T16:00:00'
            },
            {
              groupId: '999',
              title: 'Repeating Event',
              start: '2020-12-16T16:00:00'
            },
            {
              title: 'Conference',
              start: '2020-12-11',
              end: '2020-12-13'
            },
            {
              title: 'Meeting',
              start: '2020-12-12T10:30:00',
              end: '2020-12-12T12:30:00'
            },
            {
              title: 'Lunch',
              start: '2020-12-12T12:00:00'
            },
            {
              title: 'Meeting',
              start: '2020-12-12T14:30:00'
            },
            {
              title: 'Birthday Party',
              start: '2020-12-13T07:00:00'
            },
            {
              title: 'Click for Google',
              url: 'http://google.com/',
              start: '2020-12-28'
            }
          ]
        });
      
        calendar.render();
      
    console.log("Calendar!");
}
addCustomElementCalendar();