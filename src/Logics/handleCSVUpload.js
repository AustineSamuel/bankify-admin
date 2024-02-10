import Papa from 'papaparse';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { formatDate_Name, getCurrentTimestamp } from './DateFunc';


export default function handleCSVUpload(e,setIsUploadingCSV,AddRecordLogic,index) {
  const file = e.target.files[0];
//on loader.

function validateData(data){
  const filteredData=[];
for (let i = 0; i < data.length; i++) {
  const itemData = data[i];
  if(!itemData.staffID){
    toast.warning("System will not upload  record without staffID on selected csv file ")
    continue
  }

  if(!itemData.username){
    toast.warning("one record without username on csv file is removed")
    continue
  }

  if(!itemData.Description)itemData.Description=""
  filteredData.push({
    username: '',
    Date: getCurrentTimestamp(),
    RecordDate: formatDate_Name(),

    Deduction: 0,
    prevDeduction: 0,
    currentDeduction: 0,

    Savings: 0,
    prevSavings: 0,
    currentSavings: 0,

    ElectronicsLand: 0,
    prevElectronicsLand: 0,
    currentElectronicsLand: 0,

    Loan: 0,
    prevLoan: 0,
    currentLoan: 0,

    OD: 0,
    prevOD: 0,
    currentOD: 0,

    registrationFee: 0,
    otherFees: 0,

    Welfare: 0,
    Shares: 0,

    staffID: '',
    comment: 'no comment',
    Description: '',
    isDeleted: false,
    deleted_at: 'none',

    index: 0,
    ...itemData
  });
}
return filteredData;
}

async function uploadToDataServer(data) {
  console.log(data);
  setIsUploadingCSV(true);
  const uploadPromises = data.map(async (myData) => {
//upload csv data logics 
await AddRecordLogic({ ...myData })
})//end map promises

  

  try {
    const results = await Promise.all(uploadPromises);
    setIsUploadingCSV(false);
    toast.success("CSV file uploaded successfully");
    return results;
  } catch (error) {
    toast.error('Error uploading to data server:' + error);
    setIsUploadingCSV(false);
console.log(index);
  }
}


  if (file) {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        // `result.data` contains the parsed CSV data in JSON format
        const data=validateData(result.data);
        if(data)uploadToDataServer(data);
        // You can handle the parsed data as needed
      },
      error: (error) => {
        toast.error('Error parsing CSV:', error.message);
        // Handle the error
      },
    });
  } else {
    console.error('No file selected');
    // Handle the case where no file is selected
  }
}
