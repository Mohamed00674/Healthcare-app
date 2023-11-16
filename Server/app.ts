import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth"
const app: Application = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/auth' , auth )
const PORT: number = 8000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});

app.listen(PORT, async () => {
  console.log(`Server Started on Port :${PORT}`);

  // Connect To The Database
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Connected To the Database");
  } catch (error) {
    console.log(" Error to connect Database");
  }
});
