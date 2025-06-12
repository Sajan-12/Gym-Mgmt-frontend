
import React,{useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify'
const Membership = () => {

  const [membershipInputData, setMembershipInputData] = useState({"months": "", "price": ""});
    const handleChange = (e, name) => {
      setMembershipInputData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    const [membershipData, setMembershipData] =useState([]);
    const fetchData=async()=>{
         await axios.get('http://localhost:5000/plan/get-memberships',{withCredentials:true}).then((response)=>{
          setMembershipData(response.data.data);
         })
         .catch((error)=>{
              let errorMessage=error.response.data.message;
         })  
    }
   
    useEffect(()=>{
       fetchData();
    },[membershipData])
   
    const handleAddMembership=async()=>{
      await axios.post('http://localhost:5000/plan/add-membership',{months:membershipInputData.months,price:membershipInputData.price},{withCredentials:true}).then((response)=>{
        toast.success(response.data.data.message);
      })
      .catch((error)=>{
        toast.error(error.response.data.message);
      })
    }

  return (
  
    <div className='text-black'>

      <div className='flex flex-wrap gap-5 items-center justify-center'>
         {
          membershipData.map((item,index)=>{
            return (
               <div className='text-lg bg-slate-900 text-white border-2 
        pt-1 pb-1 pl-2 pr-2 flex-col gap-3 justify-between rounded-xl font-semibold 
        hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white'>
        <div>{item.months} Months Membership</div>
        <div>Rs {item.price}</div>
        </div>
            )
          })
         }
      </div>
      <hr className='mt-10 mb-10'/>
      <div className='flex gap-10 mb-5'>
        <input value={membershipInputData.months} onChange={(e)=>{handleChange(e,'months')}} type='number'className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' placeholder='Enter No. of Months'/>
       <input value={membershipInputData.price} onChange={(e)=>handleChange(e,'price')} type='number'className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' placeholder='Enter Amount'/>
      <div className='text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer  hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white' onClick={()=>handleAddMembership()}>Add +</div>
      </div>
       <ToastContainer/>
    </div>
  )
}

export default Membership
