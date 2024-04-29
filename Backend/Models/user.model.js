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
      default: "https://static.vecteezy.com/system/resources/previews/023/465/688/non_2x/contact-dark-mode-glyph-ui-icon-address-book-profile-page-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg",
     }
}, { timestamps: true });

const User = mongoose.model('User',userSchema);

export default User;