// Dynamic route for fetching the information of single user

import { connect } from "@/DbConfig/dbconfig";
import Crop from "@/models/cropModal";
import Customer from "@/models/customerModal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {id}=await params;
        const customer = await Customer.findOne({_id:id});
        const crop = await Crop.find({customerId:id});
        if (!customer) {
            return NextResponse.json(
                { error: "No User found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true,
                data:{
                    customer,
                    crop
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("Failed to fetch the user" + error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}