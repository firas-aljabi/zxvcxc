import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../Components/AdminCalender';
import NavBar from '../Components/AdminNavbar';
import Artists from '../Components/adminArtist';

const AdminHome = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistHolidays, setArtistHolidays] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (selectedArtist) {
      setArtistHolidays(selectedArtist.holidays);
    }
  }, [selectedArtist]);
  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
  };
  return (
    <div>
      <div className='w-full h-full bg-white items-center flex justify-center mb-7'>
        <div className='w-[88%] h-[90%]'>
          <NavBar />
          <div className='w-[100%] h-[80%]'>
            <h2 className='text-3xl text-right text-[#E21684]'>الموظفات</h2>
            <div className='w-full h-full grid grid-cols-2 mt-6'>
              <div className='w-[97%] h-full bg-[#F0F0F0CC] '>
              <Calendar selectedArtist={selectedArtist}  />
              </div>
              <Artists onArtistClick={handleArtistClick} />
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default AdminHome;
