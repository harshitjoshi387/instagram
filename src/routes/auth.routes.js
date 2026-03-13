import express from "express";
import userModel from "../model/user.model.js";

const authRouter = express.Router()

authRouter.post("/register",async (req,res)=>{
    const {username,bio,email, password,profile}=req.body

    const isUserAlreadyExist =await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"user is already exist"
        })
    }
})