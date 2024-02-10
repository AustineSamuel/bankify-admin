import React from 'react';
import { MDBListGroup } from 'mdb-react-ui-kit';
import UserItem from './userItem';
const UserList = ({ users, onSuspend, onDelete,onShowProfile,getUsers }) => {
  return (
    <MDBListGroup>
      {users.map((user, index) => (
        <UserItem getUsers={getUsers} key={index} user={user} onSuspend={onSuspend} onShowProfile={onShowProfile} onDelete={onDelete} />
      ))}
    </MDBListGroup>
  );
};

export default UserList;
