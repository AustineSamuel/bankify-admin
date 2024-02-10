import {MDBBtn} from 'mdb-react-ui-kit'
export default function Animation(){
    return (
    <div style={{textAlign:"center"}}>
<img src='/images/security.gif' style={{width:"300px",height:"300px",maxWidth:"100%",borderRadius:"50%"}} alt=''/>
<br/><br/>
<div style={{
      backgroundColor: '#d1ecf1', // Background color for info alert
      color: '#0c5460',           // Text color for info alert
      padding: '10px',            // Padding around the content
      border: '1px solid #bee5eb', // Border color for info alert
      borderRadius: '4px',        // Border radius to round the corners
      marginBottom: '20px'
}}>
     Reset your password to ensure the safety of your account!
</div>

<MDBBtn size="large" style={{width:"100%"}}>Reset your password</MDBBtn>
        </div>
    );
 }