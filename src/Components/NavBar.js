import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../Images/Logo.png'

function NavBar() {
    let nav=useNavigate()
    const [activeLink, setActiveLink] = useState(null);
  
    const handleLinkClick = (index) => {
      setActiveLink(index);
      // You can perform additional actions here when a link is clicked
    };
  
  return (
    <div>
    <div className='flex justify-between'>
      <button className='border-2 mt-2 border-black w-44 h-14' onClick={() => nav('/login')}>
        تسجيل خروج
      </button>
      <div className='w-96 flex justify-end items-center'>
        <div>
          <h2
            className={`relative mt-5 mr-20 cursor-pointer ${
              activeLink === 0 ? 'text-[#D4821F]' : ''
            }`}
            onClick={() => {handleLinkClick(0) ; nav('/asd')}}
          >
            الزبائن
            {activeLink === 0 && (
              <div className='absolute w-6 bottom-[-10] right-0 bg-[#D4821F] h-0.5'></div>
            )}
          </h2>
        </div>
        <div>
          <h2
            className={`relative mt-5 cursor-pointer ${
              activeLink === 1 ? 'text-[#D4821F]' : ''
            }`}
            onClick={() => {handleLinkClick(1) ; nav('/home')}}
          >
            الصفحة الرئيسية
            {activeLink === 1 && (
              <div className='absolute w-12 bottom-[-10] right-0 bg-[#D4821F] h-0.5'></div>
            )}
          </h2>
        </div>
      </div>
      <img src={logo} className='w-20 h-20' alt='Logo' />
    </div>
  </div>
      );
    };
    
   

export default NavBar
