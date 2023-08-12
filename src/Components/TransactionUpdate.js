import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

 const Data=[
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
//console.log(Data)
      
     const Update = ({visible , onClose }) => {
         
        const [data , setData] = useState([])
        const {id} =useParams()
        const [values , setValues] = useState({
            id:id,
            name:"",
            amount:"",
        })
        ;
        const {name} = Data
          useEffect(() => {
           axios.get('')
           .then(res => {
            setValues({...values , name:res.data.name, amount:res.data.amount})
           }) 
           .catch (err => console.log(err))
        }, [])


        const navigate = useNavigate()
        const handleSubmit = (e) => {
            e.preventDefault();
             axios.put('')
           .then(res => {
            navigate('/')
           }) 
           .catch (err => console.log(err))
        }

        if(!visible) return null;
 
      
    
  return (
     <div>
        
       <div className='w-screen h-screen fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center'>
            <div onSubmit={handleSubmit}  className='w-[30%] h-[70%] bg-white p-5 -z-50'>
             <div className='flex justify-center'>
         {/**      <img src={row} /> */} 
                <div onClick={onClose} className=' w-[8%] h-[8%] mr-20' >X</div>
                <h1 className='flex justify-center mb-[5%] text-xll mr-20'>معلومات التحويلة</h1>
            </div>
            <div  className='flex justify-center'>
            <div className='w-72'>
            <div className=' border- bg-[#F7F7F8] border mb-3  '>
                <h4 className='text-right text-xs text-[#B5B5B5] mr-2'>الاسم</h4>
                <input  onChange={(e) => setValues({...values ,name:e.target.value})}  className='bg-transparent outline-none text-black  w-[100%]' ></input>
            </div>
            <div className=' bg-[#F7F7F8] border mb-3 '>
                <h4 className='text-right text-xs text-[#B5B5B5] mr-2'>تاريخ التحويل </h4>
                <input className='bg-transparent outline-none w-[100%]' />
            </div>
            <div className=' bg-[#F7F7F8] border mb-3 '>
                <h4 className='text-right text-xs text-[#B5B5B5] mr-2'>المبلغ</h4>
                < input value={values.amount} onChange={(e) => setValues({...values ,amount:e.target.value})} className='bg-transparent outline-none w-[100%]' />
            </div>
            <div className=' bg-[#F7F7F8] border mb-3 '>
                <h4 className='text-right text-xs text-[#B5B5B5] mr-2'>ملف الحوالة</h4>
                <input className='bg-transparent outline-none w-[100%]' />
            </div>
            <button className='bg-gradient-to-b from-[#FFD7A6] to-[#E3AB67] w-[100%] p-3 mt-8 text-white'>حفظ</button>
            </div>
            </div>
    </div>
    </div>
    </div>
    
  );
};

export default Update
