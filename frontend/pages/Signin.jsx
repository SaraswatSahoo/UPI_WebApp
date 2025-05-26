import React, { useState } from 'react'
import Heading from '../component/Heading'
import InputBox from '../component/InputBox'
import Button from '../component/Button'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'

export default function Signin() {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function SignInRequest(){
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/signin`, {
            email,
            password
        });

        localStorage.setItem("token", response.data.token);
        
        navigate("/dashboard");
    }

    return (
        <div className=' h-screen w-screen bg-slate-300 flex justify-center items-center'>
            <div className=' py-[30px] w-[500px] bg-white rounded-[30px] flex flex-col justify-center items-center'>
                <Heading label="Sign In"/>
                <p className=' text-[25px] text-gray-500 text-center mb-[20px]'>
                    Enter your credentials to access your <br /> account
                </p>
                <InputBox onChange={ e => { setEmail(e.target.value)}} id="3" label="Email" type="email"/>
                <InputBox onChange={ e => { setPassword(e.target.value)}} id="4" label="Password" type="password"/>
                <Button onClick={SignInRequest} label="Sign In"/>
                <p className=' text-[20px] font-semibold mb-[20px]'>
                    Don't have an account? 
                    <Link to="/signup" className=' font-semibold hover:underline'> Sign Up</Link>
                </p>
            </div>
        </div>
    )
}
