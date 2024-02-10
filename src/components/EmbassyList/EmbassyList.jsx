import React,{useState,useEffect} from 'react'
import EmbassyCard from './EmbassyCard';
import { docQr } from '../../Logics/docQr';

const EmbassyList=()=>{
    const [isLoading,setIsLoading]=useState(true);
    const [Embassy,setEmbassy]=useState([]);

    useEffect(()=>{
const getEmbassy=async ()=>{
const embassy=await docQr("Embassy",{
    max:800,
    whereClauses:[
        {
            field:"name",
            operator:"!=",
            value:""
        }
    ]
})
console.log(embassy);
setEmbassy(embassy);
}
getEmbassy();
    },[])
    return <>
    <div style={{maxHeight:"95vh",overflowX:"hidden",overflowY:"auto",display:"flex",flexFlow:"row wrap"}}>
{/* //<EmbassyCard/> */}
{Embassy.map((e)=><EmbassyCard embassy={e}/>)}
    </div>

    </>
}

export default EmbassyList;
