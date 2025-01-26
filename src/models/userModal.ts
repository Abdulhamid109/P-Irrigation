import mongoose from "mongoose";

const usermodal = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"]
    },
    TotalCollection:{
        type:Number
    }
});

const user = mongoose.models.users||mongoose.model('users',usermodal);
export default user;