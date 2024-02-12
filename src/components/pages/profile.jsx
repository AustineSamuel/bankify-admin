import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "../Profile/style.css";
import UserCard from '../Profile/userCard.jsx';
import OtherCard from '../Profile/otherDetails.jsx';
import {BounceLoader} from 'react-spinners';
import { docQr } from '../../Logics/docQr';
import {useNavigate} from 'react-router-dom'
const Profile = () => {
  const userId = sessionStorage.getItem("uid");
  const [user, setUser] = useState();
  const navigate=useNavigate()
  useEffect(() => {
    if(!userId)return navigate('/');
    const getUser = async () => {
      const user = await docQr("Users", {
        max: 1,
        whereClauses: [
          {
            field: "uid",
            operator: "==",
            value: userId
          }
        ]
      });
      if(user.length > 0)setUser(user[0]);
    }

    getUser();
  }, []);
  return (
    <div style={{ padding: 18 }}>
      <h3 style={{ padding: 10, fontWeight: "bolder" }}>Profile Dashboard</h3>

      <div className='dashboard'>

        <MDBContainer fluid >
          <MDBRow style={{ padding: 0 }}>
            {/* Sidebar */}

          {user ?  <MDBCol md="5" lg="4" style={{ padding: 0 }}>
              <UserCard user={user} />
            </MDBCol>:<BounceLoader color='var(--color)'/>}


            <MDBCol md="6" lg="8" className='otherCard'>
            {user && <div>
                <OtherCard user={user} />
              </div>}
            </MDBCol>


          </MDBRow>




        </MDBContainer>

      </div>
    </div>
  );
}

export default Profile;
