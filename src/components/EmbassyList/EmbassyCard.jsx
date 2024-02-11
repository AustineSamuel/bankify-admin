import React from 'react';
//import moment from 'moment'; // Import moment for date rendering
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const EmbassyCard = ({ embassy }) => {
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
          <MDBListGroupItem>Email: {embassy.contactInformation.email}</MDBListGroupItem>
          <MDBListGroupItem>Website: {embassy.contactInformation.website}</MDBListGroupItem>
        </MDBListGroup>
        <strong>Operating Hours:</strong>
        <ul>
          {Object.entries(embassy.operatingHours).map(([day, hours]) => (
            <li key={day}>
              <strong>{day}:</strong> {hours}
            </li>
          ))}
        </ul>
        <strong>Services Offered:</strong> {embassy.servicesOffered}
        <br />
        <strong>Appointment Booking Procedure:</strong> {embassy.appointmentBookingProcedure}
        <br />
        <strong>Emergency Contact Information:</strong>
        <MDBListGroup flush>
          <MDBListGroupItem>Phone: {embassy.emergencyContactInformation.phone}</MDBListGroupItem>
          <MDBListGroupItem>Email: {embassy.emergencyContactInformation.email}</MDBListGroupItem>
        </MDBListGroup>
        <strong>Location Coordinates:</strong> Latitude: {embassy.locationCoordinates.latitude}, Longitude: {embassy.locationCoordinates.longitude}
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
  );
};

export default EmbassyCard;
