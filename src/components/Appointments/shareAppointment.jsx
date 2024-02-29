import React, { useEffect, useState } from 'react'
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBTooltip
} from 'mdb-react-ui-kit';
import SearchUsers from '../VerifiedUsers/searchUsers';
import { docQr } from '../../Logics/docQr';
import CustomAvatar from '../../utils/customAvatar';
import { IconButton } from "@mui/material";
import {ClipLoader} from 'react-spinners';
import { Check, CheckCircle, Circle } from 'react-feather';
import { updateData } from '../../Logics/updateData';
import {toast} from 'react-hot-toast';



const ShareAppointment = ({appointmentId}) => {
  const [isLoading,setIsLoading] = useState(false);
  const [showSharer, setShowSharer] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsersId,setSelectedUsersId]=useState([]);
  const [usersStore,setUsersStore]=useState([]);
  async function getUsers() {
    setIsLoading(true);
    const users = await docQr("Users", {
      max: 800,
      whereClauses: [{
        field: "username",
        operator: "!=",
        value: ""
      }
      ]
    })
    const selectedUsersId_=users.filter((user)=>user?.addedAppointments && user?.addedAppointments.includes(appointmentId))
    .map((e)=>e.uid);
    setSelectedUsersId([...selectedUsersId_]);
    setUsers(users);
    setUsersStore(users);
    setIsLoading(false);
  }

  const selectUser=(userId)=>{

    if(!selectedUsersId.includes(userId))setSelectedUsersId([userId,...selectedUsersId])
    else{
  const newList=selectedUsersId.filter((e)=>e!==userId);
  setSelectedUsersId([...newList])
    }
  }
  useEffect(() => {
    getUsers();
  }, []);


  useEffect(()=>{

  },[users,selectedUsersId]);

  const onChange = (e) => {
    const {value}=e.target;
    if(usersStore.length === 0)return getUsers();
    const users=value!=='' ? usersStore?.filter((user,index)=>{
return user?.username?.toLowerCase().includes(value?.toLowerCase());
    }):usersStore;
    //console.log(users);
    
    setUsers(users);
  }
const [isSubmitting,setIsSubmitting]=useState(false);
  const submit=async ()=>{
    if(selectedUsersId.length === 0)return toast.error("Please select 1 or more users");
    setIsSubmitting(true)
    const selectedUsersObjects=usersStore.filter((e)=>selectedUsersId.includes(e.uid));
  await Promise.all(selectedUsersObjects.map(async (user,index)=>{
    if(user?.addedAppointments){
      if(!user.addedAppointments.includes(appointmentId)){
        const newUser={...user,addedAppointments:[appointmentId,...user.addedAppointments]}
        await updateData("Users",user.docId,newUser);
    }
    else{//remove from user dashboard
      const newUser={...user,addedAppointments:user?.addedAppointments?.filter((e)=>e!==appointmentId) || []}
      await updateData("Users",user.docId,newUser);
    }
  }
  else{
    //add new appointment list for user
    const newUser={...user,addedAppointments:[appointmentId]}
    await updateData("Users",user.docId,newUser);
  }
}));
toast.success("Appointment shared successfully!");
setSelectedUsersId([]);
getUsers()
    setIsSubmitting(false)
  }
  return (
    <>
      <MDBBtn onClick={() => setShowSharer(true)} rounded size='sm' style={{ width: "100%", marginTop: 4 }}>Share to user</MDBBtn>
      <MDBModal open={showSharer} setOpen={setShowSharer} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Share Appointment</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setShowSharer(!showSharer)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

              <SearchUsers onChange={onChange} users={users} setUsers={setUsers} />
              <div style={{maxHeight:"90vh",overflow:"auto"}}>
                
              {isLoading && <div className='d-flex justify-content-center'><ClipLoader/></div>}
                
              {users.length === 0 && !isLoading && <div className='text-center d-flex justify-content-center'>
               <span> <img src='/images/noData.png' alt="" width={50} style={{borderRadius:10}} height={50}/><br/>
                <p>No user found </p></span>
                </div>}
                {users.map((user)=>{
                  
             return (<div style={{border:"1px solid lightgrey",padding:6,borderRadius:10,marginTop:5}}>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center' style={{padding:0}}><CustomAvatar size={50} alt="" src={user?.biometricData.passport || "/images/user.png" }/>
                    <div style={{padding:5}}>
                      {user.username}<br />
                      {user.Nationality}

                    </div>
                  </div>
                  <IconButton onClick={()=>selectUser(user.uid)} >{selectedUsersId.filter((item)=>item===user.uid).length > 0? 
                  <MDBTooltip tag='a' wrapperProps={{ href: '#' }} title="Users who have already been added to view this appointment are also marked as selected.">
                  <CheckCircle style={{color:"green"}} /></MDBTooltip>
                  :<Circle/>}</IconButton>

                </div>

              </div>);

})}

              </div>

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setShowSharer(false)}>
                Close
              </MDBBtn>

              <MDBBtn color='' onClick={() => submit()}>
              {isSubmitting ? <ClipLoader size={15} color='white'/>:"Send"}
              </MDBBtn>

            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}

export default ShareAppointment;