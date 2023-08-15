import React , {useState} from 'react'

const Selection = ({paasedarr , visible , onClose ,onSelectTime}) => {
       
     const [start,setStart]=useState(false)
  const [selected,setSelected]=useState('')

console.log(selected)
  function asdd(){
    setStart(!start)
 }
 
  return (
   <div className=' z-50'>
<div className="lg:w-[100%] w-[70%]">
    <ul class=" text-sm border border-[#D9D9D9CC] mt-10 ">
    
       {
        paasedarr.map((item) => {
            return(
                <div className='bg-[#F7F7F8]'>
                <div key={item.id}  className=' p-1 items-center text-xs '>
                    <li className=' flex justify-end mr-[20%] items-center ' onClick={()=>{setSelected(item.name);setStart(!start);onSelectTime(item)}}>
   
        <div  className="px-2 py-1 hover:bg-gray-100" >
            
             {item.name}</div>
              <div className={`w-3 h-3 border  ${selected==`${item.name}`?'border-[#AC221A]':'border-'} rounded-full flex justify-center items-center absolute md:right-[10%] right-[5%]`} >
             {selected==`${item.name}`?   
<div className='w-2 h-2 bg-[#AC221A]  rounded-full'>
    </div>
:''}
</div>
      </li>
                </div>
                </div>
            )
        })
    }
    </ul>
   
</div>

        </div>
  )
}

export default Selection
