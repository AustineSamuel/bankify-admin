import React from 'react';
import { User, Mail, Calendar, MapPin, Phone } from 'react-feather'; // Importing Feather icons
import CustomAvatar from "../../utils/customAvatar";

export default function UserCard({ user }) {
  return (
    <div className='userCard d-flex align-items-start'>
      <CustomAvatar src={user?.biometricData?.passport} size={100} />
      <div style={{ height: "100%" }} className='userCardDetails'>
        <p><User size={18} />  {user.username}</p>
        <p><Mail size={18} /> {user.email}</p>
        <p><Calendar size={18} />  {user.dateOfBirth}</p>
        <p><MapPin size={18} />  {user.address}</p>
        <p><Phone size={18} /> {user.contactNumber}</p>
      </div>
    </div>
  );
}
