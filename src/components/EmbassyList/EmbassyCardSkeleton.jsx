import React from 'react';
import { Skeleton } from '@mui/material';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const EmbassyCardSkeleton = () => {
  return (
    <MDBCard style={{ margin: '1rem' }} className='embassyCard'>
      <MDBCardBody>
        <MDBCardTitle>
          <Skeleton variant="text" width={200} height={30} />
        </MDBCardTitle>
        <MDBCardText>
          <strong>Country:</strong> <Skeleton variant="text" width={100} height={20} />
          <br />
          <strong>City:</strong> <Skeleton variant="text" width={100} height={20} />
          <br />
          <strong>Address:</strong> <Skeleton variant="text" width={200} height={20} />
          <br />
          <strong>Contact Information:</strong>
          <MDBListGroup flush>
            <MDBListGroupItem>Phone: <Skeleton variant="text" width={100} height={20} /></MDBListGroupItem>
            <MDBListGroupItem>Email: <Skeleton variant="text" width={200} height={20} /></MDBListGroupItem>
            <MDBListGroupItem>Website: <Skeleton variant="text" width={200} height={20} /></MDBListGroupItem>
          </MDBListGroup>
          <strong>Operating Hours:</strong>
          <ul>
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <li key={day}>
                <strong><Skeleton variant="text" width={100} height={20} />:</strong> <Skeleton variant="text" width={200} height={20} />
              </li>
            ))}
          </ul>
          <strong>Services Offered:</strong> <Skeleton variant="text" width={200} height={20} />
          <br />
          <strong>Appointment Booking Procedure:</strong> <Skeleton variant="text" width={200} height={20} />
          <br />
          <strong>Emergency Contact Information:</strong>
          <MDBListGroup flush>
            <MDBListGroupItem>Phone: <Skeleton variant="text" width={100} height={20} /></MDBListGroupItem>
            <MDBListGroupItem>Email: <Skeleton variant="text" width={200} height={20} /></MDBListGroupItem>
          </MDBListGroup>
          <strong>Location Coordinates:</strong> Latitude: <Skeleton variant="text" width={100} height={20} />, Longitude: <Skeleton variant="text" width={100} height={20} />
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default EmbassyCardSkeleton;
