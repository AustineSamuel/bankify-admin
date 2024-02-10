import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import {useNavigate} from 'react-router-dom'
const Page404 = () => {
    const navigate=useNavigate();
  return (
    <div style={{ textAlign: 'center',minHeight:"100vh", paddingTop: '100px',position:"relative",backgroundImage:"url('/images/404.gif')",backgroundSize:"100% 100%" }}>
       {/* <img src="/images/404.gif" alt="404 Page Not Found" style={{ position:"absolute",top:0,left:0,maxWidth: 
      '100%', width:'100%',height:'100vh',borderRadius:10 }} hidden/>
    */}
      <div style={{width:"100%",height:"100%"}} className='d-flex align-items-center justify-content-center'>
     <div style={{maxWidth:"90%"}}>
      <h2 style={{ marginTop: '20px', marginBottom: '10px',color:"white",textShadow:"1px 1px 4px black,2px 3px 0px black" }}>Oops! Page not found.</h2>
      <p style={{ marginBottom: '30px' }}>The page you are looking for might have been removed or is temporarily unavailable.</p>
      <MDBBtn color="primary" onClick={()=>navigate("/")}>Go to App</MDBBtn>
      </div>
      </div>
     
    </div>
  );
}

export default Page404;
