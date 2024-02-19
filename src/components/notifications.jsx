import {useEffect, useState } from 'react';
import { MDBBtn,MDBInput} from 'mdb-react-ui-kit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {db} from '../firebase.config';
import {toast,Toaster} from 'react-hot-toast';

import { getAllDoc } from '../Logics/getAllDoc';

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { docQr } from '../Logics/docQr';
import { AddData } from '../Logics/addData';
import { collection } from 'firebase/firestore';
import { getCurrentTimestamp } from '../Logics/DateFunc';
import {ClipLoader} from 'react-spinners';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  

export default function Notifications() {
  const [notification,setNotification]=useState({
    title:"",
    body:"",
    sent_at:getCurrentTimestamp()
  })
    const [selectedUsers, setSelectedUsers] = useState([]);
    
   const [users,setUsers]=useState([]);
   const [isLoading,setIsLoading]=useState(false);
    const handleUserSelection = (event) => {
       /// setSelectedUsers(Array.from(event.target.selectedOptions, (option) => option.value));
    };


    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      const user=users.filter((user)=>user.username===value[0])[0];
      if(!user)return console.log("cannot find user",user);
      setSelectedUsers((prev)=>{
        return [...prev,{...user}]
      }
        );
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    
    const getUsers=async ()=>{
        const users=await docQr("Users",{
          max:800,
          whereClauses:[{
          field:"username",
          operator:"!=",
          value:""
          }
          ]
      })
          setUsers(users);
    }
    useEffect(()=>{
getUsers();
    },[])

const handleSendNotification =async () => {
// Logic to send notification to selected users        
setIsLoading(true);
await Promise.all(selectedUsers.map(async (user,index)=>{
await AddData(collection(db,"Notifications"), {...notification,uid:user.uid})
}))
setIsLoading(false);
toast.success("Notification sent successfully");
setNotification({
   title:"",
   body:""
})
};




    return (
        <div style={{ width: "100%", margin: "0 auto" }}>
          <Toaster/>
            <h3>Send notification</h3><br />
            <div>
              
  <label>Select users</label>
      <FormControl sx={{ width: '100%' }} size="small">
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {users.map((user) => (
            <MenuItem
              key={user.uid}
              value={user.username}
              style={getStyles(user.username, personName, theme)}
            >
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
            
<div style={{marginTop:10}}>
  <label>Title</label>
            <MDBInput placeholder='Enter title' style={{
                width:"100%",
            }} onChange={(e)=>{
              setNotification({
                ...notification,
                title:e.target.value
              })
            }}/>
            </div>
<div>
  <label>Body</label>
<MDBInput rows={4} onChange={(e)=>{
              setNotification({
                ...notification,
                body:e.target.value
              })
            }}/>
            </div>

            <br/>
            <MDBBtn style={{width:"100%"}} onClick={handleSendNotification}>{isLoading ? <ClipLoader size={18} color="white"/>:"Send Notification"}</MDBBtn>
        </div>
    );
}
