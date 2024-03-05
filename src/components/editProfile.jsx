import React, { useEffect, useState } from 'react';
import "./style.css";
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Camera } from 'react-feather';
import { BounceLoader, PulseLoader } from 'react-spinners';
import uploadToFirebase from '../utils/uploadToFirebase';
import { toast, Toaster } from 'react-hot-toast';
import { AddData } from '../Logics/addData';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { collection } from 'firebase/firestore';
import { db } from '../firebase.config'
import { getCurrentTimestamp, validateData,convertCamelCaseToSpaced } from '../Logics/DateFunc';
import { docQr } from '../Logics/docQr_ORGate';
import { generateUniqueString } from '../Logics/date';
import useUserDetails from '../Hooks/userUserDetails';
import { updateData } from '../Logics/updateData';
import { fileToDataURL } from '../utils/funcs';

const EditProfile = () => {
  const editUser=window.sessionStorage.getItem("editUser");
  if(!editUser)window.location.href='/VerifiedUsers';
  let user = JSON.parse(editUser);
  console.log(user);
  user = { ...user, gender: ["Male", "Female"]}
  const userCopy = { ...user }
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(null);

  delete user.added_at
  delete user.docId
  delete user.uid
  delete user.permission
  delete user.profilePicture
  delete user.status
  delete user.verified

let userProp={...user};
delete userProp.biometricData;
  const [newUserDetails, setNewUserDetails] = useState({...userProp, 
  gender: ["Male", "Female"],
  maritalStatus: ['Married', 'Single', 'Divorced', 'Widowed', 'Separated', 'In a relationship', 'Engaged', 'Domestic partnership']
 });

  const [isUploading, setIsUploading] = useState(false);
  const handleImageChange = async (e) => {
    setIsUploading(true)
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    setIsUploading(false);
    setNewUserDetails({ ...newUserDetails, profilePicture: file });
  };
  const handleTextChange = (e, name) => {
    const { value } = e.target
    setNewUserDetails({ ...newUserDetails, [name]: value })
  }
  const submit = async () => {
    console.log(newUserDetails);
    const onError = (err) => {
      toast.error(err);
    }
    if (!validateData({ ...newUserDetails, profilePicture: "setted as value" }, onError)) return;
    try {
      setIsSubmitting(true);
      //console.log("file",newUserDetails.biometricData.passport)
      
      const fetch_existingUser = await docQr("Users",{max:1,
        whereClauses:[{
          field:"uid",
          operator:"==",
          value:userCopy.docId
        }]
      });
let existingUser;
console.log(existingUser);
if(fetch_existingUser.length > 0){
  existingUser=fetch_existingUser[0];
}
else{
  existingUser=fetch_existingUser[0];
}
      console.log(existingUser);
      let serverURL;
      const file=newUserDetails.profilePicture;
    if(newUserDetails.profilePicture){
      serverURL = await uploadToFirebase(newUserDetails.profilePicture);
    }
    else{
      serverURL='/images/user.png';
    }
    
    newUserDetails.profilePicture = serverURL;
    console.log("login...",file);
fileToDataURL(file,async function(serverURL){
      newUserDetails.profilePicture = serverURL;
      const biometricData=existingUser?.biometricData? {
        ...existingUser.biometricData,
        passport:serverURL
      }:{
          passport:serverURL
      }
      console.log(biometricData);
      const updateUser = await updateData("Users", userCopy.docId, {...existingUser, ...newUserDetails,biometricData })
    console.log(updateUser);
//add activity
/**
 * <div>
                        <b>Face Verification</b><br/>
                        <span>Face verification completed successfully</span>
                     <br/>   <MDBBadge pill className='me-2 text-dark' color='light' light>
        23 hours ago
//  */
//         const addActivities = await AddData(collection(db, "Activities"), {
//           title:userCopy.username+" profile was updated",
//           text: "Profile was updated by admin successfully.",
//           added_at: getCurrentTimestamp(),
//           username:userCopy?.username,
//           userId:userCopy.uid
//       })
      toast.success(userCopy.username+" profile was updated")
      setTimeout(() => {
        navigate("/VerifiedUsers");
      }, 100);
      // console.log(newUserDetails);
    })
  }
    catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
      navigate("/VerifiedUsers");

    }
  }

  // console.log(newUserDetails)
  let Inputs = []; // Initialize as an empty array
  //useEffect(()=>{
  // user.maritalStatus=['Married', 'Single', 'Divorced', 'Widowed', 'Separated', 'In a relationship', 'Engaged', 'Domestic partnership']
  //   user.LanguageProficiency="";
  //   user.NextOfKing=""
  //   user.IdNumber=""
  //   user.Nationality=""
  //   user.maritalStatus=['Married', 'Single', 'Divorced', 'Widowed', 'Separated', 'In a relationship', 'Engaged', 'Domestic partnership'];
  //   user.LanguageProficiency=''
   
  for (let i in user) {
    if (typeof user[i] == 'object' && !Array.isArray(user[i])) continue;

    if (Array.isArray(user[i])) {
      const list = user[i];
      if (!list) continue;
      Inputs.push(
        <>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">{convertCamelCaseToSpaced(i)}</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={convertCamelCaseToSpaced(i)}
              defaultValue={editUser?.[i]}
              value={newUserDetails?.[i] || ""} // Use optional chaining to handle potential undefined values
              onChange={(event) => {
                const { value } = event.target;
              //  console.log(i, value);
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
          <br /><br />
        </>
      );
    }
    else {
      Inputs.push(
        <>
          <MDBInput label={convertCamelCaseToSpaced(i)} name={i} placeholder={`Enter ${convertCamelCaseToSpaced(i)}`} type={
            i === 'dateOfBirth' ? 'date' : i === 'password' ? 'password' : "text"}
            defaultValue={user[i]}
            onChange={(e) => handleTextChange(e, i)} />
          <br />
        </>
      );
    }
  }
  //},[]);

  <MDBInput className='' />
  return (
    <>
      <Toaster />
      <div className='editProfile'>
        <div className='profilePicture' style={{ backgroundImage: `url(${selectedImage || (userCopy.biometricData.passport  || '/images/user.png')})` }}>
          <input type="file" id='imageUpload' accept="image/*" onChange={handleImageChange} hidden />
          <div style={{ width: 32, height: 32 }}><label htmlFor="imageUpload">{isUploading ? <BounceLoader color='var(--color)' size={18} /> : <Camera />}</label></div>
        </div>
        <br />
        {Inputs}
        <br />
        <MDBBtn style={{ width: "100%" }} onClick={
          () => submit()
        }>{isSubmitting ? <PulseLoader color='white' /> : "Submit"}</MDBBtn>
      </div>
    </>
  );
}

export default EditProfile;
