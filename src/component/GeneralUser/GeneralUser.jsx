import React from 'react'
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MemberCard from '../Member/MemberCard';
import { useState,useEffect } from 'react';
import { monthlyJoined,expiringWithin3Days,expiringWithin4to7Days,expiredMembers,inactiveMembers } from './data.js';
const GeneralUser = () => {
    const[header,setHeader]=useState("");
    const[members,setMembers]=useState([]);
    useEffect(()=>{
        let fun=localStorage.getItem('fun');
        fetchHeader(fun);
    },[])

     async function fetchHeader(fun){
        switch(fun){
            case "Monthly Joined":
                setHeader("Monthly Joined Members");
                var datas=await monthlyJoined();
               setMembers(datas);
                break;
            case "Expiring within 3 days":
                setHeader("Expiring within 3 days Members");
                  var datas=await expiringWithin3Days();
               setMembers(datas);
                break;
            case "Expiring within 4-7 days":
                setHeader('Expiring within 4-7 days Members');
                  var datas=await expiringWithin4to7Days();
               setMembers(datas);
                break;
            case "Expired":
                setHeader("Expired Members");
                  var datas=await expiredMembers();
               setMembers(datas);
                break;
            case "InActive":
                setHeader("InActive Members");
                  var datas=await inactiveMembers();
               setMembers(datas);
        }
    }
  return (
     <div className='w-3/4 text-black relative p-5'>
       {/*banner block*/}
      <div className='border-2 w-full bg-slate-900 text-white rounded-lg p-3 flex justify-between '>
        <div className='rounded-2xl text-white border-2 pr-3 pl-3 pt-1 pb-1 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
           <Link  to='/dashboard'><ArrowBackIcon/> Back to Dashboard</Link> </div>
        </div>
       <div className='mt-5 text-xl text-slate-900'>
        {
           header
        }
       </div>
       <div className='bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[80%]'>
          {
            members.map((member)=>{
               return( <MemberCard key={member._id} member={member}/>)
            })
          }
       </div>
     
    </div>
  )
}

export default GeneralUser

