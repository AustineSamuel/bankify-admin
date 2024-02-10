import CustomAvatar from "../../utils/customAvatar";
import "./style.css";
import React,{useEffect,useState} from 'react';
import {MDBInput,MDBBtn} from 'mdb-react-ui-kit'
import {PulseLoader} from 'react-spinners';
const Login=()=>{
    const [inputs,setInputs]=useState({
        username:"",
        password:""
    })
    const [isLoading,setIsLoading]=useState(false);

    const submit=()=>{
setIsLoading(true);

setTimeout(()=>{
    console.log(inputs);
setIsLoading(false);
},3000)
    }

    return (
        <div className="loginPage">
<div className='form text-center'>
    <br/>
<CustomAvatar src='/images/user.png' size={100}/>
<br/>
<MDBInput onChange={(e)=>{
    setInputs({
        ...inputs,
        username:e.target.value
    })
}} size="large" label='Username' />
<br/>
<MDBInput onChange={(e)=>{
    setInputs({
        ...inputs,
        password:e.target.value
    })
}} size="large" type='password' label='Password' />
<br/>
<MDBBtn color='primary' onClick={()=>{
    submit();
}} >
    {isLoading  ? <PulseLoader color="white"/>:"Submit"} </MDBBtn>

    </div>


        </div>
    )
}

export default Login;