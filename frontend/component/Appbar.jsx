import React from 'react'

export default function Appbar() {

  
  return (
    <div className=' flex justify-between items-center h-[70px] w-full border-b-2 border-gray-300 pb-[20px] px-[30px]'>
      <div className=' text-[35px] font-extrabold'>
        Tranzx
      </div>
      <div className=' text-[25px] font-semibold flex justify-center items-center'>
        Hello
        <div className=' bg-slate-300 w-[50px] h-[50px] flex justify-center items-center rounded-[25px] ml-[15px]'>
            S
        </div>
      </div>
    </div>
  )
}
