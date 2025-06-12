import axios from "axios";

const monthlyJoined = async () => {
  try {
    const resp = await axios.get('http://localhost:5000/members/monthly-joined', { withCredentials: true });
    return resp.data.data;
  } catch (err) {
    console.log(err);
    return []; // return empty array on error to avoid undefined issues
  }
};

const expiringWithin3Days=async()=>{
  const data=await axios.get('http://localhost:5000/members/expiring-within-3-days',{withCredentials:true}).then((resp)=>{
    console.log(resp);
     return resp.data.data;
  })
  .catch((err)=>{
    console.log(err);
    return [];
  })
  return data;
}

const expiringWithin4to7Days=async()=>{
    try {
    const resp = await axios.get('http://localhost:5000/members/expiring-4-7-days', { withCredentials: true });
    return resp.data.data;
  } catch (err) {
    console.log(err);
    return []; // return empty array on error to avoid undefined issues
  }
}

const expiredMembers=async()=>{
    try {
    const resp = await axios.get('http://localhost:5000/members/expired', { withCredentials: true });
    return resp.data.data;
  } catch (err) {
    console.log(err);
    return []; // return empty array on error to avoid undefined issues
  }
}
const inactiveMembers=async()=>{
     try {
    const resp = await axios.get('http://localhost:5000/members/inactive', { withCredentials: true });
    return resp.data.data;
  } catch (err) {
    console.log(err);
    return []; // return empty array on error to avoid undefined issues
  }
}

export {monthlyJoined,expiringWithin3Days,expiringWithin4to7Days,expiredMembers,inactiveMembers};