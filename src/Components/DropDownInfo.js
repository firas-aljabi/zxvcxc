import React, { useState } from 'react'



const DropDownInfo = ({paasedarr}) => {
     const arr=[
{name : "قيد التنفيد", id:"1" },
{name : "ملغى", id:"2" },
{name : "مؤجل", id:"3" },
{name : "مكتمل", id:"4" },
]
    const [start,setStart]=useState(false)
  const [selected,setSelected]=useState('')
console.log(paasedarr)

  function asdd(){
    setStart(!start)
 }
  return (
    <div className='W-screen '>
        <div className=''>
      <button className=" border border-[#D9D9D9CC] bg-[#F7F7F8] p-2 w-[100%] " type="button"
onClick={asdd}
>
    <h2 className='text-[10px] text-end opacity-50'>حالة الحجز</h2>
      <div className='flex relative '>
       
          <h2 className='text-xs absolute right-[0%]'> {selected}
  </h2>
      </div>
</button>
   </div>
   {start?
<div id="dropdownHover" className="z-50  bg-white divide-y divide-gray-100 rounded-lg shadow w-72  absolute">
    <ul class="py-2 text-sm ">
    
       {
        arr.map((item) => {
            return(
                <div key={item.id}  className='bg-white p-1 items-center rounded-lg text-xs'>
                    <li className=' flex justify-between items-center 'onClick={()=>{setSelected(item.name);setStart(!start)}}>
   
        <div  className="px-2 py-1 hover:bg-gray-100  " >
            
             {item.name}</div>
              <div className={`w-3 h-3 border  ${selected==`${item.name}`?'border-[#1A29AC]':'border-'}  rounded-full flex justify-center items-center absolute md:right-[10%]`} >
             {selected==`${item.name}`?   
<div className='w-2 h-2 bg-[#1A29AC]  rounded-full'>
    </div>
:''}
</div>
      </li>
                </div>
            )
        })
    }
     
    </ul>
</div>
:''}
    </div>
  )
}


export default DropDownInfo
