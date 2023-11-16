import express from "express";
const Router = express.Router();
import jwt from "jsonwebtoken";
import { User } from "../models/user";


Router.post("/register", async (req, res) => {
  try {
    const user = req.body;

    const { name, email, password } = user;

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email already in use",
      });
      return;
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

Router.post("/login", async (req, res) => {
  try {
    const user = req.body;

    const { email, password } = user;

    const isUserExist = await User.findOne({
      email: email,
    });

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

  

    const isPasswordMatched =
      isUserExist?.password === password;


    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
      return;
    }
    const token = jwt.sign(
      { _id: isUserExist?._id, email: isUserExist?.email },
      "emfefefpme:fp",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

export default Router