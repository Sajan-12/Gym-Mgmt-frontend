import React, { useState } from 'react'
import "./Signup.css";
import Modal from "../Modal/Modal"
import ForgotPassword from '../forgotPassword/ForgotPassword';
import axios  from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
     const [signupField,setSignupField]=useState({'email':'','gymName':'','userName':'','password':'','profilePic':'https://wallpaperaccess.com/full/1897062.jpg'});
      const [loading,setLoading]=useState(false);
    const onchangeHandler=function(e,name){

      setSignupField((prevState)=>({...prevState,[name]:e.target.value}));
     }

    const [forgot,setforgot]=useState('false');
    const closeHandler=function(){
      setforgot((prev)=>!prev);
    }

    const uploadImage=async (e)=>{
      setLoading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'gym-app');
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dl1owbw4r/image/upload', formData);
        
        setSignupField((prevState)=>({...prevState,['profilePic']:response.data.url}));
        setLoading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
      }
    }

    const signupHandler=async()=>{
      axios.post('http://localhost:5000/gym/register',signupField,{
        withCredentials: true
      }).then((response)=>{
        toast.success(response.data.message);
      }).catch((error)=>{
        console.log(error);
        let errorMessage = error.response.data.message;
        toast.error(errorMessage);
      })
    }

  return (
    <div className='customSignup w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450px] overflow-auto'>
          <div className='font-sans text-white text-center text-3xl'>Register Your Gym</div>
          <input type="email" value={signupField.email} onChange={(e)=>onchangeHandler(e,"email")} className='w-full my-10 p-2 rounded-lg ' placeholder='Enter Email'/>
          <input type="text" value={signupField.gymName} onChange={(e)=>onchangeHandler(e,"gymName")} className='w-full mb-10 p-2 rounded-lg ' placeholder='Enter Gym Name'/>
          <input type="text" value={signupField.userName} onChange={(e)=>onchangeHandler(e,"userName")} className='w-full mb-10 p-2 rounded-lg ' placeholder='Enter UserName'/>
          <input type="password"  value={signupField.password} onChange={(e)=>onchangeHandler(e,"password")}  className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Password' />
          <input type='file' onChange={(e)=>uploadImage(e)} className='w-full mb-10 p-2 rounded-lg'/>
            {loading&&<LinearProgress className='w-full mb-10' />}
          <img src={signupField.profilePic} className='mb-10 h-[200px] w-[250px]'/>
        
          <div className='p-2 w-[80%]  border-2 mb-5 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg 
          hover:bg-white hover:text-black' onClick={()=>signupHandler()}>Register</div>
          <div className='p-2 w-[80%]  border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg 
          hover:bg-white hover:text-black' onClick={closeHandler}>Forgot Password</div>
            {!forgot&&<Modal closeHandler={closeHandler} content={<ForgotPassword/>}/>}
         <ToastContainer/>
        </div>
  )
}

export default Signup
