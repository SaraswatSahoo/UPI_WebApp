import React from 'react';
import { useNavigate } from 'react-router';

export default function UserId({ user }) {

  const navigate = useNavigate();

  async function sendMoneyRequest(){
    navigate("/send?id=" + user._id + "&name=" + user.firstname);
  }

  return (
    <div className=' flex justify-between items-center h-[70px] w-full py-[30px] px-[30px]'>
        <div className=' text-[25px] font-semibold flex justify-center items-center'>
            <div className=' bg-slate-300 w-[50px] h-[50px] flex justify-center items-center rounded-[25px] mr-[15px]'>
                {user.firstname.substring(0,1)+user.lastname.substring(0,1)}
            </div>
            { user.firstname }
        </div>
        <button onClick={sendMoneyRequest} className=' bg-black text-white text-[20px] font-bold w-[160px] h-[50px] rounded-[10px]'>
            Send Money
        </button>
    </div>
  )
}
