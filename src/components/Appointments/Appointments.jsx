import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import './style.css';
import { docQr } from '../../Logics/docQr';
import Card, { CardSkeleton } from './appointmentCard';

export default function Appointments() {
  // Assuming appointments array
  const [isLoading,setIsLoading]=useState(true);
  const [appointments,setAppointment] = useState([]); // Mock data for demonstration
  const getAppointments=async()=>{
    const appointments=await docQr("Appointment",{
      max:800,
      whereClauses:[
        {
          field:"type",
          operator:'!=',
          value:""
        }
      ]
    })
    console.log(appointments);
    setAppointment(appointments)
    setIsLoading(false);
    }

useEffect(()=>{

getAppointments();
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
