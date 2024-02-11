import React,{useState,useEffect} from 'react'
import EmbassyCard from './EmbassyCard';
import { docQr } from '../../Logics/docQr';
import EmbassyCardSkeleton from './EmbassyCardSkeleton';

const EmbassyList=()=>{
    const [isLoading,setIsLoading]=useState(true);
    const [Embassy,setEmbassy]=useState([]);

    useEffect(()=>{
const getEmbassy=async ()=>{
    setIsLoading(true)
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
setIsLoading(false);
setEmbassy(embassy);
}
getEmbassy();
    },[])
    return <>
    <div style={{maxHeight:"95vh",overflowX:"hidden",overflowY:"auto",display:"flex",flexFlow:"row wrap"}} className='embassyListContainer'>
{/* //<EmbassyCard/> */}
{isLoading ?[1,2,3].map(()=>(
<EmbassyCardSkeleton/>
)):Embassy.map((e)=><EmbassyCard embassy={e}/>)}
{!isLoading && Embassy.length===0 && <div className="flexCenter" style={{padding:20}}>
          <div className='text-center'>
            <img src='/images/noData.png' alt=""/><br/>
            <b>No Data Found</b>
          </div>
          </div>}
          
    </div>

    </>
}

export default EmbassyList;
