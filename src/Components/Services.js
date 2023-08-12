import React, { useState } from 'react'
import tt from '../Images/خحنخ 2.png'

const CLASS = [
{name : "عكف رموش", id:"1" },
{name : "رفع حواجب", id:"2"},
{name : "مكياج عروسة", id:"3"},
{name : "مكياج زبونة", id:"4"},
];

const Services = () => {
         const [toggledItems, setToggledItems] = useState({});
         const [arr,setarr]=useState([])
    const handleToggle = (itemId) => {
        // Update the state for the clicked item
        setToggledItems((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId], // Toggle the state for the clicked item
        }));}
    
    
  return (
    <div className='grid grid-cols-2'>
        {
        CLASS.map((item) => {
            return(
                <div key={item.id}  className='flex justify-around p-1 items-center rounded-lg'>
                    
                    <div>
                    <h2>{item.name}</h2>
                    <h2>{item.Price}</h2>
                    </div>
                    <div>
                     <button className="h-5"  onClick={() => handleToggle(item.id)}>
                    {toggledItems[item.id] ? <div className='bg-[#F9C688] rounded-sm shadow-lg p-0.5'><img className='' src={tt} /></div>: <div className='border border-[#00000078] p-2 rounded-sm'></div>}
                   </button>
                    </div>
                </div>
                
            )
        })
    }
    
    </div>
  )
}

export default Services;
