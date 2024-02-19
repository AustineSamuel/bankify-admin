import CustomAvatar from "../../utils/customAvatar";
import "./style.css";
import React,{useState} from 'react';
import {MDBInput,MDBBtn} from 'mdb-react-ui-kit'
import {PulseLoader} from 'react-spinners';
import { docQr } from "../../Logics/docQr";
import {toast,Toaster} from 'react-hot-toast';

const Login=()=>{
    const [inputs,setInputs]=useState({
        username:"",
        password:""
    })
    const [isLoading,setIsLoading]=useState(false);
    const submit=async ()=>{
setIsLoading(true);
const fetchDetails=await docQr("AdminLogin",{
    max:1,
    whereClauses:[
        {
            field:"password",
            operator:"==",
            value:inputs.password
        },
        {
            field:"username",
            operator:"==",
            value:inputs.username
        }
    ]
})
if(fetchDetails.length > 0){
    toast.success("Login successful");
    delete fetchDetails.docId;
    sessionStorage.setItem("adminDetails",JSON.stringify(fetchDetails[0]));
    
setTimeout(() => {
    window.location.reload();
},500);
}
else{
toast.error("Login details incorrect!");
}
setIsLoading(false);
    }

    return (
        <div className="loginPage">
            <Toaster/>
<div className='form text-center'>
    <br/>
    <div className="d-flex justify-content-center align-items-center">
<CustomAvatar src='/logo.jpg' size={100}/>
</div>
<b style={{textShadow:"1px 1px 1px white"}}>Login to admin</b>
<br/>
<br/>
<div style={{textAlign:"start"}}>
    <label>Username</label>
<MDBInput placeholder="Enter username" size="large" style={{borderColor:"black"}} onChange={(e)=>{
    setInputs({
        ...inputs,
        username:e.target.value
    })
}}/>
</div>
<div style={{textAlign:"start"}}>
    <label>Password</label>
<MDBInput placeholder="Enter password" size="large" onChange={(e)=>{
    setInputs({
        ...inputs,
        password:e.target.value
    })
}} type='password'/>
</div>
<br/>
<MDBBtn color='primary' size="lg" onClick={()=>{
    submit();
}} >
    {isLoading  ? <PulseLoader color="white"/>:"Submit"} </MDBBtn>

    </div>


        </div>
    )
}

export default Login;