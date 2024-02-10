import React, { useEffect, useState } from 'react'
import "./style.css";
import UserList from './usersList';
import { docQr } from '../../Logics/docQr';
import {Toaster} from 'react-hot-toast';
import UserItemSkeleton from './userSkelton';
const VerifiedUsers=()=>{
    const [users, setUsers] = useState([]); // Populate users array with data from API or elsewhere
const [isLoading,setIsLoading]=useState(false);
    const handleSuspend = (user) => {
      // Implement suspend logic
      console.log('Suspend user:', user);
    };
  
    const handleDelete = (user) => {
      // Implement delete logic
      
    };
    const onShowProfile=(user)=>{
     console.log("show user",user)   
    }
    async function getUsers(){
        setIsLoading(true);
const users=await docQr("Users",{
    max:800,
    whereClauses:[{
    field:"username",
    operator:"!=",
    value:""
    }
    ]
})
console.log(users);
setUsers(users);
setIsLoading(false);
    }

  useEffect(()=>{
    getUsers();
  },[]);

    return (
        <div className='containerCtn'>
            <Toaster/>
            <br/>
        <h4 style={{padding:7,fontWeight:"bolder"}}>User List</h4>


      <div className="container">
       {!isLoading ? <UserList users={users} onSuspend={handleSuspend} getUsers={getUsers} onDelete={handleDelete} onShowProfile={onShowProfile} />:<>
       
       {[1,2,3,4,5].map(()=><UserItemSkeleton/>)
       
       }
       </>}
     

      </div>
      </div>
    );
}

export default VerifiedUsers