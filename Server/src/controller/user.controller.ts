import { Request, Response } from "express";
import { IUser } from "../interface/user.interface";
import userModel from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class Controller {
  public async login(req: Request, res: Response): Promise<Response | Error> {
    const { email, password, username } = req.body;
    try {
      if (!email || !password || !username ) {
        return res.status(401).json({ message: "please complete your authentification" });
      } else {
        const user: IUser = await userModel.findOne({ email });
        console.log(user);
        if (!user) {
          return res.status(404).json({ message: "No user found" });
        } else {
          const verify: boolean = await bcrypt.compare(password, user.password);
          if (verify) {
            const payload = { userId: user._id, email: user.email }; 
            const token: string = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: "5h",
            });
            
            res.setHeader("Authorization", `Bearer ${token}`);
            return res
              .status(200)
              .json({ user,token  , message :  "Logged In"});
          } else {
            return res
              .status(401)
              .json({ message: "email or password incorrect" });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async register(req: Request, res: Response): Promise<Response | Error> {
    const user: IUser = req.body;
    console.log(user);
    try {
      if (!user.email || !user.password || !user.username ) {
        return res.status(401).json({ message: "incomplete data" });
      } else {
        const new_user = await userModel.findOne({ email: user.email });
        if (new_user) {
          return res
            .status(409)
            .json({ message: `user with ${user.email} already exists ` });
        } else {
          const hashedPassword: String = await bcrypt.hash(user.password, 8);
          await userModel.create({ ...user, password: hashedPassword });
          return res.status(200).json({ message: "user created successfully" });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  


}
