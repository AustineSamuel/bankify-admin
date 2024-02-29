import React, { useEffect, useState } from 'react';
//import moment from 'moment'; // Import moment for date rendering
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem,MDBBtn } from 'mdb-react-ui-kit';
import { deleteData } from '../../Logics/deleteData';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {convertToTitleCase} from '../../Logics/DateFunc';
import { Edit2, Trash2 } from 'react-feather';
import {BounceLoader} from 'react-spinners';
const EmbassyCard = ({ embassy,deleteCallback }) => {
const {docId}=embassy
  const [isDeleting,setIsDeleting]=useState(false);
  const navigate=useNavigate()
    useEffect(()=>{
  
    },[isDeleting]);


  const deleteItem=async ()=>{
    setIsDeleting(true);
await deleteData("Embassy",docId);
toast.success("Delete successful");
deleteCallback()
  }

  const Edit=()=>{
    sessionStorage.setItem("EditEmbassy",JSON.stringify(embassy));
 // navigate("/EditEmbassy");
  }
  




  return (
    <MDBCard style={{ margin: '1rem' }} className='embassyCard'>
    <MDBCardBody>
      <MDBCardTitle>{embassy.name}</MDBCardTitle>
      <MDBCardText>
        <strong>Country:</strong> {embassy.country}
        <br />
        <strong>City:</strong> {embassy.city}
        <br />
        <strong>Address:</strong> {embassy.address}
        <br />
       <strong>Contact Information:</strong>
        <MDBListGroup flush>
          <MDBListGroupItem>Phone: {embassy.contactInformation.phone}</MDBListGroupItem>
          {/* <MDBListGroupItem>Email: {embassy.contactInformation.email}</MDBListGroupItem> */}
          <MDBListGroupItem>Website: {embassy.contactInformation.website}</MDBListGroupItem>
        </MDBListGroup>
        <strong>Operating Hours:</strong>
        <ul>
          {Object.entries(embassy.operatingHours).map(([day, hours]) => (
            <li key={day}>
              <strong>{convertToTitleCase(day)}:</strong> {hours}
            </li>
          ))}
        </ul>
        <strong>Services Offered:</strong> {embassy.servicesOffered}
        <br />
        <strong>Appointment Booking Procedure:</strong> {embassy.appointmentBookingProcedure}
        <br />
         <strong>Emergency Contact Information:</strong>
        <MDBListGroup flush>
          {/* <MDBListGroupItem>Phone: {embassy.emergencyContactInformation.phone}</MDBListGroupItem> */}
          <MDBListGroupItem>Email: {embassy.emergencyContactInformation.email}</MDBListGroupItem>
        </MDBListGroup> 
        <strong>Location Coordinates:</strong> Latitude: {embassy.locationCoordinates.latitude}, Longitude: {embassy.locationCoordinates.longitude}
    


        <div className='d-flex align-items-center' style={{width:"100%"}}>
<MDBBtn onClick={()=>deleteItem()} color='dark' rounded>
  {isDeleting ? <BounceLoader size={18} color='white'/>: <><Trash2/> Delete</>}</MDBBtn>

<MDBBtn color='light' rounded onClick={()=>Edit()}><Edit2/> Edit</MDBBtn>

          </div>


      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
  );
};

export default EmbassyCard;
