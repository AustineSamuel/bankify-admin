import React from 'react';
import { User, Mail, Calendar, MapPin, Phone } from 'react-feather'; // Importing Feather icons
import CustomAvatar from "../../utils/customAvatar";

export default function UserCard({ user }) {
  return (
    <div className='userCard d-flex align-items-start'>
      <CustomAvatar src='/images/user.png' size={100} />
      <div style={{ height: "100%" }} className='userCardDetails'>
        <p><User size={18} />  {user.username}</p>
        <p><Mail size={18} /> {user.email}</p>
        <p><Calendar size={18} />  {user.personalInformation.dateOfBirth}</p>
        <p><MapPin size={18} />  {user.personalInformation.address}</p>
        <p><Phone size={18} /> {user.personalInformation.contactNumber}</p>
      </div>
    </div>
  );
}
