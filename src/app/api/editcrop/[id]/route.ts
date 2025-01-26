import { connect } from "@/DbConfig/dbconfig";
import Crop from "@/models/cropModal";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const guntaPrice = 175;

        const { id } = await params
        // const reqbody = await request.json();
        const { CropName, FieldAmount, CropTime, BillPaid } = await request.json();

        const ispresent = await Crop.findById({ _id: id });


        if (!ispresent) {
            console.log("Does not exists ");
            return NextResponse.json(
                { error: "Crop Data Does not exists" },
                { status: 404 }
            )
        }

        // update the crop

        const TotalBill = FieldAmount * guntaPrice;
        const RemainingBill = TotalBill - BillPaid;
        const updatedCrop = await Crop.findByIdAndUpdate(id, { CropName, FieldAmount, CropTime,TotalBill, BillPaid, RemainingBill }, { new: true, runValidators: true });


        console.log(updatedCrop);
        return NextResponse.json(
            { success: true, Crop: updatedCrop },
            { status: 200 }
        )



    } catch (error) {
        console.log("Failed to edit the crop " + error);
        return NextResponse.json(
            { error: "Internal server error" + error },
            { status: 500 }
        )
    }
}