import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import UserDashboard from "./components/userDashboard"; // Corrected the import name
import UserSideBarContent from "./components/userSideBarContent"; // Corrected the import name

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "./styles/dashboard.css";
import UserNav from './components/userNav';
import Profile from './components/pages/profile';
import Appointments from './components/Appointments/Appointments';
import PaymentForm from './components/Payments/payment';
import Page404 from './page404';
import Login from './components/login/main';
import AddUser from './components/addUser/addUser';
import VerifiedUsers from './components/VerifiedUsers/VerifiedUsers';
import AddEmbassis from './components/Appointments/AddEbassis';
import AddAppointment from './components/Appointments/AddAppointment';
import EmbassyList from './components/EmbassyList/EmbassyList';
import UserBookings from './components/pages/usersBookings';
import ReportBug from './components/reportBugs';


function App() {
const [animationName,setAnimationName]=useState("openMenu");
const [menuOpen,setMenuOpen]=useState(false);
const openMenu=()=>{
setAnimationName("openMenu");
setMenuOpen(true);
}

const closeMenu=()=>{
  
setAnimationName("closeMenu");
setTimeout(()=>{
  setMenuOpen(false);
},800)
}
if(!sessionStorage.getItem("adminDetails")){
  return <Login/>
}
const adminDetails=JSON.parse(sessionStorage.getItem("adminDetails"));
  return (
    <Router>
    <div className="App">
      {/* Define routes */}
   {menuOpen && <div className='sidebarMobileContent' onClick={(e)=>{
    const {target}=e;
    if(target.classList.contains('sidebarMobileContent')){
      closeMenu();
    }
   }}>

<div className='content' style={{animationName}}>
  <div  className="sidebar">
<UserSideBarContent closeMenu={closeMenu}/>
</div>
  </div>
      </div>}

      <MDBContainer fluid className='appContainer'>
              <MDBRow style={{padding:0}}>
                {/* Sidebar */}
                <MDBCol md="3" lg="2" className="sidebar">
                  <UserSideBarContent/>
                </MDBCol>
        
                {/* Main content */}
                <MDBCol md="9" lg="10"style={{padding:0}} className="main-content">
              
<UserNav openMenu={()=>openMenu()} adminDetails={adminDetails}/>
<div className='userNavPlaceholder'></div>
               
        
      
      <Routes>
        <Route path="/" element={<UserDashboard/>} /> {/* Updated element prop */}
        <Route path="/Dashboard" element={<UserDashboard/>} /> {/* Updated element prop */}
        <Route path="/Profile" element={<Profile/>} /> {/* Updated element prop */}
        <Route path="/Appointments" element={<Appointments/>} /> {/* Updated element prop */}
        <Route path='/Payment' element={<PaymentForm/>}/>
        <Route path='/AddUsers' element={<AddUser/>}/>
        <Route path='/VerifiedUsers' element={<VerifiedUsers/>}/>
        <Route path='/AddEmbassis' element={<AddEmbassis/>}/>
        <Route path='/EmbassyList' element={<EmbassyList/>}/>
        <Route path='/AddAppointment' element={<AddAppointment/>}/>
        <Route path='/UsersBookings' element={<UserBookings/>}/>
        <Route path="/ReportBugs" element={<ReportBug/>}/>
        <Route path='/*' element={<Page404/>}/>

        
      </Routes>
      </MDBCol>
              </MDBRow>
            </MDBContainer>

    </div>
  </Router>
  );
  }
export default App;
