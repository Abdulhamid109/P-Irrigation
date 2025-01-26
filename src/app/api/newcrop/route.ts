// import { connect } from "@/DbConfig/dbconfig";
// import { getCustomerDataFromToken } from "@/helpers/getCustomerData";
// import Crop from "@/models/cropModal";
// import { NextRequest, NextResponse } from "next/server";


// connect();

// export async function POST(request: NextRequest) {
//     try {
//         const customerId = await getCustomerDataFromToken(request);
//         const guntaPrice = 175;
//         const reqbody = await request.json();
//         const { CropName, CropTime, FieldAmount, BillPaid } = reqbody;
//         const totalBill = FieldAmount * guntaPrice;
//         const remainingBill = totalBill - BillPaid;
//         const ispresent = await Crop.findOne(
//             {
//                 CropName: CropName,
//                 CropTime: CropTime,
//                 FieldAmount: FieldAmount,
//             }
//         );
//         if (ispresent) {
//             return NextResponse.json(
//                 { error: `Crop details already exists...add new crop` },
//                 { status: 404 }
//             )
//         }
//         const savedCrop = new Crop({
//             customerId:customerId,
//             CropName: CropName,
//             CropTime: CropTime,
//             FieldAmount: FieldAmount,
//             TotalBill: totalBill,
//             BillPaid: BillPaid,
//             RemainingBill: remainingBill
//         },);


//         return NextResponse.json(
//             { success: savedCrop },
//             { status: 200 }
//         )
//     } catch (error) {
//         console.log("Failed to add the new crop");
//         return NextResponse.json(
//             { error: "Internal Server Error" + error },
//             { status: 500 }
//         )
//     }
// }
import { connect } from "@/DbConfig/dbconfig";
import Crop from "@/models/cropModal";
import Customer from "@/models/customerModal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { customerId, CropName, FieldAmount, CropTime, BillPaid } = await request.json();
    const guntaPrice = 175; // Price per field unit

    // Check if the customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    // Calculate TotalBill and RemainingBill
    const TotalBill = FieldAmount * guntaPrice;
    const RemainingBill = TotalBill - BillPaid;

    // Create new crop
    const newCrop = new Crop({
      customerId,
      CropName,
      FieldAmount,
      CropTime,
      TotalBill,
      BillPaid,
      RemainingBill,
    });

    const savedCrop = await newCrop.save();
    //const addcropId = await Customer.findByIdAndUpdate({_id:customerId},{CropId:savedCrop._id});
   // console.log(addcropId);
    return NextResponse.json({ success: savedCrop }, { status: 201 });
  } catch (error) {
    console.error("Error creating crop:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
