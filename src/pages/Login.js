import React, { useEffect, useState } from 'react';
import LoginBg from '../Images/LoginBackground.png';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   localStorage.clear('token')
  //   if (errora) {
  //     console.log("Store Product Error Message:", errora.message);
  //     setError("Wrong Email or password");
  //   }
  //   else {
  //     setError("") ;
     
  //   }
  // }, []);

  async function handleLogin (e) {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData();
    formData.append('email', userEmail);
    formData.append('password', password);
    try {
      const response = await axios.post(`https://api.march.gomaplus.tech/api/login`,formData);
      console.log(response.data);
  
      localStorage.setItem('token', response.data.token);
      navigate("/home");

      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
        
      return false;
    }

    setTimeout(checkForAuth, 2000);

  };

  const checkForAuth=()=>{
  if(    localStorage.getItem('token')!=undefined &&localStorage.getItem('token')!=null&&localStorage.getItem('token')!=''){
    console.log('goin')
    navigate("/home");

  }
  else{
    console.log('error')
  }
  
}
  return (
    <div className='min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${LoginBg})` }}>
      <div className='w-full max-w-sm bg-white bg-opacity-60 p-8 '>
        <h1 className='text-3xl text-[#E21684] text-center mb-8'>تسجيل دخول</h1>
        <form>
          <div className='mb-4'>
            <input
            onChange={(e) => setUserEmail(e.target.value)}

              type='email'
              placeholder='البريد الالكتروني'
              className='w-full h-12 px-3 bg-white bg-opacity-10 border border-black placeholder-black text-right'
            />
            
          </div>
          <div className='mb-4'>
            <input
            onChange={(e) => setPassword(e.target.value)}

              type='password'
              placeholder='كلمة السر'
              className='w-full h-12 px-3 bg-white bg-opacity-10 border border-black placeholder-black text-right'
            />
          </div>
          <div className='mb-6'>
            <a href='#' className='text-sm  text-black hover:text-gray-800 block'>
              هل نسيت كلمة السر؟
            </a>
          </div>
          <button to="/Home" className='w-full h-12 bg-[#E21684] text-white text-base mt-4 mb-2 drop-shadow-xl  shadow-white' onClick={handleLogin} >تسجيل دخول</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
