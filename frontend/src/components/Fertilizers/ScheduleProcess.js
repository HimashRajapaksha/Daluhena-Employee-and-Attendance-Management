import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ScheduleProcess = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Enter the fertilizer application process');
    if (title) {
      const newEvent = {
        start,
        end,
        title,
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="fertilizer-transparent-box" style={{ marginLeft: "280px", marginRight: "auto", marginTop: "10px", marginBottom: "10px", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "1140px" }}>
      <h2>Schedule Task</h2>
      <div className="calendar-container" style={{ height: 620 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelect}
        />
      </div>
    </div>
  );
};

export default ScheduleProcess;
