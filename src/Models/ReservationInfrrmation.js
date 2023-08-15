import React, { useEffect, useState } from 'react'
//import row from '../Images/chevron-down (8).png'
//import DropDown from './DropDown'
import DropDownInfo from '../Components/DropDownInfo'
import SmallDropDown from '../Components/SmallDropDown'
import chevron from '../Images/chevron-down.png'
//import link from '../Images/link (2).png'
import DropDownType from '../Components/DropDownType'
// import alert from '../Images/alert-triangle (1).png'
// import bookmark from '../Images/bookmark (1).png'
//import chevron from '../Images/chevron-down (11).png'
import axios from 'axios'
import CancelResaon from './CancelResaon'
import DelayReson from './DelayReson'
const ReservationInfrrmation = ({ data, onModelClose }) => {
  const [reservationData, setReservationData] = useState({});
  const [SelectedAttachent, setselectedAttachent] = useState(null);
  const [Payment_Way, setPayment_Way] = useState(reservationData.payment_way);

  const [Payment_Status, setPayment_Status] = useState(reservationData.payment_status);

  const [Payment_amount, setPayment_amount] = useState(reservationData.reservation_amount);
  const [notes, setnotes] = useState(reservationData.notes);
  const [reservationtype, setreservationtype] = useState(reservationData.state);

  function handleselectedamount(amount){
    setPayment_amount(amount)
  }
  function handleselectpamymentway(type){  
    setPayment_Way(type)
  }
  function handleselectpamymentstatuse(stat){  
    setPayment_Status(stat)
  }
  function handlereservationtype(stat){  
    console.log(stat)
   if(stat=='canceled'){
    setCanceled(true)
    console.log('adasdsadad')
   }
   else if(stat=='delayed'){
    setDelayed(true)
   }
  }
  // Line 158:63:  'setCanceled' is not defined   no-undef
  // Line 160:23:  'setDelayed' is not defined    no-undef
  // Line 165:2:   'canceled' is not defined      no-undef
  // Line 165:15:  'CancelResaon' is not defined  react/jsx-no-undef
  // Line 165:62:  'setCanceled' is not defined   no-undef
  // Line 165:93:  'canceled' is not defined      no-undef
  const [canceled, setCanceled] = useState(false);

  const [delayed, setDelayed] = useState(false);
  const reservationstate=[
    {name:'canceled',id:2},
    {name:'inprogress',id:4},
    {name:'delayed',id:3},
  {name:'completed',id:1}]

const statePayment=[
  {name:'مؤجل'},

{name:'مكتمل'}]
const typeopPayment=[
  {name:'تحويل'},

{name:'شبكة'}]
const amountopPayment=[
  {name:50},

{name:100},{name:150}]
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
const getReservationType = (amountType) => {
  const numericAmountType = parseInt(amountType); // Convert to a number
  const matchingReservationType = Object.keys(reservationTypeMappings).find(
    (reservationType) => reservationTypeMappings[reservationType] === numericAmountType
  );

  return matchingReservationType || '';
};

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
  formData.append('payment_status', Payment_Status);   //Payment_Status should be 2 
  formData.append('payment_way', Payment_Way);   // كاشي و شبكة
  formData.append('amount_type', reservationData.amount_type);   //نوع العربون 
  formData.append('reservation_amount', Payment_amount);  //reservation_amount ٥٠٠٠٠ العربون
  formData.append('attachment', SelectedAttachent); // Attach the selected file
   formData.append('status', 1);   
 
 

   // formData.append('delay_date', null);
  // formData.append('reason_cancle_delay',null);
 formData.append('notes', notes);


  



    formData.append('attachment', SelectedAttachent); // Attach the selected file


  
  try {
    const response = await axios.post(
      `https://api.march.gomaplus.tech/api/complete_reservation`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'multipart/form-data',

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
   <div className=' fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center'>
            <div  className='lg:w-[32%] md:w-[45%] w-[70%] h-[90%] bg-white p-5 pl-12 pr-12 -z-50 overflow-y-scroll scrollbar-hide'>
             <div  className=' justify-start items-center w-[67%]'>
             <div className='flex justify-between'>
             <img onClick={() => onModelClose(false)} className='w-7' src={chevron} />
                <h2 className='flex justify-center text-xl text-[#D4821F]'>معلومات الحجز</h2>
            </div>
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
             








              


              <SmallDropDown paasedarr={reservationstate} name={" حالة الحجز"} autoselected={reservationData.status} onSelectTime={handlereservationtype}/>


{/** 
              <div className=' bg-[#F7F7F8] border mb-3 mt-3 '>
              <select onChange={(e) => { if (e.target.value === 'canceled') setCanceled(true); else if(e.target.value === 'delayed') setDelayed(true)}}>
                <option  selected={!canceled && !delayed && !reservationData.status} value="inprogress" > قييد التنفيذ</option>
                <option selected={reservationData.status === 3}  value="delayed"  onClick={() => { setDelayed(true) }}> مؤجل</option>
                <option selected={reservationData.status === 2} value="canceled"> ملغي</option>
                <option selected={reservationData.status === 1} value="completed" >مكتمل</option>
              </select>
              
            </div>
*/}


{delayed && <DelayReson className='z-50' data={reservationData.expert.id} onClose={() => { setDelayed(false) }} visible={delayed} />}

{canceled && <CancelResaon className='z-50' data={reservationData.reservation_number} onClose={() => { setCanceled(false) }} visible={canceled} />}

















              </div>
           {/** <DropDownInfo/>*/}
              <div className='flex justify-between gap-2 -mt-2'>
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
              <div className=' bg-[#F7F7F8] border mb-3 w-full'>
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
            <SmallDropDown paasedarr={typeopPayment} autoselected={reservationData.payment_way} name={"طريقة الدفع"} onSelectTime={handleselectpamymentway}/>

                            </div>
              <div className=' bg-[#F7F7F8] border mb-3 w-full'>
              <SmallDropDown paasedarr={statePayment} name={" حالة الدفع"} autoselected={reservationData.payment_status} onSelectTime={handleselectpamymentstatuse}/>

              
                            </div>
            </div>
            <div className='flex justify-between gap-2'>
            <div className=' bg-[#F7F7F8] border mb-3 mt-3 w-full'>
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
            <div className=' bg-[#F7F7F8] border mb-3 mt-3 w-full'>
            <SmallDropDown paasedarr={amountopPayment} name={" العربون"} onSelectTime={handleselectedamount}/>

                          </div>
          </div>
              <div className='flex justify-between gap-2'>
               <div className=' bg-[#F7F7F8] border mb-3 w-[100%] p-0.5'>
                <h4 className='text-right text-[10px] opacity-50 mr-2'>نوع العربون</h4>
                <h4 className='text-right text-[10px] opacity-100 mr-2'>{getReservationType(reservationData.amount_type)}</h4>
            </div>
              </div>
              <div className='flex justify-between gap-2'>
               <div className=' bg-[#F7F7F8] border mb-3 w-[100%] p-0.5'>
                <div className='flex justify-end'>
                   {/**    <img className='w-3 h-3 mr-1' src={link}/>*/} 
                <h4 className='text-right text-[10px] opacity-50 mr-2'>ملاحظات</h4>
                 
                </div>
                <input className='bg-transparent outline-none w-[100%]' 
                value={reservationData.notes }
                onChange={(event) => {
                  setnotes(event.target.value)
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


