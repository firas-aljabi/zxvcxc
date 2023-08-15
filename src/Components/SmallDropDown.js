import React, { useEffect, useState } from 'react'
import { BiChevronDown } from "react-icons/bi";
//import chevron from '../Images/chevron-down (10).png'



const SmallDropDown = ({paasedarr , name,onSelectTime,autoselected}) => {
 
useEffect(()=>{

  setSelected(autoselected)
},[autoselected])
  const [start,setStart]=useState(false)
  const [selected,setSelected]=useState(autoselected)
//console.log(paasedarr)

  function asdd(){
    setStart(!start)
 }

  return (
    <div className='w-full'>
        <div className=''>
      <button className=" border-[#D9D9D9CC] bg-[#F7F7F8] p-2 w-[100%]" type="button"
onClick={asdd}
>
    <h2 className='text-[10px] text-end opacity-50'>{name}</h2>
      <div className='flex relative'>
         <BiChevronDown className={`w-4 h-4 -mt-2 ${start?'rotate-180':''} `} />
          <h2 className='text-xs absolute right-[0%] '> {selected}
  </h2>
      </div>
</button>
   </div>
   {start?
    <div className=' relative'>
<div id="dropdownHover" className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-24  absolute">
    <ul class="py-2 text-sm ">
       {
        paasedarr.map((item) => {
            return(
                <div key={item.id}  className='bg-white p-1 items-center rounded-lg text-xs'>
                    <li className=' flex justify-between items-center ' onClick={()=>{setSelected(item.name);setStart(!start);onSelectTime(item.name)}}>
        <div  className="px-2 py-1 hover:bg-gray-100  " >
            
             {item.name}</div>
              <div className={`w-3 h-3 border  ${selected==`${item.name}`?'border-[#1A29AC]':'border-'}  rounded-full flex justify-center items-center absolute md:right-[10%]`} >
             {selected==`${item.name}`?   
<div className='w-2 h-2 bg-[#1A29AC]  rounded-full'>
    </div>
:''}
</div>
      </li>
      </div>)})} 
    </ul>
    </div>
</div>
:''}
    </div>
  )
}


export default SmallDropDown
