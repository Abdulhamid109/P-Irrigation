import { connect } from "@/DbConfig/dbconfig";
import Customer from "@/models/customerModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        // const guntaPrice = 175;
        const reqbody = await request.json();
        const { customerName,GhatNo, Year } = reqbody;
        // const totalBill =  FieldAmount*guntaPrice;
        // const remainingBill = totalBill-BillPaid;
        const ispresent = await Customer.findOne(
            {
                Year:Year,
                customerName: customerName,
                GhatNo: GhatNo,
            }
        );

        if(ispresent){
            return NextResponse.json(
                {error:`Customer details already exists...try adding new crop`},
                {status:404}
            )
        }
        const savedUser = new Customer({
                Year:Year,
                customerName: customerName,
                GhatNo: GhatNo,
        });

        const customerr = await savedUser.save();
        //jwt setup
        const tokendata = {
            customerName:customerName,
            id:customerr._id
        };

        const token = jwt.sign(tokendata,process.env.CUSTOMER!);
        const response = NextResponse.json(
            {success:customerr},
            {status:200}
        );

        response.cookies.set('customertoken',token,{httpOnly:true});
        return response;

    } catch (error) {
        console.log("failed to add the customer " + error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}