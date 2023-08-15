import React, { useState } from 'react'
//import row from '../Images/chevron-down (8).png'
import axios from 'axios';

const AddNewClient = ({onModelClose}) => {
     const [phone , setphone] = useState('')
     const [name, setname] = useState("");
     const [email, setemail] = useState("");
   
   async function handleReservation () {
   
  const formData = new FormData();
  
  formData.append('name', name); // Attach the selected file
  formData.append('email',email);
  formData.append('phone', parseInt(phone));

console.log(name)

console.log(email)
console.log(parseInt(phone))

  
  try {
    const response = await axios.post(
      `https://api.march.gomaplus.tech/api/create_client`,

      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'multipart/form-data',
          'Content-Type': false

        },
      }
    );
    console.log('Response:', response);
    onModelClose(false)
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    // You can also log error.response.data to see more details from the server response
    return false;
  }
  
  };

  return (
     <div className='w-screen h-screen fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center'>
            <div  className='lg:w-[30%] md:w-[40%] w-[80%] h-[70%] bg-white p-5 pl-10 pr-10'>
             <div className='flex justify-center' onClick={() => onModelClose(false)}>
            {/**    <img className=' w-[8%] h-[8%] mr-20' src={row} /> */} x
                <h2 className='flex justify-center mb-[5%]  mr-20'>اضافة زبون جديد</h2>
            </div>
            <div className='flex justify-center items-center'>
                <div>
            <input className='w-[100%] outline-none border bg-[#F7F7F8]  mb-3 p-3 text-black placeholder:text-black placeholder:text-right placeholder:text-xs'placeholder='الاسم الكامل' type='text' 
            onChange={(e) => setname(e.target.value)} />
             <input className='w-[100%] outline-none border bg-[#F7F7F8]  mb-3 p-3 text-black placeholder:text-black placeholder:text-right placeholder:text-xs'placeholder='رقم الهاتف' type='text' 
             onChange={(e) => setphone(e.target.value)} />
              <input  className='w-[100%] outline-none border bg-[#F7F7F8]  mb-3 p-3 text-black placeholder:text-black placeholder:text-right placeholder:text-xs'placeholder='البريد الالكتروني' type='text' 
              onChange={(e) => setemail(e.target.value)} />

              <button onClick={()=>{handleReservation()}} className='bg-gradient-to-b from-[#FFD7A6] to-[#E3AB67] w-[100%] p-3 text-white mt-7'>حفظ و اضافة حجز</button>
              <button onClick={()=>{onModelClose(false)}} className=' border border-[#E3AB67] w-[100%] p-3 text-[#E3AB67] mt-3'>تراجع</button>
            </div>
               </div>
    </div>
    </div>
  )
}

export default AddNewClient
