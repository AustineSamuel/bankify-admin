import { MDBBtn,MDBInput} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { docQr } from '../../Logics/docQr';
import {Toaster} from 'react-hot-toast';
import { Plus, Search } from 'react-feather';
import { AddData } from '../../Logics/addData';
import { collection } from 'firebase/firestore';
import { getCurrentDateTime } from '../../Logics/date';
import {db} from '../../firebase.config';
import {ClipLoader} from 'react-spinners';
import {toast} from 'react-hot-toast';
import { deleteData } from '../../Logics/deleteData';
const AddCountry=()=>{
    const [countries,setCountries]=useState([]);
    const [countriesId,setCountriesId]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
const init=async ()=>{
    setIsLoading(true);
      const data=  await docQr("Countries",{
        max:801,
        whereClauses:[
            {
                field:"name",
                operator:"!=",
                value:""
            }
        ]
      });
        console.log("doc",data);
    setCountries(data.map((e)=>e.name))
    setCountriesId(data)
    setIsLoading(false);
}
useEffect(()=>{
init();
},[])
const [currentValue,setCurrentValue]=useState("");
const onChange=(e)=>{
    const {value} = e.target;
    setCurrentValue(value);
}

const [isAddingCountry,setIsAddingCountry]=useState(false);
const addCountry=async ()=>{
    if(currentValue.length < 1)return
    setIsAddingCountry(true);
   const add=await AddData(collection(db,"Countries"),{name:currentValue,added_at:getCurrentDateTime()});
   toast.success("Country added successfully");
   setIsAddingCountry(false);
init();
   setCurrentValue("")
   console.log(add);
}

const deleteCountry=async (index)=>{
    console.log(index,countriesId[index]);
    const loadingToastId = toast.loading('Deleting...');
await deleteData("Countries",countriesId[index].docId);
toast.dismiss(loadingToastId);
countries.splice(index,1);
countriesId.splice(index,1);
setCountriesId([...countriesId]);

setCountries([...countries]);
}
    return (
        <>
        
    <Toaster/>
      <div className='editProfile'>

<div>

<div style={{padding:20}}>
        <div className='searchContainer d-flex align-items-center'>
<MDBInput label='Enter New Country ' placeholder='Enter Country name' value={currentValue} onChange={onChange} type='search'/>
<MDBBtn rounded size='sm' style={{marginLeft:5}}>{isAddingCountry  ?  <ClipLoader size={15}/>:<Plus onClick={()=>addCountry()}/>}</MDBBtn>
            </div></div>

</div>
<br/>
{isLoading && <div className='d-flex justify-content-center' style={{width:"100%"}}><ClipLoader/></div>}
  {countries?.map((text,textIndex)=>{ 
    return(<div className='listItem' key={textIndex+""+Date.now()}  color='light' style={{margin:"0 auto",width:"100%",borderRadius:10,marginTop:5}}>
        <div className='d-flex align-items-center justify-content-between'  style={{width:"100%"}}><span style={{padding:10}}>{text}</span>
         <MDBBtn rounded color='primary' onClick={()=>{
              deleteCountry(textIndex);
         }}>x</MDBBtn></div>
      </div>)})}
      </div>
        </>
    )
}

export default AddCountry;