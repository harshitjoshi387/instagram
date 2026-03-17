import express from "express";
import postModel from "../model/post.model.js";
import { createPostController, getPostController } from "../controller/post.controller.js";
import multer from "multer";
const upload = multer({storage:multer.memoryStorage()})
const postRouter= express.Router()


postRouter.post("/",upload.single('img'),createPostController)
postRouter.get('/',getPostController)


export default postRouter

