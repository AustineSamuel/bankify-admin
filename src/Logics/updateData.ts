import {arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";


export const updateData=async (updateCollection:string,doc_id:string,updateData={

})=>{
const washingtonRef = doc(db, updateCollection, doc_id);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef,{
    ...updateData
});
}

// export const deleteItemByIndex = async (collectionName:string, docId:string, index:number) => {
//     try {
//         const docRef = doc(db, collectionName, docId);
//         await updateDoc(docRef, {
//             index: arrayRemove()
//         // Get the current data of the document        return true; // Indicate success
//           }) 
//     } catch (error) {
//         console.error("Error removing item from array by index: ", error);
//         return false; // Indicate failure
//     }
// };
