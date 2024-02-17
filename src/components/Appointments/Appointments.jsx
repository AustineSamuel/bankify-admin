import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import './style.css';
import { docQr } from '../../Logics/docQr';
import Card, { CardSkeleton } from './appointmentCard';
import {Toaster} from 'react-hot-toast';
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
    <>
    <Toaster/>
    <MDBContainer className="appointments">
      <MDBRow className="d-flex flex-wrap">
        {!isLoading ? appointments.map((appointment, index) => (
          <MDBCol key={index} xs={12} md={6} lg={4} className="mb-4">
            <Card appointment={appointment} deleteCallback={getAppointments} />
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

        {!isLoading && appointments.length===0 && <div className="flexCenter" style={{padding:20}}>
          <div className='text-center'>
            <img src='/images/noData.png' alt=""/><br/>
            <b>No Data Found</b>
          </div>
          </div>}


      </MDBRow>
    </MDBContainer>
    </>
  );
}
