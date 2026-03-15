import express from "express";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt"
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
   const hash= bcrypt.hash(password,10)
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
authRouter.post("/login",async(req,res)=>{
    const {username, email,password}=req.body
    
    const user= await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })
    if(!user){
        return res.status(409).json({
            message:"user not found"
        })
    }
        
        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({
                message:"password invalid"
            })
        }

        const token= jwt.sign({
            id:user._id
        },process.env.JWT_SECRET,{expiresIn:"7d"})

        res.cookie('token',token)

        res.status(200).json({
            message:"user loggedin successfully"
        })
})
export default authRouter