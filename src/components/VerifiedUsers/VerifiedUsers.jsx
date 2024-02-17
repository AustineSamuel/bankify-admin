import React, { useEffect, useState } from 'react'
import "./style.css";
import UserList from './usersList';
import { docQr } from '../../Logics/docQr';
import {Toaster} from 'react-hot-toast';
import UserItemSkeleton from './userSkelton';
import SearchUsers from './searchUsers';
const VerifiedUsers=()=>{
    const [users, setUsers] = useState([]); // Populate users array with data from API or elsewhere
const [isLoading,setIsLoading]=useState(false);
    const [usersList,setUsersList]=useState([])
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
setUsersList(users);
setIsLoading(false);
    }

    const onChange=(e)=>{
        const {value}=e.target;
        const newUsers=usersList.filter((e)=>{
          return  e.username.toLowerCase().includes(value.toLowerCase());
        })
        setUsers(newUsers);
    }
  
  useEffect(()=>{
    getUsers();
  },[]);
useEffect(()=>{
},[users]);
    return (
        <div className='containerCtn'>
            <Toaster/>
            <br/>
        <b style={{padding:17,fontWeight:"bolder"}}>User List</b>

<SearchUsers onChange={onChange} users={users} setUsers={setUsers}/>

      <div className="container">
       {!isLoading ? <>
       <UserList users={users} onSuspend={handleSuspend} getUsers={getUsers} onDelete={handleDelete} onShowProfile={onShowProfile} />
       {users.length <=0 && <div className='text-center'><img src='/images/noData.png'/><br/><span><b>NO DATA FOUND</b></span></div>}
       </>:<>
       
       {[1,2,3,4,5].map(()=><UserItemSkeleton/>)
       
       }
       </>}
     

      </div>
      </div>
    );
}

export default VerifiedUsers