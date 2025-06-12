import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Loader from '../loader/Loader';
const ForgotPassword = () => {
    const [field, setField] = useState({ email: '', otp: '', newPassword: '' });
    const [loader,setLoader]=useState(false);

    function onChangeHandler(e, name) {
        setField((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    const [otp,setotp]=useState(false);
    const[otpValidate,setotpValidate]=useState(false);
    const[content,setContent]=useState("send OTP");

    const handleSubmit=()=>{
        if(!otp){
            setLoader(true);
            axios.post('http://localhost:5000/gym/reset-password/sendotp', { email: field.email }).then((response) => {
                    console.log(response);
                    toast.success(response.data.message);
                    setotpValidate(false);
                    setotp(true);
                  setContent('Submit OTP')
                   setLoader(false);
                 })
                 .catch((error) => {
                    setLoader(false);
                    let errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                 })
        }
        else if(!otpValidate){
            axios.post('http://localhost:5000/gym/reset-password/verifyotp', { email: field.email, otp: field.otp }).then((response) => {
                    toast.success(response.data.message);
                     setotpValidate(true);
                    setContent("Submit New Password");
                })
                .catch((error) => {
                    let errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                })
            }
         else {
            axios.post('http://localhost:5000/gym/reset-password', { email: field.email, newPassword: field.newPassword }).then((response) => {
                
                    toast.success(response.data.message);
                    setotp(false);
                    setotpValidate(false);
                    setContent("Send OTP");
                })
                .catch((error) => {
                    
                    let errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                })
            }
    }
    return (
        <div className='w-full'>
            <div className='w-full mb-5'>
                <div>Enter Your Mail</div>
                <input type='text'value={field.email} onChange={(e)=>onChangeHandler(e,"email")} className='w-1/2 p-2 rounded-lg border-2 border-state-400' placeholder='Enter Your Email' />
            </div>
            {otp && <div className='w-full mb-5'>
                <div>Enter OTP</div>
                <input type='text' value={field.otp} onChange={(e)=>onChangeHandler(e,"otp")} className='w-1/2 p-2 rounded-lg border-2 border-state-400' placeholder='Enter OTP' />
            </div>}
            {
                otpValidate && <div className='w-full mb-5'>
                <div>Enter New Password</div>
                <input type='text' value={field.newPassword} onChange={(e)=>onChangeHandler(e,"newPassword")} className='w-1/2 p-2 rounded-lg border-2 border-state-400' placeholder='Enter New Password' />
            </div>
            }
            {
                loader&&<Loader/>
            }
            <div className='bg-slate-800 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold cursor-pointer border-2 hover:bg-white hover:text-black'
            onClick={()=>handleSubmit()}>
                {content}</div>
           <ToastContainer/>
        </div>
    )
}

export default ForgotPassword

