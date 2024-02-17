
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { MDBContainer, MDBRow, MDBCol ,MDBBtn} from 'mdb-react-ui-kit';
import { Skeleton } from '@mui/material';
import { Edit2, Trash2 } from 'react-feather';
import { deleteData } from '../../Logics/deleteData';
import { useEffect, useState } from 'react';
import {BounceLoader} from 'react-spinners';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

function Card({ appointment ,deleteCallback}) {
    const { appointmentId, type, dateTime, status, notes,docId} = appointment;
  const [isDeleting,setIsDeleting]=useState(false);
const navigate=useNavigate()
  useEffect(()=>{

  },[isDeleting]);

  const deleteItem=async ()=>{
    setIsDeleting(true);
await deleteData("Appointment",docId);
toast.success("Delete successful");
deleteCallback()
  }

  const Edit=()=>{
    sessionStorage.setItem("EditAppointment",JSON.stringify(appointment));
  navigate("/EditAppointment");
  }
    return (
      <MDBCard className="h-100">
        <MDBCardBody>
          <MDBCardTitle>Appointment ID: {appointmentId}</MDBCardTitle>
          <MDBCardText>Type: {type}</MDBCardText>
          <MDBCardText>Date and Time: {dateTime}</MDBCardText>
          <MDBCardText>Status: {status}</MDBCardText>
          <MDBCardText>Notes: {notes}</MDBCardText>
          <br/>
          <div className='d-flex align-items-center' style={{width:"100%"}}>
<MDBBtn onClick={()=>deleteItem()} color='dark' rounded>
  {isDeleting ? <BounceLoader size={18} color='white'/>: <><Trash2/> Delete</>}</MDBBtn>

<MDBBtn color='light' rounded onClick={()=>Edit()}><Edit2/> Edit</MDBBtn>

          </div>
      </MDBCardBody>
      </MDBCard>
    );
}

export const CardSkeleton=()=>{
    return (<>
    <Skeleton variant="text" width={200} height={30} />
    <Skeleton variant="text" width={150} height={20} />
    <Skeleton variant="text" width={200} height={20} />
    <Skeleton variant="text" width={150} height={20} />
    <Skeleton variant="text" width={150} height={20} />
    <Skeleton variant="text" width={200} height={20} />
  </>);
}

  export default Card;