import { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
export const mongooseConnection = async(app:Express):Promise<void>=>{
    try {
     await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions).then(()=>{
            console.log('connected to the database');
        }).catch((error:Error)=>{
            console.log(error.message);
        });
       
      } catch (error) {
        console.error('Error connecting to the database:', error);
      }
}