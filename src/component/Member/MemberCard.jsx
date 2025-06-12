import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate } from 'react-router-dom';

const MemberCard = ({member}) => {
  const navigate=useNavigate();
  return (
   <div onClick={()=>{navigate(`/member/${member._id}`)}} className="bg-white text-black rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white">
            
             <div className='w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full'>
               <img className='w-full h-full rounded-full' src={member?.profilePic}/>
               <CircleIcon className='absolute top-0 left-0 ' sx={{color:member?.status==='active'?'green':'red'}} />
             </div> 
             <div className='mx-auto mt-5 text-center  text-xl font-semibold font-mono'>
               {member?.name}
             </div>
             <div className='mx-auto text-center  font-mono'>
               {"+91 "+ member?.mobileNo}
             </div>
             <div className='mx-auto text-center font-mono'>
                  Next Bill date: {
                  member?.nextBill.slice(0,10).split('-').reverse().join('-')
                  }
             </div>
      
    </div>
  )
}

export default MemberCard

