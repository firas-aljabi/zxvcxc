import React, { useEffect, useState } from 'react';
import ather from '../Images/Ather.png';
import aydah from '../Images/Aydah.png';
import sabah from '../Images/Sabah.png';
import sarah from '../Images/Sarah.png';
import sukar from '../Images/Sukar.png';
import blank from '../Images/Blank.png';
import axios from 'axios';

function Artists({ onArtistClick }){
const [artistsData, setArtistsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
   
  const handleRowClick = (index) => {
    setSelectedRow(index);
    onArtistClick(artistsData[index]);
  };
  
  useEffect(() => {
    fetchArtistsData();
  }, []);
  
  const fetchArtistsData = async () => {
    try {
      const response = await axios.get('https://api.march.gomaplus.tech/api/list_of_experts', {
        headers: {
          
          'Authorization':  `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      setArtistsData(response.data.data);
    } catch (error) {
      console.error('Error fetching artists data:', error);
    }
  };

  const generateRows = () => {
    return artistsData.map((artist, index) => (
        <tr
        key={index}
        className={`border-b-2 border-[#F9C688] ${selectedRow === index ? 'bg-[#F9C688]' : ''}`}
        onClick={() => handleRowClick(index)}
      >
              <td className='py-2'>
          <a href='#' className='hover:text-gray-700 focus:text-gray-500 focus:underline'>
            انقر لحجز موعد
          </a>
        </td>
        <td className='py-2'>{artist.position}</td>
        <td className={` ${selectedRow === index ? 'bg-[#F9C688]' : 'bg-[#E5E5E5]'} flex flex-col justify-center sm:flex-row sm:justify-between p-3`}>
          <p className='text-center mt-3 -mr-10 sm:text-right sm:w-24'>{artist.name}</p>
          <img src={artist.image} className='w-14 h-14 mx-auto sm:mx-0' alt={artist.name} />
        </td>
      </tr> 
    ));
  };

  return (
    <div className='w-[100%] h-[100%] bg-[#F0F0F0CC]'>
    <table className='w-full text-center'>
      <thead>
        <tr className='border-b-2 border-[#F9C688] h-14'>
          <th className='font-bold'>الحجوزات</th>
          <th className='font-bold'>الاختصاص</th>
          <th className='bg-[#E5E5E5] font-bold'>الاسم</th>
        </tr>
      </thead>
      <tbody>{generateRows()}</tbody>
      
    </table>
  </div>
  );
}

export default Artists;
