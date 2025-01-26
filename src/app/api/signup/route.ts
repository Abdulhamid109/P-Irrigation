import { connect } from "@/DbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import user from "@/models/userModal";

connect();

export async function POST(request:NextRequest){
    try {
        const reqbody = await request.json();
        const {name,email,password} = reqbody;
        const ispresent = await user.findOne({email:email});
        if(ispresent){
            console.log("User Already exists")
            return NextResponse.json(
                {error:"User Already exists"},
                {status:404}
            )
        }
            const slat = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password,slat);
            const newuser = new user({
                name,
                email,
                password:hashed
            });
            const savedUser = await newuser.save();
            return NextResponse.json(
                {success:"Account Created "+savedUser},
                {status:200}
            )
        }
     catch (error) {
        console.log("Failed to Log in "+error);
        return NextResponse.json(
            {error:"Internal Server Error"},
            {status:500}
        )
    }
}