import React, { useState } from 'react';
import ather from '../Images/Ather.png';
import aydah from '../Images/Aydah.png';
import sabah from '../Images/Sabah.png';
import sarah from '../Images/Sarah.png';
import sukar from '../Images/Sukar.png';
import blank from '../Images/Blank.png';

function Artists() {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (index) => {
      setSelectedRow(index);
    };
  
  const artistsData = [
    {
      name: 'صباح عسيري',
      specialization: 'مكياج',
      image: sabah,
    },
    {
      name: 'سارة خان',
      specialization: 'مكياج',
      image: sarah,
    },
    {
        name: 'عايده',
        specialization: 'مكياج',
        image: aydah,
      },
      {
        name: 'اثير العبدلله',
        specialization: 'مكياج',
        image: ather,
      },
      {
        name: 'سكر',
        specialization: 'شعر',
        image: sukar,
      },
      {
        name: 'تغريد',
        specialization: 'شعر',
        image: blank,
      },
      {
        name: 'ناهد',
        specialization: 'مكياج',
        image: blank,
      },
      {
        name: 'سيمو',
        specialization: 'شعر',
        image: blank,
      },
      {
        name: 'فجر',
        specialization: 'شعر',
        image: blank,
      },
  ];

  const generateRows = () => {
    return artistsData.map((artist, index) => (
        <tr
        key={index}
        className={`border-b-2 border-[#E2168436] ${selectedRow === index ? 'bg-[#f2bedb]' : ''}`}
        onClick={() => handleRowClick(index)}
      >
              <td className='py-2'>
          <a href='#' className='hover:text-gray-700 focus:text-gray-500 focus:underline'>
            انقر لحجز موعد
          </a>
        </td>
        <td className='py-2'>{artist.specialization}</td>
        <td className={` ${selectedRow === index ? 'bg-[#f2bedb]' : 'bg-[#E5E5E5]'} flex flex-col justify-center sm:flex-row sm:justify-between p-3`}>
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
          <tr className='border-b-2 border-[#E2168436] h-14'>
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
