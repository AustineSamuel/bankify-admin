import 'react-credit-cards-2/dist/es/styles-compiled.css';
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import "./style.css";
import {MDBInput,MDBBtn} from 'mdb-react-ui-kit';
import {PulseLoader} from 'react-spinners';
import {toast,Toaster} from 'react-hot-toast';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
import { getRandomNumber } from '../../utils/funcs';

const PaymentForm = () => {
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };
        const [openAlert,setOpenAlert]=useState(false);
            const [isLoading,setIsLoading]=useState(false);


            const validateCreditCard = (number, name, expiry, cvc) => {
                // Check if any field is empty
                console.log(number,name,expiry,cvc)
                if (!number || !name || !expiry || !cvc) {
                  toast.error('All fields are required');
                  return false;
                }
              
                // Validate card number (check if it's a number with 16 digits)
                if (!/^\d{16}$/.test(number)) {
                  toast.error('Invalid card number');
                  return false;
                }
              
                // Validate expiry (check if it's in MM/YY format)
                if (expiry.length < 4) {
                  toast.error('Invalid expiry date');
                  console.log(expiry.length);
                  return false;
                }
              
                // Validate CVC (check if it's a number with 3 digits)
                if (!/^\d{3}$/.test(cvc)) {
                  toast.error('Invalid CVC');
                  return false;
                }
              
                return true; // All fields are valid
              };



const submitCard=()=>{
    if(!validateCreditCard(number, name, expiry, cvc))return;

    setIsLoading(true);
    setTimeout(()=>{
setIsLoading(false);
setOpenAlert(true);
    },getRandomNumber(1000,5000))
}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'cvc':
        setCvc(value);
        break;
      case 'expiry':
        setExpiry(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MDBModal open={openAlert} setOpen={setOpenAlert} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Payment</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>setOpenAlert(!openAlert)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <div style={{textAlign:"center"}}>
  <img src='/images/cardDeclined.jpg' alt='' />
  <br/>
  <h5 style={{ textAlign: 'center', marginTop: '10px' }}>Card Declined</h5>
  <p style={{ textAlign: 'center', marginTop: '10px' }}>Your card payment was declined.
   Please check your card details or contact <a href='mailto:surpport@Immintegral.com'>surpport@Immintegral.com</a> for quick support.</p>
   </div>

</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>setOpenAlert(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
<Toaster/>
<div className='paymentContainer'>
     <div id="PaymentForm">
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
        />
        
        <div className='inputHolder'>
         
          <MDBInput
            type="tel"
            name="number"
            label="Card Number"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />


<MDBInput
            type="text"
            name="name"
            label="Cardholder Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            style={{marginTop:5}}
          />
          
<div className='d-flex justify-content-between' style={{marginTop:5,gap:5}}>
          <MDBInput
            type="number"
            name="expiry"
            label="Expiry Date"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />

<MDBInput
            type="number"
            name="cvc"
            label="CVC Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          </div>

          <MDBBtn size='large' onClick={()=>{
            submitCard();
          }} style={{width:"100%",marginTop:5,borderRadius:"30px"}} fullWidth>
            {isLoading ? <PulseLoader color="white"/>: "Process Request"}</MDBBtn>
        </div> 
      </div>
      </div>
    </>
  );
};

export default PaymentForm;
