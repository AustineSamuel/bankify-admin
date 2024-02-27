import React from 'react';

export default function OtherCard({ user }) {
 console.info(user);
 /**
  * personalInformation: {
      fullName: "John Doe",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      address: "123 Main Street, Cityville, State, Country",
      contactNumber: "+1 (555) 123-4567"
    },
    biometricData: {
      facialFeatures: "Facial recognition data",
      fingerprints: "Fingerprint data"
    },
  */
 
    return (
    <div className='userCard d-flex align-items-start'>
      <div style={{ height: "100%" }} className='userCardDetails'>
      <p>Gender: {user.gender}</p>

        <p>Verification Status: {user.verified ? "verified":"unverified"}</p>
        <p>Contact Number: {user?.contactNumber}</p>
        <p>Language : {user?.Language}</p>
        <p>Nationality: {user?.Nationality}</p>
        <p>Marital status: {user.maritalStatus}</p>
      </div>
    </div>
  );
}
