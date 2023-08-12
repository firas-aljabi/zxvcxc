import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Timeline from './Timeline';
import axios from 'axios';
import Start from './DropDownMenu'
import Reservation from './ReservationInput'
import Services from './Services'
import moment from 'moment';

const Calendar = ({ selectedArtist })  => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [artistReservations, setArtistReservations] = useState([]);
  const [clients, setclients] = useState([]);
  const [AvailableTime, setsetAvailableTime] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndtTime, setSelectedEndtTime] = useState(null);

  const [SelectedClient, setSelectedClient] = useState(0);
  const [Selectedreservationtype, setSelectedreservationtype] = useState('');
  const [holidays, setHolidays] = useState([]);
  useEffect(() => {
    setSelectedDate(null);
    fetchHolidays(); // Fetch holidays when the selected artist changes
  }, [selectedArtist]);
  const fetchHolidays = async () => {
    if (selectedArtist) {
      try {
        const response = await axios.get(`https://api.march.gomaplus.tech/api/list_of_experts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data.data)
        const artists = response.data.data;
        const selectedArtistHolidays = artists.find((artist) => artist.id === selectedArtist.id);
        if (selectedArtistHolidays) {
          const holidaysDates = selectedArtistHolidays.holidays.map((holiday) => holiday.date.split(' ')[0]);
          setHolidays(holidaysDates);
          console.log(holidaysDates)
        } else {
          setHolidays([]);
        }
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    }
  };
  useEffect(() => {
    setSelectedDate(null);
  }, [selectedArtist]);


  
  
  

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  useEffect(() => {
    // Reset the selected date when the artist changes
    setSelectedDate(null);
  

  }, [selectedArtist]);


// Helper function to check if two Date objects have the same hours and minutes


// Helper function to check if a slot falls within a reservation



async function handleReservation (e) {
  e.preventDefault(); // Prevent default form submission behavior
  
  const requestData = {
 
    'date': `${'formattedDate'}`,
  
  }
 
  
  try {
    const response = await axios.post(`https://api.march.gomaplus.tech/api/create_reservation`,requestData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json', // Set the content type to JSON

      },
    });
    console.log(response.data);

   
    return response.data;
  } catch (error) {
    console.error( error);
      
    return false;
  }


};



const handleDateSelection = (date) => {
  setSelectedDate(date);
  if (selectedArtist) {
    const fromDate = new Date(date);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(date);
    toDate.setHours(23, 59, 59, 999);

    const formattedFromDate = fromDate.toISOString(); // Format the date as ISO string
    const formattedToDate = toDate.toISOString(); // Format the date as ISO string
    const reservationsUrl = `https://api.march.gomaplus.tech/api/client_reservations?per_page=1000000&expert_id=${selectedArtist.id}&from_date=${formattedFromDate}`;
    const clientssUrl='https://api.march.gomaplus.tech/api/list_of_client'


    axios
    .get(clientssUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
.then((response)=>{
console.log(response.data.data)
setclients(response.data.data)
})
    axios
      .get(reservationsUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        const reservations = response.data.data;
        const startTime = new Date(date);
        startTime.setHours(9, 0, 0, 0);
        const endTime = new Date(date);
        endTime.setHours(21, 0, 0, 0);

        const allSlots = [];
        let current = new Date(startTime);
        while (current < endTime) {
          allSlots.push(new Date(current)); // Push a copy of the current date to the allSlots array
          current.setMinutes(current.getMinutes() + 30);
        }

       
    

        // Update the state with the new free slots
        setArtistReservations(reservations);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
      });
  }
};


const generateCalendarDays = () => {
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();
  const days = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(selectedYear, selectedMonth, i);
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
    const isHoliday = holidays.includes(moment(date).format('YYYY-MM-DD'));
    const dayClassName = `p-2 cursor-pointer text-center ${
      isSelected ? 'border-2 border-red-500' : isHoliday ? 'border-2 border-red-500' : 'bg-[#D9D9D9]'
    }`;

    days.push(
      <div
        key={`day-${i}`}
        className={dayClassName}
        onClick={() => handleDateSelection(date)}
      >
        {i}
      </div>
    );
  }

  return days;
};



const getFilteredEndTimes = (startTime) => {
  const index = AvailableTime.indexOf(startTime);
  if (index !== -1) {
    const filteredTimes = [startTime];
    let nextIndex = index + 1;

    // Find the next continuous half-hour slots after the selected start time
    while (nextIndex < AvailableTime.length) {
      const nextTime = AvailableTime[nextIndex];
      if (!isNextHalfHour(nextTime, filteredTimes[filteredTimes.length - 1])) {
        break;
      }
      filteredTimes.push(nextTime);
      nextIndex++;
    }

    // Add the next half-hour slot after the last available end time
    const lastTime = filteredTimes[filteredTimes.length - 1];
    const nextHalfHour = getNextHalfHour(lastTime);
    if (nextHalfHour) {
      filteredTimes.push(nextHalfHour);
    }

    return filteredTimes;
  }
  return [];
};

const isNextHalfHour = (nextTime, currentTime) => {
  const nextHour = parseInt(nextTime.split(':')[0]);
  const nextMinutes = parseInt(nextTime.split(' ')[0].split(':')[1]);
  const currentHour = parseInt(currentTime.split(':')[0]);
  const currentMinutes = parseInt(currentTime.split(' ')[0].split(':')[1]);

  if (currentMinutes === 30) {
    return nextMinutes === 0 && nextHour === currentHour + 1;
  }

  return nextMinutes - currentMinutes === 30 && nextHour === currentHour;
};

const getNextHalfHour = (time) => {
  const hour = parseInt(time.split(':')[0]);
  const minutes = parseInt(time.split(' ')[0].split(':')[1]);
  if (minutes === 30) {
    return `${hour + 1}:00 ${time.split(' ')[1]}`;
  }
  return `${hour}:${minutes + 30} ${time.split(' ')[1]}`;
};


return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-4 flex justify-between" >
        <select
          className="block   border-none bg-[#F0F0F0CC] rounded p-2"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value={0}>January</option>
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
        <h2 className=''>:اختر اليوم.</h2>
     
      </div>
    <div className="grid grid-cols-7 gap-2">
   <div className="text-center text-gray-500">الاحد</div>
        <div className="text-center text-gray-500">الاثنين</div>
        <div className="text-center text-gray-500">الثلاثاء</div>
        <div className="text-center text-gray-500">الاريعاء</div>
        <div className="text-center text-gray-500">الخميس</div>
        <div className="text-center text-gray-500">الجمعة</div>
        <div className="text-center text-gray-500">السبت</div>
        {generateCalendarDays()}
      </div>
      <div className='flex justify-end '>
      <div className='flex '>
      <h1 className=''>مختار</h1>
<div className='w-3 h-3 bg-red-400 items-center mt-2 mr-5 ml-2'></div>
      </div>
      <div className='flex '>
      <h1 className=''>محجوز</h1>
      <div className='w-3 h-3 bg-red-400 items-center mt-2 mr-5 ml-2'></div>
      </div>

      <div className='flex '>
      <h1 className=''>متاح</h1>
      <div className='w-3 h-3 bg-red-400 items-center mt-2 mr-5 ml-2'></div>
      </div>
      </div>
      <div className='p-5 '>
      <h2 className='text-right mb-5 text-lg'>:اختر الساعة<span className='font-bold ml-2'>.</span></h2>
      <div className='flex justify-between'>
      <div className='flex'>
      <Start paasedarr={AvailableTime}  />
      <h2 className='ml-4'>:اجازة</h2>
      </div>
 
      </div>
 
  
     
    </div>
     
  
      <button onClick={handleReservation}>asdasd</button>
   
    </div>
  );
  };
export default Calendar;


