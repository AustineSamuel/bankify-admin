import {storage } from '../firebase.config';
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadToFirebase = async (file:any) => {
    
  try {
    const storageRef = ref(storage, `profiles/${file.name}`);
    
    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error:any) {
    console.error('Error uploading to Firebase:', error.message);
    throw error;
  }
};


export default uploadToFirebase
