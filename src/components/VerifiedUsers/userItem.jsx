import React, { useState } from 'react';
import { MDBBtn, MDBListGroupItem, MDBBadge, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from '../../utils/customAvatar';
import { updateData } from '../../Logics/updateData'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-hot-toast';
import { deleteData } from '../../Logics/deleteData';
import FadeInShade from '../../components/animations/fadeIn'
const UserItem = ({ user, onSuspend, onDelete, onShowProfile,getUsers }) => {
  let color = "success";
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSuspending, setIsSuspending] = useState(false)
  const deleteUser = async (user) => {
    console.log("delete", user)
    let loadingToastId = 9;
    if (window.innerWidth < 700) {
      loadingToastId = toast.loading(`deleting ${user.username}...`, {
        duration: Infinity, // Infinity duration until explicitly dismissed
        icon: <ClipLoader color="white" size={24} />
      });
    }
    try {
        // Update successful, dismiss loading toast
        const deleteOperation=await deleteData("Users",user.docId);
        console.log(deleteOperation);
        toast.dismiss(loadingToastId);
        // Show success message
        toast.success('Delete Successful!');
        setIsDeleting((prev) => false);
        getUsers();
    } catch (error) {
      // Dismiss loading toast on error
      toast.dismiss(loadingToastId);
      // Show error message
      toast.error('Failed to update status');
      console.error('Error updating status:', error);
    }
  }
  const updatedStatus = async (user, status) => {
    const newUser = { ...user, status };
    delete newUser.docId;
    // Show loading toast with spinner
    let loadingToastId = 9;
    if (window.innerWidth < 700) {
      loadingToastId = toast.loading(`${user?.status === 'suspended' ? 'unSuspending' : 'suspending'} ${user.username}...`, {
        duration: Infinity, // Infinity duration until explicitly dismissed
        icon: <ClipLoader color="white" size={24} />
      });
    }
    try {
      // Perform update operation
      console.log("Users", user.docId, { ...newUser })
      await updateData("Users", user.docId, { ...newUser });
      // Update successful, dismiss loading toast
      toast.dismiss(loadingToastId);
      // Show success message
      toast.success('Status updated successfully');
      setIsSuspending((prev) => false);
      getUsers();
    } catch (error) {
      // Dismiss loading toast on error
      toast.dismiss(loadingToastId);
      // Show error message
      toast.error('Failed to update status');
      console.error('Error updating status:', error);
    }
  }

  if (user?.status) {
    switch (user?.status) {
      case "active":
        color = 'success';
        break;
      case "suspended":
        color = 'warning';
        break;
      case "deleted":
        color = 'danger';
        break;
      default:
        color = 'active';
        break;
    }
  }
  const navigate = useNavigate();
  return (
    <FadeInShade>
    <MDBListGroupItem className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <div onClick={() => {
          //navigate("/Profile");
        }} className="me-3">  <CustomAvatar alt={user.username} src={user.biometricData.passport} size={60} /></div>
        <div onClick={() => {
          //navigate("/Profile");
        }}>
          <h5 className="mb-1">{user.username}</h5>
          <p className="mb-0">{user?.verified ? "verified":"unverified"}</p>
          <MDBBadge color={color} className='mobileOnly'>{user.status}</MDBBadge>
        </div>
      </div>
      <MDBBadge color={color} className='pcOnly'>{user.status}</MDBBadge>
      <div className='pcOnly'>
        
      <MDBBtn className="me-2 btn-sm" color="light" onClick={() => {
          window.sessionStorage.setItem("editUser",JSON.stringify(user));
          navigate("/EditProfile");
        }}>Edit User </MDBBtn>

        <MDBBtn className="me-2 btn-sm" color="warning" onClick={() => {
          setIsSuspending(true);
          onSuspend(user);
          if (user?.status === 'suspended') {
            updatedStatus(user, "active")
          }
          else {
            updatedStatus(user, "suspended")
          }

        }}>{isSuspending ? <ClipLoader color='white' size={16} /> : user?.status === "suspended" ? "unSuspend" : "Suspend"}</MDBBtn>
        <MDBBtn className="me-2 btn-sm" color="danger" onClick={() => {
          setIsDeleting(true);
          onDelete(user)
          deleteUser(user);
        }}>{isDeleting ? <ClipLoader color='white' size={16} /> : "Delete"} </MDBBtn>



        <MDBBtn className="btn-sm" color="primary" onClick={() => {
          onShowProfile(user)
          sessionStorage.setItem("uid",user.uid)
          navigate("/Profile")
        
        }}>Profile</MDBBtn>
      </div>
      <div className='mobileOnly'>
        <MDBDropdown>
          <MDBDropdownToggle className="btn-sm" style={{ borderRadius: 30 }} color="primary">
            Actions
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link onClick={() => {

              onSuspend(user)
              if (user?.status === 'suspended') {
                updatedStatus(user, "active")
              }
              else {
                updatedStatus(user, "suspended")
              }
            }}>{user?.status === "suspended" ? "unSuspend" : "Suspend"}</MDBDropdownItem>
            <MDBDropdownItem link onClick={() => {
              onDelete(user)
              //  updatedStatus(user,"deleted")
              deleteUser(user);

            }}>Delete</MDBDropdownItem>
            
            <MDBDropdownItem link onClick={() =>{
              onShowProfile(user)
              sessionStorage.setItem("uid",user.uid)
               navigate("/Profile")
             } 
            }>Edit</MDBDropdownItem>
            <MDBDropdownItem link onClick={() =>{
              onShowProfile(user)
              sessionStorage.setItem("uid",user.uid)
               navigate("/Profile")
             } 
            }>Profile</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>

    </MDBListGroupItem>
    </FadeInShade>
  );
};

export default UserItem;
