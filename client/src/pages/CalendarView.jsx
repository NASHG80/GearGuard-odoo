import { useState, useRef, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// Mock data for maintenance tasks
const mockTasks = [
  { id: 1, title: 'Hydraulic Press Maintenance', date: '2025-12-27', technician: 'Ann Foster', priority: 'high', status: 'pending', time: '09:00 AM', equipment: 'HP-001' },
  { id: 2, title: 'CNC Machine Calibration', date: '2025-12-27', technician: 'Mike Wilson', priority: 'medium', status: 'in-progress', time: '10:30 AM', equipment: 'CNC-042' },
  { id: 3, title: 'Conveyor Belt Inspection', date: '2025-12-28', technician: 'Ann Foster', priority: 'low', status: 'pending', time: '02:00 PM', equipment: 'CB-003' },
  { id: 4, title: 'Compressor Oil Change', date: '2025-12-29', technician: 'Tom Harris', priority: 'high', status: 'completed', time: '11:00 AM', equipment: 'COMP-015' },
  { id: 5, title: 'Welding Robot Service', date: '2025-12-30', technician: 'Mike Wilson', priority: 'high', status: 'pending', time: '08:00 AM', equipment: 'WR-007' },
  { id: 6, title: 'Air Filter Replacement', date: '2025-12-27', technician: 'Tom Harris', priority: 'medium', status: 'pending', time: '03:30 PM', equipment: 'HVAC-012' },
  { id: 7, title: 'Safety Valve Testing', date: '2025-12-31', technician: 'Ann Foster', priority: 'high', status: 'pending', time: '09:30 AM', equipment: 'SV-024' },
  { id: 8, title: 'Pressure Gauge Calibration', date: '2026-01-02', technician: 'Tom Harris', priority: 'medium', status: 'pending', time: '01:00 PM', equipment: 'PG-008' },
];

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const calendarRef = useRef(null);

  useLayoutEffect(() => {
    if (calendarRef.current) {
      gsap.from('.calendar-day', {
        scale: 0,
        opacity: 0,
        stagger: 0.02,
        duration: 0.4,
        ease: 'back.out(1.2)'
      });
    }
  }, [currentDate]);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = clickedDate.toISOString().split('T')[0];
    setSelectedDate(dateString);

    // Filter tasks for selected date
    const tasksForDate = mockTasks.filter(task => task.date === dateString);
    setSelectedTasks(tasksForDate);
  };

  const getTasksForDay = (day) => {
    const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    return mockTasks.filter(task => task.date === dateString);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-blue-400" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day"></div>);
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
      const tasksForDay = getTasksForDay(day);
      const isToday = isCurrentMonth && today.getDate() === day;
      const isSelected = selectedDate === dateString;
      const hasHighPriority = tasksForDay.some(task => task.priority === 'high');

      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDateClick(day)}
          className={`calendar-day relative p-3 rounded-xl cursor-pointer transition-all duration-300 border ${isSelected
            ? 'bg-accent-primary/20 border-accent-primary shadow-lg shadow-accent-primary/20'
            : isToday
              ? 'bg-accent-secondary/10 border-accent-secondary/30'
              : 'bg-background-secondary/30 border-white/5 hover:bg-white/10 hover:border-white/20'
            }`}
        >
          <div className="flex flex-col h-full">
            <span className={`text-sm font-semibold mb-1 ${isSelected ? 'text-accent-primary' : isToday ? 'text-accent-secondary' : 'text-white'}`}>
              {day}
            </span>
            {tasksForDay.length > 0 && (
              <div className="space-y-1 mt-1">
                {tasksForDay.slice(0, 2).map(task => (
                  <div
                    key={task.id}
                    className={`h-1.5 rounded-full ${task.priority === 'high' ? 'bg-red-400' : task.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`}
                  ></div>
                ))}
                {tasksForDay.length > 2 && (
                  <span className="text-[10px] text-text-muted">+{tasksForDay.length - 2}</span>
                )}
              </div>
            )}
            {hasHighPriority && (
              <div className="absolute top-1 right-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-accent-primary" />
          Maintenance Calendar
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl bg-background-secondary/50 border border-white/10 text-white hover:bg-white/10 hover:border-accent-primary/50 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="px-6 py-2 rounded-xl bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/30">
            <span className="text-lg font-bold text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
          </div>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl bg-background-secondary/50 border border-white/10 text-white hover:bg-white/10 hover:border-accent-primary/50 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="bg-background-secondary/30 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-3 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-text-secondary font-semibold text-sm uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar Days */}
            <div ref={calendarRef} className="grid grid-cols-7 gap-3">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Task List Panel */}
        <div className="lg:col-span-1">
          <div className="bg-background-secondary/30 border border-white/10 rounded-2xl p-6 backdrop-blur-xl sticky top-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-primary" />
              {selectedDate ? `Tasks for ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Select a Date'}
            </h3>

            <AnimatePresence mode="wait">
              {selectedTasks.length > 0 ? (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2"
                >
                  {selectedTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background-primary/50 border border-white/10 rounded-xl p-4 hover:border-accent-primary/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white group-hover:text-accent-primary transition-colors">
                          {task.title}
                        </h4>
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="space-y-2 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{task.technician}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{task.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-muted">Equipment:</span>
                          <span className="text-accent-secondary font-mono">{task.equipment}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <CalendarIcon className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-50" />
                  <p className="text-text-secondary">
                    {selectedDate ? 'No tasks scheduled for this day' : 'Click on a date to view tasks'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-background-secondary/30 border border-white/10 rounded-2xl p-4">
        <div className="flex flex-wrap gap-6 justify-center items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-text-secondary">High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-text-secondary">Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-text-secondary">Low Priority</span>
          </div>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-text-secondary">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-text-secondary">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400" />
            <span className="text-text-secondary">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
