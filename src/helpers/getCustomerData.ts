import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


interface decodedCustomer{
    customerName:string,
    id:string,
}
export async function getCustomerDataFromToken(request:NextRequest) {
    try {
        const token = request.cookies.get('customertoken')?.value||"";
        const tokendata = jwt.verify(token,process.env.CUSTOMER!) as decodedCustomer;
        return tokendata.id;

    } catch (error) {
        console.log("Failed to fetch the customer data");
        return NextResponse.json(
            {error:"Internal server error"+error},
            {status:500}
        )
    }
}