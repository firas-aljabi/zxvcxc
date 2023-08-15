import React , {useState} from 'react'
import Selection from '../Components/Selection'
import chevron from '../Images/chevron-down.png'
import axios from 'axios'
const CancelResaon = ({visible , onClose ,data}) => {

     const arr=[
{name : "الغاء المناسة", id:"1" },
{name : "سوء الخدمة", id:"2" },
{name : "حالة وفاة", id:"3" },
{name : "اخرى..", id:"4" },
]
function handletheresone(item){
  setselectedreson(item.id)
  console.log(item.id)
}
 const [selectedreson , setselectedreson] = useState(0);
 async function handleReservation () {
   
  const formData = new FormData();
  
  formData.append('reservation_id', parseInt(data)); // Attach the selected file
  formData.append('reason_cancle',parseInt(selectedreson));
  

console.log(parseInt(selectedreson))
console.log(parseInt(data))

  try {
    const response = await axios.post(
      `https://api.march.gomaplus.tech/api/cancle_reservation`,

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
            <div  className='lg:w-[31%] md:w-[40%] sm:w-[60%] w-[80%] h-[70%] bg-white p-5 relative'>

            <div className=' justify-start items-center w-[60%]'>
            <div className='flex justify-between'>
            <img onClick={()=>{onClose(false)}} src={chevron} className='w-10' />
                <h2 className='flex justify-center text-xl text-[#D4821F]'>سبب الالغاء</h2>
            </div>
            </div>
           <Selection paasedarr={arr} onSelectTime={handletheresone}/>
           <div className='flex justify-center bg-gradient-to-b from-[#FFD7A6] to-[#E3AB67] z-50 bottom-5 mt-10 p-3 border w-[100%]'>
           <button onClick={()=>{handleReservation()}} className='text-white text-xs'>حفظ ورجوع</button>
         {/**   <img className='w-4 h-4 mt-1 ml-1' src={bookmark} />*/}
            </div>
    </div> 
    </div>
  )
}

export default CancelResaon
