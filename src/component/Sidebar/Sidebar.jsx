import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const [greeting,setgreeting]=useState("");
  const navigate=useNavigate();

  const greetingMessage=()=>{
    const currentHours=new Date().getHours();
    if(currentHours<12){
      setgreeting("Good Morning 🌞")
    }
    else if(currentHours<18){
      setgreeting("Good After Noon 🌤️")
    }
    else if(currentHours<21){
      setgreeting("Good Evening 🌇")
    }
    else{
      setgreeting("Good Night 🌙");
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }
  useEffect(()=>{
    greetingMessage()
  },[]);

  return (
    <div className='w-1/4 h-[100vh] bg-black border-2 p-5 font-extralight'>
      <div className='text-center text-3xl text-white'>
        {localStorage.getItem('gymName')}
      </div>
      <div className='flex gap-5 my-5  '>
        <div className='h-[120px] w-[120px] rounded-3xl'>
          <img className="w-full h-full rounded-3xl" src={localStorage.getItem('profilePic')} alt='icon'/>
        </div>
        <div className='flex-column justify-center align-middle'>
          <div className='text-white text-2xl'>{greeting}</div>
          <div className='text-white text-xl mt-1 font-semibold'>Admin
          </div>
        </div>
      </div>

      <div className='mt-10 py-10 border-t-2 border-gray-700'>
        <Link to='/dashboard' className='flex items-center mt-5 gap-8 font-semibold text-xl text-white bg-slate-700 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black '>
          <div><HomeIcon /></div>
          <div>Dashboard</div>
        </Link>
        <Link to='/member' className='flex items-center mt-5 gap-8 font-semibold text-xl text-white bg-slate-700 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
          <div><GroupIcon/></div>
          <div>Members</div>
        </Link>
        <div onClick={()=>handleLogout()}  className='flex items-center mt-5 gap-8 font-semibold text-xl text-white bg-slate-700 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
          <div><LogoutIcon /></div>
          <div>Logout</div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
