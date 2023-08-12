import React, { useEffect, useState } from 'react'
//import row from '../Images/chevron-down (8).png'
//import DropDown from './DropDown'
import DropDownInfo from '../Components/DropDownInfo'
import SmallDropDown from '../Components/SmallDropDown'
//import link from '../Images/link (2).png'
import DropDownType from '../Components/DropDownType'
// import alert from '../Images/alert-triangle (1).png'
// import bookmark from '../Images/bookmark (1).png'
import axios from 'axios'
const ReservationInfrrmation = ({ data, onModelClose }) => {
  const [reservationData, setReservationData] = useState({});
  const [SelectedAttachent, setselectedAttachent] = useState(null);
const statePayment=[
  {name:'مؤجل'},

{name:'مكتمل'}]
const typeopPayment=[
  {name:'تحويل'},

{name:'شبكة'}]
  useEffect(() => {
    async function fetchReservationDetails(reservationId) {
      try {
        const response = await axios.get(`https://api.march.gomaplus.tech/api/get_reservation/${reservationId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setReservationData(response.data.data);

        console.log(response.data.data);
        // Do something with the fetched data if needed
      } catch (error) {
        console.error('Fetching reservation details failed:', error);
      }
    }

    fetchReservationDetails(data);
  }, [data]);


  async function handleReservation (e) {
    e.preventDefault(); // Prevent default form submission behavior
   
  const formData = new FormData();
  formData.append('reservation_id', data);
  formData.append('payment_status', 2);
  formData.append('payment_way', 1);
  formData.append('amount_type', 10);
  formData.append('status', 1);
  formData.append('delay_date', null);
  formData.append('reservation_amount', 500);
  formData.append('attachment', SelectedAttachent); // Attach the selected file
  formData.append('reason_cancle_delay',2);
  formData.append('notes', null);

  console.log("SelectedAttachent:", SelectedAttachent);

  
  try {
    const response = await axios.post(
      `https://api.march.gomaplus.tech/api/complete_reservation`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'multipart/form-data',
          'Content-Type': false

        },
      }
    );
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    // You can also log error.response.data to see more details from the server response
    return false;
  }
  
  };
  return (
   <div className='w-screen h-screen fixed   inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center'>
            <div  className='w-[32%] h-[90%] bg-white p-5 pl-10 pr-10 -z-50 overflow-y-scroll'>
             <div className='flex justify-center'>
             <h1 onClick={() => onModelClose(false)}>x</h1>
             <img className=' w-[8%] h-[8%] mr-20' src={'row'} />

                <h2 className='flex justify-center mb-[5%] text-xl mr-20 text-[#D4821F]'>معلومات الحجز</h2>
            </div>
            <div className='flex justify-center items-center'>
                <div>
                <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
                <h4 className='text-right text-[10px] opacity-50 mr-2'>اسم الزبون</h4>
                <input
                className='bg-transparent outline-none w-[100%]'
                value={reservationData.client ? reservationData.client.name : ''}
               
              />
                </div>
                <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
                <h4 className='text-right text-[10px] opacity-50 mr-2'>اسم الاخصائية</h4>
                <input
                className='bg-transparent outline-none w-[100%]'
                value={reservationData.expert ? reservationData.expert.name : ''}
               
              />        </div>
              <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
                <h4 className='text-right text-[10px] opacity-50 mr-2'>تاريخ الحجز</h4>
                <input
                className='bg-transparent outline-none w-[100%]'
                value={reservationData.date ? reservationData.date : ''}
              
              /> 
                </div>
              <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
                <h4 className='text-right text-[10px] opacity-50 mr-2'>رقم الحجز</h4>
                <input
                className='bg-transparent outline-none w-[100%]'
                value={reservationData.reservation_number ? reservationData.reservation_number : ''}
              
              />                 </div>
              <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
              <SmallDropDown paasedarr={typeopPayment} name={reservationData.status?reservationData.status:"طريقة الدفع"}/>
              </div>
           {/**    <DropDownInfo/>*/}
              <div className='flex justify-between gap-2'>
                <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
                <h4 className='text-right text-[10px] opacity-50 mr-2'>وقت الخروج</h4>
                <input
                className='bg-transparent outline-none w-[100%]'
                value={reservationData.end_time ? reservationData.end_time : ''}
                onChange={(event) => {
                  const updatedClient = { ...reservationData.end_time, name: event.target.value };
                  setReservationData({
                    ...reservationData,
                    client: updatedClient
                  });
                }}
              />                     </div>
                <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
                <h4 className='text-right text-[10px] opacity-50 mr-2'>وقت الدخول </h4>

                <input
                className='bg-transparent outline-none w-[100%]'
                value={reservationData.start_time ? reservationData.start_time : ''}
                onChange={(event) => {
                  const updatedClient = { ...reservationData.start_time, name: event.target.value };
                  setReservationData({
                    ...reservationData,
                    client: updatedClient
                  });
                }}
              />
                              </div>
              </div>
              <div className='flex justify-between gap-2'>
              <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
           {/**  <h4 className='text-right text-[10px] opacity-50 mr-2'>طريقة الدفع</h4> */} 
           {/**    <input
              className='bg-transparent outline-none w-[100%]'
              value={reservationData.end_time ? reservationData.end_time : ''}
              onChange={(event) => {
                const updatedClient = { ...reservationData.end_time, name: event.target.value };
                setReservationData({
                  ...reservationData,
                  client: updatedClient
                });
              }}

            />     */}
            <SmallDropDown paasedarr={typeopPayment} name={"طريقة الدفع"}/>

                            </div>
              <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
              <SmallDropDown paasedarr={statePayment} name={" حالة الدفع"}/>

              
                            </div>
            </div>
            <div className='flex justify-between gap-2'>
            <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
            <h4 className='text-right text-[10px] opacity-50 mr-2'>المرفقات</h4>
            <input
            type='file'
            className='bg-transparent outline-none w-[100%]'
            onChange={(event) => {
              const selectedFile = event.target.files[0];
              setselectedAttachent(selectedFile)
              // Now you can do something with the selected file, like uploading it or processing it
            }}
          />                   </div>
            <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
            <SmallDropDown paasedarr={typeopPayment} name={" العربون"}/>

                          </div>
          </div>
              <div className='flex justify-between gap-2'>
               <div className=' bg-[#F7F7F8] border mb-3 w-[100%] p-0.5'>
                <h4 className='text-right text-[10px] opacity-50 mr-2'>نوع العربون</h4>
                <input
                className='bg-transparent outline-none w-[100%]'
                value={reservationData.type ? reservationData.type : ''}
                onChange={(event) => {
                  const updatedClient = { ...reservationData.type, name: event.target.value };
                  setReservationData({
                    ...reservationData,
                    client: updatedClient
                  });
                }}
              />                </div>
              </div>
              <div className='flex justify-between gap-2'>
               <div className=' bg-[#F7F7F8] border mb-3 w-[100%] p-0.5'>
                <div className='flex justify-end'>
                   {/**    <img className='w-3 h-3 mr-1' src={link}/>*/} 
                <h4 className='text-right text-[10px] opacity-50 mr-2'>ملاحظات</h4>
                 
                </div>
                <input className='bg-transparent outline-none w-[100%]' 
                value={reservationData.notes ? reservationData.notes : ''}
                onChange={(event) => {
                  const updatedClient = { ...reservationData.notes, name: event.target.value };
                  setReservationData({
                    ...reservationData,
                    client: updatedClient
                  });
                }}
                />
                </div>
             {/**    <SmallDropDown paasedarr={arr2} name={"العربون"}/> */}
              </div>
          {/**   <DropDownType paasedarr={arr3} name={'نوع العربون'}/> */} 
             
                <div className='flex justify-between'>
               <div className='flex justify-center bg-[#D9D9D9CC]  p-3 border w-[48%]'>
              <button className=''>الغاء الحجز</button>
            {/**   <img className='w-4 h-4 mt-1 ml-1' src={alert} />*/} 
               </div>
                <div className='flex justify-center bg-gradient-to-b from-[#FFD7A6] to-[#E3AB67]  p-3 border w-[48%]'>
              <button className='text-white' onClick={handleReservation}>حفظ ورجوع</button>
             {/**  <img className='w-4 h-4 mt-1 ml-1' src={bookmark} /> */} 
               </div>
               
            </div>
            </div>
               </div>
    </div>
    </div>
  )
}

export default ReservationInfrrmation
