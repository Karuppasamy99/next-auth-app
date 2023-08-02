import connect from "@/database/database";
import UserDetails from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect()

export async function POST (request: NextRequest){
    try {
        const reqBody = await request.json();
        const { email, password} = reqBody;
        const user = await UserDetails.findOne({ email: email});
        if(!user){
            return NextResponse.json({message: "Please Register to login"},{status: 400})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({message: "Invalid password"},{status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!,{ expiresIn: "1h"})
        const response =  NextResponse.json({success: true, message:"Login successful"},{status: 200})
        response.cookies.set('token', token, {
            httpOnly: true
        })

        return response;

    }catch(err: any){
        return NextResponse.json({message: err.message}, {status: 500})
    }
}