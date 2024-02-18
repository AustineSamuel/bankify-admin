import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import RecentActivities from './recentTransactions';
import Animation from './Animation';
import {useNavigate} from 'react-router-dom';
import Notifications from './notifications';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
  } from 'mdb-react-ui-kit';
export default function UserDashboard(){
    const navigate=useNavigate();
    const [openNotifications,setOpenNotifications]=useState(false);
    const [pageProps,setPageProps]=useState({
        verifiedUser:undefined
    })
    const cards=[
        {
            name:"Add Embassy",
            icon:"/images/calender.jpg",
            click:()=>{
                navigate("/AddEmbassis")
            }
        },
        {
            name:"Users Bookings",
            icon:"/images/run.jpg",
            click:()=>{
                console.log("clicked Bookings");
                navigate("/UsersBookings");
            }
        },
        {
            name:"Users",
            icon:"/images/verify.jpg",
            click:()=>{
                console.log("clicked Verification");
                navigate("/VerifiedUsers")
            }
        },
        {
            name:"Send Notifications",
            icon:"/images/card_check.jpg",
            click:()=>{
                setOpenNotifications(true);
            }
        },
        {
            name:"Add User",
            icon:"/images/edit.webp",
            click:()=>{
                navigate("/AddUsers")
                console.log("clicked edit profile");
            }
        },
        {
            name:"Report bug",
            icon:"/images/message.jpg",
            click:()=>{
                navigate("/ReportBugs");
                console.log("clicked edit profile");
            }
        }
    ]
    
    return (
        <div style={{padding:18}}>
      <MDBModal open={openNotifications} setOpen={setOpenNotifications} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Notifications</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>setOpenNotifications(!openNotifications)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <Notifications/>
</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>setOpenNotifications(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

<div className='cardContainer d-flex ' style={{padding:10}}>
    {cards.map((e,i)=>{
    return <div key={i} className='card text-align' onClick={()=>e.click()} style={{textAlign:'center',padding:10}}>
<img src={e.icon} alt='action s' style={{margin:"0 auto",borderRadius:"50%"}} width={50} height={50}/>
<span>{e?.name}</span>
    </div>
    })}


    </div>
        <div className='dashboard'>
        <MDBContainer fluid >
              <MDBRow style={{padding:0}}>
                {/* Sidebar */}
                <MDBCol md="7" lg="9" className='activitiesContainer'>
<RecentActivities/>
                </MDBCol>

        
                {/* Main content */}
                <MDBCol md="4" lg="3"style={{padding:0}}>
<Animation/>
                </MDBCol>

              </MDBRow>
            </MDBContainer>

        </div>
        </div>
    )
}

