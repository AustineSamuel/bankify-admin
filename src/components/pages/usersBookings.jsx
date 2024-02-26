import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBBadge } from 'mdb-react-ui-kit';
import { MDBBtn, MDBListGroupItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';

import { PulseLoader } from 'react-spinners';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import '../Appointments/style.css';
import { docQr } from '../../Logics/docQr';
import {toast,Toaster} from 'react-hot-toast';
import { CardSkeleton } from '../Appointments/appointmentCard';
import Skeleton from '@mui/material/Skeleton';

import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBModalFooter
} from 'mdb-react-ui-kit'
import EmbassyCardSkeleton from '../Appointments/EmbassyList/EmbassyCardSkeleton';
import EmbassyCard from '../Appointments/EmbassyList/EmbassyCard';
import useUserDetails from '../../Hooks/userUserDetails';
import { convertToTitleCase, getCurrentTimestamp, validateData } from '../../Logics/DateFunc';
import { AddData } from '../../Logics/addData';
import { collection } from 'firebase/firestore';
import {db} from '../../firebase.config'
import { getTimeAgoString } from '../../Logics/date';
import { updateData } from '../../Logics/updateData';
import CustomAvatar from '../../utils/customAvatar';
import { Calendar, Mail, MapPin, Phone, User } from 'react-feather';
import {useNavigate} from 'react-router-dom';
import ApproveDataForm from './approveDataForm';
export default function UserBookings() {

  // Assuming bookings array
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setAppointment] = useState([]); // Mock data for demonstration
  const [currentForm, setCurrentForm] = useState([]);
  const [showApplicationModel, setShowApplicationModel] = useState(false);
  const {user}=useUserDetails()
  const getbookings = async () => {
    const bookings = await docQr("Bookings", {
      max: 800,
      whereClauses: [
        {
          field: "userId",
          operator: '!=',
          value:''
        }
      ]
    })
     console.log(bookings);
    setAppointment(bookings.reverse())
    setIsLoading(false);
  }

  useEffect(() => {

    getbookings();
  }, [])
  const [showEmbassyDetails, setShowEmbassyDetailsModel] = useState(false);
  const [EmbassyDetailsContent, setEmbassyDetailsContent] = useState(<>No Data</>);
  const handleShowEmbassyDetailsClick = async (embassy_id) => {
    setShowEmbassyDetailsModel(true);
    setEmbassyDetailsContent(<EmbassyCardSkeleton />);
    const card = await docQr("Embassy",{
      max: 1,
      whereClauses: [
        {
          field: "embassy_id",
          operator: "==",
          value: embassy_id
        }
      ]
    })
    if (card.length > 0) {
        
      setEmbassyDetailsContent(<EmbassyCard embassy={card[0]} />)
      

    }
    else {
      setEmbassyDetailsContent(<div className='d-flex justify-content-center'>
        <div>
          <img src='/images/noData.png' alt="" />
          <b>No Data Found</b>
        </div>
      </div>)
    }
    console.log(`show Details `, embassy_id);
  }
  return (
    <>
    <Toaster/>
      <MDBModal open={showEmbassyDetails} setOpen={setShowEmbassyDetailsModel} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Embassy Details</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setShowEmbassyDetailsModel(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {EmbassyDetailsContent}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setShowEmbassyDetailsModel(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

<br/>
      <MDBContainer className="bookings">
        <MDBRow className="d-flex flex-wrap">
          {!isLoading ? bookings.map((appointment, index) => (
            <MDBCol key={index} xs={12} md={6} lg={4} className="mb-4">
              <Card appointment={appointment} onShowEmbassy={handleShowEmbassyDetailsClick} />
            </MDBCol>
          )) : [1, 2, 3, 4, 5, 6].map((_, index) => {
            return (
              <>
                <MDBCol key={index} xs={12} md={6} lg={4} className="mb-4">
                  <CardSkeleton />
                </MDBCol>
              </>
            )
          })}

          {!isLoading && bookings.length === 0 && <div className="flexCenter" style={{ padding: 20 }}>
            <div className='text-center'>
              <img src='/images/noData.png' alt="" /><br />
              <b>No Data Found</b>
            </div>
          </div>}


        </MDBRow>
      </MDBContainer>
    </>
  );
}



function Card({ appointment,callBack ,onShowEmbassy}) {
  const { appointmentId, type, dateTime, status, notes,embassy_id,applied_at
  } = appointment;
//console.log(appointment);
let statusColor="";
switch (status) {
  case 'approve':
  case 'approved':
    statusColor='success';
    break;
    case 'confirmed':
      statusColor='success';
    break;
    case 'declined':
    case 'canceled':
      statusColor='danger';
    break;
  default:
    statusColor=undefined;
    break;
}
//appointment?.status=='approved' ? 'success':undefined
const [buttonText,setButtonText]=useState("Action");
const [status_,setStatus_]=useState(status);
console.log(appointment);
const userId=appointment?.userId || "";
const approve=async (data)=>{
  
 setApproveModel(false);
 setShowApplicationDetails(false);
 
try{
 setButtonText("approving...") 
 const update=await updateData("Bookings",appointment.docId,{...appointment,status:"approved",approved_at:getCurrentTimestamp(),approvedData:data});
 console.log(update);
 setStatus_("approved");
 setButtonText("Action");
 toast.success("operation successful!")
 if(callBack)callBack();
 }
 catch(err){
 console.log(err);
toast.error(err.message || "Something went wrong");

 }

}
const decline=async ()=>{
try{
  setButtonText("Declining...");
 const update=await updateData("Bookings",appointment.docId,{...appointment,status:"declined",declined_at:getCurrentTimestamp()});
 console.log(update);
 setStatus_("declined");
 setButtonText("Action");
 toast.success("operation successful!")
 if(callBack)callBack();
 }
 catch(err){
 console.log(err);
toast.error(err.message || "Something went wrong");
 }

 }
 const [user,setUser]=useState(false);
 const [showApplicationDetails,setShowApplicationDetails]=useState(false);
// const []=useState();
useEffect(()=>{
async function getUser(){
  const user=await docQr("Users",{
    max:1,
    whereClauses:[{
      field:"uid",
      operator:"==",
      value:userId
    }
    ]
  })
  if(user.length===1){
    setUser(user[0]);
    console.log(user)
  }
  else{
  console.log("user no found")
  }
}
getUser();
},[])

useEffect(()=>{
},[user]);

const navigate=useNavigate();
const FormDetailsData=[];

for(let i in appointment.formValues){
  FormDetailsData.push(<>
  <div className='d-flex align-items-center' style={{width:"100%",minHeight:"40px",marginTop:10,borderRadius:"10px",padding:3,border:"1px solid lightgrey"}}>
    <b style={{padding:2}}>{convertToTitleCase(i)}:</b><span>{appointment.formValues[i]}</span>
  </div>
  </>);
}


const [approveModel,setApproveModel]=useState(false);


return (
    <>
      <MDBModal open={showApplicationDetails} setOpen={setShowApplicationDetails} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{user.username } Application Details</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setShowApplicationDetails(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

<div>

{
FormDetailsData
}
<br/>
{appointment.status!=='approved'  && <div className='d-flex justify-content-center'>
<MDBBtn fullWidth style={{width:"100%"}} color='primary' size={"lg"} onClick={()=>{
  setShowApplicationDetails(false);
  setApproveModel(true);
}} rounded>Approve Application</MDBBtn>
</div>}


</div>





            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setShowApplicationDetails(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>




      <MDBModal open={approveModel} closeOnEsc setOpen={setApproveModel} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{user.username}' APPOINTMENT CONFIRMATION DETAILS</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setApproveModel(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

<ApproveDataForm user={user} uid={appointmentId} formValues={appointment?.formValues || {}} successCallback={(data)=>approve(data)}/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setApproveModel(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>










































    <MDBCard className="h-100">
      <MDBCardBody>
        <MDBCardTitle className='d-flex justify-content-between  ' style={{flexFlow:"row wrap"}}><span>Appointment ID:</span> {appointmentId}
        </MDBCardTitle>
        <MDBCardText>Type: {type}</MDBCardText>
        <MDBCardText>Date and Time: {dateTime}</MDBCardText>
        <MDBCardText>Status: {status}</MDBCardText>
        <MDBCardText>Notes: {notes}</MDBCardText>
        <MDBCardText>Status: <MDBBadge color={statusColor}>{appointment?.status ? appointment?.status:"pending"}</MDBBadge></MDBCardText>
        <MDBCardText>Submitted : {getTimeAgoString(applied_at)}</MDBCardText>
       {appointment?.approved_at && <MDBCardText>Approved : {appointment.approved_at}</MDBCardText>}
       {appointment?.declined_at && <MDBCardText>Declined : {appointment.declined_at}</MDBCardText>}


<div className='d-flex align-items-center justify-content-start' title='click to open profile'  style={{borderRadius:10,border:"1px solid lightgrey",padding:16}}>
  <div  onClick={()=>{
  //open profile
  sessionStorage.setItem("uid",userId);
  navigate("/Profile")
}}><CustomAvatar size={80} src={user?.biometricData?.passport} alt='' /></div>
  <div style={{padding:17}} >
    {user ? (
        <>
          <p onClick={()=>{
  //open profile
  sessionStorage.setItem("uid",userId);
  navigate("/Profile")
}}><User size={18} /> {user.username}</p>
          <p onClick={()=>{
  //open profile
  sessionStorage.setItem("uid",userId);
  navigate("/Profile")
}}><MapPin size={18} /> {user.address}</p>
          <MDBBtn onClick={()=>setShowApplicationDetails(!showApplicationDetails)} color='tertiary'>
            Application Details</MDBBtn>
        </>
      ) : (
        <>
          <Skeleton animation="wave" variant="text" width={150} height={20} />
          <Skeleton animation="wave" variant="text" style={{maxWidth:"100%"}} width={250} height={20} />
        </>
      )}
  </div>
</div>
<br/><br/>


     <div className='d-flex align-items-center justify-content-between'>  
     {status_==='pending' ? <MDBDropdown>
          <MDBDropdownToggle className="btn-sm" style={{ borderRadius: 30 }} color="dark">
            {buttonText}
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link onClick={() => {
              setShowApplicationDetails(false);
  setApproveModel(true);
            }}>Approve</MDBDropdownItem>
            
            <MDBDropdownItem link onClick={() => {
 decline();
}}>Declined</MDBDropdownItem>

          </MDBDropdownMenu>
        </MDBDropdown>:<></>}
      
      {onShowEmbassy && <MDBBtn onClick={()=>onShowEmbassy(embassy_id)} color='tertiary'>View Embassy details</MDBBtn>}
</div>

      </MDBCardBody>
    </MDBCard>
</>  );
}
