import mongoose from "mongoose";

const customerModal = new mongoose.Schema({
    customerName:{
        type:String,
        required:[true,"Please enter the customer Name"]
    },
    CropId:{
        type:String
    },
    GhatNo:{
        type:String,
        required:[true,"Please enter the Ghat No"]
    },
    
    Year:{
        type:String,
        required:[true,"Please enter year"]
    }
});

const Customer = mongoose.models.customer||mongoose.model('customer',customerModal);
export default Customer;