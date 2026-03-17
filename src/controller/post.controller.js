import express from "express";
import postModel from "../model/post.model.js";
import ImageKit from "imagekit";
import jwt from "jsonwebtoken";


// CREATE POST
export async function createPostController(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not provided"
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        // Example post creation
        const post = await postModel.create({
            user: decoded.id,
            caption: req.body.caption,
            image: req.file ? req.file.path : null
        });

        return res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}


// GET POSTS
export async function getPostController(req, res) {
    try {
        const token = req.cookies.token;

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                message: "Token invalid"
            });
        }

        const posts = await postModel.find().populate("user");

        return res.status(200).json({
            posts
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}