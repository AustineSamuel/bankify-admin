import React, { useEffect, useState} from 'react';
import "../Appointments/style.css";
import { MDBInput,MDBBtn,MDBTextArea,MDBAccordion, MDBAccordionItem,MDBCard } from 'mdb-react-ui-kit';
import { Camera, Trash2 } from 'react-feather';
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
import { updateData } from '../../Logics/updateData';
import { getAllDoc } from '../../Logics/getAllDoc';



const EditFaq = () => {
  const navigate=useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [docId,setDocId]=useState("");
const [faqs,setFaqs]=useState([]);
const [currentFaqs,setCurrentFaqs]=useState({
    "question":"",
    "answer":""
});
const getSavedFaqs=async ()=>{
const data=await docQr("Faqs",{
    max:1,
    whereClauses:[
        {
            field:"0",
            operator:"!=",
            value:""
        }
    ]
});
if(data.length > 0){
setDocId(data[0].docId);
    const dataEl=data[0];
delete dataEl.docId;
setFaqs(Object.values(dataEl));
}
console.log(data);
}
useEffect(()=>{
getSavedFaqs();
},[])
useEffect(()=>{
    console.log(faqs);
},[docId,faqs]);

const add=()=>{
console.log(currentFaqs)
if(currentFaqs && currentFaqs?.question && currentFaqs?.question?.length < 4){
toast.error("Question is too short");
return 
}
if(currentFaqs && currentFaqs.answer &&  currentFaqs?.answer?.length < 2){
    toast.error("Answer is too short");
    return 
}
faqs.push(currentFaqs);
setCurrentFaqs({
    "question":"",
    "answer":""
})
}
const submit=async () =>{
    if(faqs.length <=0){
        return toast.error("Please one or more questions");
    }
setIsSubmitting(true);
console.log(docId);
if(docId){
await updateData("Faqs",docId,faqs);
}
else{
await AddData(collection(db,"Faqs"),faqs);
}
setIsSubmitting(false);
toast.success("Operation successful!");
}
  return (
    <>
    <Toaster/>
      <div className='editProfile'><br/>
<h4 style={{fontWeight:"bolder"}}>Add Faq</h4><br/>
<div><label>Faq : Question?</label>
<MDBInput value={currentFaqs.question} placeholder="Enter faq question" onChange={(e)=>{
const {value}=e.target;
setCurrentFaqs({...currentFaqs,question:value})
}}/>
</div>
<br/>
<div><label>Faq: Answer:</label>
<MDBTextArea value={currentFaqs.answer} onChange={(e)=>{
const {value}=e.target;
setCurrentFaqs({...currentFaqs,answer:value})
}} placeholder='Enter faq answer'/>
</div>
<br/>
<MDBBtn color='dark' rounded size='lg' onClick={add}>Add</MDBBtn>


<br/>

<br/>
<MDBCard>
<MDBAccordion>

    {faqs.map((e,i)=>(<MDBAccordionItem style={{padding:6}}  collapseId={'id'+i} headerTitle={<>{e.question}
    <span style={{padding:10}}>        <MDBBtn onClick={()=>{
            faqs.splice(i,1);
            setFaqs([...faqs]);
            console.log(faqs);
        }} rounded color='secondary' size='sm'><Trash2 /></MDBBtn></span>


    </>}> 

        {e.answer}
    </MDBAccordionItem>))
    }


</MDBAccordion>

    </MDBCard>


<br/>
<MDBBtn size="lg" style={{width:"100%",borderRadius:30}} onClick={
  ()=>submit()
}>{isSubmitting ? <PulseLoader color='white'/>:"Update"}</MDBBtn>
      </div>
    </>
  );
}

export default EditFaq;
