import express from "express";
import postModel from "../model/post.model.js";
import ImageKit from "imagekit";
import tofile from "imagekit"


async function createPostController(req,res){
    console.log(req.body,req.file)

    const file =await ImageKit.files.upload({
        file:new tofile(Buffer,from(req.file.buffer),'file'),
        fileName:'test'
    })
    res.send(file)
}


export default createPostController