import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import CustomAvatar from '../utils/customAvatar';
import {useState} from 'react';
import {Menu} from 'react-feather';
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

export default function UserNav({openMenu}) {
    const [openNotifications,setOpenNotifications]=useState(false);

    
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
                <b>Austine Dev</b><br />
                <span>Jan 8 2024</span>
            </div> : <div style={{textAlign:'start',padding:"18px"}}>
                <Menu onClick={()=>{
                    openMenu()
                }}/>
{/* <img src='/logo.avif' width={50} height={50} alt='bankify logo'/><b>Bankify</b> */}
</div>}

            <div className='d-flex align-items-center'>

                <a onClick={()=>{
                    setOpenNotifications(true);
                }} className='mx-3' href='#!'>
                    <MDBIcon fas icon='bell' size='lg' />
                    <MDBBadge color='danger' style={{ margin: "-5px" }} notification pill>
                        1
                    </MDBBadge>
                </a>

                <CustomAvatar src="/images/user.png" alt="User Avatar" />

            </div>


        </div>

        </>
    )
}