import React,{useState,useEffect} from 'react';
import "./style.css";
import {PulseLoader} from 'react-spinners';
import {MDBBtn} from 'mdb-react-ui-kit';
import {useNavigate} from 'react-router-dom';


const VerifyUI=()=>{
const [isLoadingModels,setIsLoadingModels]=useState(false);
const [isLoadingText,setIsLoadingText]=useState("loading models")
const [error,setError]=useState("Verification Error please try again");
const [isComplete,setIsComplete]=useState(true);
const navigate=useNavigate();
useEffect(()=>{

},[]);


    return (
        <div className="verifyUI d-flex align-items-center justify-content-center">
<div className='box'>
{isLoadingModels && <div className='loader d-flex align-items-center justify-content-center'>
    <div class='text-center'>
        <PulseLoader color="darkblue"/>
<small>{isLoadingText}</small>
    </div>
</div>}

{isComplete && <div className='result'>
<img src='/images/check.avif' alt=''/>
<br/>
<b style={{color:"green"}}>Verification successful</b>
<MDBBtn onClick={()=>navigate("/EditProfile")} color="success">Setup your profile</MDBBtn>

</div>}

{error!=='' && !isComplete && <div className='result'>
<img src='/images/faceError.jpg' alt=''/>
<br/>
<b style={{color:"red"}}>{error}</b>
<br/>
<MDBBtn color="danger" >Retry</MDBBtn>
</div>}



    </div>


            </div>
    )
}

export default VerifyUI;