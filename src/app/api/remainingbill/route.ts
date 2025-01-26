import { connect } from "@/DbConfig/dbconfig";
import Crop from "@/models/cropModal";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        // Fetch customers where RemainingBill is NOT zero
        const unpaidBill = await Crop.find({ RemainingBill: { $ne: 0 } });

        if (!unpaidBill || unpaidBill.length === 0) {
            return NextResponse.json(
                { error: "All customers have paid their bills" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: unpaidBill },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to fetch: " + error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
