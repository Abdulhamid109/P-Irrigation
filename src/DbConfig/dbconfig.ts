import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Successfully connected to the database");
        });
        connection.on('error',(err)=>{
            console.log("Failed to connect "+err);
            process.exit(1);
        })
    } catch (error) {
        console.log("Failed to connect to the database "+error);
        process.exit(1);
    }
}