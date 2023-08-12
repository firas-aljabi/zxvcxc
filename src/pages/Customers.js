import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../Images/Logo.png'
import search  from '../Images/Search.png'

const Customers = () => {
    let nav=useNavigate()
  return (
    <div>
         <div className='w-screen h-screen bg-white items-center flex justify-center'>
            <div className='w-[88%] h-[90%]'>
                <div className='flex justify-between'>
                    <button className='border-2 border-black w-44 h-14' onClick={()=> nav('/login')}>تسجيل خروج</button>
                    <div className='w-96 flex justify-end'>
                    <div>
                    <h2 className='text-[#E21684] mt-5 mr-24 cursor-pointer ' onClick={()=> nav('/customer')}>الزبائن</h2>
                    <div className='m-2 ml-5 w-6 border-b-2 border-[#E21684]'></div>
                    </div>
                    <div >
                    <h2 className='text-black mt-5  cursor-pointer' onClick={()=> nav('/')}>الصفحة الرئيسية</h2>
                    </div>
                    </div>
                    <img src={logo} className='w-20 h-20'/>
                </div>
                <div className='flex justify-between mt-10'>
                    <div className='flex'>
                        <div >
                        <img src={search} alt="Search Icon" class="absolute top-44 left-80 -mt-1 h-4 w-4"/>
                <input type="text" placeholder="بحث" class="w-64 h-12 border mr-5 bg-[#E7E7E787] placeholder:mr-5 placeholder:text-[] placeholder:text-right placeholder:text-sm py-2 px-4 "/>
                </div>
                <button className='w-44 h-12 bg-[#E21684] text-white text-sm'>اضافة زبون جديد</button>
                </div>
                    <h2 className='text-3xl text-right text-[#E21684]'>الزبائن وتاريخ الحجوزات</h2>
                </div>
                <div className='mt-8'>
                <table className='w-full h-full text-center border-2 border-[#E2168421] '>
                     <tr className='h-14'>
                     <td className='bg-[#E2168421] font-bold'>مارينا الاحمد</td>
                          <td className='bg-[#E2168421] font-bold'>سامية الوالي</td>
                          <td className='bg-[#E2168421] font-bold'>الهام الحسن </td>
                           <td className='bg-[#E2168421] font-bold'>رقية المكتوم</td>
                          <td className='bg-[#E2168421]  font-bold'>شمس الهاشم</td>
                          <td className='bg-[#E2168421] font-bold'>نهى الاسعد</td>
                          <td className='bg-[#E2168421] font-bold'>سارة الخالد</td>
                     </tr>
                     <tr className='h-14'>
                     <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                     </tr>
                     <tr className='h-14'>
                     <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                          <td className='border-2 border-[#E2168421] '>12/8/2023</td>
                     </tr>
                     </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Customers