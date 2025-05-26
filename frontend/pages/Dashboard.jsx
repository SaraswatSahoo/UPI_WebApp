import React from 'react'
import Appbar from '../component/Appbar'
import Balance from '../component/Balance'
import Users from '../component/Users'

export default function Dashboard() {
  return (
    <div className=' p-[25px] h-screen w-screen'>
      <Appbar />
      <Balance />
      <Users />
    </div>
  )
}
