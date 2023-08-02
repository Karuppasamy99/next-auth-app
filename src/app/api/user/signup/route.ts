import connect from "@/database/database";
import { NextRequest, NextResponse } from "next/server";
import UserDetails from "@/models/userModel";
import bcrypt from "bcrypt";
connect();

console.log("UserDetails", UserDetails)

export async function POST (request: NextRequest){
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const { username, password, email } = reqBody
        const user = await UserDetails.findOne({ email: email});
        if(user){
            return NextResponse.json({ message: "UserDetails already exists"}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('password',hashedPassword)
        const newUser = new UserDetails({
            username,
            password: hashedPassword,
            email
        })
        const savedUser = await newUser.save();

        return NextResponse.json({message: "user created successfully", savedUser},{status: 201})
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        },{status: 500})
    }
}