// Route for fetching the information of all the users

import { connect } from "@/DbConfig/dbconfig";
import Customer from "@/models/customerModal";
import { NextResponse } from "next/server";


connect();

export async function GET() {
    try {
        const customer = await Customer.find();
        if (!customer) {
            return NextResponse.json(
                { error: "No Users found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: customer },
            { status: 200 }
        );
    } catch (error) {
        console.log("Failed to fetch all the users " + error);
        return NextResponse.json(
            { error: "Internal Server error" },
            { status: 500 }
        );
    }
}