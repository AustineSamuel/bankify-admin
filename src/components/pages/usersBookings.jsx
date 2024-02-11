import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { appointment } from '../_mock/user';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import '../../components/Appointments/style.css';
import { CardSkeleton } from '../Appointments/appointmentCard';

export default function UserBookings() {
  // Assuming appointments array
  const appointments = [appointment, appointment, appointment]; // Mock data for demonstration
const [isLoading,setIsLoading]=useState(true);
async function getBookings(){
setTimeout(() => {
  setIsLoading(false);
},1000);
}

useEffect(()=>{
getBookings();
},[])

  return (
    <MDBContainer className="appointments">
      <MDBRow className="d-flex flex-wrap">
        {!isLoading ? appointments.map((appointment, index) => (
          <MDBCol key={index} xs={12} md={6} lg={4} className="mb-4">
            <Card appointment={appointment} />
          </MDBCol>
        )):[1,2,3,4,5,6].map((_,index)=>{
          return (
            <>
             <MDBCol key={index} xs={12} md={6} lg={4} className="mb-4">
         <CardSkeleton/>
             </MDBCol>
            </>
          )
        })}
      </MDBRow>
    </MDBContainer>
  );
}

function Card({ appointment }) {
  const { id, type, dateTime, status, notes, confirmationCode } = appointment;

  return (
    <MDBCard className="h-100">
      <MDBCardBody>
        <MDBCardTitle>Appointment ID: {id}</MDBCardTitle>
        <MDBCardText>Type: {type}</MDBCardText>
        <MDBCardText>Date and Time: {dateTime}</MDBCardText>
        <MDBCardText>Status: {status}</MDBCardText>
        <MDBCardText>Notes: {notes}</MDBCardText>
        <MDBCardText>Confirmation Code: {confirmationCode}</MDBCardText>
        <MDBCardText>Submitted : {"3 days ago"}</MDBCardText>
        
      </MDBCardBody>
    </MDBCard>
  );
}
