"use client"

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast";



export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [loading , setLoading] = useState(false)
    

    const onSignUp = async(e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log("onSignUp");
            const response = await axios.post("/api/user/signup", user);
            
            console.log("Signup success", response.data);
            router.push("/login")
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="flex flex-col justify-center items-center min-h-screen" action="" onSubmit={onSignUp}>
            <h1 className="text-2xl">{loading? "Processing" : "Sign Up"}</h1>
            <label htmlFor="username">Username</label>
            <input type="text" className="p-2 text-black" value={user.username} onChange={(e)=> setUser({...user, username: e.target.value})} required/>
            <label htmlFor="email">Email</label>
            <input type="email" className="p-2 text-black" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} required/>
            <label htmlFor="password">Password</label>
            <input type="password" className="p-2 text-black" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} required/>
            <button type="submit" disabled={loading}>Submit</button>
            <Link href='/login'>Login</Link>
        </form>
    )
}