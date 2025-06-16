
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import {toast,ToastContainer} from 'react-toastify'

const AddMember = () => {
  const [formData,setFormData] =useState({"name": "", "mobileNo": "", "address": "", "joiningDate": "", "membershipId": "", 
    "profilePic": "https://static-00.iconduck.com/assets.00/profile-circle-icon-1023x1024-ucnnjrj1.png"});

  const [membershipData,setMembershipData]=useState([]);
  const [selectedOptionValue,setSelectedOtionValue]=useState("");

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  const [lodder,setlodder]=useState(false);
   const uploadImage=async (e)=>{
     setlodder(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'gym-app');
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dl1owbw4r/image/upload', formData);
        setFormData((prevState)=>({...prevState,['profilePic']:response.data.url}));
        setlodder(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setlodder(false);
      }
    }
   
    const handleSelectedOption=(e)=>{
         setSelectedOtionValue(e.target.value);
         setFormData((prev)=>( {...prev,['membershipId']:e.target.value}))
    }

    const registerHandler=async()=>{
         if (!/^\d{10}$/.test(formData.mobileNo)) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
         }
        await axios.post('http://localhost:5000/members/addmember',formData,{withCredentials:true}).then((response)=>{
            toast.success(response.data.message);
            
         })
         .catch((error)=>{
          toast.error(error.response.data.message);
         })
    }

    const updateHandler=async()=>{
        await axios.put(`http://localhost:5000/members/update-member`,formData,{withCredentials:true}).then((resp)=>{
                 toast.success(resp.data.message);
               })
               .catch(err=>{
                  toast.error(err.response.data.message);
               })
    }

    const fetchMembership=async()=>{
        await axios.get('http://localhost:5000/plan/get-memberships',{withCredentials:true}).then((response)=>{
               if(response.data.data.length===0)
                toast.success("No membership Added yet");
              else{
                let a=response.data.data;
                 const firstId = response.data.data[0]._id;
                 
                   setSelectedOtionValue(firstId);
                   setFormData((prevState)=>({...prevState, 'membershipId': firstId}));
                   setMembershipData(a);
              }
              
         })
         .catch((error)=>{
          toast.error(error.response.data.message);
         })
    }
   
    useEffect(() => {
      console.log("formData updated:", formData);
    }, [formData]);

    useEffect(()=>{
      fetchMembership();
    },[])

  return (
    <div className='text-black '>
      <div className='grid grid-cols-2 gap-5 text-lg'>
        <input value={formData.name} onChange={(e)=>handleChange(e,"name")} placeholder='Name of the Joinee' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12'/>
         <input value={formData.mobileNo} onChange={(e)=>handleChange(e,"mobileNo")} placeholder='Mobile No.' type='tel' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12'/>
       <input value={formData.address} onChange={(e)=>handleChange(e,"address")} placeholder='Enter Address' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12'/>
       <input value={formData.joiningDate} onChange={(e)=>handleChange(e,"joiningDate")} type='date' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12'/>
      
      <select value={selectedOptionValue} onChange={(e)=>handleSelectedOption(e)} className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-lg'>
        {
          membershipData.map((item)=>{
           return (
              <option key={item._id} value={item._id}>{item.months} Month Membership</option>
            )
          })
        }
      </select>
      
      <input onChange={(e)=>uploadImage(e)} type='file'/>
      <div>
      <img src={formData.profilePic} className='w-1/4 rounded-full'/>
       {
            lodder && <LinearProgress className='w-1/4 mt-2' />
       } 
      </div>
     

      </div>
      <div className='flex'>
          <div className='p-3 border-2 w-28 text-lg h-14 text-center mx-auto bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' onClick={()=>registerHandler()}>
        Register
      </div>
      <div  onClick={()=>updateHandler()} className='p-3 border-2 w-28 text-lg h-14 text-center mx-auto bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
        Update
      </div>
      </div>
       
      <ToastContainer/>
    </div>
  )
}

export default AddMember
