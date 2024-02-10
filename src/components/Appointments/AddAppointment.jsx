import React, { useEffect, useState} from 'react';
import "./style.css";
import { MDBInput,MDBBtn } from 'mdb-react-ui-kit';
import { Camera } from 'react-feather';
import {BounceLoader,PulseLoader} from 'react-spinners';
import uploadToFirebase from '../../utils/uploadToFirebase';
import {toast,Toaster} from 'react-hot-toast';
import { AddData} from '../../Logics/addData';



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useNavigate} from 'react-router-dom';
import { collection } from 'firebase/firestore';
import {db} from '../../firebase.config'
import { convertToTitleCase, getCurrentTimestamp } from '../../Logics/DateFunc';
import { docQr } from '../../Logics/docQr_ORGate';
import { generateUniqueString } from '../../Logics/date';



const AddAppointment = () => {
  const embassy = {
    name: "",
    country: "",
    city: "",
    address: "",
    contactInformation: {
      phone: "",
      email: "",
      website: ""
    },
    operatingHours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM"
    },
    servicesOffered: ["Visa Services", "Passport Issuance", "Consular Assistance"],
    appointmentBookingProcedure: "Appointments can be booked online through our website or by calling our office during business hours.",
    emergencyContactInformation: {
      phone: "",
      email: ""
    },
    locationCoordinates: {
      latitude: 12.3456,
      longitude: -98.7654
    }
  };

  const navigate=useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(null);


  const [Embassy, setEmbassy] = useState({ ...embassy});
const handleTextChange=(e,name)=>{
  const {value}=e.target
  setEmbassy({...Embassy,[name]:value})
}
const validateData = (embassy) => {
  // Validate each field of the embassy object
  // Iterate over each property of the embassy object
  for (let key in embassy) {
    const value = embassy[key];
    
    // Check if the value is null, undefined, or has a length less than 3 (for strings)
    if (value === null || value === undefined || (typeof value === 'string' && value.length < 3)) {
      // Display an error message based on the property name
      toast.error(`Please provide valid ${convertToTitleCase(key)}`);
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




  if (!embassy.name || !embassy.country || !embassy.city || !embassy.address) {
    toast.error('Please provide complete embassy information');
    return false;
  }

  if (!embassy.contactInformation || !embassy.contactInformation.phone || !embassy.contactInformation.email) {
    toast.error('Please provide contact information');
    return false;
  }

  if (!embassy.operatingHours) {
    toast.error('Please provide operating hours');
    return false;
  }

  if (!embassy.servicesOffered || embassy.servicesOffered.length === 0) {
    toast.error('Please provide services offered');
    return false;
  }

  if (!embassy.appointmentBookingProcedure) {
    toast.error('Please provide appointment booking procedure');
    return false;
  }

  if (!embassy.emergencyContactInformation || !embassy.emergencyContactInformation.phone || !embassy.emergencyContactInformation.email) {
    toast.error('Please provide emergency contact information');
    return false;
  }

  if (!embassy.locationCoordinates || !embassy.locationCoordinates.latitude || !embassy.locationCoordinates.longitude) {
    toast.error('Please provide location coordinates');
    return false;
  }

  // If all fields are valid, return true
  return true;
};

const submit=async () =>{
  console.log(Embassy);
}
 // console.log(Embassy)
  let Inputs = []; // Initialize as an empty array
  for (let i in embassy) {
    
    if(Array.isArray(embassy[i])){
      const list= embassy[i];
      if(!list)continue;
      Inputs.push(
        <>
        <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{convertToTitleCase(i)}</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={convertToTitleCase(i)}
          value={Embassy?.[i] || ""} // Use optional chaining to handle potential undefined values
          onChange={(event) => {
            const { value } = event.target;
            console.log(i, value);
            setEmbassy({ ...Embassy, [i]: value || "" });
          }}
        >
          {list &&
            list.map((text) => (
              <MenuItem name={i} value={text || ""} key={text}>
                {text}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <br/><br/>
      </>
      );
    }
   if(typeof embassy[i]=='object' && !Array.isArray(embassy[i])){
    const newInputs=embassy?.[i];
    const inputsList=[];
    const handleTextChange=(e,newIndex)=>{
setEmbassy({...Embassy,[i]:e})
    }

    for(let prop in newInputs){
      inputsList.push(<>
        <MDBInput label={convertToTitleCase(prop)} name={i} placeholder={`Enter ${convertToTitleCase(prop)}`} type={
          i==='dateOfBirth' ? 'date':i==='password' ? 'password':"text"} value={newInputs[prop]}
         onChange={(e)=>{
          const newValue={...Embassy?.[i],[prop]:e.target.value}
          handleTextChange(newValue);
        }}/>
        <br />
      </>)
    }

    Inputs.push(<>
    <h4>{convertToTitleCase(i)}</h4>
    {inputsList}
    </>)
    }
    if(typeof embassy?.[i]=='string'){
          Inputs.push(
      <>
        <MDBInput label={convertToTitleCase(i)} value={Embassy?.[i]} name={i} placeholder={`Enter ${convertToTitleCase(i)}`} type={
          i==='dateOfBirth' ? 'date':i==='password' ? 'password':"text"
        }  onChange={(e)=>handleTextChange(e,i)}/>
        <br />
      </>
    );
      }
  }

  <MDBInput className='' />
  return (
    <>
    <Toaster/>
      <div className='editProfile'><br/>
      <h4 className='text-center'> <b>Add Appointment Embassy</b></h4> <br/>
        {Inputs}
<br/>
<MDBBtn style={{width:"100%"}} onClick={
  ()=>submit()
}>{isSubmitting ? <PulseLoader color='white'/>:"Submit"}</MDBBtn>
      </div>
    </>
  );
}

export default AddAppointment;
