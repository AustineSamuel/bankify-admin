import React, { useState }  from 'react';
import {MDBInput,MDBBtn} from 'mdb-react-ui-kit';
import { appointment } from '../_mock/user';
import {toast} from 'react-hot-toast';
import { convertToTitleCase } from '../../Logics/DateFunc';


function getCurrentDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const now = new Date();
    const year = now.getFullYear();
    const month = months[now.getMonth()];
    const dayOfWeek = days[now.getDay()];
    const date = now.getDate();

    const formattedDate = `${dayOfWeek} ${month} ${date}, ${year}`;

    return formattedDate;
}

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    return formattedTime;
}



const ApproveDataForm=({formValues,user,uid,successCallback})=>{
    const [data,setData]=useState({
applicantName:user.fullName,
passportNumber:"",
appointmentMadeBy:user.fullName,
numberOfApplicants:"1",
visaCategory:"",
documentDeliveryType:"",
consularAddress:"",
deliveryAddress:"",
MRV_Name:"",
MRV_Value:"",
DS_160_ConfirmationNumber:"",
UID:uid
    })
    console.log(user);
const validateData = (data) => {
    console.log(data);
    // Validate each field oe appointment object
    // Iterate over each property of the appointment object
    for (let key in data) {
      const value = data[key];
      
      // Check if the value is null, undefined, or has a length less than 3 (for strings)
      if (value === null || value === undefined || typeof value !== 'string' || !value) {
        // Display an error message based on the property name
        toast.error(`Please provide valid (${convertToTitleCase(key)})`);
        return false;
      }
  
      // Check if the value is an object (excluding arrays)
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Recursively call validateData for nested objects
        if (!validateData(value)) {
          return false;
        }
      }
    }
  
    // If all fields are valid, return true
    return true;
  };
  




    return (
        <>
        <div>
            <label>Applicant Name</label>
<MDBInput placeholder=' Enter Applicant Name' value={data.applicantName} onChange={(e)=>{
    const {value}=e.target
    console.log(value);
    setData({...data,applicantName:value});
}}/>
<label>Passport Number</label><br/>
<MDBInput placeholder=' Enter Passport number' value={data.passportNumber} onChange={(e)=>{
    const {value}=e.target
    setData({...data,passportNumber:value});

}}/>
<label>Appointment made by</label><br/>
<MDBInput placeholder=' Enter Appointment made by' value={data.appointmentMadeBy} onChange={(e)=>{
    const {value}=e.target
    setData({...data,appointmentMadeBy:value});

}}/>
<label>Number of Applicants </label><br/>
<MDBInput placeholder=' Enter Number of Applicants ' value={data.numberOfApplicants} onChange={(e)=>{
    const {value}=e.target
    setData({...data,numberOfApplicants:value});
}}/>
<label>Visa Category</label><br/>
<MDBInput placeholder=' Enter Visa Category' value={data.visaCategory} onChange={(e)=>{
    const {value}=e.target
    setData({...data,visaCategory:value});
}}/>

<label>Visa Priority</label><br/>
<MDBInput placeholder=' Enter Visa Categor?y' value={data.visaPriority} onChange={(e)=>{
    const {value}=e.target
    setData({...data,visaPriority:value});
}}/>
<label>Document delivery type</label><br/>
<MDBInput placeholder=' Enter Document delivery type' value={data.documentDeliveryType} onChange={(e)=>{
    const {value}=e.target
    setData({...data,documentDeliveryType:value});
}}/>
<label>Consular Address</label><br/><MDBInput value={data.consularAddress} placeholder=' Enter Consular Address' onChange={(e)=>{
    const {value}=e.target
    setData({...data,consularAddress:value});
}}/>


<label>Delivery Address</label><br/><MDBInput value={data.deliveryAddress} placeholder=' Enter Consular Address' onChange={(e)=>{
    const {value}=e.target
    setData({...data,deliveryAddress:value});
}}/>

<label>MRV Name</label>
<br/><MDBInput placeholder=' Enter MRV Name' value={data.MRV_Name} onChange={(e)=>{
    const {value}=e.target
    setData({...data,MRV_Name:value});

}}/>
<label>MRV Value</label>
<br/><MDBInput placeholder=' Enter MRV Value' value={data.MRV_Value} onChange={(e)=>{
    const {value}=e.target
    setData({...data,MRV_Value:value});

}}/>
<label>DS-160 Confirmation Number</label>
<br/><MDBInput placeholder=' Enter DS-160 Confirmation Number' value={data.DS_160_ConfirmationNumber} onChange={(e)=>{
    const {value}=e.target
    setData({...data,DS_160_ConfirmationNumber:value});

}}/>
<label>UID</label>
<br/><MDBInput placeholder=' Enter UID' value={data.UID} onChange={(e)=>{
    const {value}=e.target
    setData({...data,UID:value});
}}/>

<br/>




        </div>
        
<MDBBtn size={"lg"} style={{width:"100%"}} rounded color='dark' onClick={()=>{
    if(validateData(data)){
        console.log("called success with input data");
        successCallback({...data,
        date:getCurrentDate(),
    time:getCurrentTime()
});
    }
}}>Submit And Approve</MDBBtn>
        <br/><br/>
        </>
    )
}

export default ApproveDataForm;

