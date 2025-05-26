import React from 'react'

export default function Button({ label, onClick }) {
  return (
    <div className=' w-[82%] mt-[10px] mb-[20px]'>
      <button className=' w-full h-[50px] rounded-[10px] bg-black text-white text-[25px] font-bold'
              onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}
