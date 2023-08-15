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
  };const isHoliday = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return holidays.some((holiday) => holiday.date === formattedDate);
  };
  const reservationTypeMappings = {
    'عروسه': 1,
    'مكياج سهره': 2,
    'تسريحه شعر': 3,
    'تركيب رموش': 4,
    'عكف رموش': 5,
    'رفع حواجب': 6,
    'تركيب اظافر اكريلك': 7,
    'تركيب اظافر جل': 8,
    'مساج': 9,
    'تنظيف بشره': 10,
    'اكستنشن دائم للشعر': 11,
  };
  
  useEffect(() => {
    setSelectedDate(null);
  }, [selectedArtist]);


  const handlereservationtype = (time) => {
    setSelectedreservationtype(time);
    console.log(time)

  };
  const handleClientSelection = (time) => {
    setSelectedClient(time);
    console.log(time)

  };
  const eventNumber = reservationTypeMappings[Selectedreservationtype];

  const handlestaartTimeSelection = (time) => {
    setSelectedStartTime(time);
    console.log(time)

  };
  const handleendTimeSelection = (time) => {
    setSelectedEndtTime(time);
    console.log(time)

  };
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  useEffect(() => {
    // Reset the selected date when the artist changes
    setSelectedDate(null);
  

  }, [selectedArtist]);


// Helper function to check if two Date objects have the same hours and minutes
const isSameTime = (date1, date2) => {
  return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
};

// Helper function to check if a slot falls within a reservation


const isSlotInReservation = (slotDate, reservation) => {
  const slotMoment = moment(slotDate);
  const reservationDate = moment(reservation.date).format('YYYY-MM-DD');
  const reservationStart = moment(`${reservationDate} ${reservation.start_time}`, 'YYYY-MM-DD HH:mm A');
  let reservationEnd = moment(`${reservationDate} ${reservation.end_time}`, 'YYYY-MM-DD HH:mm A');

  // If reservation end time is before start time, it means it's on the next day
  // So, we add one day to the reservation end time
  if (reservationEnd.isBefore(reservationStart)) {
    reservationEnd = reservationEnd.add(1, 'day');
  }

  console.log('Slot Date:', slotMoment.format());
  console.log('Reservation Start:', reservationStart.format());
  console.log('Reservation End:', reservationEnd.format());

  // Check if the slot falls within the reservation period or after the reservation end time
  return slotMoment.isBetween(reservationStart, reservationEnd, null, '[]', 'day') || slotMoment.isSame(reservationEnd);
};


async function handleReservation (e) {
  e.preventDefault(); // Prevent default form submission behavior
  const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
  const formattedstartTime = moment(selectedStartTime, "h:mm A").format("HH:mm:ss");
  const formattedendime = moment(selectedEndtTime, "h:mm A").format("HH:mm:ss");
  const requestData = {
    'client_id': SelectedClient,
    'expert_id': selectedArtist.id,
    'start_time': `${formattedstartTime}`,
    'end_time': `${formattedendime}`,
    'date': `${formattedDate} 00:00:00`,
    'event': [eventNumber], // Use the mapped event number
     
    
  }
 
  
  console.log(`${formattedDate} 00:00:00`)

  console.log(eventNumber)

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

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formattedFromDate = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}-${String(fromDate.getDate()).padStart(2, '0')}`;
    const formattedToDate = toDate.toISOString(); // Format the date as ISO string
    const reservationsUrl = `https://api.march.gomaplus.tech/api/client_reservations?expert_id=${selectedArtist.id}&from_date=${formattedFromDate}`;
    const clientssUrl='https://api.march.gomaplus.tech/api/list_of_client'

    console.log(selectedArtist.id)
    console.log(formattedFromDate)
    axios
    .get(clientssUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
.then((response)=>{
  console.log('response.data.data')

console.log(response.data.data)
console.log('response.data.data')

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
        console.log(reservations)
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

        const freeSlots = allSlots.filter((slotTime) => {
          for (const reservation of reservations) {
            if (isSlotInReservation(slotTime, reservation) || isSameTime(slotTime, new Date(reservation.end_time))) {
              return false;
            }
          }
          return true;
        });

        const formattedFreeSlots = freeSlots.map((slot) =>
          slot.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })
        );

        console.log('Free Time Slots:');
        console.log(formattedFreeSlots);
        setsetAvailableTime(formattedFreeSlots)

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
      isSelected ? 'bg-[#E21684] text-white' : isHoliday ? 'bg-red-400 text-white' : 'bg-[#D9D9D9]'
    }`;

    days.push(
      <div
        key={`day-${i}`}
        className={dayClassName}
        onClick={() =>isHoliday? '':handleDateSelection(date)}
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
    filteredTimes.shift()
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
  if(hour==12 &&minutes==30){
    return `${1}:00 ${time.split(' ')[1]}`;
  }
  else if (minutes === 30) {
    return `${hour + 1}:00 ${time.split(' ')[1]}`;
  }
  
  return `${hour}:${minutes + 30} ${time.split(' ')[1]}`;
};


return (
  <div className="mx-auto max-w-md p-4">
  <div className='flex justify-between'>
  <button className='bg-[#F9C688] w-28 p-1 text-center text-white text-sm' onClick={handleReservation}>حفظ</button>
  <h2 className='font-bold'>صباح عسيري</h2>
  </div>
  <div className="mb-4 flex justify-between mt-7" >
    <select
      className="block  border-none bg-[#F0F0F0CC] rounded p-2"
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
<div className='w-3 h-3 bg-[#F5C890] items-center mt-2 mr-5 ml-2'></div>
  </div>
  <div className='flex '>
  <h1 className=''>محجوز</h1>
  <div className='w-3 h-3 bg-[#F5C89073] items-center mt-2 mr-5 ml-2'></div>
  </div>

  <div className='flex '>
  <h1 className=''>متاح</h1>
  <div className='w-3 h-3 bg-[#D9D9D9CC] items-center mt-2 mr-5 ml-2'></div>
  </div>
  </div>
  <div className='p-5 '>
  <h2 className='text-right mb-5 text-lg'>:اختر الساعة<span className='font-bold ml-2'>.</span></h2>
  <div className='flex justify-between mr-1'>
  <div className='flex'>
  <Start paasedarr={AvailableTime} onSelectTime={handlestaartTimeSelection} />
  <h2 className='ml-1 text-xs'>:بدء الموعد</h2>
  </div>
  <div className='flex'>
  <Start paasedarr={getFilteredEndTimes(selectedStartTime)} onSelectTime={handleendTimeSelection} />
  <h2 className='ml-1 text-xs'>:نهاية الموعد</h2>
  </div>
  </div>
  <div className='flex justify-end mt-10'>
    <Reservation  clients={clients} onSelectClient={handleClientSelection}/>
    <h2 className='text-right mb-5 text-xs whitespace-nowrap'>: حجز بإسم<span className='font-bold'>.</span></h2>
  </div>
   <div className='flex justify-end mt-10'>
   <Start paasedarr={Object.keys(reservationTypeMappings)}  onSelectTime={handlereservationtype}/>
    <h2 className='text-right mb-5 ml-1 text-xs'>: المناسبة <span className='font-bold ml-2'>.</span></h2>
  </div>
{/**   <div className='flex justify-between mt-16'>
   <h2 className='text-[#2E94DE] border-b border-b-[#2E94DE] mb-10 w-20'>إضافة خدمة</h2>
   <h2 className='text-right mb-5  text-lg'>: الخدمات الرئيسية<span className='font-bold ml-2'>.</span></h2>
   </div>
   <Services/>
   */} 
</div>   
</div>
);
};
export default Calendar;

