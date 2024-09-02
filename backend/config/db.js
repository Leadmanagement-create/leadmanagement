import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGOURL = process.env.MONGO_URL;

const db = mongoose.connect(MONGOURL).then(() => {
    console.log('DataBase is connected successfully.');

}).catch((err) => {
    console.log('Failed to connect to database.',err);
})

export default db