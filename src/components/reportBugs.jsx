import React, { useState} from 'react';
import { MDBInput,MDBBtn } from 'mdb-react-ui-kit';
import {toast,Toaster} from 'react-hot-toast';
import { AddData} from '../Logics/addData';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { collection } from 'firebase/firestore';
import {db} from '../firebase.config'
import { getCurrentTimestamp } from '../Logics/DateFunc';
import { generateUniqueString } from '../Logics/date';
import {PulseLoader} from 'react-spinners';
import {Alert} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
  } from 'mdb-react-ui-kit';


const ReportBug = () => {

  const bug = {
    priority: [
        "Low",
        "Medium",
        "High",
        "Critical"
    ],
    title:"",
    message: ""
  }

  const [isSubmitting, setIsSubmitting] = useState(null);
  const [bugDetails, setNewUserDetails] = useState({ ...bug,submittedAt:getCurrentTimestamp()});
const navigate=useNavigate();
const handleTextChange=(e,name)=>{
  const {value}=e.target
  setNewUserDetails({...bugDetails,[name]:value})
}
const validateData = () => {
    return true;
};

const submit=async ()=>{
  console.log(bugDetails);
if(!validateData())return;
try{
  setIsSubmitting(true);
  await AddData(collection(db,"BugReports"),{...bugDetails,added_at:getCurrentTimestamp(),uid:"id_"+""+Date.now()+""+generateUniqueString()}) 
  setModel(true);
setIsSubmitting(false);
}
catch(err){
  toast.error(err.message || "Something went wrong");
}
}
const [openModel,setModel]=useState(false);
 // console.log(bugDetails)
  let Inputs = []; // Initialize as an empty array
//useEffect(()=>{
  for (let i in bug) {
    if(typeof bug[i]=='object' && !Array.isArray(bug[i]))continue;

    if(Array.isArray(bug[i])){
      const list= bug[i];
      if(!list)continue;
      Inputs.push(
        <>
        <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{i}</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={i}
          value={bugDetails?.[i] || ""} // Use optional chaining to handle potential undefined values
          onChange={(event) => {
            const { value } = event.target;
            console.log(i, value);
            setNewUserDetails({ ...bugDetails, [i]: value || "" });
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
    else{
          Inputs.push(
      <>
        <MDBInput label={i} name={i} placeholder={`Enter ${i}`} type={
          i==='dateOfBirth' ? 'date':i==='password' ? 'password':"text"
        }  onChange={(e)=>handleTextChange(e,i)}/>
        <br />

      </>
    );
      }
  }
//},[]);

  <MDBInput className='' />
  return (
    <>


<MDBModal open={openModel} setOpen={setModel} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Notifications</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>setModel(!openModel)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

                <div>
<div className='text-center'>
<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVlDjyF2tFSI579iSk-QQ2SdPl_I-AdY90CTlQcdLgH3UFwQ4cC0mTS6_CINX2J33qNpQ&usqp=CAU' alt='' width={200} height={200}/>
<h4><b>Bug reported successfully</b></h4>
<p>Thank you for helping us improve.
    Please be assured that our team will address the issue promptly.
    Your cooperation is greatly appreciated.</p>
</div>
                </div>


</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>setModel(false)}>
                Close
              </MDBBtn>
              <MDBBtn color='primary' onClick={()=>navigate('/')}>
                GO to app
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


    <Toaster/>
      <div className='editProfile'>
      <div className='text-center'>
<img src='/images/bug.jpg' alt='' width={200} height={200}/>
<h4><b>Report Bug</b></h4>
<Alert severity="info">
      We greatly appreciate your report for a bug. Thank you for your cooperation.
    </Alert>
      </div>
      
      <br/>
        {Inputs}
<br/>

<MDBBtn style={{width:"100%"}} onClick={
  ()=>submit()
}>{isSubmitting ? <PulseLoader color='white'/>:"Submit"}</MDBBtn>
      </div>
    </>
  );
}

export default ReportBug;
