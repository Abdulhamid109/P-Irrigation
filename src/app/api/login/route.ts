import { connect } from "@/DbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from "@/models/userModal";
connect();

export async function POST(request:NextRequest){
    try {
        const reqbody = await request.json();
        const {email,password} = reqbody;
        const ispresent = await user.findOne({email:email});
        if(!ispresent){
            console.log("User does not exists")
            return NextResponse.json(
                {error:"User does not exists"},
                {status:404}
            )
        }else{
            const result = await bcrypt.compare(password,ispresent.password);
            if(!result){
                return NextResponse.json(
                    {error:"Wrong Credentials"},
                    {status:404}
                )
            }

            const tokenData={
                name:ispresent.name,
                email:email,
                userid:ispresent._id
            }
            const token = jwt.sign(tokenData,process.env.SECRET_KEY!,{expiresIn:'1d'});
            const response = NextResponse.json(
                {success:"Successfully logged in"},
                {status:200},
            );
            response.cookies.set('token',token,{httpOnly:true});
            return response;


        }
    } catch (error) {
        console.log("Failed to Log in "+error);
        return NextResponse.json(
            {error:"Internal Server Error"},
            {status:500}
        )
    }
}