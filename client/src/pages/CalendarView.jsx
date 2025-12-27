import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar.css'; // Custom styles for dark theme

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Mock Events
const events = [
  {
    title: 'Routine Checkup - HP-2000',
    start: new Date(2023, 11, 25, 10, 0),
    end: new Date(2023, 11, 25, 12, 0),
    resourceId: 'EQ-101',
    type: 'PREVENTIVE'
  },
  {
    title: 'Filter Change - CNC M1',
    start: new Date(2023, 11, 28, 14, 0),
    end: new Date(2023, 11, 28, 15, 30),
    resourceId: 'EQ-103',
    type: 'PREVENTIVE'
  }
];

const CalendarView = () => {
  return (
    <div className="h-screen max-h-[calc(100vh-100px)] flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-text-primary">Maintenance Schedule</h2>
        <span className="text-text-secondary text-sm">Preventive & Planned Jobs</span>
      </div>
      <div className="flex-1 bg-background-card p-4 rounded-xl border border-border">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.type === 'PREVENTIVE' ? '#3B82F6' : '#EF4444',
              borderRadius: '4px',
              opacity: 0.8,
              color: 'white',
              border: '0px',
              display: 'block'
            }
          })}
        />
      </div>
    </div>
  );
};

export default CalendarView;
