import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";


export default function Profile() {
  // file picker ref
  const filePickerRef = useRef(null);
  // profile image
  const [image, setImage] = useState(undefined);
  // image upload duration time
  const [imagePercent, setImagePercent] = useState(0);
  // for image error
  const [imageError, setImageError] = useState(false);
  // saving the image url in form data
  const [formData, setFormData] = useState({
  });  
  // get current user
  const { currentUser } = useSelector((state) => state.user);
  // Uploading image to firebase
  useEffect(() => {
    if (image){
      handleImageUpload(image)
    }
  },[image] )
  // function to handle image upload
  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (
          snapshot.bytesTransferred/snapshot.totalBytes ) * 100;
        setImagePercent(Math.round(progress))
      },
        (error) =>{
        setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({...formData, profilePicture: downloadURL }))
        }
          );
      };
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Profile</h1>

      <form className="flex flex-col gap-4">
        <input type="file" id="" ref={filePickerRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          className="rounded-full h-36 w-36 self-center cursor-pointer object-cover"
          alt="profilePicture"
          onClick={() => filePickerRef.current.click()}
        />
        <p className=" text-sm self-center">
          {imageError ? (
            <span className="text-red-600">Error Uploding Image </span>) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="">
                {`Uploading.  ${imagePercent} %`}
              </span> ) : imagePercent === 100 ? (
                <span className="text-green-600"> Image Uploaded successfully</span>) : ''}
        </p>

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="p-3 rounded-lg bg-gray-800 text-slate-300"
        />

        <input
          defaultValue={currentUser.email}
          disabled
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-gray-800 text-slate-300"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-gray-800 text-slate-300"
        />

        <button
          className="bg-blue-600 p-3 rounded-lg uppercase text-opacity-80 hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="p-1 flex justify-between">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Log Out</span>
      </div>
    </div>
  );
}
