import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Timeline from './Timeline';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedStartTime, setSelectedStartTime] = useState('09:00 AM');
  const [selectedEndTime, setSelectedEndTime] = useState('05:00 PM');
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  const handleStartTimeChange = (event) => {
    setSelectedStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setSelectedEndTime(event.target.value);
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const generateCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();
  
    const days = [];
  
    // Add empty cells for previous month's days
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
  
    // Add cells for current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const dayClassName = `p-2  cursor-pointer text-center ${isSelected ? 'bg-[#E21684] text-white' :'hover:bg-[#E21684]  '}`;
  
      if (i === 1 || i === 2 || i === 3 || i === 4) {
        days.push(
          <div
            key={`day-${i}`}
            className={`${dayClassName} bg-[#f2bedb] items-center `}
            onClick={() => handleDateClick(date)}
          >
            {i}
          </div>
        );
      } else {
        days.push(
          <div
            key={`day-${i}`}
            className={`p-2  cursor-pointer text-center ${isSelected ? 'bg-[#E21684] text-white' :'bg-[#D9D9D9] '}`}
            onClick={() => handleDateClick(date)}
          >
            {i}
          </div>
        );
      }
    }
  
    return days;
  };
  
  const ColoredDivs = ({ redIndices, pinkIndices }) => {
    return (
      <div className="flex mt-20 bg-[#D9D9D9]">
        {[...Array(10)].map((_, i) => {
          let colorClass = '  ';
  
          if (redIndices.includes(i)) {
            colorClass = 'bg-[#E21684] ';
          } else if (pinkIndices.includes(i)) {
            colorClass = 'bg-[#f2bedb] ';
          }
  
          return (
            <div
              key={i}
              className={`w-12 h-2 rounded-xl ${colorClass}`}
            ></div>
          );
        })}
      </div>
    );
  };
  
  const redIndices = ["09:30",, "9:45", "10:00", "10:15", "10:30", "10:45", "11:15", "10:15", "11:00", "12:45"];
  const pinkIndices = ["09:15", "11:30", "13:15", "14:30"];

  
  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-4">
        <select
          className="block w-full border-none bg-[#F0F0F0CC] rounded p-2"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value={0}>شباط</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>
      {/**     <select
          className="block w-full border border-gray-300 rounded p-2 mt-2"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
        */}
      </div>
    <div className="grid grid-cols-7 gap-2">
      {/** */}    <div className="text-center text-gray-500">Sun</div>
        <div className="text-center text-gray-500">Mon</div>
        <div className="text-center text-gray-500">Tue</div>
        <div className="text-center text-gray-500">Wed</div>
        <div className="text-center text-gray-500">Thu</div>
        <div className="text-center text-gray-500">Fri</div>
        <div className="text-center text-gray-500">Sat</div>
        {generateCalendarDays()}
      </div>
      {selectedDate && (
        <div className="mt-4">
          Selected Date: {selectedDate.toLocaleDateString()}
        </div>
      )}
      <Timeline redIndices={redIndices} pinkIndices={pinkIndices} />
    </div>
  );
};

export default Calendar;
