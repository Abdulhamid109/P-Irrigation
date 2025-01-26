import { connect } from "@/DbConfig/dbconfig";
import Customer from "@/models/customerModal";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request:NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const query = searchParams.get("name");

        if(!query){
            return NextResponse.json(
                {error:"Query Not Found"},
                {status:404}
            )
        }

        const customers = await Customer.find({customerName:query});
        if (customers.length === 0) {
            return NextResponse.json({ message: "No customers found.",data:{query} }, { status: 404 });
          }
      
          return NextResponse.json({ customers }, { status: 200 });
    } catch (error) {
        console.log("Failed to fetch "+error);
        return NextResponse.json(
            { error: "An error occurred while searching for customers." },
            { status: 500 }
          );
    }
}