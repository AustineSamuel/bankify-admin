import React, { useEffect, useState} from 'react';
import "./style.css";
import { MDBInput,MDBBtn,MDBListGroupItem,MDBListGroup } from 'mdb-react-ui-kit';
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
    type:  [
      "Consultation",
      "Check-up",
      "Treatment",
      "Therapy Session",
      "Diagnostic Test",
      "Surgery",
      "Follow-up Appointment",
      "Counseling Session",
      "Physical Examination",
      "Vaccination",
      "Screening",
      "Procedure",
      "Referral Appointment",
      "Second Opinion",
      "Preventive Care",
      "Medication Review",
      "Health Education",
      "Mental Health Evaluation",
      "Rehabilitation Session",
      "Dental Appointment",
      "Eye Examination",
      "Chiropractic Adjustment",
      "Acupuncture Session",
      "Massage Therapy",
      "Nutritional Counseling",
      "Fitness Evaluation",
      "Alternative Medicine Consultation",
      "Other"
  ],
    status: ["Scheduled", "Confirmed", "Cancelled", "Completed"],
    notes: "",
    requiredDocuments: [
    "Passport",
    "Proof of Address",
    "Driver's License",
    "National ID Card",
    "Birth Certificate",
    "Social Security Card",
    "Bank Statements",
    "Utility Bills",
    "Employment Letter",
    "Income Tax Returns",
    "Insurance Documents",
    "Visa/Residence Permit",
    "Travel Itinerary",
    "Medical Records",
    "Educational Certificates",
    "Marriage Certificate",
    "Divorce Decree",
    "Power of Attorney",
    "Legal Affidavit",
    "Other Legal Documents"
]
  }

  const navigate=useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(null);
const [form,setForm]=useState([
  {
    type:"text",
    name:"Surname"
  },
  {
    name:"First Name",
    type:"text"
  },
  {
    name:"Purpose of travel",
    type:"text"
  },
  {
    name:"Applicant Document delivery address",
    type:"text"
  },
  {
    name:"Consular Appointment detail",
    data:[],
    type:"select"
  }
]);

const [currentForm,setCurrentForm]=useState({
  type:"",
  name:""
});

const addInput = () => {
  setForm([...form, { type: currentForm.type, name: currentForm.name, placeholder: 'Enter '+currentForm.name, value: '' }]);
setCurrentForm({
name:"",
type:""
})
};

const removeInput = (index) => {
  const updatedForm = [...form];
  updatedForm.splice(index, 1);
  setForm(updatedForm);
};
const handleFormInputChange = (index, event) => {
  const { name, value } = event.target;
  const updatedForm = [...form];
  updatedForm[index] = { ...updatedForm[index], [name]: value };
  setForm(updatedForm);
};

  const [Appointment, setAppointment] = useState({ ...appointment,reminderSettings: {
    email: true,
    sms: false
  },
  dateTime: getCurrentTimestamp(),
  createdAt: getCurrentTimestamp(),
  updatedAt:  getCurrentTimestamp(),
  type:"",
  requiredDocuments:"",
  status:""
}
);

//const [currentOption,setCurrentOption]=useState("");
const addOption=(i)=>{
  const currentOption=document.querySelector("#ConsularAppointmentDetail")?.value;
  console.log(currentOption);
  if(currentOption==='')return
 form[i]?.data?.push(currentOption);
 console.log(form[i]);
setForm([...form]);
}
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

useEffect(()=>{

},[currentForm]);
// useEffect(()=>{
//     console.log(form);
// },[form]);

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
  try{
    setIsSubmitting(true);
const AddOperation=await AddData(collection(db,"Appointment"),{...Appointment,appointmentId:"apt_"+Date.now(),forms:form});
  console.log(AddOperation)
  toast.success("Appointment saved successfully!");
  navigate("/Appointments");
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
        
      <div style={{marginTop:10}}>
  <label>{convertToTitleCase(i)}</label>  
        <FormControl fullWidth size="small">
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
      </div>
      </>
      );
    }
   if(typeof appointment[i]=='object' && !Array.isArray(appointment[i])){
    const newInputs=Appointment?.[i];
    const inputsList=[];
    for(let prop in newInputs){
      inputsList.push(<>
      
      <div style={{marginTop:10}}>
  <label>{convertToTitleCase(prop)}</label>  
        <MDBInput name={i} placeholder={`Enter ${convertToTitleCase(prop)}`} type={
          i==='dateOfBirth' ? 'date':i==='password' ? 'password':"text"} value={newInputs[prop]}
         onChange={(e)=>{
          const newValue={...Appointment?.[i],[prop]:e.target.value}
          setAppointment({...Appointment,[i]:newValue});
        }}/>
        </div>
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
      <div style={{marginTop:10}}>
  <label>{convertToTitleCase(i)}</label>  
  
        <MDBInput value={Appointment?.[i]} name={i} placeholder={`Enter ${convertToTitleCase(i)}`} type={
          i==='dateOfBirth' ? 'date':i==='password' ? 'password':"text"
        }  onChange={(e)=>handleTextChange(e,i)}/>
        </div>
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
      
  <div style={{marginTop:10}}>
  <label>Select Embassy</label>  
      <FormControl fullWidth size="small">
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={'Select Embassy'}
          value={selectedEmbassy?.name} // Use optional chaining to handle potential undefined values
          onChange={(event) => {
            const { value } = event.target;
            console.log(value);
        console.log(event.target);

            setAppointment({ ...Appointment, embassy_id: value || "" });
                    //    setSelectEmbassy()
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
      </div>
     

        {Inputs}
<br/>
<h4 style={{fontWeight:"bolder"}}>Add form</h4>

<div className='addForm'>
  <br/>
  <div style={{marginTop:10}}>
  <label>Select input type</label>  
  <FormControl fullWidth size="small">
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={'Select input type'}
          value={currentForm.type} // Use optional chaining to handle potential undefined values
          onChange={(event) => {
            const { value } = event.target;
            setCurrentForm({ ...currentForm, type: value || "text" });
          }}
        >
          
        {["text","number","email","tel:"].map((type,index) => (
              <MenuItem name={type} value={type} key={index}>
                {type}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      </div>


<div style={{marginTop:10}}>
  <label>Enter  input</label>
<MDBInput  placeholder="name" value={currentForm.name} onChange={(e)=>{
            setCurrentForm({ ...currentForm, name:e.target.value});
}}/>
</div>
  <br/>
  <MDBBtn size="lg" style={{margin:"0 auto",borderRadius:"30px"}} onClick={()=>{
    if(currentForm.name===""){
      return toast.error("Please enter input name")

    }
    if(currentForm.type===""){
      return toast.error("Please select input type")
    }
    addInput();
  }}>Add</MDBBtn>
</div>
<br/>

<div className='addForm'>
  <br/>
  {form.length===0 && <>
  <div className='text-center'>
<small>No Form Added</small>
  </div>
  </>}
  {form.map((input, index) =>{
if(input?.data){
  return (<><br/><br/>
  <label>Consular Appointment detail (options):</label>
  <div key={index} style={{gap:5,marginTop:5}}>

  
  {input?.data?.map((text,textIndex)=>{ 
    return(<div className='listItem' key={textIndex+""+Date.now()} noBorders color='light' className='px-3 mb-2 rounded-3' style={{margin:"0 auto",width:"100%"}}>
        <div className='d-flex align-items-center justify-content-between'  style={{width:"100%"}}><span style={{padding:10}}>{text}</span>
         <MDBBtn rounded color='primary' onClick={()=>{
              console.log(text,textIndex);
form?.[index]?.data.splice(textIndex,1);
console.log(form);
setForm([...form]);
         }}>x</MDBBtn></div>
      </div>)})}


  </div>
  </>)
}


    return (<>
                <div key={index} className='d-flex'style={{gap:5,marginTop:5}}>
                    <MDBInput
                        type={input.type}
                        name={`input-${index}`}
                        label={input.name}
                        value={input.value}
                        onChange={(e) => handleFormInputChange(index, e)}
                    />
                    <MDBBtn onClick={() => removeInput(index)} style={{fontSize:"smaller"}}>Remove</MDBBtn>
                </div></>
            )
          })
        }  
</div>







<div key={"Date"+Date.now()} className='d-flex'style={{gap:5,marginTop:5}}>
                    <MDBInput
                        id='ConsularAppointmentDetail'
                        name={`Consular Appointment detail (options)`}
                        label={"Add Consular Appointment detail"}
                        onChange={(e) =>{
                          const {value}=e.target;
                          console.log(value)
                        }}
                    />
                    <MDBBtn  onClick={() =>{
                      form.map((e,index)=>{
                       if(e.type==='select')addOption(index);
                      });
                    }} style={{fontSize:"smaller"}}>Add</MDBBtn>
                </div>
<br/>
<MDBBtn size="lg" style={{width:"100%",borderRadius:30}} onClick={
  ()=>submit()
}>{isSubmitting ? <PulseLoader color='white'/>:"Submit"}</MDBBtn>
      </div>
    </>
  );
}

export default AddAppointment;
