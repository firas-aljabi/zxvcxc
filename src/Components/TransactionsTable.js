import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Update from './TransactionUpdate';

{/** */} const Data=[
{name : "هند الحسين", amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023", id:"1" },
{name : "هند الحسين",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"2" },
{name : "لينا",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"3" },
{name : "اصالة",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"4" },
{name : "كوثر",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"5" },
{name : "هيا",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"6" },
{name : "مياس",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"7" },
{name : "هند الحسين", amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023", id:"8" },
{name : "هند الحسين",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"9" },
{name : "لينا",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"10" },
{name : "اصالة",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"11" },
{name : "كوثر",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"12" },
{name : "هيا",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"13" },
{name : "مياس",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"14" },
{name : "مياس",amount:"200", attached:"تحويلة.pdf" , date:"12/8/2023",  id:"15" },

]


const Table = ({ editRow }) => {
    const [showPost , setShowPost] = useState(false);
    const navigate = useNavigate()
    const handleOnClose = () => setShowPost(false)
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

     useEffect(() => {
           axios.get('')
           .then(res => setData(res.data)) 
           .catch (err => console.log(err))
        })
    
    
    console.log(Data)


  return (
    <div>
       <table className='w-full h-full text-center border-2 border-[#F5C8909E] '>
                     <tr className='h-14'>
                          <td className='bg-[#F5C8906E] font-bold'>تاريخ التحويل</td>
                          <td className='bg-[#F5C8906E] font-bold'>المناسبة</td>
                          <td className='bg-[#F5C8906E] font-bold'>المبلغ</td>
                          <td className='bg-[#F5C8906E] font-bold'>الاسم</td>
                          <td className='bg-[#F5C8906E] font-bold'>ID</td>
                     </tr>
                     <tbody>
                    {
                        records.map((d,i) => (
                      
                            <tr className={select == i ? "bg-[#D9D9D994]" : ""} onClick={() => {setShowPost(true) ; navigate(`/transaction/?id=${d.id}`); SetSelect(i) ;  editRow(i)}} key={i} >
                                  
                               <td className='border-2 border-[#F5C8909E] p-3'>{d.date}</td>
                               <td className='border-2 border-[#F5C8909E] p-3'>{d.attached}</td>
                               <td className='border-2 border-[#F5C8909E] p-3'>{d.amount}</td>
                               <td className='border-2 border-[#F5C8909E] p-3'>{d.name}</td>
                               <td className='border-2 border-[#F5C8909E] p-3'>{d.id}</td>
                            </tr>
                            
                        ))  
                    }
                     <div>
                        
                    </div>
                     </tbody>
                     </table>
                     <div>
                        <ul className=''>
                           
                            <div className='flex justify-end mt-5'>
                            {
                                numbers.map((n , i) => (
                                    <li className={` ${currentPage === n ? 'bg-gradient-to-b from-[#FFD7A6] to-[#E3AB67] text-white p-1  pl-3 pr-3  ' : 'bg-white p-1 pl-3 pr-3'}`} key={i}>
                                        <div  onClick={() => changeCPage(n)}>{n}</div>
                                    </li>
                                ))
                            }
                            </div>
                            <div className='flex justify-end '>
                             <li>
                                <div  className='' onClick={prePage}><img/>lkjl</div>
                            </li>
                             <li>
                                <div  className='' onClick={nextPage}><img/>lkjl</div>
                            </li>
                            </div>
                        </ul>
                     </div>
               <Update  onClose={handleOnClose} visible={showPost} />  
    </div>
   
  )
  function prePage () {
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1)
    }
}
 function changeCPage (id) {
    setCurrentPage(id)
}
 function nextPage () {
     if(currentPage !== nPage){
        setCurrentPage(currentPage + 1)
    }
}
}

export default Table;
