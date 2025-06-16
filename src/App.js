
import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Member from './pages/Member/Member.js';
import Home from './pages/Home';
import { Routes,Route, useNavigate } from "react-router"
import Sidebar from './component/Sidebar/Sidebar';
import GeneralUser from './component/GeneralUser/GeneralUser.jsx';
import MemberDetail from './component/Member/MemberDetail.jsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const navigate=useNavigate();
  const [islogin,setislogin]=useState(false);

  useEffect(()=>{
    let islogedin=localStorage.getItem("islogin"); 
     
    if(islogedin==='true'){
      setislogin(true);
    }
    else {
      setislogin(false);
      navigate("/");
    }
  },[localStorage.getItem("islogin")])
  return (
    <div className='app flex flex-col sm:flex-row'>
      
      {islogin?<Sidebar/>:null}
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/member' element={<Member/>}/>
        <Route path='/specific/:page' element={<GeneralUser/>}/>
        <Route path='member/:id' element={<MemberDetail/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
