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
   
    <div className="w-full font-medium  ">
      <div
        onClick={() => setOpen(!open)}
        className={` flex items-center rounded  ${
          !selected && "text-gray-700"
        }`}
      >
        <BiChevronDown size={20} className={`${open && "rotate-180 "}`} /> 
         <input
            type="text"
            value= {
          inputValue}
            onChange={(e) => {setInputValue(e.target.value)}}
            placeholder="Enter name"
            className="placeholder:text-gray-700 p-3 w-32 border outline-none border-black ml-3"
          />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-scroll  ${
          open ? "max-h-60 " : "max-h-0"
        } `}
      >
      
        {data?.map((country) => (
          <li
            key={country.id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              country?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
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
  );
};



export default Reservation
