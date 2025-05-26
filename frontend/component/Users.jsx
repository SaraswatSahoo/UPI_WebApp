import React, { useEffect, useState } from 'react'
import UserId from './UserId'
import axios from 'axios';

export default function Users() {

  const [ users, setUsers ] = useState([]);
  const [ filter, setFilter ] = useState("");

  useEffect(() => {
    async function fetchUser(){

      const token = await localStorage.getItem("token");

      await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/bulk?filter=${filter}`,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then( response => {
        setUsers(response.data.user);
      })
    }

    fetchUser();

  },[filter]);

  return (
    <div className=' w-full'>
      <div className=' text-[30px] font-extrabold pb-[15px] px-[30px] flex items-center'>
        Users
      </div>
      <input onChange={e=>{setFilter(e.target.value)}} className=' border-2 border-gray-300 mx-[40px] w-[95%] h-[50px] px-[20px] text-[22px] outline-none rounded-[8px] mb-[20px]' type="text" placeholder='Search users...'/>
      <div>
        {users.map((user, index) => <UserId user={user} key={index}/>)}
      </div>
      
    </div>
  )
}
