import express from "express";
import postModel from "../model/post.model";


async function createPostController(req,res){
    console.log(req.body,req.file)
}


export default createPostController