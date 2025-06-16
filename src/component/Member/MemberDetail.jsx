import React, {useEffect,useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate,useParams, } from 'react-router-dom';
import Switch from "react-switch";
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

const MemberDetail = () => {
  const navigate=useNavigate();
  const [status,setStatus]=useState('pending');
  const [renew,setRenew]=useState(false);
  const [member,setMember]=useState({});
  const [selectedOptoinValue,setSelectedOtionValue]=useState('');
  const [membership,setMembership]=useState([]);
  const {id}=useParams()

  useEffect(()=>{
    fetchMembership();
    fetchMember();
  },[id]);

  async function fetchMembership(){
      await axios.get('http://localhost:5000/plan/get-memberships',{withCredentials:true}).then((response)=>{
                     if(response.data.data.length===0)
                      toast.success("No membership Added yet");
                    else{
                      let a=response.data.data;
                       const firstId = response.data.data[0]._id;
                         setSelectedOtionValue(firstId);
                         setMembership(a);
                    }
                    })
                   .catch(err=>{
                   toast.error(err.response.data.message);
        })
  }
  async function fetchMember(){
     await axios.get(`http://localhost:5000/members/details/${id}`,{withCredentials:true}).then((resp)=>{
       let fmember=resp.data.data;
       console.log(fmember);
       setMember(fmember);
       setStatus(fmember.status);
     })
     .catch(err=>{
           toast.error(err.response.data.message);
        })
  }
  const handleStatusChange = async() => {
    let st=status==='active' ? 'pending' : 'active';
    await axios.put(`http://localhost:5000/members/update-status/${id}`,{status:st},{withCredentials:true}).then(resp=>{
         toast.success(resp.data.message);
          setStatus(st);
    })
    .catch(err=>{
           toast.error(err.response.data.message);
        })
   
  }

  const saveHandler=async()=>{
        await axios.put(`http://localhost:5000/members/update-member-plan/${id}`,{membershipId:selectedOptoinValue},{withCredentials:true}).then((resp)=>{
          let updatedMember=resp.data.data;
          setMember(updatedMember);
          toast.success(resp.data.message);
        })
        .catch(err=>{
           toast.error(err.response.data.message);
        })
  }

  const deleteMemberHandler=async()=>{
         await axios.delete(`http://localhost:5000/members/delete/${id}`,{withCredentials:true}).then((resp)=>{
          toast.success(resp.data.message);
          navigate('/member');
        })
        .catch(err=>{
           toast.error(err.response.data.message);
        })
  }

  return (
    <div onClick={()=>{navigate(`/member/${id}`)}} className='w-full sm:w-3/4 text-black  p-5'>
       <div onClick={() => navigate(-1)} className='border-2 w-fit text-xl font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer'>
          <ArrowBackIcon/> Go Back 
       </div>

           <div className='w-[100%] h-fit flex mt-5 p-2 gap-2'>
            <div className='w-1/2 sm:w-1/3 mx-auto mt-7'>
              <img className='h-[300px]'  src={member.profilePic} alt="picture" />
            </div>
            <div className='w-1/2 sm:w-2/3 text-md sm:text-xl p-5'>
              <div className='mt-1 mb-2 text-2xl font-semibold'>Name : {member?.name}</div>
              <div className='mt-1 mb-2 text-2xl font-semibold'>Mobile No : {member?.mobileNo}</div>
              <div className='mt-1 mb-2 text-2xl font-semibold'>Address : {member?.address}</div>
              {
                member.createdAt&&<div className='mt-1 mb-2 text-2xl font-semibold'>Joined Date : {member?.createdAt.slice(0,10).split('-').reverse().join('-')}</div>
              }
              {
                member.nextBill&& <div className='mt-1 mb-2 text-2xl font-semibold'>Next Bill Date : {member?.nextBill.slice(0,10).split('-').reverse().join('-')}</div>
              }
             
              <div className='mt-1 mb-2 text-2xl font-semibold'>Status : <Switch onColor='#6366F1'   checked={status==='active'} onChange={()=>handleStatusChange()} /></div>
             
             <div onClick={()=>setRenew(prev=>!prev)} className={`text-2xl font-semibold mt-1 rounded-lg p-3 border-2 border-slate-900 ${renew&&status==='active'?('bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'):null}w-full md:w-1/2  text-center cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black`}>Renew</div>
            </div>
            
           </div>
           {
              status==='active' && renew ? (
             <div className='rounded-lg text-2xl font-semibold p-3 mt-5 mb-5 h-fit bg-slate-50 w-[100%]'>
              <h1>Membership</h1>
              <select value={selectedOptoinValue} onChange={(e)=>{setSelectedOtionValue(e.target.value)}} className='w-full mt-2 border-2 p-2 rounded-lg'>
               {
                membership.map((item)=>{
                  return ( <option value={item._id}>{item.months} Month Plan</option>)
                })
               }
              </select>
             <div onClick={()=>{saveHandler()}} className={`mt-4 rounded-lg p-3 border-2 border-slate-900 ${status==='active'&&renew===true?('bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'):null} w-full md:w-1/2 text-center cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black`}>Save</div>
            </div>
              ):null
            }
           {
             !renew&&<div className='w-1/2  sm:w-2/3 h-fit flex justify-center text-xl mb-10 sm:mt-5 p-2 gap-20'>
            <div onClick={()=>deleteMemberHandler()} className='mt-1 rounded-lg p-2 border-2 border-slate-900 w-full md:w-1/2 text-2xl font-semibold text-center cursor-pointer hover:bg-red-500 hover:text-black' >Delete</div>
           </div>
           }
           <ToastContainer/>
    </div>
  )
}

export default MemberDetail
