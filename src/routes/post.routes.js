import express from "express";
import postModel from "../model/post.model";
import createPostController from "../controller/post.controller";
const postRouter= express.Router()


postRouter.post("/",createPostController)


export default postRouter

