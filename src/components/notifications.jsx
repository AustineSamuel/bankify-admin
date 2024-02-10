import {useEffect, useState } from 'react';
import { MDBBtn,MDBInput} from 'mdb-react-ui-kit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getAllDoc } from '../Logics/getAllDoc';

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

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
  
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];





export default function Notifications() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [age, setAge] =useState('');
   const [users,setUsers]=useState([]);
    const handleUserSelection = (event) => {
       /// setSelectedUsers(Array.from(event.target.selectedOptions, (option) => option.value));
    };


    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };


    const handleSendNotification = () => {
        // Logic to send notification to selected users
        console.log("Notification sent to:", selectedUsers);
    };

    const getUsers=async ()=>{
        const user=await getAllDoc("Users");
        setUsers(user);
    }
    useEffect(()=>{
getUsers();
    },[])






    return (
        <div style={{ width: "100%", margin: "0 auto" }}>
            <h3>Send notification</h3><br />
            <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
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
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
            <br />
            <MDBInput placeholder='Enter title' label='Title' style={{
                width:"100%",
                margin:10
            }}/>

<MDBInput label='Body' rows={4}/>

            <br/>
            <MDBBtn onClick={handleSendNotification}>Send Notification</MDBBtn>
        </div>
    );
}
