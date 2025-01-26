import { connect } from "@/DbConfig/dbconfig";
import Crop from "@/models/cropModal";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request:NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const cropId = searchParams.get('CropId');

        const crop = await Crop.findOne({_id:cropId});
        if(!crop){
            return NextResponse.json(
                {error:"No Crops found"},
                {status:404}
            );
        }
        return NextResponse.json(
            {success:true,data:crop},
            {status:200}
        );
    } catch (error) {
        console.log("Failed to fetch the crop details"+error);
        return NextResponse.json(
            {error:"Internal server error"},
            {status:500}
        );
    }
}