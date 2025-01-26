import { connect } from "@/DbConfig/dbconfig";
import Crop from "@/models/cropModal";
import { NextResponse } from "next/server";


connect();

export async function GET() {
    try {
        const paidbill = await Crop.where('RemainingBill').equals(0);
        console.log(paidbill);
        // const user = await Customer.find({_id:paidbill.customerId})
        if(!paidbill || paidbill.length===0){
            return NextResponse.json(
                {error:"Nobody has paid full bill",data:paidbill},
                {status:404}
            )
        }
        return NextResponse.json(
            {success:paidbill},
            {status:200}
        )
    } catch (error) {
        console.log("Failed to fetch "+error);
        return NextResponse.json(
            {error:"Internsl server errror"},
            {status:500}
        )
    }
}