import express from "express";
import userModel from "../model/user.model.js";
import authController from "../controller/auth.controller.js";


const authRouter = express.Router()

authRouter.post("/register",authController.registerController )
authRouter.post("/login",authController.loginController )
export default authRouter