import React from 'react';

export default function OtherCard({ user }) {
 
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
      <p>Gender: {user.personalInformation.gender}</p>

        <p>Verification Status: {user.verificationStatus}</p>
        <p>Timestamp: {user.timestamp}</p>
        <p>Additional Information: {user.additionalInformation}</p>
        <p>Facial Features: {user.biometricData.facialFeatures}</p>
        <p>Fingerprints: {user.biometricData.fingerprints}</p>
      </div>
    </div>
  );
}
