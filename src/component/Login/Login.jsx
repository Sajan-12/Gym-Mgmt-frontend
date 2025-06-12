import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';

const Login = () => {
  const [loginField,setLoginField]=useState({'email':'','password':''});
  
  function onChangeHandler(e,name){
    setLoginField((prevState)=>({...prevState,[name]:e.target.value}));
  }

  const navigate=useNavigate();

  const handleLogin=async()=>{
         await axios.post('http://localhost:5000/gym/login',loginField,{
          withCredentials: true}).then((response)=>{
            let responseData=response.data.data;
            localStorage.setItem("gymName",responseData.gymName);
            localStorage.setItem("profilePic",responseData.profilePic);
            localStorage.setItem("islogin","true");
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard");
          })
            .catch((error)=>{
              let errorMessage = error.response.data.message;
             toast.error(errorMessage);
            })
       }

  return (

        <div className='w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-fit'>
          <div className='font-sans text-white text-center text-3xl'>Login</div>
          <input type="email" value={loginField.email} onChange={(e)=>onChangeHandler(e,"email")} className='w-full my-10 p-2 rounded-lg' placeholder='Enter Email'/>
          <input type="password" value={loginField.password}  onChange={(e)=>onChangeHandler(e,"password")} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Password' />
          <div className='p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg 
         hover:bg-white hover:text-black' onClick={()=>handleLogin()}>Login</div>
         <ToastContainer/>
        </div>
    
  )
}

export default Login
