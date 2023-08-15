  import React , {useEffect, useState} from 'react'
import DropDownMenu from '../Components/DropDownMenu'
import DropDownType from '../Components/DropDownType';
import SmallDropDown from '../Components/SmallDropDown';
import axios from 'axios';
import moment from 'moment';
import Start from '../Components/DropDownMenu';
import Selection from '../Components/Selection';
import chevron from '../Images/chevron-down.png'
const DelayReson = ({visible , onClose,data }) => {
     const arr=[
 "الغاء المناسة" ,
 "سوء الخدمة" ,
 "حالة وفاة" ,
 "اخرى.." ,
]
const [date , setdate] = useState('2023-08-01');
const [AvailableTime, setsetAvailableTime] = useState([]);
const [artistReservations, setArtistReservations] = useState([]);
const [selectedStartTime, setSelectedStartTime] = useState(null);
const [selectedEndtTime, setSelectedEndtTime] = useState(null);
const [selectedreson , setselectedreson] = useState(1);

useEffect(()=>{
  getfreetime()
},[])
const reservationsUrl = `https://api.march.gomaplus.tech/api/client_reservations?expert_id=${data}&from_date=${date}`;
console.log('')
const handlestaartTimeSelection = (time) => {
  setSelectedStartTime(time);
  console.log(time)

};

function handletheresone(item){
  setselectedreson(item.id)
  console.log(item.id)
}
const handleendTimeSelection = (time) => {
  setSelectedEndtTime(time);
  console.log(time)

};
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



const isSameTime = (date1, date2) => {
  return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
};

async function getfreetime(){
 const responce= axios.get(reservationsUrl, {
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


 const [showPost , setShowPost] = useState(false);
 async function handleReservation () {
   
  const formattedstartTime = moment(selectedStartTime, "h:mm A").format("HH:mm:ss");
  const formattedendime = moment(selectedEndtTime, "h:mm A").format("HH:mm:ss");
  const requestData = {
    'reservation_id': 2,
    'reason_delay': 2,

    'start_time': `${formattedstartTime}`,
    'end_time': `${formattedendime}`,
    'delay_date': `${date} 00:00:00`,
     
    
  }
console.log(parseInt(selectedreson))
console.log(requestData)

  try {
    const response = await axios.post(
      `https://api.march.gomaplus.tech/api/delay_reservation`,

      requestData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'multipart/form-data',

        },
      }
    );
    console.log('Response:', response);
   
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    // You can also log error.response.data to see more details from the server response
    return false;
  }
  
  };
   if(!visible) return null;
  return (
     <div className='w-screen z-50 h-screen fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center'>
            <div  className='lg:w-[31%] md:w-[40%] sm:w-[60%] w-[80%] h-[70%] bg-white p-5'>
          
        
             <div className=' justify-start items-center w-[60%]'>
             <div className='flex justify-between'>
             <img onClick={()=>{onClose(false)}} src={chevron} className='w-10' />
                <h2 className='flex justify-center text-xl text-[#D4821F]'>سبب التاجيل</h2>
            </div>
            </div>
{/**           <Selection paasedarr={arr} onSelectTime={handletheresone}/> */} 
<div className='w-full'>
               <Start paasedarr={arr} onSelectTime={handletheresone}  />
               </div>
            <input
                    type='text'
                    className=' h-14 outline-none w-[100%] placeholder:text-black placeholder:mr-10 border border-black mt-2'
                    placeholder='تاريخ التاجيل'
                    onChange={(event) => {
                     
                      setdate(event.target.value)
                      // Now you can do something with the selected file, like uploading it or processing it
                    }}
                  />     
                    <div className='flex justify-center gap-3 mt-2'>
                 {/**    <SmallDropDown paasedarr={arr} name={"وقت الخروج"}/> 
                 */}
                     <Start paasedarr={AvailableTime} onSelectTime={handlestaartTimeSelection} />
                     <Start paasedarr={getFilteredEndTimes(selectedStartTime)} onSelectTime={handleendTimeSelection} />

                    </div>
                    <div className='flex justify-center bg-gradient-to-b from-[#FFD7A6] to-[#E3AB67]  mt-20 p-3 border w-[100%] h-14 '>
              <button onClick={()=>{handleReservation()}} className='text-white text-xs'>حفظ ورجوع</button>
            {/**   <img className='w-4 h-4 mt-1 ml-1' src={bookmark} />*/}
               </div>

    </div> 
    </div>
  )
}

export default DelayReson
