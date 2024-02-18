import React, { useEffect, useState } from 'react'
import "./style.css";
import UserList from './usersList';
import { docQr } from '../../Logics/docQr';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Toaster } from 'react-hot-toast';
import UserItemSkeleton from './userSkelton';
import SearchUsers from './searchUsers';
const VerifiedUsers = () => {
  const [users, setUsers] = useState([]); // Populate users array with data from API or elsewhere
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([])
  const [list,setList]=useState([]);
  const handleSuspend = (user) => {
    // Implement suspend logic
    console.log('Suspend user:', user);
  };
let [copyUsers,setCopyUsers]=useState([]);
  const setListItem=(object_,list)=>{
    const new_list=list.map((e,i)=>{
if(e.name===object_.name){
e.isActive=true
}
else{
e.isActive=false;
}
return e;
    });
    console.log(new_list);
setList(new_list);
  }

  const handleDelete = (user) => {
    // Implement delete logic

  };
  const onShowProfile = (user) => {
    console.log("show user", user)
  }
  async function getUsers() {
    setIsLoading(true);
    const users = await docQr("Users", {
      max: 800,
      whereClauses: [{
        field: "username",
        operator: "!=",
        value: ""
      }
      ]
    })
    //console.log(users);
    const usersList=users;
    setUsers(users);
    setUsersList(users);
    setIsLoading(false);
    const menuList=[
      {
        name: "All",
        isActive: true,
        callBack: function () {
          //console.log(this.name)
          setUsers(usersList)
          setListItem(this,menuList);
          
        }
      },
  
      {
        name: "Verified Users",
        isActive: false,
        callBack: function () {
          console.log(this.name);
          const users = usersList.filter((e, i) => {
            return e?.verified
          })
          setCopyUsers(users);
          setUsers(users);
          setListItem(this,menuList);
          
        }
      },
      {
        name: "UnVerified Users",
        isActive: false,
        callBack: function () {
          console.log(usersList);
          const users = usersList.filter((e, i) => {
            return !e?.verified
          })
         // console.log(users);
         setCopyUsers(users);
          setUsers(users);
          setListItem(this,menuList);
  
        }
      }  
    ]
    setList(menuList)
  }

  const onChange = (e) => {
    const { value } = e.target;
    const newUsers =copyUsers.filter((e) => {
      return e.username.toLowerCase().includes(value.toLowerCase());
    })
    setUsers(newUsers);
  }

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
  }, [users]);
  return (
    <div className='containerCtn'>
      <Toaster />
      <br />
      <b style={{ padding: 17, fontWeight: "bolder" }}>User List</b>

      <SearchUsers onChange={onChange} users={users} setUsers={setUsers} />

      <div className="container">
        <div>
          {list.map((e, i) => {
            return (
              <MDBBtn onClick={()=>e.callBack()} rounded key={i} style={{marginLeft:10}} color={e.isActive ? "primary" : "secondary"}>{e.name}</MDBBtn>
            )
          })}
        </div>

        <br />
        {!isLoading ? <>
          <UserList users={users} onSuspend={handleSuspend} getUsers={getUsers} onDelete={handleDelete} onShowProfile={onShowProfile} />
          {users.length <= 0 && <div className='text-center'><img src='/images/noData.png' /><br /><span><b>NO DATA FOUND</b></span></div>}
        </> : <>

          {[1, 2, 3, 4, 5].map((_,i) => <UserItemSkeleton key={i}/>)

          }
        </>}


      </div>
    </div>
  );
}

export default VerifiedUsers