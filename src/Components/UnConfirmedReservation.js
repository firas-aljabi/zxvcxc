import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Customers from '../pages/Customers2';
import ReservationInfrrmation from '../Models/ReservationInfrrmation';



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
        
          <table className="w-full text-center border-2">
          
            <tbody>
              <tr>
                {displayedData.map((customer, i) => (
                  <th key={i} className="bg-[#E5E5E5] font-bold border-2 border-[#D9D9D9CC] p-3">
                    {customer.client.name}
                  </th>
                ))}
              </tr>
              <tr className=' items-start' >
                {displayedData.map((customer, i) => (
                  <td key={i} className="border-2 border-[#D9D9D9CC] p-3  ">
                    <ul >
                      {customer.reservations.map((date, j) => (
               <li onClick={()=>{onReservationSelect(date.id)}} key={j} className={`border-2 border-[#D9D9D9CC] p-3 date.status ${date.status==2?"bg-red-600":''} `}>
                          {date.date}
                          {date.expert}
                          
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
         
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