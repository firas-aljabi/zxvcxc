import React from 'react';
import LoginBg from '../Images/LoginBackground.png';
import { Link, useNavigate, useNavigation } from 'react-router-dom';

const Login = () => {

  return (
    <div className='min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${LoginBg})` }}>
      <div className='w-full max-w-sm bg-white bg-opacity-60 p-8 rounded-md'>
        <h1 className='text-3xl text-[#E21684] text-center mb-8'>تسجيل دخول</h1>
        <form>
          <div className='mb-4'>
            <input
              type='email'
              placeholder='البريد الالكتروني'
              className='w-full h-12 px-3 bg-white bg-opacity-10 border border-black placeholder-black text-right'
            />
            
          </div>
          <div className='mb-4'>
            <input
              type='password'
              placeholder='كلمة السر'
              className='w-full h-12 px-3 bg-white bg-opacity-10 border border-black placeholder-black text-right'
            />
          </div>
          <div className='mb-6'>
            <a href='#' className='text-sm font-bold text-black hover:text-gray-800 block'>
              هل نسيت كلمة السر؟
            </a>
          </div>
          <Link to="/Home" className='w-full h-12 bg-[#E21684] text-white text-base mt-4 mb-2 rounded-md' >تسجيل دخول</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
