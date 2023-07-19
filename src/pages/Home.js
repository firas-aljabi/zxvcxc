import React from 'react'
import { useNavigate } from 'react-router-dom'

import Calendar from '../Components/Calendar'
import NavBar from '../Components/NavBar'
import Artists from '../Components/Artists'

const Home = () => {
    let nav=useNavigate()
  return (
    <div>
       <div className='w-full h-full bg-white items-center flex justify-center mb-7'>
            <div className='w-[88%] h-[90%]'>
      <NavBar/>
                <div className='w-[100%] h-[80%]'>
                <h2 className='text-3xl text-right text-[#E21684]'>الموظفات</h2>
                <div className='w-full h-full grid grid-cols-2 mt-6'>
                    <div className='w-[97%] h-full bg-[#F0F0F0CC] '>
                      <Calendar/>

                    </div>
                 <Artists/>
                </div>
                </div>
                </div>
                </div>
    </div>
  )
}

export default Home