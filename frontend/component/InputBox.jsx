import React from 'react'

export default function InputBox({ id, label, type, placeholder, onChange }) {
  return (
    <div className=' ml-[40px] w-[90%] pb-[20px]'>
      <p className=' text-[22px] font-bold'>{label}</p>
      <input onChange={onChange}
        className='w-[90%] h-[50px] border-2 border-gray-300 outline-none rounded-[8px] px-[15px] text-[20px]' 
        type={type} name={label} id={id} placeholder={ placeholder || ""}
    />
    </div>
  )
}
