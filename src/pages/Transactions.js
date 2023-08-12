import React, { useState } from 'react'
import logo from '../Images/Logo.png'
import plus from '../Images/plus.png'

import Table from '../Components/TransactionsTable'

const Transactions = () => {

    const [showPost , setShowPost] = useState(false);
const handleOnClose = () => setShowPost(false)
const [rows, setRows] = useState([
     {
      page: "Home",
      description: "This is the main page of the website",
      status: "live",
    },
    {
      page: "About Us",
      description: "This page has details about the company",
      status: "draft",
    },
    {
      page: "Pricing",
      description: "Prices for different subscriptions",
      status: "error",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

  };
    
  return (
    <div>
        
        <div className='w-screen h-screen bg-white items-center flex justify-center'>
            <div className='w-[88%] h-[90%]'>
                <div className='flex justify-between'>
                    <button className='border-2 border-black w-44 h-14'>تسجيل خروج</button>
                    <div >
                    <h2 className='text-[#D4821F] mt-5 '>التحويلات البنكية</h2>
                    <div className='m-2 ml-14 w-12 border-b-2 border-[#D4821F]'></div>
                    </div>
                    <img src={logo} className='w-20 h-20'/>
                </div>
                <div className='flex justify-between mt-10'>
                    <div className='flex justify-between w-[53%]'>
                 <button className='w-32 h-12 text-white text-sm flex justify-evenly border-2 border-[#36C44E] shadow-sm'>
                <p className='mt-2 text-[#36C44E]'>تحميل إكسل</p>
           {/**     <img src={load} className='mt-3 w-4 h-4'/> */}
                </button>
                <button className='w-40 h-12 bg-gradient-to-b from-[#FFD7A6] to-[#E3AB67] text-white  text-sm flex justify-evenly shadow-inner shadow-[#fbbccf]'>
                    <p className='mt-3'>فلترة التحويلات</p>
             {/**    <img src={filter} className='mt-3 w-5 h-5'/>*/}
                </button>
                <button className='w-32 h-12 bg-gradient-to-b from-[#FFD7A6] to-[#E3AB67] text-white text-sm flex justify-evenly shadow-inner shadow-[#fbbccf]'>
                <p className='mt-3'>اضافة تحويلة</p>
                <img src={plus} className='mt-3 w-5 h-5'/>
                </button>
                <div>
              {/**     <img src={searchOrange} alt="Search Icon" class="absolute left-[51%] w-4 h-4 mt-4 z-50"/>*/}  
                <input type="text" placeholder="البحث" class="w-36 h-12 border border-[#E3AB67] placeholder:text-[#E3AB67] placeholder:text-right placeholder:text-sm placeholder:mr-5 py-2 px-3 relative "/>
                </div>
                </div>
                    <h2 className='text-3xl text-right'>التحويلات البنكية للزبائن</h2>
                </div>
                <div className='mt-8'>
               <Table rows={rows} editRow={handleEditRow}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Transactions