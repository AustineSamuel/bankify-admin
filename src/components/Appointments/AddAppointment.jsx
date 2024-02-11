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
  const [embassies,setEmbassies]=useState([]);
  const [selectedEmbassy,setSelectedEmbassy]=useState([]);
  const appointment = {
    type: "",
    status: "Scheduled",
    notes: "Please arrive 15 minutes before your appointment.",
    confirmationCode: "ABC123",
    attendees: ["Alice", "Bob"],
    requiredDocuments: ["Passport", "Proof of Address"],
  }

  const navigate=useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(null);

  const [Appointment, setAppointment] = useState({ ...appointment,reminderSettings: {
    email: true,
    sms: false
  },
  dateTime: getCurrentTimestamp(),
  createdAt: getCurrentTimestamp(),
  updatedAt:  getCurrentTimestamp()
}
);
const handleTextChange=(e,name)=>{
  const {value}=e.target
  setAppointment({...Appointment,[name]:value})
}
const validateData = (appointment) => {
  // Validate each field of the appointment object
  // Iterate over each property of the appointment object
  for (let key in appointment) {
    const value = appointment[key];
    
    // Check if the value is null, undefined, or has a length less than 3 (for strings)
    if (value === null || value === undefined || (typeof value === 'string' && value.length < 3)) {
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


async function getEmbassies(){
  const em= await docQr("Embassy",{
    max:800,
    whereClauses:[
      {
        field:"servicesOffered",
        operator:"!=",
        value:""
      }
    ]
  })
  setEmbassies(em);
}


useEffect(()=>{
getEmbassies();
},[])


const submit=async () =>{
  if(!validateData(Appointment))return
  console.log(Appointment);
  try{
    setIsSubmitting(true);
  const AddOperation=await AddData(collection(db,"Appointment"),{...Appointment});
  console.log(AddOperation);
  toast.success("Appointment saved successfully!");
  navigate("/AppointmentList");
  setIsSubmitting(false);
  }
  catch(err){
    console.log(err);
    toast.error(err.message || "Something went wrong");
  }

}
 // console.log(Appointment)
  let Inputs = []; // Initialize as an empty array
  for (let i in appointment) {
    
    if(Array.isArray(appointment[i])){
      const list= appointment[i];
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
          value={Appointment?.[i] || ""} // Use optional chaining to handle potential undefined values
          onChange={(event) => {
            const { value } = event.target;
            setAppointment({ ...Appointment, [i]: value || "" });
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
   if(typeof appointment[i]=='object' && !Array.isArray(appointment[i])){
    const newInputs=Appointment?.[i];
    const inputsList=[];
    for(let prop in newInputs){
      inputsList.push(<>
        <MDBInput label={convertToTitleCase(prop)} name={i} placeholder={`Enter ${convertToTitleCase(prop)}`} type={
          i==='dateOfBirth' ? 'date':i==='password' ? 'password':"text"} value={newInputs[prop]}
         onChange={(e)=>{
          const newValue={...Appointment?.[i],[prop]:e.target.value}
          setAppointment({...Appointment,[i]:newValue});
        }}/>
        <br />
      </>)
    }

    Inputs.push(<>
    <h4>{convertToTitleCase(i)}</h4>
    {inputsList}
    </>)
    }
    if(typeof appointment?.[i]=='string'){
          Inputs.push(
      <>
        <MDBInput label={convertToTitleCase(i)} value={Appointment?.[i]} name={i} placeholder={`Enter ${convertToTitleCase(i)}`} type={
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
      <h4 className='text-center'> <b>Add Appointment</b></h4> <br/>


      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Select Embassy</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={'Select Embassy'}
          value={selectedEmbassy?.name} // Use optional chaining to handle potential undefined values
          onChange={(event) => {
            const { value } = event.target;
            console.log(value);
            setAppointment({ ...Appointment, embassy_id: value || "" });
        //    setSelectEmbassy()
        console.log(event.target.getAttribute("name"));
        
          }}
        >
          {embassies &&
          embassies.map((embassy,index) => (
              <MenuItem name={embassy.name} value={embassy?.embassy_id || ""} key={index}>
                {embassy.name+" ("+embassy.city+" "+embassy.country+")"}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
     <br/><br/>

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
