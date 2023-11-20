import Controller from '../controller/user.controller';
import {Router} from 'express'

export const userRouter = Router();
const userController:Controller = new Controller();
userRouter.post("/login",userController.login);
userRouter.post("/register", userController.register);




