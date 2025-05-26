import React, { useState } from 'react'
import Heading from '../component/Heading'
import InputBox from '../component/InputBox'
import { useSearchParams } from "react-router-dom"
import axios from "axios"

export default function SendMoney() {

  const [ searchParams ] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [ amount, setAmount ] = useState();

  async function initiateTransferRequest(){
    const token = localStorage.getItem("token");
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/account/transfer`, {
      to: id,
      amount
    },{
      headers:{
        authorization: `Bearer ${token}`
      }
    })
  }

  return (
    <div className=' bg-gray-100 flex justify-center items-center h-screen w-full'>
      <div className=' bg-white w-[35%] flex flex-col justify-center items-center px-[40px] py-[50px] rounded-[20px]'>
        <Heading label="Send Money"/>
        <div className=' w-full mt-[70px] flex mb-[20px] ml-[90px]'>
            <div className=' text-[35px] font-bold flex justify-center items-center'>
                <div className=' text-white bg-green-500 w-[70px] h-[70px] flex justify-center items-center rounded-[35px] mr-[15px]'>
                    {name[0].toUpperCase()}
                </div>
                {name}
            </div>
        </div>
        <InputBox onChange={e=>{setAmount(e.target.value)}} id="1" label="Amount (in Rs)" type="number" placeholder="Enter Amount"/>
        <button onClick={initiateTransferRequest} className=' my-[20px] mr-[20px] bg-green-500 w-[80%] h-[50px] text-[25px] font-semibold rounded-[8px] text-white'>
            Initiate Transfer
        </button>
      </div>
    </div>
  )
}
