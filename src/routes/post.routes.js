import express from "express";
import postModel from "../model/post.model";
import createPostController from "../controller/post.controller";
import multer from "multer";
const upload = multer({storage:multer.memoryStorage()})
const postRouter= express.Router()


postRouter.post("/",upload.single('img'),createPostController)


export default postRouter

