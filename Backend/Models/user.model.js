import mongoose from "mongoose";

const  userSchema = new mongoose.Schema({
     username:{
        type: String,
        required: true,
        unique: true,
     },
     email:{
        type: String,
        required: true,
        unique: true,
     },
     password:{
        type: String,
        required: true,
     },
     profilePicture:{
      type: String,
      default: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg",
     }
}, { timestamps: true });

const User = mongoose.model('User',userSchema);

export default User;