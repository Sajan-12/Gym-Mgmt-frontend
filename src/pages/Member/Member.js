import React, { useState,useEffect } from 'react'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MemberCard from '../../component/Member/MemberCard';

import { Link } from 'react-router-dom';
import Membership from '../../component/Member/Membership';
import Modal from '../../component/Modal/Modal';
import AddMember from '../../component/Member/AddMember';
import axios from 'axios';

const Member = () => {
  const [addMembership,setAddMembership]=useState(false);
  const [addMember,setAddMember]=useState(false);
  const [totalMembers,setTotalMembers]=useState(0);
  const [noOfPages,setNoOfPages]=useState(0);
  const [currPage,setCurrPage]=useState(1);
  const [memberFrom,setMemberFrom]=useState(0);
  const [memberEnd,setMemberEnd]=useState(0);
  const [skip,setSkip]=useState(0);
  const [members,setMembers]=useState([]);
  const [query,setQuery]=useState("");
  const [searchMode,setSearchMode]=useState(false);
  const limit=6;

  const fetchData= async function(){
        await axios.get(`http://localhost:5000/members/getmembers?skip=${skip}&limit=${limit}`,{ withCredentials: true }).then((resp)=>{
          console.log(resp);
           let tMembers=resp.data.totalMembers;
           let fetchMembers=resp.data.members;;
            setMembers(fetchMembers);
          
           setTotalMembers(prev=>prev=tMembers);
          let totalPages=parseInt(tMembers / limit) + ((tMembers % limit) !== 0 ? 1 : 0);
           setNoOfPages(prev=>prev=totalPages);
      

        if(tMembers!==0)
       setMemberFrom(prev=>prev=(currPage-1)*limit+1)
       
        if(currPage===totalPages&&(tMembers%limit)!==0)
       setMemberEnd(prev=>prev=(currPage-1)*limit+(totalMembers%limit));
       else setMemberEnd(prev=>(currPage-1)*limit+limit);
        })
        .catch((error)=>{
            console.log(error);
        })
      
  }
 
  async function onSearchHandler(){

    if(query!==""){
         setSearchMode(true);
        await axios.get(`http://localhost:5000/members/search?query=${query}`,{withCredentials:true}).then((resp)=>{
          setMembers(resp.data.members);
          let tdata=resp.data.members.length;
          setTotalMembers(tdata);
     })
     .catch((err)=>{
      console.log(err);
     }) 
    }
    else{
      setSearchMode(false);
      fetchData();
    }
  }
  const handleAddMember=()=>{
         setAddMember(prev=>!prev);
  }
  function handleMembership(){
    setAddMembership(prev=>!prev);
  }

  function prevHandler(){
    if(currPage>1){
      let skipValue=skip-6;
      setSkip(prev=>prev=skipValue);
       setCurrPage(prev=>prev=prev-1);
      
    }
  }
  function nextHandler(){
    if(currPage<noOfPages){
     
      let skipValue=skip+6;
      setSkip(prev=>prev=skipValue);
       setCurrPage(next=>next=next+1);
    }
  }

   
  useEffect(()=>{
    fetchData();
  },[currPage,skip])

  return (
    <div className='w-3/4 text-black relative p-5'>
       {/*banner block*/}
      <div className='border-2 w-full bg-slate-900 text-white rounded-lg p-3 flex justify-between '>
        <div className='rounded-2xl text-white border-2 pr-3 pl-3 pt-1 pb-1 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' onClick={()=>handleAddMember()}>Add Member <FitnessCenterIcon/></div>
        <div className='rounded-2xl text-white border-2 pr-3 pl-3 pt-1 pb-1 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' onClick={()=>handleMembership()}>Membership <AddIcon/></div>
      </div>

      <Link  to='/dashboard'><ArrowBackIcon/> Back to Dashboard</Link>
       
       {/*search bar*/}
      <div className='mt-5 gap-2 w-1/2 flex'>
         <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} className='border-2 w-full p-2 rounded-lg' placeholder='Serach By Name or Mobile Number'/>
          <div onClick={()=>onSearchHandler()} className='bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black '><SearchIcon/></div>
      </div>
       
       <div className='mt-5 text-xl flex justify-between text-slate-900'>
          <div>Toatal Members {searchMode?totalMembers:null}</div>
          {
            !searchMode&&<div className='flex gap-5'>
          <div>{memberFrom}-{memberEnd} of {totalMembers} Members</div>
          <div className={`w-8 h-8 border-2 flex items-center justify-center cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${currPage==1?'bg-gray-200 text-gray-400 cursor-not-allowed':null}`} onClick={()=>prevHandler()}><KeyboardArrowLeftIcon/></div>
          <div className={`w-8 h-8 border-2 flex items-center justify-center cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black  ${currPage==noOfPages?'bg-gray-200 text-gray-400 cursor-not-allowed':null}`} onClick={()=>nextHandler()}><KeyboardArrowRightIcon/></div>
          </div>
          }
       </div>

       <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]">
        {
          members.map((member)=>{
            return(
              <MemberCard key={member._id} member={member}/>
            )
          })
        }
  
       </div>
       {
        addMembership&&<Modal header={"Add Membership"} closeHandler={handleMembership} content={<Membership/>}/>
       }
       {
        addMember&&<Modal header={"Add New Member"} closeHandler={handleAddMember} content={<AddMember/>}/>
       }
       
    </div>
  )
}

export default Member
