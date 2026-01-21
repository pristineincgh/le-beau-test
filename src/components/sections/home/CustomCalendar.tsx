'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface CustomCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  // selectedTime: string;
  onSelectTime: (time: string) => void;
  minDate?: Date;
}

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDate,
  onSelectDate,
  // selectedTime,
  onSelectTime,
  minDate = new Date(),
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeMode, setTimeMode] = useState<
    'any' | 'morning' | 'afternoon' | 'evening' | 'custom'
  >('any');
  const [showCustomTimes, setShowCustomTimes] = useState(false);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek =
      firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Adjust for Monday start

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onSelectDate(newDate);
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isTomorrow = (day: number) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      tomorrow.getDate() === day &&
      tomorrow.getMonth() === currentMonth.getMonth() &&
      tomorrow.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date < minDate;
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentMonth(today);
    onSelectDate(today);
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCurrentMonth(tomorrow);
    onSelectDate(tomorrow);
  };

  const handleTimeModeChange = (mode: typeof timeMode) => {
    setTimeMode(mode);
    if (mode === 'custom') {
      setShowCustomTimes(true);
    } else {
      setShowCustomTimes(false);
      // Auto-select time based on mode
      if (mode === 'morning') {
        onSelectTime('9:00 AM - 12:00 PM');
      } else if (mode === 'afternoon') {
        onSelectTime('12:00 PM - 5:00 PM');
      } else if (mode === 'evening') {
        onSelectTime('5:00 PM - 11:00 PM');
      } else {
        onSelectTime('Any time');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex gap-6">
        {/* Quick Select Sidebar */}
        <div className="flex flex-col gap-2 min-w-[140px]">
          <button
            onClick={handleTodayClick}
            className={`
              text-left px-4 py-3 rounded-lg border transition-all
              ${
                isToday(new Date().getDate()) &&
                selectedDate?.getDate() === new Date().getDate()
                  ? 'border-[#07c6e8] bg-[#07c6e8]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="font-semibold text-gray-900 text-sm">Today</div>
            <div className="text-xs text-gray-500">{getTodayDate()}</div>
          </button>
          <button
            onClick={handleTomorrowClick}
            className={`
              text-left px-4 py-3 rounded-lg border transition-all
              ${
                isTomorrow(new Date().getDate() + 1) &&
                selectedDate &&
                isTomorrow(selectedDate.getDate())
                  ? 'border-[#07c6e8] bg-[#07c6e8]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="font-semibold text-gray-900 text-sm">Tomorrow</div>
            <div className="text-xs text-gray-500">{getTomorrowDate()}</div>
          </button>
        </div>

        {/* Calendar */}
        <div className="flex-1">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="font-bold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const disabled = isDateDisabled(day);
              const selected = isDateSelected(day);
              const today = isToday(day);

              return (
                <button
                  key={day}
                  onClick={() => !disabled && handleDateClick(day)}
                  disabled={disabled}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                    ${
                      disabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : selected
                          ? 'bg-[#07c6e8] text-white shadow-md'
                          : today
                            ? 'border-2 border-[#07c6e8] text-gray-900 hover:bg-gray-50'
                            : 'text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            </div>
            <span className="font-semibold text-gray-900">Select time</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => handleTimeModeChange('any')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  timeMode === 'any'
                    ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              Any time
            </button>
            <button
              onClick={() => handleTimeModeChange('morning')}
              className={`
                px-4 py-2 rounded-lg text-sm transition-all
                ${
                  timeMode === 'morning'
                    ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="font-medium">Morning</div>
              <div className="text-xs">9 am - 12 pm</div>
            </button>
            <button
              onClick={() => handleTimeModeChange('afternoon')}
              className={`
                px-4 py-2 rounded-lg text-sm transition-all
                ${
                  timeMode === 'afternoon'
                    ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="font-medium">Afternoon</div>
              <div className="text-xs">12 pm - 5 pm</div>
            </button>
            <button
              onClick={() => handleTimeModeChange('evening')}
              className={`
                px-4 py-2 rounded-lg text-sm transition-all
                ${
                  timeMode === 'evening'
                    ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="font-medium">Evening</div>
              <div className="text-xs">5 pm - 11 pm</div>
            </button>
            <button
              onClick={() => handleTimeModeChange('custom')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  timeMode === 'custom'
                    ? 'bg-[#07c6e8] text-white border-2 border-[#07c6e8]'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              Custom
            </button>
          </div>

          {/* Custom Time Selection */}
          {showCustomTimes && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Select start time
                </label>
                <select
                  onChange={(e) => onSelectTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#07c6e8]"
                >
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Select end time
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#07c6e8]">
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                  <option>9:00 PM</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
