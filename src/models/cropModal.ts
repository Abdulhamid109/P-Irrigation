import mongoose from "mongoose";

const cropModal = new mongoose.Schema({
    customerId:{
        type:String,
        ref: "Customer", // Reference to Customer schema
        required: true,
    },
    CropName:{
        type:String,
        required:[true,"Please enter the Crop Name"]
    },
    CropTime:{
        type:String,
        required:[true,"Please enter the Crop Time in months"]
    },
    FieldAmount:{
        type:Number,
        required:[true,"Please enter the amount of jungle"]
    },
    TotalBill:{
        type:Number,
    },
    BillPaid:{
        type:Number,
    },
    RemainingBill:{
        type:Number,
    },
    Additional:{
        type:String
    },
    
});

const Crop = mongoose.models.crop||mongoose.model('crop',cropModal);
export default Crop;