import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Customers from '../pages/Customers2';
import ReservationInfrrmation from '../Models/ReservationInfrrmation';
import { IconName } from "react-icons/ai";



const UnConfirmedReservation = ({ Data,onReservationSelect }) => {
    const [showPost , setShowPost] = useState(false);
    const navigate = useNavigate()
    const[data, setData] = useState([])
    const [select, SetSelect] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const recordesPerPage = 7;
    const lastIndex = currentPage *  recordesPerPage;
    const firstIndex = lastIndex - recordesPerPage;
    const records = Data.slice(firstIndex,lastIndex);
    const nPage = Math.ceil(Data.length / recordesPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);

     function asdd(){
    SetSelect(!select)
 }

    
 
    
    console.log(Data)
    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
      const displayedData = Data.slice((currentPage - 1) * recordesPerPage, currentPage * recordesPerPage);
      function prePage() {
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    
      function nextPage() {
        if (currentPage !== nPage) {
          setCurrentPage(currentPage + 1);
        }
      }
    
    return (
      <div>
        <div className='flex justify-center'>
          <table className=" text-center border">
            <tbody>
              <tr>
                {displayedData.map((customer, i) => (
                  <th key={i} className="bg-[#E5E5E5] font-bold border-[#D9D9D9CC] p-3">
                    {customer.client.name}
                  </th>
                ))}
              </tr>

                {displayedData.map((customer, i) => (
                  <td key={i} className="border-2 border-[#D9D9D9CC]">
                    <ul className='-my-px -mx-px'>
                      {customer.reservations.map((date, j) => (
                       date.status==1||date.status==4?
               <li onClick={()=>{onReservationSelect(date.id)}} key={j} className={` border-y w-32 border-[#D9D9D9CC] p-3 date.status `}>
                          {date.date}
                        </li>
                        :date.status==2?
                        <li onClick={()=>{onReservationSelect(date.id)}} key={j} className={` border-y w-32 border-[#D9D9D9CC] p-3 date.status  `}>

                        <div>
                       
                          <h2 className='text-[#ED3249] text-xs text-center'>حجز ملغي</h2>
                          </div>
                        <h2 className='text-center text-xs'> {date.date}</h2>
                        <h2 className='text-center text-xs'> {date.expert}</h2>
                      
                        </li>   :date.status=3?
                        <li onClick={()=>{onReservationSelect(date.id)}} key={j} className={` border-y w-32 border-[#D9D9D9CC] p-3 date.status `}>

                        <div>
                       
                          <h2 className='text-[#2E94DE] text-xs'>حجز مؤجل</h2>
                        </div>
                        <h2 className='text-center text-xs'> {date.date}</h2>
                        <h2 className='text-center text-xs'> {date.expert}</h2>
                    

                        </li> 
                        
                        :''
                      ))}
                    </ul>
                  </td>
                ))}
            
            </tbody>
          </table>
          </div>
          {/* Pagination */}
          <nav>

            <ul className="">
              <div className="flex justify-end mt-5">
                {numbers.map((n, i) => (
                  <li className={` ${currentPage === n ? 'bg-gradient-to-b from-[#FFD7A6] to-[#E3AB67] text-white p-1 pl-3 pr-3 ' : 'bg-white p-1 pl-3 pr-3'}`} key={i}>
                    <div onClick={() => handlePageChange(n)}>{n}</div>
                  </li>
                ))}
              </div>
              <div className="flex justify-end ">
                <li>
                  <div className="" onClick={prePage}>
                    <img />lkjl
                  </div>
                </li>
                <li>
                  <div className="" onClick={nextPage}>
                    <img />lkjl
                  </div>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      );
    };
    
    export default UnConfirmedReservation;






    