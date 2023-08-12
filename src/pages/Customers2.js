import React , {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../Images/Logo.png'
import search  from '../Images/Search.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import UnConfirmedReservation from '../Components/UnConfirmedReservation'
import ReservationInfrrmation from '../Models/ReservationInfrrmation'


const Customers = () => {
  const [clientREservations,setClientREservations]=useState([])
  const [showModel , setshowModel] = useState(true);
  const [SelecteReservation , setSelecteReservation] = useState(1);

  const handleonReservationSelect = (reservationId) => {
    setSelecteReservation(reservationId);
    setshowModel(true);
    console.log(showModel)
  };
async function getReservations(){
  axios
  .get('https://api.march.gomaplus.tech/api/client_reservations?per_page=10000', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then((res) => {
    // Filter and organize the response data
    const filteredData = res.data.data.reduce((acc, reservation) => {
      const clientIndex = acc.findIndex((obj) => obj.client.id === reservation.client.id);
      if (clientIndex === -1) {
        acc.push({
          client: {
            id: reservation.client.id,
            name: reservation.client.name,
          },
          reservations: [
            {
              date: reservation.date,
              status: reservation.status,
              expert: reservation.expert.name,
              id:reservation.id
            },
          ],
        });
      } else {
        acc[clientIndex].reservations.push({
          date: reservation.date,
          status: reservation.status,
          expert: reservation.expert.name,
          id:reservation.id
        });
      }
      return acc;
    }, []);
    setClientREservations(filteredData);
  })
  .catch((err) => console.log(err));
}


  useEffect(() => {
    getReservations()
  }, []);


    let nav=useNavigate()
     const [toggleState, setToggleState]=useState(1)
    const toggleTap = (index) => {
        setToggleState(index);
    }
  return (
    <div>

    {showModel && (
      <div className='absolute right-1'>
        <ReservationInfrrmation data={SelecteReservation} onModelClose={() => setshowModel(false)} />
      </div>
    )}
   {/**  <button onClick={() => setshowModel(!showModel)}>Toggle Model</button>  */}

    <div className=' bg-white items-center flex justify-center'>
            <div className='w-[88%] h-[90%]'>
                <div className='flex justify-between'>
                    <button className='border-2 border-black w-44 h-14' onClick={()=> nav('/login')}>تسجيل خروج</button>
                    <div className='w-96 flex justify-end'>
                    <div>
                    <h2 className='text-[#D4821F] mt-5 mr-24 cursor-pointer ' onClick={()=> nav('/customer')}>الزبائن</h2>
                    <div className='m-2 ml-5 w-6 border-b-2 border-[#D4821F]'></div>
                    </div>
                    <div >
                    <h2 className='text-black mt-5  cursor-pointer' onClick={()=> nav('/')}>الصفحة الرئيسية</h2>
                    </div>
                    </div>
                    <img src={logo} className='w-20 h-20'/>
                </div>
                <div>
                     <div className='flex justify-end'>
        <Link
          to="/confirm"
             >
                 <div className={toggleState === 1 ? " text-white bg-gradient-to-b from-[#F5C8909E] to-[#E3AB67]  mt-3 p-1 flex justify-center xxs:w-28 xs:w-40  rounded-l-sm": " text-white bg-[#D9D9D9] mt-3 p-1 flex justify-center  xxs:w-28  xs:w-40  rounded-l-sm"}
                onClick={() => toggleTap(1)}
                >
                  <h1 className='text-sm p-1'>الحجوزات المثبتة</h1>
                </div>
                </Link>
                <Link
          to="/unConfirm"
             >
                 <div className={toggleState === 2 ? " text-white bg-gradient-to-b from-[#F5C8909E] to-[#E3AB67]   mt-3 p-1 flex justify-center  xxs:w-28  xs:w-40  rounded-r-sm": "text-white bg-[#D9D9D9] mt-3 p-1 flex justify-center  xxs:w-28  xs:w-40  rounded-r-sm "}
                onClick={() => toggleTap(2)}
                >
                  <h1 className='text-sm p-1'>غير المثبتة</h1>
                </div>
                </Link>
        </div>
                </div>
                <div className='flex justify-between mt-10'>
                    <div className='flex'>
                        <div >
                        <img src={search} alt="Search Icon" class="absolute left-[25%] mt-4 h-4 w-4"/>
                <input type="text" placeholder="بحث" class="w-64 h-12 border mr-5 bg-[#E7E7E787] placeholder:mr-5 placeholder:text-[#FFFFFF] placeholder:text-right placeholder:text-sm py-2 px-4 relative "/>
                </div>
                <button className='w-44 h-12 border-2 border-[rgb(227,171,103)] text-[#D4821F] text-sm'>اضافة زبون جديد</button>
                </div>
                    <h2 className='text-3xl text-right text-[#D4821F]'>الزبائن وتاريخ الحجوزات</h2>
                </div>
                <div className='mt-8'>
                <table className='w-full h-full text-center  '>
                     
                     </table>
                     
                </div>
                <UnConfirmedReservation Data={clientREservations} onReservationSelect={handleonReservationSelect}/>
            </div>
        </div>
    </div>
  )
}

export default Customers