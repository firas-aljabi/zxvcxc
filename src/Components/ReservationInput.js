import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Reservation = ({clients, onSelectClient }) => {
  const [data, setdata] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const handleTimeSelection = (time) => {
    onSelectClient(time);
  };
  useEffect(() => {
 
        setdata(clients);
  }, [clients]);
  return (
   
    <div className="w-full font-medium flex justify-end">
      <div>
      <div
        onClick={() => setOpen(!open)}
        className={` flex items-center rounded relative ${
          !selected && "text-gray-700 text-[12px] mr-3"
        }`}
      >
        <BiChevronDown size={20} color="" className={`absolute left-1 ${open && "rotate-180 "}`} /> 
         <input
            type="text"
            value= {
          inputValue}
            onChange={(e) => {setInputValue(e.target.value)}}
            placeholder="Enter name"
            className="placeholder:text-[#D4821F] p-3 w-28 text-center text-[#D4821F] text-[12px] border outline-none border-black bg-[#F7F7F8]"
          />
      </div>
      <ul
        className={`bg-white rounded-lg  w-28 mt-2 overflow-y-scroll scrollbar-hide z-50 ${
          open ? "max-h-28 " : "max-h-0"
        } `}
      >
      
        {data?.map((country) => (
          <li
            key={country.id}
            className={`p-2 text-xs hover:bg-gray-100
            ${
              country?.name?.toLowerCase() === selected?.toLowerCase() &&
              "hover:bg-gray-100 "
            }
            ${
              country?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (country.name.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country.name);
                setOpen(false);
                setInputValue(country.name);
                handleTimeSelection(country.id)
              }
            }}
          >
            {country?.name}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};



export default Reservation
