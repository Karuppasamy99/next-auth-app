"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)

    const onLogin = async(e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post('/api/user/login',user);
            console.log(response.data);
            router.push('/profile')
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="flex flex-col justify-center items-center min-h-screen" action="" onSubmit={onLogin}>
            <h1 className="text-2xl">{loading? "Processing": "Login"}</h1>
            <label htmlFor="email">Email</label>
            <input type="email" className="p-2 text-black" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})}/>
            <label htmlFor="password">Password</label>
            <input type="password" className="p-2 text-black" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})}/>
            <button type="submit">Submit</button>
            <Link href='/signup'>Sign up</Link>
        </form>
    )
}