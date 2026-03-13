import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exists"],
        required:[true,"username is required"]
    },
    email:{
        type:String,
        unique: [true,"email is already register"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:{
        type:String
    },
    profile:{
        type:String,
        default:'https://ik.imagekit.io/jben2nwj5/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.webp?updatedAt=1770825792747'
    },

})

const userModel = mongoose.model('users',userSchema);
export default userModel;