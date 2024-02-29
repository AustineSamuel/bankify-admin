import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import CustomAvatar from '../utils/customAvatar';
import {useState} from 'react';
import {Menu, Plus} from 'react-feather';
import {getCurrentDateTime} from '../Logics/date'
import {IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom'; 
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
  } from 'mdb-react-ui-kit';
import Notifications from './notifications';
import useUserDetails from '../Hooks/userUserDetails';

export default function UserNav({openMenu,adminDetails}) {
    const [openNotifications,setOpenNotifications]=useState(false);
    const {user}=useUserDetails();
    const navigate=useNavigate()
    return (
        
<>
      <MDBModal open={openNotifications} setOpen={setOpenNotifications} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Notifications</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>setOpenNotifications(!openNotifications)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <Notifications/>
</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>setOpenNotifications(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        <div className='userNav d-flex align-items-center justify-content-between'>

            {window.innerWidth > 700  ? <div className='greetingUser text-start'>
                <b>{adminDetails?.name}</b><br />
                <span>{getCurrentDateTime()}</span>
            </div> : <div style={{textAlign:'start',padding:"18px"}}>
                <Menu onClick={()=>{
                    openMenu()
                }}/>
{/* <img src='/logo.jpg' width={50} height={50} alt='Immintegral logo'/><b>Immintegral</b> */}
</div>}

            <div className='d-flex align-items-center'>
<IconButton onClick={()=>{
  navigate("/AddCountry");
}}> <Plus  /></IconButton>
                <a onClick={()=>{
                    setOpenNotifications(true);
                }} className='mx-3' href='#!'>
                    <MDBIcon fas icon='bell' size='lg' />
                    <MDBBadge color='danger' style={{ margin: "-5px" }} notification pill>
                        1
                    </MDBBadge>
                </a>

               <div style={{padding:1}}> <CustomAvatar src={user?.biometricData?.passport ? user?.biometricData?.passport:"/images/user.png"} alt="User Avatar" /></div>

            </div>


        </div>

        </>
    )
}