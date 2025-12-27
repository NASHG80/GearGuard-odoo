import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [monthData, setMonthData] = useState({});

  /* ---------- helpers ---------- */

  const daysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const firstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const formatDateString = (year, month, day) =>
    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const prevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));

  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  /* ---------- fetch month ---------- */
  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        const res = await fetch(`/api/calendar?year=${year}&month=${month}`);
        if (!res.ok) throw new Error("Failed to fetch month");

        const data = await res.json();
        setMonthData(data || {});
      } catch (err) {
        console.error("Calendar month fetch error:", err);
        setMonthData({});
      }
    };

    fetchMonthData();
  }, [currentDate]);

  /* ---------- date click ---------- */
  const handleDateClick = async (day) => {
    try {
      const dateString = formatDateString(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        day
      );

      setSelectedDate(dateString);

      const res = await fetch(`/api/calendar/day?date=${dateString}`);
      if (!res.ok) throw new Error("Failed to fetch day");

      const data = await res.json();

      const formatted = data.map(task => ({
        id: task.id,
        title: task.subject,
        technician: task.technician || 'Unassigned',
        priority: task.priority,
        status:
          task.status === 'COMPLETED'
            ? 'completed'
            : task.status === 'IN_PROGRESS'
            ? 'in-progress'
            : 'pending',
        time: task.duration || '—',
        equipment: task.equipment
      }));

      setSelectedTasks(formatted);
    } catch (err) {
      console.error("Day fetch error:", err);
      setSelectedTasks([]);
    }
  };

  /* ---------- UI helpers ---------- */

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-400" />;
    }
  };

  /* ---------- calendar grid ---------- */

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateString = formatDateString(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        day
      );

      const tasksForDay = monthData[dateString] || [];
      const hasHigh = tasksForDay.some(t => t.priority === 'high');

      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleDateClick(day)}
          className="p-3 rounded-xl cursor-pointer border bg-background-secondary/30 border-white/10 hover:bg-white/10 relative"
        >
          <span className="text-white font-semibold">{day}</span>

          {tasksForDay.length > 0 && (
            <div className="mt-2 space-y-1">
              {tasksForDay.slice(0, 2).map(t => (
                <div
                  key={t.id}
                  className={`h-1.5 rounded-full ${
                    t.priority === 'high'
                      ? 'bg-red-400'
                      : t.priority === 'medium'
                      ? 'bg-yellow-400'
                      : 'bg-blue-400'
                  }`}
                />
              ))}
            </div>
          )}

          {hasHigh && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </motion.div>
      );
    }

    return days;
  };

  /* ---------- render ---------- */

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <CalendarIcon className="w-7 h-7" />
          Maintenance Calendar
        </h1>

        <div className="flex items-center gap-3">
          <button onClick={prevMonth}><ChevronLeft /></button>
          <span className="text-xl font-bold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={nextMonth}><ChevronRight /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-7 gap-3">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} className="text-center text-gray-400">{d}</div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>

        <div className="bg-background-secondary/30 border border-white/10 rounded-xl p-4">
          <h3 className="text-xl font-bold text-white mb-4">
            {selectedDate || 'Select a Date'}
          </h3>

          <AnimatePresence>
            {selectedTasks.length > 0 ? (
              selectedTasks.map(task => (
                <motion.div
                  key={task.id}
                  className="mb-3 p-3 rounded-xl bg-background-primary/50 border border-white/10"
                >
                  <div className="flex justify-between">
                    <h4 className="text-white font-semibold">{task.title}</h4>
                    {getStatusIcon(task.status)}
                  </div>

                  <div className="text-sm text-gray-400 mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> {task.technician}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {task.time}
                    </div>
                  </div>

                  <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()} PRIORITY
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No tasks</p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
