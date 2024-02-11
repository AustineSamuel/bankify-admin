import React, { useEffect, useState } from 'react';
import {MDBBadge} from 'mdb-react-ui-kit';
import FadeInShade from './animations/fadeIn.tsx';
import {Skeleton} from "@mui/material";
import { docQr } from '../Logics/docQr';
export default function RecentActivities() {
const [isLoading,setIsLoading]=useState(true);
const [RecentActivities,setRecentActivities]=useState([]);
const getRecentActivities=async ()=>{
    setIsLoading(false);
    try{
const recentActivities=await docQr("RecentActivities",{
    max:100,
    whereClauses:[
        {
            name:"title",
            operator:"!=",
            value:""
        }
    ]
})
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
        <div>
            <h4>Recent Users Activities</h4>
            <div className="Activities_container">
                {!isLoading ? RecentActivities.map((e,i)=>(<div className='Activities_card'><FadeInShade> <div key={i} className="d-flex align-items-center">
                    <img style={{width:60,height:60}} src="/images/drop.avif" className="card-img-top" alt="Transaction" />

                    <div>
                        <b>Face Verification</b><br/>
                        <span>Face verification completed successfully</span>
                     <br/>   <MDBBadge pill className='me-2 text-dark' color='light' light>
        23 hours ago
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
    );
}
