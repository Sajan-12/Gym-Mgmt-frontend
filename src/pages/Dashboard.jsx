import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../component/Sidebar/Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import { Link } from 'react-router-dom';


const Dashboard = () => {

  const [dashboardpopup,setDashboardpopup]=useState(false);

  const ref=useRef(null);
  useEffect(()=>{
    const checkIfClickOutside=(e)=>{
      if(dashboardpopup&&ref.current&&!ref.current.contains(e.target)){
      setDashboardpopup(false);
    }

    };
  document.addEventListener("mousedown",checkIfClickOutside);
  return ()=>{
    document.removeEventListener("mousedown",checkIfClickOutside);
  };

  },[dashboardpopup]);


  function handleMenu(value){
       localStorage.setItem('fun',value);
  }

  return (
    <div className=' w-full sm:w-3/4 text-black p-5  sm:py-0 relative'>

     <div className='w-full bg-slate-900 text-white rounded-lg p-3 flex justify-between items-center'>
     <MenuIcon onClick={()=>setDashboardpopup(prev=>!prev)} className='cursor-pointer'/>
     <img className='w-8 h-8 rounded-3xl border-2' src="https://img.freepik.com/premium-vector/fitness-logo_25327-144.jpg"/>
     </div>
     {
      dashboardpopup&&<div ref={ref} className='absolute p-3 mt-2 bg-slate-900 text-white rounded-xl text-lg font-extralight'>
      <p>Hi welcom to our Gym Managment System.</p>
      <p>Feel free to ask any querries.</p>
    </div>
     }
    
     <div className='mt-5 h-[80%] sm:h-fit pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-2 md:grid-cols-3 w-full p-5 overflow-x-auto'>
      <Link to='/member' className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
        <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
        <div className='py-7 px-5 flex-col justify-center item-center w-full  text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
           <PeopleAltIcon sx={{color:"green",fontSize:"50x"}}/>
           <p className='text-xl my-3 font-semibold font-mono'>Joined Members</p>
        </div>
      </Link>

      <Link to='/specific/monthly-joined' className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer' 
      onClick={()=>handleMenu("Monthly Joined")}>
        <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
        <div className='py-7 px-5 flex-col justify-center item-center w-full  text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
           <SignalCellularAltIcon sx={{color:"purple",fontSize:"50x"}}/>
           <p className='text-xl my-3 font-semibold font-mono'>Monthly Joined </p>
        </div>
      </Link>

      <Link to='/specific/expiring-within-3-days' className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'
      onClick={()=>handleMenu("Expiring within 3 days")}>
        <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
        <div className='py-7 px-5 flex-col justify-center item-center w-full  text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
           <AccessAlarmIcon sx={{color:"red",fontSize:"50x"}}/>
           <p className='text-xl my-3 font-semibold font-mono'>Expiring within 3 days</p>
        </div>
      </Link>

      <Link to='/specific/expiring-within-4-7-days' className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'
      onClick={()=>handleMenu("Expiring within 4-7 days")}>
        <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
        <div className='py-7 px-5 flex-col justify-center item-center w-full  text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
           <AccessAlarmIcon sx={{color:"red",fontSize:"50x"}}/>
           <p className='text-xl my-3 font-semibold font-mono'>Expiring within 4-7 days</p>
        </div>
      </Link>

      <Link to='/specific/expired' className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'
      onClick={()=>handleMenu("Expired")}>
        <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
        <div className='py-7 px-5 flex-col justify-center item-center w-full  text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
           <ErrorIcon sx={{color:"red",fontSize:"50x"}}/>
           <p className='text-xl my-3 font-semibold font-mono'>Expired</p>
        </div>
      </Link>

      <Link to='/specific/inactive' className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'
      onClick={()=>handleMenu("InActive")}>
        <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
        <div className='py-7 px-5 flex-col justify-center item-center w-full  text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
           <ReportIcon sx={{color:"brown",fontSize:"50x"}}/>
           <p className='text-xl my-3 font-semibold font-mono'>InActive Members</p>
        </div>
      </Link>

     </div>
     <div className='w-full fixed bottom-0 sm:w-1/2  p-3 bg-black text-white rounded-xl text-lg sm:text-xl text-center'>
     Contact Developer for any Technical Error at +91 7482930412</div>
    </div>
  )
}

export default Dashboard
