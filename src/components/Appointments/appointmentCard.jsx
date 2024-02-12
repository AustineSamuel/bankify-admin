
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Skeleton } from '@mui/material';


function Card({ appointment }) {
    const { appointmentId, type, dateTime, status, notes } = appointment;
  
    return (
      <MDBCard className="h-100">
        <MDBCardBody>
          <MDBCardTitle>Appointment ID: {appointmentId}</MDBCardTitle>
          <MDBCardText>Type: {type}</MDBCardText>
          <MDBCardText>Date and Time: {dateTime}</MDBCardText>
          <MDBCardText>Status: {status}</MDBCardText>
          <MDBCardText>Notes: {notes}</MDBCardText>
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