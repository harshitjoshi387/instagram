import mongoose from "mongoose";


const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"img url is required for creating an post"]

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user id is required"],
        ref:'users'

    }

})

const postModel = mongoose.Model('posts', postSchema)

export default postModel