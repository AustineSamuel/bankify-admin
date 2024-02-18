
import React from 'react';
import { MDBListGroup, MDBBtn } from 'mdb-react-ui-kit';
import { Home, List, Bookmark, Camera, UserPlus, MousePointer, PlusSquare, Power } from 'react-feather';
import {useNavigate} from 'react-router-dom'
const sideBarsList = [
  {
    name: "Dashboard",
    link: "/Dashboard",
    icon: <Home />,
    onClick: () => {
    
      // Add logic to navigate to the dashboard page
    }
  },
  {
    name: "Appointments",
    link: "/Appointments",
    icon: <List />,
    onClick: () => {
      // Add logic to navigate to the user's profile page
    }
  },
  {
    name: "Add Appointment",
    link: "/AddAppointment",
    icon: <PlusSquare />,
    onClick: () => {
      // Add logic to navigate to the user's profile page
    }
  },
  {
    name: "Embassy List",
    link: "/EmbassyList",
    icon: <List/>,
    onClick: () => {
      // Add logic to navigate to the user's profile page
    }
  },
  {
    name: "Users Bookings",
    link: "/UsersBookings",
    icon: <Bookmark />,
    onClick: () => {
      // Add logic to navigate to the payment page
    }
  },
  {
    name: "Users",
    link: "/VerifiedUsers",
    icon: <Camera />,
    onClick: () => {
      // Add logic to navigate to the user's appointments page
    }
  },
  {
    name: "Add Users",
    link: "/AddUsers",
    icon: <UserPlus/>,
    onClick: () => {
      // Add logic to navigate to the user's appointments page
    }
  },
  {
    name: "Report Bug",
    link: "/ReportBugs",
    icon: <MousePointer/>,
    onClick: () => {
      // Add logic to navigate to the user's appointments page
    }
  },
  {
    name: "Logout",
    link: undefined,
    icon: <Power/>,
    onClick: () => {
      // Add logic to navigate to the user's appointments page
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    }
  }
  // Add more buttons as needed
];

function UserSideBarContent({closeMenu}) {
  const navigate=useNavigate();
  return (
    <div>
      <div style={{textAlign:'start'}}>
<img src='/logo.jpg' width={50} height={50} alt='Immintegral logo'/><b>Immintegral</b>
</div>
    <MDBListGroup className="side-menu">
      {sideBarsList.map((item, index) => (
        <MDBBtn key={index} onClick={()=>{
         if(item.link)navigate(item.link)
         else{
        item.onClick();
        }
          if(closeMenu)closeMenu()
        }}  color='light' rippleColor='dark'>
            <span className="icon">{item.icon}</span>
            <span className="name">{item.name}</span>
            </MDBBtn>

      ))}
    </MDBListGroup>

    </div>
  );
}

export default UserSideBarContent;
