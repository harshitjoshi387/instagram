import express from "express";
import userModel from "../model/user.model.js";
import crypto from "crypto"
import jwt from "jsonwebtoken";


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
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const user =await userModel.create({
       username,
       email,
       bio,
       profile,
       password:hash
    })
    const token= jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"7d"})
    
    res.cookie('token',token)

    res.status(201).json({
        message:"user register successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profile:user.profile
        }
        
    })
})

export default authRouter