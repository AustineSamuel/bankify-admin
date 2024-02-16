import React, { useEffect, useState } from 'react';
import {MDBBadge} from 'mdb-react-ui-kit';
import FadeInShade from './animations/fadeIn.tsx';
import {Skeleton} from "@mui/material";
import { docQr } from '../Logics/docQr';
import useUserDetails from '../Hooks/userUserDetails.js';
import { getTimeAgoString } from '../Logics/date';
export default function RecentActivities() {
const [isLoading,setIsLoading]=useState(true);
const {user}=useUserDetails();
//console.log(user.uid);
const [RecentActivities,setRecentActivities]=useState([]);
const getRecentActivities=async ()=>{
    setIsLoading(true);
    try{
const recentActivities=await docQr("Activities",{
    max:100,
    whereClauses:[
        {
            field:"userId",
            operator:"!=",
            value:''
        }
    ]
})
console.log(recentActivities);
setRecentActivities(recentActivities);
setIsLoading(false);
    }
    catch(err){
        console.log(err);
        
    }

}

useEffect(()=>{
getRecentActivities();
},[])

    return (
        <div style={{maxWidth:"100%",overflow:"hidden"}}>
        <div style={{ maxHeight: "100vh",width:"110%", overflowY: "auto", overflowX: "hidden" }}>
    <h4>Recent Activities</h4>
            <div className="Activities_container">
                {!isLoading ? RecentActivities.map((e,i)=>(<div  key={i} className='Activities_card'><FadeInShade> <div key={i} className="d-flex align-items-center">
                    <img style={{width:60,height:60}} src="/images/drop.avif" className="card-img-top" alt="Transaction" />

                    <div>
                        <b>{e.title}</b><br/>
                        <span>{e.text}</span>
                     <br/>   <MDBBadge pill className='me-2 text-dark' color='light' light>
       {getTimeAgoString(e.added_at)}
      </MDBBadge>
                    </div>
                </div></FadeInShade></div>)):[1, 2, 3, 4, 5].map((e, i) => (
        <div className='Activities_card d-flex align-items-center justify-content-start' key={i}>
          <Skeleton variant="rect" width={60} height={60} />
          <div>
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="text" width={200} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </div>
        </div>
      ))
                }
               {!isLoading && RecentActivities.length===0 && <div className='text-center' style={{padding:20}}>
               <br/><br/>
<img src='/images/noData.png' style={{width:150,height:150,borderRadius:16}} alt=''/>
<h4 style={{marginTop:3}}><b>No Data Found</b></h4>
<br/><br/>
                </div>
                }
            </div>
        </div>
        </div>

    );
}
