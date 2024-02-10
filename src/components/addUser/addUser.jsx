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
import { getCurrentTimestamp } from '../../Logics/DateFunc';



const AddUser = () => {

  const user = {
    username: "",
    password: "",
    email: "",
    fullName: "",
    dateOfBirth: "",
    gender: ["Male","Female"],
    address: "",
    contactNumber: "",
    biometricData: {
      facialFeatures: "",
      fingerprints: "",
      passport:""
    },
    permissions: ["user"],
    additionalInformation: "",
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate=useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(null);


  const [newUserDetails, setNewUserDetails] = useState({ ...user,gender:"",permissions:"user"});
const [isUploading,setIsUploading]=useState(false);
  const handleImageChange = async (e) => {
    setIsUploading(true)
    const file = e.target.files[0];
    const url=URL.createObjectURL(file);
        setSelectedImage(url);
        setIsUploading(false);
    setNewUserDetails({...newUserDetails,biometricData:{...newUserDetails.biometricData,passport:file}});
  
  };
const handleTextChange=(e,name)=>{
  const {value}=e.target
  setNewUserDetails({...newUserDetails,[name]:value})
}
const validateData = () => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // Username should be at least 3 characters long and can contain letters, numbers, and underscores
  const passwordRegex = /^.{6,}$/; // Password should be at least 6 characters long

  if (!usernameRegex.test(newUserDetails.username)) {
    toast.error("Please enter a valid username (at least 3 characters long and can contain letters, numbers, and underscores)");
    return false;
  } else if (!passwordRegex.test(newUserDetails.password)) {
    toast.error("Password should be at least 6 characters long");
    return false;
  } else if (newUserDetails.profilePicture === "") {
    toast.error("Please select a valid user passport");
    return false;
  }
  else if (newUserDetails.biometricData.passport===""){
    toast.error("Please upload user passport (for face verification)")
  }
  return true; // Data is valid
};

const submit=async ()=>{
  console.log(newUserDetails);
if(!validateData())return;
  setIsSubmitting(true);
  const serverURL=await uploadToFirebase(newUserDetails.biometricData.passport);
  newUserDetails.biometricData.passport=serverURL;
  console.log(newUserDetails);

  const add=await AddData(collection(db,"Users"),{...newUserDetails,added_at:getCurrentTimestamp()})
  console.log(add);
  toast.success("User Added successfully")
  setTimeout(() => {
    navigate("/")
  },1000);
 // console.log(newUserDetails);
}
 // console.log(newUserDetails)
  let Inputs = []; // Initialize as an empty array
//useEffect(()=>{
  for (let i in user) {
    if(typeof user[i]=='object' && !Array.isArray(user[i]))continue;

    if(Array.isArray(user[i])){
      const list= user[i];
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
          value={newUserDetails?.[i] || ""} // Use optional chaining to handle potential undefined values
          onChange={(event) => {
            const { value } = event.target;
            console.log(i, value);
            setNewUserDetails({ ...newUserDetails, [i]: value || "" });
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
    <Toaster/>
      <div className='editProfile'>
        <div className='profilePicture' style={{ backgroundImage: `url(${selectedImage || '/images/user.png'})` }}>
          <input type="file" id='imageUpload' accept="image/*" onChange={handleImageChange} hidden />
          <div style={{width:32,height:32}}><label htmlFor="imageUpload">{isUploading ? <BounceLoader color='var(--color)' size={18}/>:<Camera />}</label></div>
        </div>
        <br />

        {Inputs}
<br/>
<MDBBtn style={{width:"100%"}} onClick={
  ()=>submit()
}>{isSubmitting ? <PulseLoader color='white'/>:"Submit"}</MDBBtn>
      </div>
    </>
  );
}

export default AddUser;
