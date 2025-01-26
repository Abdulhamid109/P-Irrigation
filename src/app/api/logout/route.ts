import { connect } from "@/DbConfig/dbconfig";
import {  NextResponse } from "next/server";

connect()

//token koh clean karna hota hai
export async function GET() {
    try {
        const response = NextResponse.json({
            message:"LogOut successfull",
            success:true
        });

        response.cookies.set('token',"",{
            httpOnly:true,
            expires:new Date(0)
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            error:String(error)
        },{status:500})
    }
}