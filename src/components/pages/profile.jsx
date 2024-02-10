import React from 'react';
import {mockUser as user} from '../_mock/user.js';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "../Profile/style.css";
import UserCard from '../Profile/userCard.jsx';
import OtherCard from '../Profile/otherDetails.jsx';
const Profile = () => {
  return (
    <div style={{padding:18}}>
      <h3 style={{ padding: 10, fontWeight: "bolder" }}>Profile Dashboard</h3>

      <div className='dashboard'>
      
      <MDBContainer fluid >
              <MDBRow style={{padding:0}}>
                {/* Sidebar */}

                <MDBCol md="5" lg="4"style={{padding:0}}>
<UserCard user={user}/>
</MDBCol>


                <MDBCol md="6" lg="8" className='otherCard'>
<div>
<OtherCard user={user}/>
</div>
                    </MDBCol>


                    </MDBRow>




                    </MDBContainer>
      
      </div>
    </div>
  );
}

export default Profile;
