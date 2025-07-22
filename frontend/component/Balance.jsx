import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Balance() {

  const [balance, setBalance] = useState(0);

  useEffect(()=>{

    async function getbalance() {

      const token = await localStorage.getItem("token");

      await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/account/balance`,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then( response => {
        setBalance(response.data.balance);
      })

    }

    getbalance();

  },[]);

  return (
    <div className=' text-[30px] font-semibold py-[30px] px-[30px] flex items-center'>
      <span className=' font-extrabold pr-[20px]'>Your Balance</span> Rs {balance.toFixed(2)} 
    </div>
  )
}
