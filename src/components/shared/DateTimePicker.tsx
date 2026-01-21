import { Calendar, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface DateTimePickerProps {
  onChange?: (date: Date | null, timeSlot: string) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Any time');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [customStartTime, setCustomStartTime] = useState('');
  const [customEndTime, setCustomEndTime] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const timeSlots = [
    { label: 'Any time', value: 'any' },
    { label: 'Morning', sublabel: '9 am - 12 pm', value: 'morning' },
    { label: 'Afternoon', sublabel: '12 pm - 5 pm', value: 'afternoon' },
    { label: 'Evening', sublabel: '5 pm - 11 pm', value: 'evening' },
    { label: 'Custom', value: 'custom' },
  ];

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplayDate = () => {
    if (!selectedDate) return 'Any time';

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (selectedDate.toDateString() === today.toDateString()) {
      return `Today, ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else if (selectedDate.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }

    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date, selectedTimeSlot);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
    onChange?.(today, selectedTimeSlot);
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
    setCurrentMonth(tomorrow);
    onChange?.(tomorrow, selectedTimeSlot);
  };

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
    onChange?.(selectedDate, slot);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="relative w-full">
      {/* Input Field */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent flex items-center justify-between bg-white"
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
          {formatDisplayDate()}
        </span>
        <Calendar className="w-4 h-4 text-gray-400" />
      </button>

      {/* Modal Picker using Portal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <div
              ref={containerRef}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[700px] max-h-[90vh] flex flex-col"
              style={{
                touchAction: 'pan-y',
              }}
            >
              {/* Fixed Header with Close Button */}
              <div className="shrink-0 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Select Date & Time
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content with Ultra-Smooth Mobile Scroll */}
              <div
                className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 custom-scrollbar"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth',
                  overscrollBehavior: 'contain',
                  willChange: 'scroll-position',
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Quick Select Sidebar */}
                  <div className="flex flex-row lg:flex-col gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={handleTodayClick}
                      className="text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-[#07c6e8] hover:bg-[#07c6e8]/10 transition-all duration-200 min-w-[140px] lg:min-w-[160px]"
                    >
                      <div className="font-semibold text-gray-900">Today</div>
                      <div className="text-sm text-gray-500">
                        {today.toLocaleDateString('en-US', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={handleTomorrowClick}
                      className="text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-[#07c6e8] hover:bg-[#07c6e8]/10 transition-all duration-200 min-w-[140px] lg:min-w-[160px]"
                    >
                      <div className="font-semibold text-gray-900">
                        Tomorrow
                      </div>
                      <div className="text-sm text-gray-500">
                        {tomorrow.toLocaleDateString('en-US', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                    </button>
                  </div>

                  {/* Calendar */}
                  <div className="flex-1 min-w-0">
                    {/* Month Header */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        onClick={handlePreviousMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h3 className="font-semibold text-gray-900">
                        {currentMonth.toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </h3>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Week Days */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                      {weekDays.map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                      {days.map((date, index) => (
                        <div key={index} className="aspect-square">
                          {date ? (
                            <button
                              type="button"
                              onClick={() => handleDateSelect(date)}
                              disabled={
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              className={`w-full h-full rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                                isSelected(date)
                                  ? 'bg-[#07c6e8] text-white shadow-md scale-105'
                                  : isToday(date)
                                    ? 'border-2 border-gray-300 text-gray-900 hover:border-[#07c6e8]'
                                    : date <
                                        new Date(
                                          new Date().setHours(0, 0, 0, 0)
                                        )
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : 'text-gray-700 hover:bg-gray-100 active:scale-95'
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          ) : (
                            <div />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      Select time
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => handleTimeSlotSelect(slot.label)}
                        className={`px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                          selectedTimeSlot === slot.label
                            ? 'border-[#07c6e8] bg-[#07c6e8]/10 text-[#07c6e8] shadow-sm scale-105'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 active:scale-95'
                        }`}
                      >
                        <div className="font-medium text-sm">{slot.label}</div>
                        {slot.sublabel && (
                          <div className="text-xs text-gray-500">
                            {slot.sublabel}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom Time Inputs */}
                  {selectedTimeSlot === 'Custom' && (
                    <div className="flex gap-3 mt-4">
                      <select
                        value={customStartTime}
                        onChange={(e) => setCustomStartTime(e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#07c6e8] transition-all duration-200"
                      >
                        <option value="">Select start time</option>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i % 12 || 12;
                          const period = i < 12 ? 'am' : 'pm';
                          return (
                            <option key={i} value={`${i}:00`}>
                              {hour}:00 {period}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        value={customEndTime}
                        onChange={(e) => setCustomEndTime(e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#07c6e8] transition-all duration-200"
                      >
                        <option value="">Select end time</option>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i % 12 || 12;
                          const period = i < 12 ? 'am' : 'pm';
                          return (
                            <option key={i} value={`${i}:00`}>
                              {hour}:00 {period}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Footer with Buttons */}
              <div className="shrink-0 px-6 sm:px-8 py-4 sm:py-6 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm">
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-white active:scale-95 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 bg-[#07c6e8] text-white rounded-lg hover:bg-[#06b0cf] active:scale-95 transition-all duration-200 font-medium shadow-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(203, 213, 225, 0.5) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(203, 213, 225, 0.5);
          border-radius: 10px;
          transition: background 0.2s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.7);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: rgba(100, 116, 139, 0.8);
        }
        
        /* Hide scrollbar on mobile for cleaner look */
        @media (max-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(203, 213, 225, 0.3);
          }
        }
      `}</style>
    </div>
  );
};
