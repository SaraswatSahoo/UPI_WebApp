import React, { useState } from 'react'
import Heading from '../component/Heading'
import InputBox from '../component/InputBox'
import Button from '../component/Button'
import { Link, useNavigate } from 'react-router'
import axios from "axios";

export default function Signup() {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function SignUpRequest(){
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/signup`, {
        firstname,
        lastname,
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      
      navigate("/dashboard")
  }

  return (
    <div className=' h-screen w-screen bg-slate-300 flex justify-center items-center'>
      <div className=' py-[30px] w-[500px] bg-white rounded-[30px] flex flex-col justify-center items-center'>
        <Heading label="Signup"/>
        <p className=' text-[25px] text-gray-500 text-center mb-[20px]'>
            Enter your information to create an <br /> account
        </p>
        <InputBox onChange={ e => { setFirstName(e.target.value)}} id="1" label="First Name" type="text"/>
        <InputBox onChange={ e => { setLastName(e.target.value)}} id="2" label="Last Name" type="text"/>
        <InputBox onChange={ e => { setEmail(e.target.value)}} id="3" label="Email" type="email"/>
        <InputBox onChange={ e => { setPassword(e.target.value)}} id="4" label="Password" type="password"/>
        <Button onClick={SignUpRequest} label="Sign Up"/>
        <p className=' text-[20px] font-semibold mb-[20px]'>
            Already have an account? 
            <Link to="/signin" className=' font-semibold hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  )
}
